/**
 * (testing for gulp-doxx thingy)
 * @param {string} gagScraper - requiring the 9gag-scraper module
 */
var gagScraper = require('9gag-scraper'),
    reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Sends a random 9gag post.",
    usage: "<tags>",
    cooldown: 5,
    guildOnly: true,
    task(bot, msg) {
        /**
         * perm checks
         * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         */
        const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        new gagScraper().getRandom((error, data) => {
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
            }).catch(err => {
                error = JSON.parse(err.response);
                logger.error(error.code + '\n' + error.message, 'ERROR');
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
            }).catch(err => {
                error = JSON.parse(err.response);
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        });
    }
};