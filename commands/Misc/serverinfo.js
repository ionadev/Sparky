const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
let online = message.guild.members.filter(member => member.user.presence.status === 'online');
let idle = message.guild.members.filter(member => member.user.presence.status === 'idle');
let dnd = message.guild.members.filter(member => member.user.presence.status === 'dnd');
let offline = message.guild.members.filter(member => member.user.presence.status === 'offline');
let streaming = message.guild.members.filter(u => u.user.presence.game.streaming === true);
let emoji = {
    red:  bot.emojis.find(e => e.name == "red"),
     green:  bot.emojis.find(e => e.name == "green"),
     yellow:  bot.emojis.find(e => e.name == "yellow"),
     grey:  bot.emojis.find(e => e.name == "grey"),
     bot: bot.emojis.find(e => e.name == "bot"),
     owner: bot.emojis.find(e => e.name == "owner"),
     chat: bot.emojis.find(e => e.name == "chat"),
     humans: bot.emojis.find(e => e.name == "humans"),
     map: bot.emojis.find(e => e.name == "map"),
     role: bot.emojis.find(e => e.name == "role"),
	 purple: bot.emojis.find(e => e.name == "purple")
}
let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   

    .setAuthor(message.guild.name, sicon)
    .setFooter(`Server Created at `+ message.guild.createdAt)
    .setColor("GREEN")
    .setThumbnail(sicon)
    .addField(emoji.owner+" Owner", message.guild.owner.user.tag, true)
    .addField(emoji.map+" Region",message.guild.region, true)
    .addField(emoji.chat+" Channels :"+ message.guild.channels.size, "**ServerChannels**", true)
   .addField(emoji.humans+`Humans : ${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}`, "**Server Members**` ", true)
   .addField(emoji.bot+" Bots :"+ message.guild.members.filter(m => m.user.bot).size, "**Server Bots**", true)
   .addField(emoji.green+" Online :"+ online.size, "**Online Members**", true)
   .addField(emoji.yellow+" Idle :"+ idle.size, "**Idle Members**", true)
   .addField(emoji.red+" Dnd :"+ dnd.size, "**Dnd Members**", true)
   .addField(emoji.grey+" Offline :"+ offline.size, "**Offline Members**", true)
   .addField(emoji.purple+"Streaming :"+ streaming.size, "**Streaming Members**", true)
   .addField(emoji.role+" Roles :"+ message.guild.roles.size, "**Roles In The Server**", true);
   message.channel.send(serverembed);
}

module.exports.command = {
    name: 'serverinfo',
    permission: "none",
    description: "Show info about the serverinfo",
    usage: "serverinfo",
    enabled: true
};