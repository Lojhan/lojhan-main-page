# Contribuindo para a Documentação

Obrigado pelo seu interesse em contribuir para nossa documentação! Este guia irá ajudá-lo a entender como adicionar ou modificar conteúdo de forma eficaz.

## Estrutura do Conteúdo

Nossa documentação é bilíngue, com conteúdo disponível em inglês (en-US) e português (pt-BR). O conteúdo está organizado da seguinte forma:

```map
public/content/
├── en-US/     # Conteúdo em inglês
│   ├── README.md
│   ├── golang/
│   │   ├── README.md
│   │   ├── struct_tags.md
│   │   └── ...
│   └── dotnet/
│       └── ...
└── pt-BR/     # Conteúdo em português
    ├── README.md
    ├── golang/
    │   ├── README.md
    │   ├── struct_tags.md
    │   └── ...
    └── dotnet/
        └── ...
```

## Diretrizes para Contribuição

### Princípios Gerais

1. **Conteúdo Bilíngue** - Todo o conteúdo deve estar disponível em inglês e português
2. **Precisão Técnica** - Garanta que todas as informações técnicas estejam corretas e atualizadas
3. **Exemplos Claros** - Inclua exemplos práticos de código quando apropriado
4. **Estilo Consistente** - Siga as diretrizes estabelecidas de estilo e formatação

### Adicionando Novo Conteúdo

Ao adicionar novo conteúdo, por favor siga estas etapas:

1. **Crie versões em ambos os idiomas** - O conteúdo deve ser adicionado nos diretórios `/en-US/` e `/pt-BR/`
2. **Mantenha a estrutura paralela** - Mantenha os mesmos caminhos e nomes de arquivos em ambas as versões de idioma
3. **Inclua metadados apropriados** - Adicione cabeçalhos e metadados adequados em ambas as versões
4. **Vincule corretamente** - Garanta que todos os links internos funcionem em ambas as versões de idioma

### Diretrizes de Formatação

- Use Markdown para toda a documentação
- Inclua um título claro no topo de cada documento
- Use a hierarquia adequada de cabeçalhos (# para título, ## para seções principais, etc.)
- Formate exemplos de código com realce de sintaxe adequado:
  ```go
  // Exemplo de código Go
  func exemplo() string {
      return "Este é um exemplo"
  }
  ```

## Processo de Pull Request

### Antes de Criar um PR

1. **Verifique o conteúdo existente** - Garanta que sua contribuição não duplique material existente
2. **Teste localmente** - Certifique-se de que suas alterações sejam renderizadas corretamente no site

### Criando um Pull Request

1. Faça um fork do repositório
2. Crie um novo branch para suas alterações
3. Faça suas alterações em ambas as versões de idioma
4. Faça commit das suas alterações com mensagens claras e descritivas
5. Envie suas alterações para o seu fork
6. Envie um pull request para o repositório principal

### Descrição do PR

Ao enviar um pull request, por favor inclua:

- Uma descrição clara do que seu PR adiciona ou altera
- Confirmação de que você adicionou o conteúdo em ambos os idiomas
- Qualquer contexto adicional que ajudaria os revisores

### Processo de Revisão

Depois de enviar seu PR:

1. Os mantenedores irão revisar suas alterações
2. Você pode receber feedback solicitando alterações
3. Uma vez aprovado, seu conteúdo será mesclado na documentação principal

## Diretrizes de Tradução

Ao criar conteúdo em ambos os idiomas:

- Não use simplesmente tradução automática
- Adapte exemplos e explicações para serem culturalmente apropriados
- Mantenha a mesma precisão técnica em ambas as versões
- Se você é fluente apenas em um idioma, pode enviar nesse idioma e solicitar ajuda com a tradução

Obrigado por contribuir para tornar nossa documentação melhor para todos!

## Autores:

- [Lojhan](https://github.com/Lojhan)