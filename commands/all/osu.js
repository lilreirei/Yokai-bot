const reload = require('require-reload'),
    config = reload('../../config.json'),
    osu = require('node-osu'),
    osuApi = new osu.Api(config.osuapi, {
        // baseUrl: sets the base api url (default: https://osu.ppy.sh/api) 
        notFoundAsError: true,
        completeScores: false
    }),
    round = require('../../utils/utils.js').round;
var error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Display osu! stats for a user",
    usage: "<info/best/recent> | <username>",
    hidden: false,
    ownerOnly: false,
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
        // s.osu info | <username>        || s.osu i | <username>
        // s.osu best | <username>    || s.osu b | <username>
        // s.osu recent | <username>  || s.osu r | <username>
        if (!args) return 'wrong usage';
        const lower = args.toLowerCase();
        const array = lower.split(/ ?\| ?/),
            type = array[0],
            user = array[1];
        if (!user) return 'wrong usage';
        if ((type === 'info') || (type === 'i')) {
            osuApi.getUser({ u: `${user}` }).then(u => {
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: `osu! data from ${u.name}`,
                            url: ``,
                            icon_url: ``
                        },
                        description: ``,
                        fields: [{
                                name: `ID`,
                                value: `${u.id}`,
                                inline: true
                            },
                            {
                                name: `Name`,
                                value: `${u.name}`,
                                inline: true
                            },
                            {
                                name: `Country`,
                                value: `${u.country}`,
                                inline: true
                            },
                            {
                                name: `Level`,
                                value: `${round(u.level, 1)}`,
                                inline: true
                            },
                            {
                                name: `Accuracy`,
                                value: `${round(u.accuracy, 1)}`,
                                inline: true
                            },
                            {
                                name: `Scores`,
                                value: `
(ranked) ${u.scores.ranked}
(total) ${u.scores.total}`,
                                inline: true
                            },
                            {
                                name: `pp`,
                                value: `
(raw) ${round(u.pp.raw, 1)}
(rank) ${u.pp.rank}
(country rank) ${u.pp.countryRank}`,
                                inline: true
                            },
                            {
                                name: `Counts`,
                                value: `
(SS) ${u.counts.SS}
(S) ${u.counts.S}
(A) ${u.counts.A}
(plays) ${u.counts.plays}`,
                                inline: true
                            }
                        ]
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
                }).catch(err => {
                    logger.error('\n' + err, 'ERROR')
                });
            });
        } else if ((type === 'best') || (type === 'b')) {
            osuApi.getUserBest({ u: `${user}` }).then(s => {
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: `osu! data from ${s[0].user.name}`,
                            url: ``,
                            icon_url: ``
                        },
                        description: ``,
                        fields: [{
                                name: `User ID`,
                                value: `${s[0].user.id}`,
                                inline: true
                            },
                            {
                                name: `Name`,
                                value: `${s[0].user.name}`,
                                inline: true
                            },
                            {
                                name: `Rank`,
                                value: `${s[0].rank}`,
                                inline: true
                            },
                            {
                                name: `Max combo`,
                                value: `${s[0].maxCombo}`,
                                inline: true
                            },
                            {
                                name: `pp`,
                                value: `${round(s[0].pp, 1)}`,
                                inline: true
                            },
                            {
                                name: `Date`,
                                value: `${s[0].raw_date}`,
                                inline: true
                            },
                            {
                                name: `Counts`,
                                value: `
(geki) ${s[0].counts.geki}
(katu) ${s[0].counts.katu}
(miss) ${s[0].counts.miss}`,
                                inline: true
                            }
                        ]
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
                }).catch(err => {
                    logger.error('\n' + err, 'ERROR')
                });
            });
        } else if ((type === 'recent') || (type === 'r')) {
            bot.createMessage(msg.channel.id, `Function coming soon™, for now you can only use \`info\` and \`best\`.`)
                .catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
            /*
            osuApi.getUserRecent({ u: `${user}` }).then(s => {
                console.log(s[0].score);
            });
            */
        }
    }
};