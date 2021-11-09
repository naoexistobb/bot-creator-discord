const bot = require('./index')
const token = 'SEU_TOKEN_AQUI'

let desc = `**Titulo:**\nDescrição\\n\nFooter`
bot.createCommand('teste', 'descrião do comando', 'embed', desc)
bot.login(token) //bot.start(client, token) [ OPCIONAL ]
bot.setStatus('Apenas um bot de teste')
bot.loadCommands('!')

let type = 'embed' // ou message
bot.setWelcome('ID_SERVIDOR', 'ID_CANAL', type, 'Messagem de boas vindas.') //embed ou message

