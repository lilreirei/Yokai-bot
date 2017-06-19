var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

const superagent = require('superagent'),
    auth = {
        'Authorization': "Client-ID " + config.unsplash_key,
        'Content-Type': 'application/json'
    };

module.exports = {
    desc: "Get a beautiful picture from https://unsplash.com",
    usage: "",
    cooldown: 5,
    guildOnly: true,
    task(bot, msg) {
        superagent.get('https://api.unsplash.com/photos/random')
            .set(auth)
            .end((err, res) => {
                if (err) return logger.error('\n' + err, 'ERROR');
                const data = res.body;
                let color = data.color.replace('#', '0x');
                color = parseInt(color);
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: color,
                        author: {
                            name: 'Photographer: ' + data.user.name,
                            url: data.user.links.html,
                            icon_url: data.user.profile_image.small
                        },
                        description: `[\`download image\`](${data.links.download})\n` +
                            `\\👍 Likes: ${data.likes}\n` +
                            `\\👀 Views: ${data.views}\n` +
                            `\\🌇 Location: ${data.location === undefined ? `n/a` : ''}${data.location !== undefined ? data.location.title : ''}`,
                        image: {
                            url: data.urls.regular
                        },
                        footer: {
                            text: `Image from https://unsplash.com`,
                            icon_url: `https://b.catgirlsare.sexy/7OSH.png`
                        }
                    }
                }).catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
            });
    }
};