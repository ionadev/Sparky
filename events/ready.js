const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const botconfig = require("../botconfig.json");
module.exports = async (bot, commandSize) => {
    
    
        setGame();
        getBotStats();
        console.log(chalk.blue(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds, ${bot.users.size} members, and ${commandSize} commands!`)); 
        console.log(chalk.green(`Sparky Version: ${botconfig.version}`));
        console.log(chalk.blue(`Sparky Developers:${botconfig.devs}`));
        console.log(chalk.green(`Sparky Prefix: ${botconfig.PREFIX}`));

    function setGame() {
        const set = () => {
            bot.user.setActivity(`for ${botconfig.PREFIX}help ${bot.guilds.size} Guilds and ${bot.users.size} Users`, {type:botconfig.stats}).catch(err => console.log(err));
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
    
        fs.writeFile('../botstats.json', JSON.stringify(stats, null, 2), null, err => {
            if (err) console.log(err)
        }); 
    }
    
}