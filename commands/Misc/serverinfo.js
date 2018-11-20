const Discord = require('discord.js');
module.exports.run = async (bot, message) => {
let online = message.guild.members.filter(member => member.user.presence.status === 'online');
let idle = message.guild.members.filter(member => member.user.presence.status === 'idle');
let dnd = message.guild.members.filter(member => member.user.presence.status === 'dnd');
let offline = message.guild.members.filter(member => member.user.presence.status === 'offline');
let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   

    .setAuthor(message.guild.name, sicon)
    .setFooter(`Server Created at `+ message.guild.createdAt)
    .setColor("GREEN")
    .setThumbnail(sicon)
    .addField(" Owner", message.guild.owner.user.tag, true)
    .addField(" Region",message.guild.region, true)
    .addField(" Channels :"+ message.guild.channels.size, "**ServerChannels**", true)
   .addField(`Humans : ${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}`, "**Server Members**` ", true)
   .addField(" Bots :"+ message.guild.members.filter(m => m.user.bot).size, "**Server Bots**", true)
   .addField(" Online :"+ online.size, "**Online Members**", true)
   .addField(" Idle :"+ idle.size, "**Idle Members**", true)
   .addField(" Dnd :"+ dnd.size, "**Dnd Members**", true)
   .addField(" Offline :"+ offline.size, "**Offline Members**", true)
   .addField(" Roles :"+ message.guild.roles.size, "**Roles In The Server**", true);
   message.channel.send(serverembed);
};

module.exports.command = {
    name: 'serverinfo',
    permission: "none",
    description: "Show info about the serverinfo",
    usage: "serverinfo",
    category:"MISC",
    enabled: true
};
