const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   var usermessage = args.slice(0).join(" ");

   let embed = new Discord.RichEmbed()
       .setColor("RANDOM")
       .setDescription(usermessage);
   message.delete().catch();
   message.channel.send(embed);
};

module.exports.command = {

};

module.exports.command = {
    name: 'say',
    permission: "none",
    description:`says the message you typed`,
    usage: `say`,
    category: "FUN",
    enabled: true
};