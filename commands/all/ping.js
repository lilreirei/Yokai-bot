const RESPONSES = [
    "pong",
    "It's not like I wanted to say pong or anything b-baka!",
    "pong!",
    "what!?",
    "E-ehh pong?",
    "No..."
];
var Nf = new Intl.NumberFormat('en-US'),
    reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Responds with pong.",
    help: "Used to check if the bot is working.\nReplies with 'pong' and the response delay.",
    aliases: ['p'],
    cooldown: 2,
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
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        let choice = ~~(Math.random() * RESPONSES.length);
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: `${RESPONSES[choice]}`,
                    icon_url: ``
                },
                description: ``
            }
        }).then(sentMsg => {
            bot.editMessage(msg.channel.id, sentMsg.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${RESPONSES[choice]}`,
                        icon_url: ``
                    },
                    description: `Took me ${Nf.format(sentMsg.timestamp - msg.timestamp)}ms`
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        }).catch(err => {
            error = JSON.parse(err.response);
            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
    }
};