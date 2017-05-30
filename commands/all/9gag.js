var gagScraper = require('9gag-scraper')

module.exports = {
    desc: "Sends a random 9gag post.",
    usage: "<tags>",
    cooldown: 5,
    guildOnly: true,
    task(bot, msg) {
        new gagScraper().getRandom(function(error, data) {
            if (error) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${error}`,
                    fields: [{
                        name: `For support join:`,
                        value: `https://discord.gg/Vf4ne5b`,
                        inline: true
                    }]
                }
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${data.title}`,
                        url: `${data.url}`,
                        icon_url: ``
                    },
                    description: `${data.url}`,
                    image: {
                        url: `${data.image}`
                    }
                },
            });
        });
    }
};