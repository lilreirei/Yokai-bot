var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Unpins the message with the given message id.",
    usage: "<Message ID>",
    requiredPermission: 'manageMessages',
    task(bot, msg, suffix) {
        /**
         * perm checks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         * @param {boolean} manageMessages - Checks if the bots permissions has manageMessages
         */
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        const manageMessages = msg.channel.permissionsOf(bot.user.id).has('manageMessages');
        if (sendMessages === false) return;
        if (manageMessages === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`manageMessages\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (!suffix)
            return 'wrong usage'
        const idRegex = /^\d{17,18}$/.test(suffix);
        if (idRegex === false) return bot.createMessage(msg.channel.id, `❌ Invalid message id.`)
        bot.unpinMessage(msg.channel.id, suffix).then(sentMsg => {
            bot.createMessage(msg.channel.id, `:white_check_mark: Successfully unpinned the message`)
                .catch(err => {
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