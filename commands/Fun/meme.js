const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating...")

    let {body} = await superagent
    .get(`https://api-to.get-a.life/meme`)

    if(!{body}) return message.channel.send(`Try Again ${message.author.username}!!`)

    let memeembed = new Discord.RichEmbed()
    .setColor("#FF00FF")
    .setAuthor(`${message.guild.name} Meme`, message.guild.iconURL)
    .setImage(body.url)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)

    message.channel.send(memeembed)

    msg.delete();
}

module.exports.command = {
    name: 'meme',
    permission: "none",
    description:`Shows Some Memes`,
    usage: `meme`,
    category: "FUN",
    enabled: true
};