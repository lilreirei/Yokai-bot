const reload = require('require-reload'),
    config = reload('../../config.json'),
    Hearthstone = require('hearthstone-mashape')(`${config.hs_key}`, 'enUS');
var error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {

    desc: "Search hearthstone card by name.",
    usage: "<card name>, [gold] (Make sure to seperate card name and gold with a comma!)",
    aliases: ['hs'],
    cooldown: 10,
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
        if (!args) return 'wrong usage'
        var str = args.toString();
        var array = str.split(', '),
            a = array[0],
            b = array[1];
        var params = {
            name: `${a}`,
            collectible: 1
        };
        Hearthstone.card(params, function (err, data) {
            if (err) return bot.createMessage(msg.channel.id, {
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
            if (data === null) {
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xff0000,
                        author: {
                            name: ``,
                            url: ``,
                            icon_url: ``
                        },
                        description: `Nothing found.`,
                        fields: [{
                            name: `For support join:`,
                            value: `https://discord.gg/Vf4ne5b`,
                            inline: true
                        }]
                    }
                }).catch(err => {
                    logger.error('\n' + err, 'ERROR')
                });
            } else {
                if (b === undefined) {
                    bot.createMessage(msg.channel.id, {
                        content: ``,
                        embed: {
                            color: 0xf4ce11,
                            author: {
                                name: `${msg.author.username}`,
                                url: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? data[0].img : ''}`,
                                icon_url: `${msg.author.avatarURL}`
                            },
                            description: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Name: `+data[0].name : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Card Set: `+data[0].cardSet : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Type: `+data[0].type : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Rarity: `+data[0].rarity : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Flavor: `+data[0].flavor : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Artist: `+data[0].artist : ''}
${data[0] === undefined ? `Make sure to use a card name.` : ''}${data[0] !== undefined ? `[Click here for the direct image url](`+data[0].img+`)` : ''}`,
                            image: {
                                url: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? data[0].img : ''}`
                            }
                        }
                    }).catch(err => {
                        error = JSON.parse(err.response);
                        if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                        logger.error(error.code + '\n' + error.message, 'ERROR');
                    });
                } else {
                    bot.createMessage(msg.channel.id, {
                        content: ``,
                        embed: {
                            color: 0xf4ce11,
                            author: {
                                name: `${msg.author.username}`,
                                url: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? data[0].imgGold : ''}`,
                                icon_url: `${msg.author.avatarURL}`
                            },
                            description: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Name: `+data[0].name : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Card Set: `+data[0].cardSet : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Type: `+data[0].type : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Rarity: `+data[0].rarity : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Flavor: `+data[0].flavor : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Artist: `+data[0].artist : ''}
${data[0] === undefined ? `Make sure to use a card name.` : ''}${data[0] !== undefined ? `[Click here for the direct image url](`+data[0].imgGold+`)` : ''}`,
                            image: {
                                url: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? data[0].imgGold : ''}`
                            }
                        }
                    }).catch(err => {
                        error = JSON.parse(err.response);
                        if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                        logger.error(error.code + '\n' + error.message, 'ERROR');
                    });
                }
            }
        });
    }
};