const request = require('request-promise'),
    hugs = require('../../hugs.json'),
    randomItem = require('random-item'),
    findMember = require('../../utils/utils.js').findMember;
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Hug someone.",
    usage: "<username | ID | @username>",
    aliases: ['hugs', 'huggel'],
    cooldown: 2,
    guildOnly: true,
    task(bot, msg, args) {
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
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        const user = findMember(msg, args);
        const gif = randomItem(hugs);
        if (!args) return 'wrong usage';
        if (!user) return bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xff0000,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
            }
        }).catch(err => {
            logger.error('\n' + err, 'ERROR')
        });
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `${user.username}, you got a hug from ${msg.author.username}`,
                image: {
                    url: `${gif}`
                }
            }
        }).catch(err => {
            error = JSON.parse(err.response);
            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
    }
}