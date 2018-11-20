const Discord = require('discord.js');
 module.exports.run = async (bot, message) => {
    let emojis = {
        rednetwork: bot.emojis.find(e => e.name === "rednetwork"),
        yellownetwork: bot.emojis.find(e => e.name === "yellownetwork"),
        greennetwork: bot.emojis.find(e => e.name === "greennetwork"),
    };
    let color;
    
    let pingstatus;
    if(bot.pings[0] >0 && bot.pings[0]<100) {
    pingstatus = emojis.greennetwork;
        color = "GREEN";
    }
    else if(bot.pings[0] >100 && bot.pings[0]<250) {
        pingstatus = emojis.yellownetwork;
        color = "YELLOW";
    }
else {
    pingstatus = emojis.rednetwork;
    color = "RED";
}

    let pingembed = new Discord.RichEmbed()
.addField(pingstatus + "Pong :",`**${bot.pings[0]}ms**`)
.setColor(color);
message.channel.send(pingembed)
};

 module.exports.command = {
    name: 'ping',
    permission: "none",
    description: `Response time of bot`,
    usage: "ping",
    category: "MISC",
    enabled: true
};
