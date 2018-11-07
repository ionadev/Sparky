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
    let emoji = {
        red:  bot.emojis.find(e => e.name == "red"),
         green:  bot.emojis.find(e => e.name == "green"),
         yellow:  bot.emojis.find(e => e.name == "yellow"),
         purple:  bot.emojis.find(e => e.name == "purple"),
         cpu:  bot.emojis.find(e => e.name == "cpu"),
         ram:  bot.emojis.find(e => e.name == "ram"),
         servers:  bot.emojis.find(e => e.name == "servers"),
         nodejs:  bot.emojis.find(e => e.name == "nodejs"),
         arch:  bot.emojis.find(e => e.name == "arch"),
         chat:  bot.emojis.find(e => e.name == "chat"),
         discordjs: bot.emojis.find(e => e.name == "discordjs"),
         uptime: bot.emojis.find(e => e.name == "uptime"),
         users: bot.emojis.find(e => e.name == "users"),
         cpuusgae: bot.emojis.find(e =>e.name == "cpuusage"),
         platform: bot.emojis.find(e => e.name == "platform")
    };
 

    let botstatus;
   // let status;
    if(botconfig.status === "online") {
    
        botstatus = emoji.green;
    }
    else if(botconfig.status === "idle") {
        
        botstatus = emoji.yellow;
        }
        else if(botconfig.status === "dnd") {
           
            botstatus = emoji.red;
            }
            else {
                botstatus = emoji.green;
            }
    
            
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
            .addField("Status-", botstatus)
            .addField(emoji.ram + `• Mem Usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, `**Shows Memory Usage of ${bot.user.username}**`, true)
            .addField(emoji.uptime + `• Uptime: ${duration}`,`**${bot.user.username} Uptime**`, true)
            .addField(emoji.users + `• Users: ${bot.users.size.toLocaleString()}`,`**${bot.user.username} Users**`, true)
            .addField(emoji.servers + `• Servers: ${bot.guilds.size.toLocaleString()}`,`**${bot.user.username} Servers**`, true)
            .addField(emoji.chat + `• Channels : ${bot.channels.size.toLocaleString()}`,`**${bot.user.username} Channels**`, true)
            .addField(emoji.discordjs + `• Discord.js: ` + `v${version}`,`**${bot.user.username} Discord.js Version**`, true)
            .addField(emoji.nodejs + `• Node: ${process.version}`,`**${bot.user.username} Node Version**`)
            .addField(emoji.cpu + `• CPU: ${os.cpus().map(i => `${i.model}`)[0]}`, `**Shows ${bot.user.username} CPU Usage**`, true)
            .addField(emoji.cpuusgae + `• CPU usage: ${percent.toFixed(2)}%`, `**${bot.user.username} Cpu Usage**`, true)
            .addField(emoji.arch + `• Arch:  \`${os.arch()}\``,"**Comupter Arch**", true)
            .addField(emoji.platform + `• Platform: ${os.platform()}`,`**${bot.user.username} Platform**`, true)
        message.channel.send(embedStats)
    });
};



module.exports.command = {
    name: 'botinfo',
    permission: "none",
    description: `Show info about the bot`,
    usage: "botinfo",
    category: "MISC",
    enabled: true
};
