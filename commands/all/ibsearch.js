const request = require('request');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Search for an image on https://ibsear.ch",
    usage: "<tags> (Tags are separated with spaces)",
    cooldown: 5,
    task(bot, msg, args, config) {
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
        let key = config.ibsearch_key;
        let str = args + "";
        let msgSplit = str.split(' ');
        let msgSearch = '';
        let searchOrig = '';
        for (let i = 1; i < msgSplit.length; i++) {
            if (i === 1) {
                searchOrig = msgSplit[i];
            } else {
                searchOrig = searchOrig + ' ' + msgSplit[i];
            }
        }
        msgSearch = 'random: ' + searchOrig;
        request.get('https://ibsear.ch/api/v1/images.json', {
            qs: {
                limit: 100,
                q: msgSearch
            },
            headers: { 'ibSearch-Key': key }
        }, (err, res, body) => {
            if (err) {
                bot.createMessage(msg.channel.id, `${err}`)
                    .catch(err => {
                        logger.error('\n' + err, 'ERROR')
                    });
            }
            if (!err && res.statusCode == 200) {
                try {
                    body = JSON.parse(body);
                } catch (err) {
                    console.log(err);
                    bot.createMessage(msg.channel.id, `${err}`)
                        .catch(err => {
                            logger.error('\n' + err, 'ERROR')
                        });
                }
                if (typeof(body) !== 'undefined' && body.length > 0) {
                    let random = Math.floor(Math.random() * body.length);
                    let img = body[random];
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
                                image: {
                                    url: `https://${img.server}.ibsear.ch/${img.path}`
                                }
                            }
                        })
                        .catch(err => {
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
                                    name: ``,
                                    url: ``,
                                    icon_url: ``
                                },
                                description: `Oops, looks like I couldn't find an image.`
                            }
                        })
                        .catch(err => {
                            logger.error('\n' + err, 'ERROR')
                        });
                }
            }
        });
    }
};