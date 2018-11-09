const Discord = require("discord.js");
const fs = require('fs');

module.exports = async (bot, member) => {
    let welcomeleave = JSON.parse(fs.readFileSync("./data/welcomeleave.json", "utf8"));
 
    let replies = [
    
        `${member} just joined the server - glhf!`,
        `${member} just joined. Everyone, look busy!`,
        `${member} just joined. Can I get a heal?`,
        `${member} joined your party.`,
        `${member} joined. You must construct additional pylons.`,
        `Ermagherd. ${member} is here.`,
        `Welcome, ${member}. Stay awhile and listen.`,
        `Welcome, ${member}. We were expecting you ( ͡° ͜ʖ ͡°)`,
        `Welcome, ${member}. We hope you brought pizza.`,
        `Welcome, ${member}. Leave your weapons by the door.`,
        `A wild ${member} appeared.`,
        `Swoooosh. ${member} just landed.`,
        `Brace yourselves. ${member} just joined the server.`,
        `${member} just joined. Hide your bananas.`,
        `${member} just arrived. Seems OP - please nerf.`,
        `${member} just slid into the server.`,
        `A ${member} has spawned in the server.`,
        `Big ${member} showed up!`,
        `Where’s ${member}? In the server!`,
        `${member} hopped into the server. Kangaroo!!`,
        `${member} just showed up. Hold my beer.`,
        `Challenger approaching - ${member} has appeared!`,
        `It's a bird! It's a plane! Nevermind, it's just ${member}.`,
        `It's ${member}! Praise the sun! \\\\[T]/`,
        `Never gonna give ${member} up. Never gonna let ${member} down.`,
        `Ha! ${member} has joined! You activated my trap card!`,
        `Cheers, love! ${member}'s here!`,
        `Hey! Listen! ${member} has joined!`,
        `We've been expecting you ${member}`,
        `It's dangerous to go alone, take ${member}!`,
        `Cheers, love! ${member} has joined the server! It's super effective!`,
        `${member} is here!`,
        `${member} is here, as the prophecy foretold.`,
        `Ready player ${member}`,
        `${member} is here to kick butt and chew bubblegum. And ${member} is all out of gum.`,
        `Hello. Is it ${member}`,
        `Roses are red, violets are blue, ${member} joined this server with you`,
        `${member} has joined. Stay a while and listen!`
    ]
 
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