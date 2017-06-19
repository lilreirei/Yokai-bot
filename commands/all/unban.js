var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Unban a member by id.",
    usage: "<user_id> | <reason>",
    guildOnly: true,
    requiredPermission: 'banMembers',
    task(bot, msg, suffix) {
        /**
         * perm checks
         * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         * @param {boolean} banMembers - Checks if the bot permissions has banMembers
         */
        const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        const banMembers = msg.channel.permissionsOf(bot.user.id).has('banMembers');
        if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        if (banMembers === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`banMembers\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (!suffix) return 'wrong usage'
        const str = suffix + "";
        const array = str.split(/ ?\| ?/),
            userToBan = array[0],
            reason = array[1];
        const idRegex = /^\d{17,18}$/.test(userToBan);
        if (idRegex === false) return bot.createMessage(msg.channel.id, `❌ Invalid user id.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        bot.unbanGuildMember(msg.channel.guild.id, userToBan, reason)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xff0000,
                        author: {
                            name: `ERROR`,
                            url: ``,
                            icon_url: ``
                        },
                        description: `Code: ${error.code}\nMessage: ${error.message}`
                    }
                }).catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
            });
    }
}