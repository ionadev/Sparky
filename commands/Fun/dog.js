const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating...")

    let {body} = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`)
    if(!{body}) return message.channel.send("I broke! Try again.")

        let dEmbed = new Discord.RichEmbed()
        .setColor("#FF00FF")
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)

        message.channel.send({embed: dEmbed})

        msg.delete();
}

module.exports.command = {
    name: 'dog',
    permission: "none",
    description:`Shows some dog pics`,
    usage: `dog`,
    category: "FUN",
    enabled: true
};