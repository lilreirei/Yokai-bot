var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Prunes the given number of messages. If no number is given it's standard 50.",
    usage: "<number to prune>",
    aliases: ['purge', 'clear'],
    guildOnly: true,
    requiredPermission: 'manageMessages',
    task(bot, msg, suffix) {
        /**
         * perm checks
         * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
         * @param {boolean} manageMessages - Checks if the bots permissions has manageMessages
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         */
        const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
        const manageMessages = msg.channel.permissionsOf(bot.user.id).has('manageMessages');
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (manageMessages === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`manageMessages\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        if (!suffix) {
            var limit = 50 + 1; // +1 for the command message kek
        } else if (suffix) {
            var count = parseInt(suffix),
                msgTodelete = count + 1, // yea same here nugget
                limit = msgTodelete;
        }
        bot.purgeChannel(msg.channel.id, limit).then((del, sentMsg) => {
            const delmsg = del - 1 // Don't count the command message
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Deleted: ${delmsg} messages`,
                    footer: {
                        text: `This message will auto delete in 5 seconds`
                    }
                }
            }).then(sentMsg => {
                setTimeout(function() {
                    bot.deleteMessage(sentMsg.channel.id, sentMsg.id)
                        .catch(err => {
                            error = JSON.parse(err.response);
                            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                            logger.error(error.code + '\n' + error.message, 'ERROR');
                        });
                }, 5000);
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