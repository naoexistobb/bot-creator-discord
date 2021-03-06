const mongoose = require('mongoose');
const c = require('colors');
const User = require('./models/User.js')
const Commands = require('./models/Commands.js')
const Discord = require('discord.js');
const Starter = new Discord.Client({ intents: 32767 })
const version = require('./package.json')
const db = require('quick.db')
const fs = require("fs");
let mongoDB;
let Client;
let Prefix;
let Canal;

class BotConstructor {

  /**
  * @param {const} [client] - sua const client.
  * @param {string} [token] - token do seu bot.
  */

    static async start(client, token) {
        if(!token) return console.log('Você não definiu um token ao fazer login.')
        if(!client) return console.log('Você não definiu o client ao fazer login!')

        Client = client;
        
        return client.login(token).then(() => { console.log(c.green(`Bot logado como `) + c.white(`${client.user.tag} ✅`)) })
    }

    static async login(token) {
        if(!token) return console.log(c.red('Você não definiu um token para fazer o login!'))

        if(!Client) {
            Starter.login(token).then(() => { console.log(c.green(`Bot logado como `) + c.white(`${Starter.user.tag} ✅`)) })
        } else {
            console.error(c.red('Você já está logado no seu bot!'))
        }

    }

    static async setOwner(owner) {
        if(!owner) return console.error(c.red('Você esqueceu de setar o dono do seu bot!'))

        return console.error('Ainda não está pronto')
    }

    static async setWelcome(guildID, channel, type, response) {
        if(Client) {
            if(!guildID) {
                Client.destroy()
                return console.error(c.red('Você esqueceu de colocar o ID do servidor. ') + c.white('[ setWelcome ]'))
            } else if(!channel) {
                Client.destroy()
                return console.error(c.red('Você não definiu o canal. ') + c.white('[ setWelcome ]'))
            } else if(!type) {
                Client.destroy()
                return console.error(c.red('Você precisa definir um tipo de mensagem!') + c.white('[ setWelcome ] | [ message ou embed]'))
            } else if(!response) {
                Client.destroy()
                return console.error(c.red('Você não definiu a mensagem. ') + c.white('[ setWelcome ]'))
            }

            Canal = channel

            Client.on('guildMemberAdd', (member) => {
                let canal = Client.channels.cache.get(Canal)
                canal.send(`🍥 | ${member} ` + `${response}`)
            })
        } else if(Starter) {
            if(!guildID) {
                Starter.destroy()
                return console.log(c.red('Você esqueceu de colocar o ID do servidor. ') + c.white('[ setWelcome ]'))
            } else if(!channel) {
                Starter.destroy()
                return console.log(c.red('Você não definiu o canal. ') + c.white('[ setWelcome ]'))
            } else if(!type) {
                Starter.destroy()
                return console.log(c.red('Você precisa definir um tipo de mensagem!') + c.white('[ setWelcome ] | [ message ou embed]'))
            } else if(!response) {
                Starter.destroy()
                return console.log(c.red('Você não definiu a mensagem. ') + c.white('[ setWelcome ]'))
            }

            Canal = channel

            Starter.on('guildMemberAdd', (member) => {
                let canal = Starter.channels.cache.get(Canal)
                canal.send(`${response}`)
            })
        } else {
            return console.log(c.red("Você não logou no seu bot ainda!"))
        }
    }

    static async createCommand(name, description, mode, response) {
        if(!name) return console.error('Você não para um nome para seu comando!')
        if(!description) return console.error('Você não definiu a descrição do comando!')
        if(!mode) return console.error('Você não definiu o tipo de comando, tipos: [ embed, message ]')
        if(!mode === 'embed' || !mode === 'message') return console.error(c.red("Você precisa definir um tipo válido! , [ embed, message ]"))

        if(!mongoDB == undefined) {
        const verificar = await Commands.findOne({ name: name })
        if(verificar) return;

        const Comando = new Commands({
            name: name,
            description: description,
            type: mode,
            response: response
        })

        return Comando.save().then(() => { console.log(c.green(`O Comando `) + c.grey(`${name} `) + c.green(`foi criado na sua database!`))})
        } else {
        const verificar = db.fetch(`${name}`)
        if(verificar) return;
        db.set(`${name}_name`, `${name}`)
        db.set(`${name}_type`, `${mode}`)
        db.set(`${name}_response`, `${response}`)
        db.set(`${name}_description`, `${description}`)

        return console.log(c.green(`O Comando `) + c.grey(`${name} `) + c.green(`foi criado!`))
        }
    }

    //console.log(c.yellow(`[ ${name} ] - COMANDO CARREGADO`))

    static async loadCommands(prefix) {
        if(Client) {
            Client.categories = fs.readdirSync("./src/commands/");
            ["Client"].forEach(handler => {
  require(`./handlers/${handler}`)(Client);
});

        } else if(Starter) {
            Starter.categories = fs.readdirSync("./src/commands/");
["Client"].forEach(handler => {
  require(`./handlers/${handler}`)(Starter);
});

        } else {
            return console.error("Você ainda não logou no seu bot!")
        }
    }

    static async version() {
        if(!version == '0.1.1') return console.log(c.white(`Você está usando uma versão desatualizada! `) + c.red(`para atualizar use: npm install discord-bot-creation@${version}`))

        return console.log(c.white(`Versão do package: `) + c.green(`${version}`))
    }

    static async setStatus(status) {
        if(!status) return console.error(c.red("Defina o status! [ setStatus ]"))

        
        if(Client) {
            setInterval(() => {
                Client.user.setPresence({ activities: [{ name: `${status} | ${Client.guilds.cache.size} servidores` }]})
              }, 10000)
        } else {
            setInterval(() => {
                Starter.user.setPresence({ activities: [{ name: `${status} | ${Starter.guilds.cache.size} servidores` }]})
              }, 10000)
        }
    }

    static async setURL(url) {
        if(!url) return console.error(c.red('Defina uma URL mongo!'))
        mongoDB = url;
        return mongoose.connect(url).then(function() {console.log(c.green(`[ MONGODB ] - CONECTADO A DATABASE.`))})
    }
}

module.exports = BotConstructor;