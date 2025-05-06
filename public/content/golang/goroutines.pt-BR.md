# Compreendendo Goroutines em Go

## O que são Goroutines?

As Goroutines são um dos recursos mais distintos de Go — threads de execução leves, gerenciadas pelo tempo de execução de Go, e não pelo sistema operacional. Elas são um bloco de construção fundamental para a programação concorrente em Go, permitindo que os desenvolvedores escrevam código concorrente de forma eficiente e direta.

## Goroutines vs. Threads Tradicionais

Ao contrário das threads tradicionais do SO, as Goroutines são extremamente leves:

- **Tamanho**: As Goroutines começam com uma pilha pequena (2 KB em versões recentes), que pode aumentar e diminuir conforme necessário. Threads tradicionais podem exigir de 1 a 2 MB de memória.
- **Criação**: Criar milhares de Goroutines é prático e eficiente, enquanto criar milhares de threads do SO esgotaria rapidamente os recursos do sistema.
- **Agendamento**: As Goroutines são gerenciadas pelo agendador de tempo de execução de Go, que multiplexa as Goroutines em threads do SO, em vez de depender do agendador do sistema operacional.

## Sintaxe Básica

Criar uma goroutine é incrivelmente simples - basta adicionar a palavra-chave `go` antes de uma chamada de função:

```go
func main() {
// Executa sayHello simultaneamente
go sayHello("world")

// Continua a execução imediatamente
fmt.Println("Hello from main")

// Sleep para dar tempo à goroutine para executar
time.Sleep(100 * time.Millisecond)
}

func sayHello(name string) {
fmt.Println("Hello,", name)
}
```

## Como as Goroutines Funcionam

Internamente, o tempo de execução do Go mantém:

1. Um **processador** (P) para cada CPU virtual
2. Uma **thread do SO** (M) para cada processador
3. Uma **fila de execução** de goroutines para cada processador
4. Uma **fila de execução global** para goroutines aguardando ser atribuído

O escalonador lida com a multiplexação de muitas goroutines em menos threads do SO, implementando algoritmos de roubo de trabalho para balancear cargas de forma eficiente.

## Comunicação entre Goroutines

As goroutines se comunicam por meio de canais, implementando a filosofia de Go de "Não se comunique compartilhando memória; em vez disso, compartilhe memória comunicando-se".

```go
func main() {
messages := make(chan string)

go func() {
messages <- "ping"
}()

msg := <-messages
fmt.Println(msg) // Saída: ping
}
```

## Sincronização

Para sincronização básica, Go fornece o pacote `sync`:

```go
func main() {
var wg sync.WaitGroup

for i := 0; i < 5; i++ {
wg.Add(1)
go func(id int) {
defer wg.Done()
fmt.Printf("Trabalhador %d concluído\n", id)
}(i)
}

// Aguardar a conclusão de todas as goroutines
wg.Wait()
fmt.Println("Todos os trabalhadores concluídos")
}
```

## Padrões comuns e práticas recomendadas

### Pools de trabalhadores

```go
func worker(id int, jobs <-chan int, results chan<- int) {
for j := range jobs {
fmt.Println("trabalhador", id, "processando tarefa", j)
time.Sleep(time.Second)
results <- j * 2
}
}

func main() {
jobs := make(chan int, 100)
results := make(chan int, 100)

// Iniciar 3 trabalhadores
para w := 1; w <= 3; w++ {
go worker(w, jobs, results)
}

// Enviar 5 trabalhos
para j := 1; j <= 5; j++ {
jobs <- j
}
close(jobs)

// Coletar resultados
para a := 1; a <= 5; a++ {
<-results
}
}
```

### Limitando a Simultaneidade

```go
func main() {
urls := []string{/* lista de URLs */}
semáforo := make(chan struct{}, 10) // Limite de 10 solicitações simultâneas

for _, url := range urls {
semáforo <- struct{}{} // Adquirir token
go func(url string) {
defer func() { <-semáforo }() // Liberar token
// URL do Processo
}(url)
}
}
```

## Armadilhas Comuns

### Vazamentos de Goroutines

Goroutines que nunca são encerradas consomem recursos. Sempre garanta que as goroutines possam sair:

```go
func leak() {
ch := make(chan int)
go func() {
val := <-ch // Esta goroutine será bloqueada para sempre
fmt.Println("Recebido:", val)
}()
// Nenhum valor é enviado para o canal
}
```

### Capturando Variáveis ​​de Loop

```go
// Incorreto
for i := 0; i < 5; i++ {
go func() {
fmt.Println(i) // Provavelmente imprimirá "5" cinco vezes
}()
}

// Correto
for i := 0; i < 5; i++ {
go func(val int) {
fmt.Println(val) // Imprimirá 0, 1, 2, 3, 4 em ordem aleatória
}(i)
}
```

## Quando Usar Goroutines

Goroutines são ideais para:

- Operações com E/S (solicitações de rede, operações de arquivo)
- Operações com CPU que podem ser paralelizadas
- Servidor lidando com múltiplas conexões de clientes
- Tarefas em segundo plano, mantendo a responsividade da IU

## Exemplos do Mundo Real

### Servidor Web

```go
func main() {
http.HandleFunc("/", handler)
http.ListenAndServe(":8080", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
// Cada requisição é processada em sua própria goroutine
}
```

### Processamento de Dados Concorrente

```go
func processData(data []Item) []Result {
results := make([]Result, len(data))
var wg sync.WaitGroup

for i, item := range data {
wg.Add(1)
go func(i int, item Item) {
defer wg.Done()
results[i] = process(item)
}(i, item)
}

wg.Wait()
return results
}
```

As goroutines representam um dos recursos mais poderosos do Go, permitindo programação concorrente eficiente e relativamente fácil de raciocinar. Ao combinar goroutines com canais e o pacote sync, os desenvolvedores de Go podem criar aplicações altamente concorrentes sem muita da complexidade tradicionalmente associada à programação multithread.

A natureza leve das goroutines permite que programas Go sejam escalonados para milhares ou até milhões de operações simultâneas, tornando-as particularmente adequadas para aplicativos e serviços de rede modernos.
