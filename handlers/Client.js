const { readdirSync } = require('fs');
const c = require('colors');
const ascii = require('ascii-table');
let table = new ascii("Commands");
table.setHeading('Comandos', 'Status');

module.exports= (client) => {

    readdirSync('./src/commands').forEach(dir => {

        const comando = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of comando){

            let pull = require(`../src/commands/${dir}/${file}`);
            if(pull.name){
                client.comando.set(pull.name, pull);
                table.addRow(file, '✅')
            } else {
                table.addRow(file, '⛔')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    })
    
    console.log(table.toString());
    console.log(c.green('[ MANAGER ] - SCRIPTS CARREGADOS'))

}