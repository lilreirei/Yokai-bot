var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Get info about a discord invite.",
    usage: "<invite_code>",
    aliases: ['getinvite', 'inviteinfo'],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, args) {
        /**
         * perm checks
         * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         */
        const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (embedLinks === false) return bot.createMessage(msg.channel.id, `\\❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                try {
                    if (err.response === undefined) return logger.error('\n' + err, 'ERROR');
                    error = JSON.parse(err.response);
                    if (error.code === undefined) return logger.error('\n' + err, 'ERROR');
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                } catch (error) {
                    logger.error('\n' + err, 'ERROR');
                }
            });
        if (sendMessages === false) return;
        bot.getInvite(`${args}`, true)
            .then(res => {
                let invUsername;
                let invDiscrim;
                if (res.inviter === undefined) invUsername = 'n/a'
                if (res.inviter !== undefined) invUsername = res.inviter.username + '#';
                if (res.inviter === undefined) invDiscrim = '';
                if (res.inviter !== undefined) invDiscrim = res.inviter.discriminator;
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: ``,
                            url: ``,
                            icon_url: ``
                        },
                        description: ``,
                        fields: [{
                                name: `Invite`,
                                value: `discord.gg/${res.code}`,
                                inline: true
                            },
                            {
                                name: `Channel Name`,
                                value: `${res.channel.name}`,
                                inline: true
                            },
                            {
                                name: `Channel ID`,
                                value: `${res.channel.id}`,
                                inline: true
                            },
                            {
                                name: `Guild Name`,
                                value: `${res.guild.name}`,
                                inline: true
                            },
                            {
                                name: `Guild ID`,
                                value: `${res.guild.id}`,
                                inline: true
                            },
                            {
                                name: `Member Count`,
                                value: `${res.memberCount}`,
                                inline: true
                            },
                            {
                                name: `Inviter`,
                                value: `${invUsername}${invDiscrim}`,
                                inline: true
                            }
                        ]
                    }
                }).catch(err => {
                    try {
                        if (err.response === undefined) return logger.error('\n' + err, 'ERROR');
                        error = JSON.parse(err.response);
                        if (error.code === undefined) return logger.error('\n' + err, 'ERROR');
                        logger.error(error.code + '\n' + error.message, 'ERROR');
                    } catch (error) {
                        logger.error('\n' + err, 'ERROR');
                    }
                });
            })
            .catch(err => {
                try {
                    if (err.response === undefined) return logger.error('\n' + err, 'ERROR');
                    error = JSON.parse(err.response);
                    if (error.code === undefined) return logger.error('\n' + err, 'ERROR');
                    msg.channel.createMessage({
                        content: ``,
                        embed: {
                            color: 0xff0000,
                            author: {
                                name: `ERROR ${error.code}`,
                                url: ``,
                                icon_url: ``
                            },
                            description: `${error.message}`
                        }
                    }).catch(err => { logger.error('\n' + err, 'ERROR'); });
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                } catch (error) {
                    logger.error('\n' + err, 'ERROR');
                }
            });
    }
};