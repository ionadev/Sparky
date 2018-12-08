const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");
module.exports = async(bot, message) => {


    var tkn = "bot.token,token".split(",");
    for (i=0;i<tkn.length;i++) {
        if (message.content.toLowerCase().includes(tkn[i])) {
   
          return;
        }
    }
	if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefixes = JSON.parse(fs.readFileSync("./data/prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
          prefixes: botconfig.PREFIX
        };
      }

    let prefix = prefixes[message.guild.id].prefixes;
   
    if (message.isMentioned(bot.user)) {
        message.reply(`The server prefix: \`${prefix}\``);
      }
    
let args = message.content.slice(prefix.length).trim().split(/ +/g);
let cmd = args.shift().toLowerCase();
let command;

if (bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
} else if (bot.aliases.has(cmd)) {
    command = bot.commands.get(bot.aliases.get(cmd));
}

    if (!message.content.startsWith(prefix)) return;

    if (command) {
    
        if (message.author.id !== botconfig.owner && !command.command.enabled) return message.channel.send(`${message.author.username} Sorry the command has been Disabled!!`);
    }
try {
    command.run(bot, message, args, prefix);

} catch (e) {
}

};