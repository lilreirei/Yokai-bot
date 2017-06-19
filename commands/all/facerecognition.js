const reload = require('require-reload'),
    config = reload('../../config.json'),
    Kairos = require('kairos-api'),
    round = require('../../utils/utils.js').round;
    
var error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Can recognize a face in a picture.",
    usage: "<image_url> (Only .jpg/.jpeg and .png format)",
    aliases: ['facerecog', 'fr'],
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
        if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        const kairos = new Kairos(config.kairos_id, config.kairos_key);
        const imgurl = args.toString();
        const urlcheck = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        const regex = new RegExp(urlcheck);
        if (!imgurl.match(regex)) return 'wrong usage';
        const params = {
            image: imgurl
        };
        kairos.detect(params)
            .then(res => {
                if ((res.body.images == undefined) || (!res.body.images[0].faces[1])) {
                    let result = JSON.stringify(res.body);
                    result = result.replace(/\[/g, '');
                    result = result.replace(/\]/g, '');
                    result = JSON.parse(result);
                    const data = result.images;
                    if (result.Errors) {
                        bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
Code: ${result.Errors.ErrCode}
Message: ${result.Errors.Message}

For more help join the support server, get the invite link by doing s.support
\`\`\``).catch(err => { return; });
                    } else {
                        let gender = data.faces.attributes.gender.type;
                        if (gender === 'F')
                            gender = 'Female';
                        if (gender === 'M')
                            gender = 'Male';
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
                                thumbnail: {
                                    url: imgurl
                                },
                                fields: [{
                                    name: `Attributes`,
                                    value: `
Lips:           \`${data.faces.attributes.lips}\`
Gender:     \`${gender}\`
Age:           \`${data.faces.attributes.age}\`
Glasses:    \`${data.faces.attributes.glasses}\`
Asian:        \`${round(data.faces.attributes.asian * 100, 2)}%\`
Hispanic:   \`${round(data.faces.attributes.hispanic * 100, 2)}%\`
Black:         \`${round(data.faces.attributes.black * 100, 2)}%\`
White:       \`${round(data.faces.attributes.white * 100, 2)}%\`
Other:        \`${round(data.faces.attributes.other * 100, 2)}%\``,
                                    inline: true
                                }]
                            }
                        }).catch(err => {
                            error = JSON.parse(err.response);
                            logger.error(error.code + '\n' + error.message, 'ERROR');
                        });
                    }
                } else if (res.body.images[0].faces[1]) {
                    bot.createMessage(msg.channel.id, 'Too many faces, please only use images with one face in it.')
                        .catch(err => {
                            error = JSON.parse(err.response);
                            logger.error(error.code + '\n' + error.message, 'ERROR');
                        });
                }
            })
            .catch(err => {
                if (embedLinks === false) {
                    if (sendMessages === false) return;
                    bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
${err}

For more help join the support server, get the invite link by doing s.support
\`\`\``).catch(err => {
                        error = JSON.parse(err.response);
                        logger.error(error.code + '\n' + error.message, 'ERROR');
                    });
                } else if (embedLinks === true) {
                    if (sendMessages === false) return;
                    bot.createMessage(msg.channel.id, {
                        content: ``,
                        embed: {
                            color: 0xff0000,
                            author: {
                                name: `ERROR`,
                                url: ``,
                                icon_url: `https://b.catgirlsare.sexy/NBRh.png`
                            },
                            description: `${err}`,
                            footer: {
                                text: `For more help join the support server, get the invite link by doing s.support`
                            }
                        }
                    }).catch(err => {
                        error = JSON.parse(err.response);
                        logger.error(error.code + '\n' + error.message, 'ERROR');
                    });
                }
            });
    }
};