const urban = require('relevant-urban');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Search for a definition on urban dictionary.",
    usage: "<word> (or nothing for random)",
    aliases: [],
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
        if (!suffix) return urban.random().then(def => {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    type: `rich`,
                    author: {
                        name: `${def.word}`,
                        icon_url: ``
                    },
                    description: `${def.definition}`,
                    url: `${def.urbanURL}`,
                    thumbnail: {
                        url: `https://b.catgirlsare.sexy/KAFl.jpg`
                    },
                    fields: [{
                            name: `Example:`,
                            value: `${def.example}`,
                            inline: true
                        },
                        {
                            name: `Author:`,
                            value: `${def.author}`,
                            inline: false
                        },
                        {
                            name: `ThumbsUp:`,
                            value: `\\👍 ${def.thumbsUp}`,
                            inline: true
                        },
                        {
                            name: `ThumbsDown`,
                            value: `\\👎 ${def.thumbsDown}`,
                            inline: true
                        }
                    ],
                    footer: {
                        icon_url: ``,
                        text: `All information is provided by urban dictionary`
                    }
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        }).catch(err => {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${err}`,
                    fields: [{
                        name: `For support join:`,
                        value: `https://discord.gg/Vf4ne5b`,
                        inline: true
                    }]
                }
            });
        }).catch(err => {
            logger.error('\n' + err, 'ERROR')
        });
        urban.random(suffix).then(def => {
            const tags = def.tags.join(', ');
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    type: `rich`,
                    author: {
                        name: `${def.word}`,
                        icon_url: ``
                    },
                    description: `${def.definition}`,
                    url: `${def.urbanURL}`,
                    thumbnail: {
                        url: `https://b.catgirlsare.sexy/KAFl.jpg`
                    },
                    fields: [{
                            name: `Example:`,
                            value: `${def.example}`,
                            inline: true
                        },
                        {
                            name: `Author:`,
                            value: `${def.author}`,
                            inline: false
                        },
                        {
                            name: `ThumbsUp:`,
                            value: `\\👍 ${def.thumbsUp}`,
                            inline: true
                        },
                        {
                            name: `ThumbsDown`,
                            value: `\\👎 ${def.thumbsDown}`,
                            inline: true
                        },
                        {
                            name: `Tags:`,
                            value: `${tags}`,
                            inline: false
                        }
                    ],
                    footer: {
                        icon_url: ``,
                        text: `All information is provided by urban dictionary`
                    }
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        }).catch(err => {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${err}`,
                    fields: [{
                        name: `For support join:`,
                        value: `https://discord.gg/Vf4ne5b`,
                        inline: true
                    }]
                }
            });
        }).catch(err => {
            logger.error('\n' + err, 'ERROR')
        });
    }
};