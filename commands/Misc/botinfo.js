const Discord = require("discord.js");

const {
    version
} = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const botconfig = require('../../botconfig.json');

module.exports.run = (bot, message, args) => {// eslint-disable-line no-unused-vars
          
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        
        const embedStats = new Discord.RichEmbed()
            .setAuthor(bot.user.username)
            .setTitle("***BOT Stats***")
            .setColor("RANDOM")
            .addField("Status-", `**${bot.user.presence.status}**`)
            .addField(`• Mem Usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, `**Shows Memory Usage of ${bot.user.username}**`, true)
            .addField(`• Uptime: ${duration}`,`**${bot.user.username} Uptime**`, true)
            .addField(`• Users: ${bot.users.size.toLocaleString()}`,`**${bot.user.username} Users**`, true)
            .addField(`• Servers: ${bot.guilds.size.toLocaleString()}`,`**${bot.user.username} Servers**`, true)
            .addField(`• Channels : ${bot.channels.size.toLocaleString()}`,`**${bot.user.username} Channels**`, true)
            .addField(`• Discord.js: ` + `v${version}`,`**${bot.user.username} Discord.js Version**`, true)
            .addField(`• Node: ${process.version}`,`**${bot.user.username} Node Version**`)
            .addField(`• CPU: ${os.cpus().map(i => `${i.model}`)[0]}`, `**Shows ${bot.user.username} CPU Usage**`, true)
            .addField(`• CPU usage: ${percent.toFixed(2)}%`, `**${bot.user.username} Cpu Usage**`, true)
            .addField(`• Arch:  \`${os.arch()}\``,"**Comupter Arch**", true)
            .addField(`• Platform: ${os.platform()}`,`**${bot.user.username} Platform**`, true)
        message.channel.send(embedStats)
    });
};



module.exports.command = {
    name: 'botinfo',
    permission: "none",
    description: `Show info about the bot`,
    usage: `${botconfig.PREFIX}botinfo`,
    category: "MISC",
    enabled: true
};
