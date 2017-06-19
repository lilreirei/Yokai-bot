const OwnerId = require('../../config.json').adminIds[0],
    moment = require('../../node_modules/moment');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Send feedback or suggestion directly to my owner's(${kurozero}#0569) DMs without having to join the support server.\nDo NOT use this for any useless trolls/memes!!",
    usage: "<feedback/suggestion>",
    aliases: ['feedback', 'report', 'bug'],
    cooldown: 3600,
    guildOnly: true,
    task(bot, msg, args) {
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
        if (!args) return 'wrong usage';
        bot.getDMChannel(OwnerId).then(dmchannel => {
            const time = Date.now();
            const owner = msg.channel.guild.members.get(msg.channel.guild.ownerID);
            const user = msg.author;
            dmchannel.createMessage({
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Report from: ${msg.member.user.username}#${msg.member.user.discriminator} (${msg.member.user.id})`,
                        icon_url: `${user.avatarURL}`
                    },
                    description: ``,
                    fields: [{
                            name: `Timestamp`,
                            value: `${moment(time).utc(+2).format('ddd MMM DD YYYY | kk:mm:ss')} UTC+2`,
                            inline: true
                        },
                        {
                            name: `Owner`,
                            value: `${owner.username}#${owner.discriminator} (${msg.channel.guild.ownerID})`,
                            inline: true
                        },
                        {
                            name: `Guild ID`,
                            value: `${msg.channel.guild.id}`,
                            inline: false
                        },
                        {
                            name: `Channel ID`,
                            value: `${msg.channel.id}`,
                            inline: false
                        },
                        {
                            name: `Report`,
                            value: `${args}`,
                            inline: false
                        }
                    ]
                }
            }).then(() => {
                bot.createMessage(msg.channel.id, `:white_check_mark: Successfully send your feedback/suggestion.`)
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
        }).catch(err => {
            error = JSON.parse(err.response);
            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
    }
};