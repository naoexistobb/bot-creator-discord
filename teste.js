const bot = require('./index')

bot.loadCommands('!')

let type = 'embed' // ou message
bot.setWelcome('ID_SERVIDOR', 'ID_CANAL', type, 'Messagem de boas vindas.') //embed ou message

