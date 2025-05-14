
# Entendendo Struct Tags em Go

As struct tags são um dos recursos mais poderosos e versáteis da linguagem Go, permitindo adicionar metadados às estruturas de dados. Embora pareçam simples à primeira vista, elas possibilitam a criação de frameworks elegantes para serialização, validação, mapeamento ORM e muito mais.

Em Go, as struct tags são strings literais que podem ser anexadas aos campos de uma struct. São metadados que não afetam diretamente o comportamento do programa em tempo de compilação, mas podem ser acessados e interpretados em tempo de execução usando o pacote `reflect`.

```go
type User struct {
    Name string `json:"name" validate:"required"`
    Age  int    `json:"age" validate:"min=18"`
}
```

No exemplo acima, `json:"name"` e `validate:"required"` são struct tags. A sintaxe básica é:

```go
`chave:"valor" outraChave:"outroValor"`
```

## Sintaxe e Convenções

As struct tags seguem algumas convenções importantes:
- São delimitadas por acentos graves (`` ` ``)
- Consistem em pares de chave-valor separados por dois pontos
- Múltiplas tags são separadas por espaços
- Os valores podem conter subvalores separados por vírgulas ou outros delimitadores definidos pela aplicação

## Acessando Struct Tags com Reflection

Para utilizar as struct tags, precisamos do pacote `reflect`, que permite examinar a estrutura de tipos e valores em tempo de execução. Vejamos um exemplo simples:

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    type Example struct {
        Field string `info:"importante"`
    }
    
    e := Example{Field: "valor"}
    t := reflect.TypeOf(e)
    field := t.Field(0)
    fmt.Println(field.Tag.Get("info")) // Saída: importante
}
```

O método `Get` é uma maneira conveniente de obter o valor de uma tag, mas ele não diferencia entre uma tag inexistente e uma tag vazia. Para uma abordagem mais precisa, podemos usar o método `Lookup`:

```go
tag, ok := field.Tag.Lookup("info")
if ok {
    fmt.Println("A tag info existe:", tag)
} else {
    fmt.Println("A tag info não existe")
}
```

## Um Sistema de Validação com Struct Tags

Agora, vamos explorar um caso de uso mais avançado: um sistema de validação baseado em struct tags. Este é um padrão muito utilizado em frameworks como o Gin, Echo e outros.

Vamos analisar uma implementação simplificada:

```go
type ExampleStruct struct {
    ExampleField string `validate:"required,min=3,max=10"`
    ExampleInt   int    `validate:"required,min=1,max=100"`
}
```

Nesta struct, definimos regras de validação usando a chave `validate`. Cada campo tem suas próprias regras:
- `ExampleField` deve ser obrigatório, ter no mínimo 3 caracteres e no máximo 10
- `ExampleInt` deve ser obrigatório, ter um valor mínimo de 1 e máximo de 100

## Explorando as Tags de Validação

Vamos primeiro entender como podemos extrair e exibir essas regras de validação. A função `printRules` faz exatamente isso:

```go
func printRules(s any) {
    v := reflect.ValueOf(s)

    if v.Kind() != reflect.Struct {
        fmt.Println("input is not a struct")
        return
    }

    t := v.Type()

    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        rules, ok := field.Tag.Lookup("validate")
        if !ok {
            continue
        }

        ruleList := strings.Split(rules, ",")
        fmt.Printf("Field: %s\n", field.Name)
        for _, rule := range ruleList {
            rule = strings.TrimSpace(rule)
            fmt.Printf(" - Rule: %s\n", rule)
        }
    }
}

func main() {
	example := ExampleStruct{
		ExampleField: "ab",
		ExampleInt:   101,
	}

	printRules(example)
}

// Saída:  
// Field: ExampleField
//  - Rule: required
//  - Rule: min=3
//  - Rule: max=10
// Field: ExampleInt
//  - Rule: required
//  - Rule: min=1
//  - Rule: max=100
```

## Implementando a Validação

Agora, vamos analisar a função que realmente valida os dados com base nessas regras:

```go
func validateStruct(s any) []error {
    v := reflect.ValueOf(s)

    if v.Kind() != reflect.Struct {
        return []error{errors.New("input is not a struct")}
    }

    t := v.Type()

    errors := make([]error, 0)
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        rules, ok := field.Tag.Lookup("validate")
        if !ok {
            continue
        }

        ruleList := strings.Split(rules, ",")
        for _, rule := range ruleList {
            rule = strings.TrimSpace(rule)

            ruleParts := strings.Split(rule, "=")
            ruleName := ruleParts[0]
            var ruleValue string
            if len(ruleParts) > 1 {
                ruleValue = ruleParts[1]
            }

            fieldValue := v.Field(i)
            switch ruleName {
            case MinRule:
                if fieldValue.Kind() == reflect.String {
                    minValue := parseInt(ruleValue)
                    validateMinStringLength(fieldValue.String(), minValue, field.Name, &errors)
                }
                if fieldValue.Kind() == reflect.Int {
                    minValue := parseInt(ruleValue)
                    validateMinIntValue(int(fieldValue.Int()), minValue, field.Name, &errors)
                }
            case MaxRule:
                if fieldValue.Kind() == reflect.String {
                    maxValue := parseInt(ruleValue)
                    validateMaxStringLength(fieldValue.String(), maxValue, field.Name, &errors)
                }
                if fieldValue.Kind() == reflect.Int {
                    maxValue := parseInt(ruleValue)
                    validateMaxIntValue(int(fieldValue.Int()), maxValue, field.Name, &errors)
                }
            case RequiredRule:
                if fieldValue.Kind() == reflect.String {
                    validateRequired(fieldValue.String(), field.Name, &errors)
                }
                if fieldValue.Kind() == reflect.Int {
                    validateRequired(fmt.Sprintf("%d", fieldValue.Int()), field.Name, &errors)
                }
            default:
                return []error{fmt.Errorf("unknown validation rule: %s", ruleName)}
            }
        }
    }

    if len(errors) > 0 {
        return errors
    }

    return nil
}
```

Vamos decompor esta função:

1. Ela começa verificando se o argumento é uma struct
2. Percorre todos os campos da struct
3. Para cada campo, procura pela tag `validate`
4. Divide as regras por vírgula e processa cada uma
5. Para cada regra:
   - Divide em nome e valor (se existir, como em `min=3`)
   - Obtém o valor do campo atual
   - Aplica a regra de validação apropriada com base no tipo do campo e no nome da regra
   - Acumula erros em uma lista

## Funções Auxiliares de Validação

Para cada tipo de validação, implementamos funções específicas:

```go
func validateMinStringLength(s string, min int, fieldName string, errors *[]error) {
    if len(s) < min {
        *errors = append(*errors, fmt.Errorf("string length must be at least %d for field %s", min, fieldName))
    }
}

func validateMaxStringLength(s string, max int, fieldName string, errors *[]error) {
    if len(s) > max {
        *errors = append(*errors, fmt.Errorf("string length must be at most %d for field %s", max, fieldName))
    }
}

func validateMinIntValue(i int, min int, fieldName string, errors *[]error) {
    if i < min {
        *errors = append(*errors, fmt.Errorf("integer value must be at least %d for field %s", min, fieldName))
    }
}

func validateMaxIntValue(i int, max int, fieldName string, errors *[]error) {
    if i > max {
        *errors = append(*errors, fmt.Errorf("integer value must be at most %d for field %s", max, fieldName))
    }
}

func validateRequired(s string, fieldName string, errors *[]error) {
    if s == "" {
        *errors = append(*errors, fmt.Errorf("field %s is required", fieldName))
    }
}

func parseInt(s string) int {
    i, err := strconv.Atoi(s)
    if err != nil {
        return 0
    }
    return i
}
```

Estas funções auxiliares facilitam a validação específica de cada tipo de regra e mantêm o código principal mais limpo e modular.

## O Sistema em Ação

Vejamos como o sistema funciona na prática:

```go
func main() {
    examples := []ExampleStruct{
        {ExampleField: "abc", ExampleInt: 5},               // Válido
        {ExampleField: "ab", ExampleInt: 5},                // ExampleField muito curto
        {ExampleField: "abcdefghijklmno", ExampleInt: 5},   // ExampleField muito longo
        {ExampleField: "abc", ExampleInt: 101},             // ExampleInt muito grande
        {ExampleField: "", ExampleInt: 5},                  // ExampleField vazio
        {ExampleField: "abc", ExampleInt: 0},               // ExampleInt muito pequeno
    }

    for _, example := range examples {
        printRules(example)
        err := validateStruct(example)
        if err != nil {
            fmt.Printf("Validation failed for %v: %v\n", example, err)
        } else {
            fmt.Printf("Validation succeeded for %v\n", example)
        }
    }
}
```

O código testa várias combinações de valores para verificar se a validação está funcionando corretamente.

## Vantagens e Considerações sobre Struct Tags

### Vantagens
1. **Declaratividade**: As regras são declaradas diretamente junto aos dados
2. **Centralização**: Toda a validação fica contida no modelo de dados
3. **Legibilidade**: Facilita entender quais são os requisitos de cada campo
4. **Extensibilidade**: Fácil adicionar novas regras ou tipos de validação

### Considerações
1. **Performance**: Reflection tem um custo de performance maior que operações diretas
2. **Segurança de tipos**: Como reflection é feito em tempo de execução, erros de tipo só são detectados durante a execução
3. **Complexidade**: Sistemas muito complexos podem tornar as tags difíceis de ler e manter

## Padrões Avançados com Struct Tags

### Composição de Tags

É possível usar múltiplas chaves de tag para diferentes propósitos:

```go
type Product struct {
    ID    int     `json:"id" db:"product_id" validate:"required"`
    Name  string  `json:"name" db:"product_name" validate:"required,min=2"`
    Price float64 `json:"price" db:"price" validate:"required,min=0.01"`
}
```

As struct tags em Go são uma ferramenta poderosa que combinam a simplicidade declarativa com a flexibilidade da programação reflexiva. Embora tenham um pequeno custo de performance devido ao uso de reflection, elas oferecem uma forma elegante e concisa de adicionar metadados às suas estruturas.

A implementação do sistema de validação que analisamos demonstra como as struct tags podem ser usadas para criar frameworks declarativos que simplificam tarefas complexas. Este padrão é amplamente utilizado em muitos pacotes populares do ecossistema Go, como:

- `encoding/json` para serialização JSON
- `database/sql` e ORMs como GORM para mapeamento de banco de dados
- Frameworks web como Gin e Echo para binding e validação

À medida que você avança em sua jornada com Go, explorar e compreender o potencial das struct tags permitirá que você crie APIs mais elegantes e poderosas para seus próprios pacotes e bibliotecas.

## Autores:

- [Lojhan](https://github.com/Lojhan)