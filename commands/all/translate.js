const translate = require('google-translate-api');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Translate words/sentences.",
    usage: "<word(s)/sentance>, <from lang>, <to lang> (Make sure to seperate them with a comma)\nex. s.translate I'm feeling sick, en, nl",
    aliases: ['tl', 'trans'],
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
        var str = args + "";
        var array = str.split(', '),
            a = array[0],
            b = array[1],
            c = array[2];
        if (!args) return 'wrong usage'
        if (!c) return 'wrong usage'
        if (!b) return 'wrong usage'
        translate(`${a}`, { from: `${b}`, to: `${c}` }).then(res => {
            var old = res.from.text.value;
            var oldres = old.replace(/&#39;/, "'")

            var neww = res.text;
            var newwres = neww.replace(/&#39;/, "'")
            if (res.from.text.autoCorrected === true) {
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: `${msg.author.username}`,
                            url: `${msg.author.avatarURL}`,
                            icon_url: `${msg.author.avatarURL}`
                        },
                        description: `${b}: ${oldres}\n${c}: ${newwres}`
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
                            url: `${msg.author.avatarURL}`,
                            icon_url: `${msg.author.avatarURL}`
                        },
                        description: `${b}: ${a}\n${c}: ${newwres}`
                    }
                }).catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
            }
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
    }
};