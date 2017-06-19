const giphy = require('giphy-api')();
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Sends a gif from giphy using your search terms.",
    usage: "<tags> | nothing for absolutely random",
    guildOnly: true,
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
        giphy.random(`${args}`).then(function(res) {
            const imgURL = res.data.image_url;
            if (imgURL === undefined) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Coudn't find any image.`
                }
            }).catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `[Direct image url](${imgURL})
Frames: ${res.data.image_frames}
Width: ${res.data.image_width}
Height: ${res.data.image_height}`,
                    image: {
                        url: `${imgURL}`
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
            }).catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
        });
    }
};