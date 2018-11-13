const Discord = require("discord.js");
const base64 = require("base-64");
const utf8 = require("utf8");
const botconfig = require("../../botconfig.json");
module.exports.run = async (bot, message, args) => {
    message.delete();
    let t = args.join(" ");
    if (!t) messag.reply("Please provide something to encode");
    let u = utf8.encode(t);
    let b = base64.encode(u);
    message.channel.send(b);
}

module.exports.command = {
    name: 'encode',
    permission: "none",
    description:"encodes the  message",
    usage: `${botconfig.PREFIX}encode`,
    category: "FUN",
    enabled: true
};
