const Discord = require('discord.js');
const botconfig = require("../../botconfig.json");
module.exports.run = async (bot, message) => {
    let owner = new Discord.RichEmbed()
    .setTitle("Owner COMMANDS")
    .setDescription(`${bot.user.username} Dev Comamnds`)  
    .setColor("BLUE")
    .setThumbnail("https://i.imgur.com/6JsuVCH.png")
    bot.commands.filter(cmd => cmd.command.category === "OWNER").map(cmd => owner.addField(cmd.command.name , `**${cmd.command.description}**`))
    message.channel.send(owner)

    let fun = new Discord.RichEmbed()
    .setTitle("Fun COMMANDS")
    .setDescription(`${bot.user.username} Fun Commands`)
    .setColor("BLUE")
    .setThumbnail("https://i.imgur.com/vjQ7RUU.png")
    bot.commands.filter(cmd => cmd.command.category === "FUN").map(cmd => fun.addField(cmd.command.name , `**${cmd.command.description}**`))
    message.channel.send(fun)

    let guild = new Discord.RichEmbed()
    .setTitle("Guild COMMANDS")
    .setDescription(`${bot.user.username} Guild Commands`)  
    .setColor("BLUE")
    .setThumbnail("https://i.imgur.com/SuDr9pf.png")
    bot.commands.filter(cmd => cmd.command.category === "GUILD").map(cmd => guild.addField(cmd.command.name , `**${cmd.command.description}**`))
    message.channel.send(guild)

    let misc = new Discord.RichEmbed()
    .setTitle("Misc COMMANDS")
    .setDescription(`${bot.user.username} Misc Commands`) 
    .setColor("BLUE")
    .setThumbnail("https://i.imgur.com/8ObZIQl.png")
    bot.commands.filter(cmd => cmd.command.category === "MISC").map(cmd => misc.addField(cmd.command.name , `**${cmd.command.description}**`))
    message.channel.send(misc)
  



};
module.exports.command = {
    name: 'help',
    permission: "none";
    description: `Gives Help Commands Of bot`,
    usage: `{botconfig.PREFIX}help`,
    category: "MISC",
    enabled: true
}; 

