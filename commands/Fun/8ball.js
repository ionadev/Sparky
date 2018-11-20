const Discord = require('discord.js');


    module.exports.run = (bot, message , args) => {

        if (args[1] === 0) return message.reply("Provide me a Question");

        let anwsers = [
            "No",
            "Yes",
            "Maybe",
            "Try again later"
        ];
    let results = anwsers[Math.floor(Math.random()*anwsers.length)];
let embed = new Discord.RichEmbed()
.setTitle(`${bot.user.username} 8 Ball`)
.setDescription(results)
.setTimestamp()
.setColor("PURPLE");
message.channel.send(embed)


};


module.exports.command = {
    name: '8ball',
    permission: "none",
    description: "Ask A Question",
    usage: "8ball",
    category: "FUN",
    enabled: true
};
