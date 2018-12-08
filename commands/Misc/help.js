const Discord = require('discord.js');
const Botconfig = require("../../botconfig.json");
module.exports.run = async (bot, message, args) => {

if(bot.commands.has(cmd => cmd.command.aliases))

    if(args[0] === "help") return message.channel.send(`Just do ${Botconfig.PREFIX}help instead.`);

 if(args[0]) {
     let command = args[0];
     if(bot.commands.has(command)) {
         command = bot.commands.get(command);
         let commandhelp = new Discord.RichEmbed()
         .setColor("PURPLE")
         .setAuthor(`${bot.user.username} ${command.command.name} help`)
         .setThumbnail(bot.user.displayAvatarURL)
         .setDescription(`**• Command Name:** ${command.command.name} \n \n **• Command Description:** ${command.command.description} \n \n **• Commamnd Permission:** ${command.command.permission} \n \n **• Command Usage:** ${command.command.usage}`)
         .setFooter(`Requested by ${message.author.username}`);
message.channel.send(commandhelp);
     }
 }

    if(args[0] == "owner") {

    let owner = new Discord.RichEmbed()
    .setTitle("Owner COMMANDS")
    .setDescription(`${bot.user.username} Dev Comamnds`)  
    .setColor("BLUE")
    .setThumbnail("https://i.imgur.com/6JsuVCH.png")
    .setFooter("This Can Be Only Used By Bot Onwers");
    bot.commands.filter(cmd => cmd.command.category === "OWNER").map(cmd => owner.addField(cmd.command.name, `**${cmd.command.description}**`));
    message.channel.send(owner);
}

else if (args[0] == "fun") {
    let fun = new Discord.RichEmbed()
    .setTitle("Fun COMMANDS")
    .setDescription(`${bot.user.username} Fun Commands`)
    .setColor("BLUE")
    .setThumbnail("https://i.imgur.com/vjQ7RUU.png");
    bot.commands.filter(cmd => cmd.command.category === "FUN").map(cmd => fun.addField(cmd.command.name , `**${cmd.command.description}**`));
    message.channel.send(fun);
}

else if (args[0] == "guild") {
    let guild = new Discord.RichEmbed()
    .setTitle("Guild COMMANDS")
    .setDescription(`${bot.user.username} Guild Commands`)  
    .setColor("BLUE")
    .setThumbnail("https://i.imgur.com/SuDr9pf.png");
    bot.commands.filter(cmd => cmd.command.category === "GUILD").map(cmd => guild.addField(cmd.command.name , `**${cmd.command.description}**`));
    message.channel.send(guild);
}

    else if (args[0] == "misc") {
    let misc = new Discord.RichEmbed()
    .setTitle("Misc COMMANDS")
    .setDescription(`${bot.user.username} Misc Commands`) 
    .setColor("BLUE")
    .setThumbnail("https://i.imgur.com/8ObZIQl.png");
    bot.commands.filter(cmd => cmd.command.category === "MISC").map(cmd => misc.addField(cmd.command.name , `**${cmd.command.description}**`));
    message.channel.send(misc);
}

if(!args[0]) {
    let helpMenu = new Discord.RichEmbed()
.setColor("#9370DB")
.setFooter(`Requested By ${message.author.username}`)
.setTitle(`${bot.user.username} Help Menu`)
.setDescription("Welcome to my help commands menu! The category for each command is displayed below.")
.addField("Owner Commands", `\`${Botconfig.PREFIX}help owner\``)
.addField("Fun Commands",`\`${Botconfig.PREFIX}help fun\``)
.addField("Misc Commands", `\`${Botconfig.PREFIX}help misc\``)
.addField("Economy Commands", `\`${Botconfig.PREFIX}help economy\``);
message.channel.send(helpMenu);
}

};


module.exports.command = {
    name: 'help',
	aliases: ["h"],
    permission: "none",
    description: `Gives Help Commands Of bot`,
    usage: "help",
    category: "MISC",
    enabled: true
}; 

