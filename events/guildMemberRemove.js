const Discord = require("discord.js");
const fs = require("fs");

module.exports = async (bot, member) => {

    let welcomeleave = JSON.parse(fs.readFileSync("./data/welcomeleave.json", "utf8"));
    let replies = [
        `😭 ${member} left us!!`,
        `Oh No! ${member} Left Us!!`,
        `Nooooooo, ${member} closed the door.`, 
        `Is this loss, ${member}?`
    ]
    //More comming soon 
    //have you got some good leave messages ? then join our server and let us know

    if (!welcomeleave[member.guild.id]) {
        return;
    }

    let math = [Math.floor((Math.random() * replies.length))];
    let embed = new Discord.RichEmbed()
    .setDescription(replies[math])
    .setTimestamp()
    .setColor("#2A5B5F")
    try {
        let wl = welcomeleave[member.guild.id].welcomeleave;
        let welcomechannel = bot.guilds.get(member.guild.id).channels.get(wl);
        welcomechannel.send(embed);
    } catch (e) {
        return;
    }

}