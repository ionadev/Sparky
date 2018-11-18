const Discord = require("discord.js");
const malScraper = require("mal-scraper");

module.exports.run = async (bot, message, args) => {
    
    const search = `${args}`;

    malScraper.getInfoFromName(search)
    .then((data) => {
        const animeEmbed = new Discord.RichEmbed()
        .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
      .setThumbnail(data.picture)
      .setColor('#ffc1cc') //I personally use bubblegum pink!
      .addField('English Title', data.englishTitle, true)
      .addField('Japanese Title', data.japaneseTitle, true)
      .addField('Type', data.type, true)
      .addField('Episodes', data.episodes, true)
      .addField('Rating', data.rating, true)
      .addField('Aired', data.aired, true)
      .addField('Score', data.score, true)
      .addField('Score Stats', data.scoreStats, true)
      .addField('Link', data.url);
      message.channel.send(animeEmbed);
    })

}


module.exports.command = {
    name: 'anime',
    permission: "none",
    description: "Search Your Anime ",
    usage: "anime",
    category: "FUN",
    enabled: true
};