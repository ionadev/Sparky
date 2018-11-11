const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
 module.exports.run = async (bot, message, args) => {

    let color;
    
    let pingstatus;
    if(bot.pings[0] >0 && bot.pings[0]<100) {
        color = "GREEN";
    }
    else if(bot.pings[0] >100 && bot.pings[0]<250) {
        color = "YELLOW";
    }
else {
    color = "RED";
}

    let pingembed = new Discord.RichEmbed()
.addField("Pong :",`**${bot.pings[0]}ms**`)
.setColor(color)
message.channel.send(pingembed)
}

 module.exports.command = {
    name: 'ping',
    permission: "none",
    description: `Response time of bot`,
    usage: `${botconfig.PREFIX}ping`,
    category: "MISC",
    enabled: true
};
