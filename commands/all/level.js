const fs = require('fs');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Get your level and points.",
    aliases: ['lvl', 'points', 'profile', 'rank'],
    cooldown: 5,
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
        if (!args) {
            let points = JSON.parse(fs.readFileSync(`./db/points.json`, 'utf8'));
            if (!points) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Couldn't find your data.`
                }
            }).catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
            let userData = points[msg.author.id];
            if (!userData) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Oh it looks like you do not have any points yet, better start talking and stop lurking boii.`
                }
            }).catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Profile of ${msg.author.username}`,
                        url: ``,
                        icon_url: ``
                    },
                    description: ``,
                    fields: [{
                            name: `Level`,
                            value: `${userData.level}`,
                            inline: true
                        },
                        {
                            name: `Points`,
                            value: `${userData.points}`,
                            inline: true
                        }
                    ]
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        } else {
            const user = this.findMember(msg, args)
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
            // const userID = msg.channel.guild.members.get(user.id);
            let points = JSON.parse(fs.readFileSync(`./db/points.json`, 'utf8'));
            if (!points) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Couldn't find your data.`
                }
            }).catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
            let userData = points[user.id];
            if (!userData) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Oh it looks like you do not have any points yet, better start talking and stop lurking boii.`
                }
            }).catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Profile of ${user.username}`,
                        url: ``,
                        icon_url: ``
                    },
                    description: ``,
                    fields: [{
                            name: `Level`,
                            value: `${userData.level}`,
                            inline: true
                        },
                        {
                            name: `Points`,
                            value: `${userData.points}`,
                            inline: true
                        }
                    ]
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        }
    }
};