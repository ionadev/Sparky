const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const chalk = require('chalk');
let commandSize = 0;
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
            commandSize++;

            if (props.command.aliases) props.command.aliases.forEach(alias => {
                if (bot.commands.get(alias)) return console.log(`Conflict with alias: ${alias}`);
                bot.commands.set(alias, props)
            });
        });
    });
};
loadCommands();

// Message Event
bot.on("message", async message => {

//Made to not get the bot token while using eval command
    var tkn = "bot.token,token".split(",");
    for (i=0;i<tkn.length;i++) {
        if (message.content.toLowerCase().includes(tkn[i])) {
   
          return;
        }
    }
//end of the token
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let prefix = `${botconfig.PREFIX}`;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
if (!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

 
});

//End Of Message Event

bot.on('ready', () => { 
    setGame();
    getBotStats();
    console.log(chalk.blue(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds, ${bot.users.size} members, and ${commandSize} commands!`)); 
    console.log(chalk.green(`Sparky Version: ${botconfig.version}`));
    console.log(chalk.blue(`Sparky Developers:${botconfig.devs}`));
    console.log(chalk.green(`Sparky Prefix: ${botconfig.PREFIX}`));
}); 

function setGame() {
    const set = () => {
        bot.user.setActivity(`for ${botconfig.PREFIX}help ${bot.guild.size} Guilds and ${bot.users.size} Users`, {type:botconfig.stats}).catch(err => console.log(err));
    };
    set();
    setInterval(() => set(), 60 * 60000);
    bot.user.setStatus(`${botconfig.status}`).catch(console.error);
}

function getBotStats(status) {
    const stats = {
        guilds: bot.guilds.size,
        users: bot.users.filter(f => !f.bot).size,
        commands: commandSize,
        status: !status ? 'Online' : status
    };

    fs.writeFile('./botstats.json', JSON.stringify(stats, null, 2), null, err => {
        if (err) console.log(err)
    }); 
}


function closeApp() {
console.log(chalk.red("Closing App"));
getBotStats('Offline');

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
