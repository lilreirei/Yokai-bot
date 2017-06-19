var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

const RESPONSES = [
    ":apple:",
    ":pear:",
    ":tangerine:",
    ":lemon:",
    ":banana:",
    ":watermelon:",
    ":grapes:",
    ":strawberry:",
    ":cherries:",
    ":peach:",
    ":cookie:"
];

module.exports = {
    desc: "Spin the slot machine and see what you get",
    cooldown: 5,
    aliases: ['slot', 'slots', 'slotmachine'],
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
        let choice1 = ~~(Math.random() * RESPONSES.length);
        let choice2 = ~~(Math.random() * RESPONSES.length);
        let choice3 = ~~(Math.random() * RESPONSES.length);
        var delay = 2000;
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0x13a1c1,
                title: ``,
                description: `**${msg.author.username}** spinned and got...`
            }
        }).then(sentMsg => {
            setTimeout(() => {
                if (choice1 == choice2 && choice2 == choice3) {
                    bot.editMessage(sentMsg.channel.id, sentMsg.id, {
                        content: ``,
                        embed: {
                            color: 0x13c124,
                            title: `You spinned: ${RESPONSES[choice1]} | ${RESPONSES[choice2]} | ${RESPONSES[choice3]}`,
                            description: `You won! Here's a cookie :cookie:`
                        }
                    })
                } else if ((choice1 == choice2) || (choice1 == choice3) || (choice2 == choice3)) {
                    bot.editMessage(sentMsg.channel.id, sentMsg.id, {
                        content: ``,
                        embed: {
                            color: 0xff8605,
                            title: `You spinned: ${RESPONSES[choice1]} | ${RESPONSES[choice2]} | ${RESPONSES[choice3]}`,
                            description: `You almost got it!`
                        }
                    })
                } else {
                    bot.editMessage(sentMsg.channel.id, sentMsg.id, {
                        content: ``,
                        embed: {
                            color: 0xc11313,
                            title: `You spinned: ${RESPONSES[choice1]} | ${RESPONSES[choice2]} | ${RESPONSES[choice3]}`,
                            description: `It's not even close...`
                        }
                    })
                }
            }, delay);
        }).catch(err => {
            error = JSON.parse(err.response);
            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
    }
}