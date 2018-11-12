const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
module.exports = async(bot, message) => {
    var tkn = "bot.token,token".split(",");
    for (i=0;i<tkn.length;i++) {
        if (message.content.toLowerCase().includes(tkn[i])) {
   
          return;
        }
    }
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let prefix = `${botconfig.PREFIX}`;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
if (!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(command.slice(prefix.length));
    commandfile ? commandfile.run(bot,message,args) : null;

}
