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
    
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    let command;
    
    if (!message.content.startsWith(prefix)) return;

if (bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
 
} else if (bot.aliases.has(cmd)) {
    command = bot.commands.get(bot.aliases.get(cmd));

}
try {
    command.run(bot, message, args);

} catch (e) {
    return;
}
}