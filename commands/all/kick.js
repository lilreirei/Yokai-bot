const findMember = require('../../utils/utils.js').findMember;
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Kick the mentioned member.",
    usage: "<username/ID/@username> | <reason>",
    guildOnly: true,
    requiredPermission: 'kickMembers',
    task(bot, msg, args) {
        /**
         * perm checks
         * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         * @param {boolean} kickMembers - Checks if the bots permissions has kickMembers
         */
        const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        const kickMembers = msg.channel.permissionsOf(bot.user.id).has('kickMembers');
        if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        if (kickMembers === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`kickMembers\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (!args) return 'wrong usage';
        const str = args + "";
        const array = str.split(/ ?\| ?/),
            userToKick = array[0],
            reason = array[1];
        const user = findMember(msg, userToKick);
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
        bot.kickGuildMember(msg.channel.guild.id, user.id, reason)
            .catch(err => {
                error = JSON.parse(err.response);
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
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            });
    }
};