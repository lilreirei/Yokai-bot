var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Get info about a role.",
    usage: "<rolename> (Case-sensitive)",
    aliases: ['role', 'ri'],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, suffix) {
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
        if (!suffix) return 'wrong usage';
        const role = msg.channel.guild.roles.find(o => o.name === `${suffix}`);
        if (!role) return bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xff0000,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `Couldn't find role, remember it's case-sensitive.`
            }
        }).catch(err => {
            error = JSON.parse(err.response);
            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: `Info about: ${role.name}`,
                    url: ``,
                    icon_url: ``
                },
                description: ``,
                thumbnail: {
                    url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
                },
                fields: [{
                        name: `ID`,
                        value: `${role.id}`,
                        inline: true
                    },
                    {
                        name: `Hoist`,
                        value: `${role.hoist}`,
                        inline: true
                    },
                    {
                        name: `Position`,
                        value: `${role.position}`,
                        inline: true
                    },
                    {
                        name: `Permissions`,
                        value: `${role.permissions.allow}`,
                        inline: true
                    }
                ],
                footer: {
                    text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`
                }
            }
        }).catch(err => {
            error = JSON.parse(err.response);
            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
    }
};