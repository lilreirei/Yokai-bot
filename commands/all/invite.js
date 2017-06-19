var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "The link to add me to a server.",
    aliases: ['oauth'],
    cooldown: 5,
    task(bot, msg, _, config) {
        /**
         * perm checks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         */
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (sendMessages === false) return;
        if (config.inviteLink) {
            bot.createMessage(msg.channel.id, `Use this to add me to a server: ${config.inviteLink}\nMake sure you are logged in`)
                .catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
        } else {
            bot.createMessage(msg.channel.id, 'No invite link defined')
                .catch(err => {
                    logger.error('\n' + err, 'ERROR')
                });
        }
    }
};