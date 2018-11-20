const Discord = require('discord.js');
const botconfig = require("../../botconfig.json");
module.exports.run = async (bot, message, args) => {


  if(![botconfig.owner].includes(message.author.id)) return;
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
  
 var argresult = args.join(' ');
        if (!argresult) {
          return message.channel.send("Please Specify a Code To Run!");
        }
  
        try {
  
          var evaled = eval(argresult);

          if (typeof evaled !== "string")
         evaled = require("util").inspect(evaled);
 

          let embed = new Discord.RichEmbed()
          .addField(`${bot.user.username} JavaScript Eval Success:`, `** **`)
          .addField(":inbox_tray: **INPUT**", "```js\n" + args.join(" ") + "```")
          .addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```")
          .setColor(0xFF5733)
          .setFooter(message.createdAt, message.author.avatarURL);
          message.channel.send({embed});

        } catch (err){
  
          message.channel.send(new Discord.RichEmbed()
          .addField(`${bot.user.username} - JavaScript Eval Error:`, "There Was a Problem With The Code That You Are Trying To Run!")
          .addField("Error", "```" + clean(err) + "```")
          .setColor(0xFF5733)
          .setFooter(message.createdAt, message.author.avatarURL))
          
              .catch( error => message.channel.send(`**ERROR:** ${error.message}`))
        }

};
//Exporting command
module.exports.command = {
    name: 'eval',
    permission: "ADMINISTRATOR",
    description: "To Compile Javascript Code ",
    usage: `eval //code`,
    category: "OWNER",
    enabled: true
};
