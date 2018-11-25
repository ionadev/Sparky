const Discord = require("discord.js");
const eco = require("discord-economy");

module.exports.run = async (bot, message) => {

    let user = message.author;
let daily = await eco.Daily(user.id)

if(daily.updated) {
    let userprofile = await eco.AddToBalance(message.author.id, 100)
    message.reply(`${message.author.username} You have clamined your Daily!! And Your New Balance is ${userprofile.newbalance}`)
}
else {
    message.channel.send(`Sorry, you already claimed your daily coins!\nBut no worries, over ${daily.timetowait} you can daily again!`)
  };

};
module.exports.command = {
    name: 'daily',
    permission: "None",
    description: "Gives daily Coins To Users",
    usage: `daily`,
    category: "ECONOMY",
    enabled: true
};