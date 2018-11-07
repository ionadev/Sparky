const Discord = require('discord.js');


    module.exports.run = (bot, message , args) => {
        let anwsers = ["Yes", 
                       "No", 
                       "I don't know", 
                       "Ask again later!", 
                       "Cyka", 
                       "I am not sure!", 
                       "Pls No", 
                       "You tell me", 
                       "Without a doubt", 
                       "Cannot predict now", 
                       "Without a doubt"];

    let results = anwsers[Math.floor(Math.random()*anwsers.length)]
let embed = new Discord.RichEmbed()
.setTitle(`${bot.user.username} 8 Ball`)
.setDescription(results)
.setTimestamp()
.setColor("PURPLE")
message.channel.send(embed);


}


module.exports.command = {
    name: '8ball',
    permission: "none",
    description: "Ask A Question",
    usage: "8ball",
    category: "FUN",
    enabled: true
};
