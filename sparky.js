const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const chalk = require('chalk');
const botconfig = require('./botconfig.json');

//command handler
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
loadCommands();/*

function load(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) return console.log("Couldn't find commands.");

        jsfile.forEach((f, i) => {
            delete require.cache[require.resolve(`${dir}${f}`)];
            let props = require(`${dir}${f}`);
            console.log(`${f} loaded!`);
            bot.commands.set(props.command.name, props);
            if (props.command.aliases) props.command.aliases.forEach(alias => {
                bot.aliases.get(alias, props.command.name);
            });
        });
    });
}

load("./commands/Developers/");
load("./commands/Economy/");
load("./commands/Fun/");
load("./commands/Guild/");
load("./commands/Misc/");
load("./commands/Moderation/");
load("./commands/Queries/");
load("./commands/Support/");
*/

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