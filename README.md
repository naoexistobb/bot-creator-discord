# discord-bot-creation

Assim fica mais fácil a criação de bots pro discord.


```bash
npm install discord-bot-creation
yarn add discord-bot-creation (se você estiver usando yarn)
```

## Exemplo (com mongodb)

```js
const bot = require('discord-bot-creation')
const token = 'SEU_TOKEN_AQUI'
const url = 'SUA_URL_MONGODB'


bot.setURL(url)
//criação dos comandos
let name = 'test'
let resposta = '**exemplo:**\n\ndescrição'
let desc = 'descrição do comando'
let type = 'embed' // o type pode ser embed ou message
let prefix = '!' // seu prefixo
bot.createCommand(name, desc, type, resposta)
bot.loadCommands(prefix)

//depois de fazer tudo, é só da start e setar o status do seu bot!
bot.login(token)
bot.setStatus('seu status aqui.')
bot.setWelcome('SERVIDOR_ID', 'CANAL_ID', type, response)
```

## Exemplo (com quick.db)

```js
const bot = require('discord-bot-creation')
const token = 'SEU_TOKEN_AQUI' // [ NECESSÁRIO ]

//criação dos comandos
let name = 'test'
let response = '**exemplo:**\n\ndescrição'
let desc = 'descrição do comando'
let type = 'embed' // o type pode ser embed ou message
let prefix = '!' // seu prefixo
bot.createCommand(name, desc, type, response)
bot.loadCommands(prefix)

//depois de fazer tudo, é só da start e setar o status do seu bot!
bot.login(token)
bot.setStatus('seu status aqui.')
bot.setWelcome('SERVIDOR_ID', 'CANAL_ID', type, response)
```

# MÉTODOS:

### Criar comandos

```js
let name = 'test'
let desc = 'descrição'
let type = 'embed' // ou message
let response = '**Exemplo:**\n\ndescrição e etc...'
bot.createCommand(name, desc, type, response)
```
### Carregar comandos
```js
let prefix = '!'
bot.loadCommands(prefix)
```

### setar o status do bot
```js
let status = 'Sou apenas um bot para o discord!'
bot.setStatus(status)
```

### Fazer login
```js
bot.login(token)
```

### Setar canal de entrada
```js
let response = '**exemplo:**\n\ndescrição'
let type = 'embed' // o type pode ser embed ou message
bot.setWelcome('SERVIDOR_ID', 'CANAL_ID', type, response)```
```

### Comandos já incluídos

```js
say - digite algo no chat!
help - veja os comandos
```
mais pra frente eu adiciono mais comandos

### Servidor de suporte

https://discord.gg/QNtwYrzrVB



## Notas:

Em breve vou adicionar mais funções, fiquem ligados!
# um pequeno passo para o homen, um grande passo para o programador!