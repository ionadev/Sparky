const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../../utils/errors.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args, main) => {
    // Check if author has permission
    if (!message.member.hasPermission(["ADMINISTRATOR"])) {
        errors.noPerms(message, "ADMINISTRATOR");
    } else {
        // Execute code
        let prefixes = JSON.parse(fs.readFileSync("./data/prefixes.json", "utf8"));
        prefixes[message.guild.id] = {
            prefixes: args[0]
        }

        fs.writeFile("./data/prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err);
        });

        let pEmbed = new Discord.RichEmbed()
            .setColor("CYAN")
            .setTitle("Success!")
            .setDescription(`Prefix is now set to ${args[0]}`);

        message.channel.send(pEmbed);
    }
}

module.exports.command = {
    name: 'setprefix',
    permission: "ADMINSTRATOR",
    description: "Sets Custom Prefix For The Server",
    usage: `${botconfig.PREFIX}setprefix`,
    category: "GUILD",
    enabled: true
};