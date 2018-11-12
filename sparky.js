const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const chalk = require('chalk');
let commandSize = 0;
const botconfig = require('./botconfig.json');
//Sqlite3
const sql = require("sqlite3");
const db = new sql.Database("bot.sqlite");
console.log("Initialized database connection.");

//Tables
const tables = {
	welcomer: [
		"welcomemsg TEXT NOT NULL",
		"channel TEXT NOT NULL",
		"guild TEXT NOT NULL"
    ]
};

//Initialize DB
for(let table in tables) {
	db.run(`CREATE TABLE ${table} (${tables[table].join(", ")})`, () => {
		console.log(`Initialized table "${table}".`);
	});
};

bot.db = db;

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
            commandSize++;

            if (props.command.aliases) props.command.aliases.forEach(alias => {
                if (bot.commands.get(alias)) return console.log(`Conflict with alias: ${alias}`);
                bot.commands.set(alias, props)
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

// attach botconfig to client
bot.botconfig = botconfig;

//login with meeaagikk
bot.login(botconfig.token).catch(err => console.log(err));
