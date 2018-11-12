const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../../utils/errors.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission(["ADMINISTRATOR"])) {
        errors.noPerms(message, "ADMINISTRATOR");
    } else {
        if (!message.mentions.channels.first()) {
            message.channel.send("You need to provide either a channel mention/tag, or a channel ID");
        }
        
        let toSet = message.mentions.channels.first().id;
        let toSetNAME = message.mentions.channels.first().name;
        let welcomeleave = JSON.parse(fs.readFileSync("./data/welcomeleave.json", "utf8"));

        if (!toSet || !toSetNAME) {
            message.channel.send("You need to provide either a channel mention/tag, or a channel ID");
        }

        welcomeleave[message.guild.id] = {
            welcomeleave: toSet
        }

        fs.writeFile("./data/welcomeleave.json", JSON.stringify(welcomeleave), (err) => {
            if (err) console.log(err);
        });

        let wlEmbed = new Discord.RichEmbed()
            .setColor("#2A5B5F")
            .setTitle("Succes!")
            .setDescription(`Welcome-leave is now set to ${toSetNAME} with channel ID ${toSet} `);

        message.channel.send(wlEmbed);
    }
}

/*con.run(`INSERT INTO welcomer (welcomemsg,channel,guild) VALUES (?, ?, ?, ?, ?)`, text , channel, message.guild.id, (err) => {
		if(err) throw err;
		message.channel.send("User warned.");
	})
}*/
module.exports.command = {
    name: 'setwelcome',
    permission: "ADMINSTRATOR",
    description: "Sets Welcome Channel For Your Server",
    usage: `${botconfig.PREFIX}setchannel`,
    category: "GUILD",
    enabled: true
};
