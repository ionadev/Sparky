const Discord = require("discord.js");
const weather = require("weather-js");

module.exports.run = async (bot, message, args) => {

let emojis = {
    wind: bot.emojis.find(e => e.name == "wind")
}

    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result){
        if (err) message.channel.send(err);
        if (result.length === 0) {

            message.channel.send(`${message.author.username} Please enter a valid place.`)
            return;


        }
        let current = result[0].current;
        let location = result[0].location;
        
        
const weatherEmbed = new Discord.RichEmbed ()
.setTitle(`The weather for ${current.observationpoint} | ⛅`)
.setDescription (`${current.skytext}`)
.setAuthor (`Weather Report From ${bot.user.username}`)
.setColor ("# 57ACDF")
.addField (`Timezone :**UTC ${location.timezone}**`, `**Timezone of ${location.name}**`)
.addField(`Degree Type: ${location.degreetype}`,`**Degree Type of ${location.name}**`)
.addField(`Temperature: ${current.temperature}`,`**Temperature of ${location.name}**`)  
.addField(`Feels like: ${current.feelslike}`,`**How Does it feel in ${location.name}**`)
.addField(emojis.wind + `Wind: ${current.winddisplay}`, `**Wind of ${location.name}**`)
.addField(`Humidity: ${current.humidity}`,`**Humidity of ${location.name}**`)

message.channel.send(weatherEmbed);
})
};

module.exports.command = {
    name: 'weather',
    permission: "NONE",
    description: "Gives Weather Information of your Location",
    usage: "weather",
    category: "QUERIES",
    enabled: true
};