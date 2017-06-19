var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp),
    findMember = require('../../utils/utils.js').findMember;

module.exports = {
    desc: "Softban the mentioned member.",
    usage: "<username/ID/@username> | <reason>",
    guildOnly: true,
    requiredPermission: 'banMembers',
    task(bot, msg, args) {
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
        if (!args) return 'wrong usage';
        const str = args + "";
        const array = str.split(/ ?\| ?/),
            userToBan = array[0];
        let reason = array[1];
        if (!reason)
            reason = 'Responsible moderator did not provide a reason.';
        const user = findMember(msg, userToBan);
        const deletedays = 7;
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
        })
        bot.banGuildMember(msg.channel.guild.id, user.id, deletedays, reason)
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
        bot.unbanGuildMember(msg.channel.guild.id, user.id, 'Automatically unbanned because of sofban.')
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