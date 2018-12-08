const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const chalk = require('chalk');
const botconfig = require('./botconfig.json');

const loadCommands = module.exports.loadCommands = (dir = "./commands/") => {
    fs.readdir(dir, (error, files) => {
        if (error) return console.log(error);

        files.forEach((file) => {
            if (fs.lstatSync(dir + file).isDirectory()) {
                loadCommands(dir + file + "/");
                return;
            }

            delete require.cache[require.resolve(`${dir}${file}`)];

            let props = require(`${dir}${file}`);

            bot.commands.set(props.command.name, props);

            if (props.command.aliases)  props.command.aliases.forEach(alias => {
                bot.aliases.set(alias, props.command.name);
            });
        });
    });
};
loadCommands();

    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
          const event = require(`./events/${file}`);
          let eventName = file.split(".")[0];
          bot.on(eventName, event.bind(null, bot));
        });
      });
  
function closeApp() {
console.log(chalk.red("Closing App"));

setTimeout(() => process.exit(), 2 * 1000);
}

process.on('SIGINT', () => {
closeApp();
});

process.on('SIGHUP', () => {
closeApp();
});

process.on('SIGTERM', () => {
closeApp();
});

bot.login(botconfig.token).catch(err => console.log(err));
