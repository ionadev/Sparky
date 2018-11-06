const Discord = require('discord.js');

module.exports.run = async (bot, message) => {

    let emojis = { 
        on: bot.emojis.find(e => e.name == "on"),
        off: bot.emojis.find(e => e.name == "off"),
    }


let helpembed = new Discord.RichEmbed()
.setColor("PURPLE")
.setTitle(`${bot.user.username}`)
.setDescription(`${bot.user.username} help commands`)
.addField(emojis.on + "*serverinfo*", `**Gives ${message.guild.name} info**`)
.addField(emojis.on + "*help*", `**Gives ${bot.user.username} commands**`)
.addField(emojis.on + "*ping*", `**Gives ${bot.user.username} response time**`)
.addField(emojis.on + "*botinfo*", `**Gives ${bot.user.username} info or stats**`) 
    message.channel.send(helpembed)



};
module.exports.command = {
    name: 'help',
    permission: "none",
   // aliases: ["h"],
    description: `Gives Help Commands Of bot`,
    usage: "help",
    category: "MISC",
    enabled: true
}; 

