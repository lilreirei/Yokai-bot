const booru = require('sfwbooru');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Sends a sfw image from a booru site with the given tags. (Max 2 tags, seperate tags by space!",
    usage: "<site> [<tag1> <tag2>] (Max 2 tags, tags must be seperated by space!).\nType: \"s.sfwbooru list\" for a list of sites the bot can get a picture from.",
    aliases: ['sfw'],
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
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        if (!args) return 'wrong usage'
        var str = args + "";
        var array = str.split(' '),
            a = array[0],
            b = array[1],
            c = array[2];

        const lower = a.toLowerCase();
        if (lower === 'list') {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${msg.author.username}`,
                        icon_url: `${msg.author.avatarURL}`
                    },
                    description: `konachan.com, aliases: ["kc","konac","kcom"]
konachan.net, aliases: ["kn","konan","knet"]
yande.re, aliases: ["yd","yand","yandere"]
safebooru.org, aliases: ["sb","safe","safebooru"]
tbib.org, aliases: ["tb", "tbib","big"]
dollbooru.org, aliases: ["do","doll","dollbooru"]
lolibooru.moe, aliases: ["lb", "lol", "loli", "lolibooru"]`
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        } else {
            if ((b) && (!c)) {
                booru.search(`${a}`, [`${b}`, `s`], {
                        limit: 1,
                        random: true
                    })
                    .then(booru.commonfy)
                    .then(images => {
                        for (let image of images) {
                            var img = image.common.file_url.toString(" ");
                            var imguri = img.replace(/ /g, "%20");
                            bot.createMessage(msg.channel.id, {
                                content: ``,
                                embed: {
                                    color: 0xf4ce11,
                                    author: {
                                        name: `Click here for the direct image url`,
                                        url: `${imguri}`,
                                        icon_url: `${msg.author.avatarURL}`
                                    },
                                    description: `Searched tags: ${b}
Score: ${image.common.score}
Rating: ${image.common.rating}`,
                                    image: {
                                        url: `${imguri}`
                                    }
                                }
                            }).catch(err => {
                                error = JSON.parse(err.response);
                                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                                logger.error(error.code + '\n' + error.message, 'ERROR');
                            });
                        }
                    })
                    .catch(err => {
                        if (err.name === 'booruError') {
                            bot.createMessage(msg.channel.id, {
                                content: ``,
                                embed: {
                                    color: 0xff0000,
                                    author: {
                                        name: ``,
                                        url: ``,
                                        icon_url: ``
                                    },
                                    description: `${err.message}`,
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
                        }
                    })
            } else if ((!b) && (!c)) {
                booru.search(`${a}`, [`s`], {
                        limit: 1,
                        random: true
                    })
                    .then(booru.commonfy)
                    .then(images => {
                        for (let image of images) {
                            var img = image.common.file_url.toString(" ");
                            var imguri = img.replace(/ /g, "%20");
                            bot.createMessage(msg.channel.id, {
                                content: ``,
                                embed: {
                                    color: 0xf4ce11,
                                    author: {
                                        name: `Click here for the direct image url`,
                                        url: `${imguri}`,
                                        icon_url: `${msg.author.avatarURL}`
                                    },
                                    description: `Score: ${image.common.score}
Rating: ${image.common.rating}`,
                                    image: {
                                        url: `${imguri}`
                                    }
                                }
                            }).catch(err => {
                                error = JSON.parse(err.response);
                                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                                logger.error(error.code + '\n' + error.message, 'ERROR');
                            });
                        }
                    })
                    .catch(err => {
                        if (err.name === 'booruError') {
                            bot.createMessage(msg.channel.id, {
                                content: ``,
                                embed: {
                                    color: 0xff0000,
                                    author: {
                                        name: ``,
                                        url: ``,
                                        icon_url: ``
                                    },
                                    description: `${err.message}`,
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
                        }
                    })
            } else {
                booru.search(`${a}`, [`${b}`, `${c}`, `s`], {
                        limit: 1,
                        random: true
                    })
                    .then(booru.commonfy)
                    .then(images => {
                        for (let image of images) {
                            var img = image.common.file_url.toString(" ");
                            var imguri = img.replace(/ /g, "%20");
                            bot.createMessage(msg.channel.id, {
                                content: ``,
                                embed: {
                                    color: 0xf4ce11,
                                    author: {
                                        name: `Click here for the direct image url`,
                                        url: `${imguri}`,
                                        icon_url: `${msg.author.avatarURL}`
                                    },
                                    description: `Searched tags: ${b}, ${c}
Score: ${image.common.score}
Rating: ${image.common.rating}`,
                                    image: {
                                        url: `${imguri}`
                                    }
                                }
                            }).catch(err => {
                                error = JSON.parse(err.response);
                                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                                logger.error(error.code + '\n' + error.message, 'ERROR');
                            });
                        }
                    })
                    .catch(err => {
                        if (err.name === 'booruError') {
                            bot.createMessage(msg.channel.id, {
                                content: ``,
                                embed: {
                                    color: 0xff0000,
                                    author: {
                                        name: ``,
                                        url: ``,
                                        icon_url: ``
                                    },
                                    description: `${err.message}`,
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
                        }
                    })
            }
        }
    }
};