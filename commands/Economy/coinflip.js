const Discord = require("discord.js");
const eco = require("discord-economy");

module.exports.run = async (bot, message, args) => {

let flip = args[0];
let amount = args[1];

if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Pls specify the flip, either heads or tails!')
if (!amount) return message.reply('Specify the amount you want to gamble!')

var output = await eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('You have less coins than the amount you want to gamble!')
 
  var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
  message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)

};

module.exports.command = {
    name: 'coinflip',
    permission: "None",
    description: "Does Coinflip for money",
    usage: `coinfilp`,
    category: "ECONOMY",
    enabled: true
};