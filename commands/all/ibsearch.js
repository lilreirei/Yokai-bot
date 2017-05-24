let winston = require('winston');
let request = require('request');

module.exports = {
    desc: "Search for an image on https://ibsear.ch",
    usage: "<tags> (Tags are separated with spaces)",
    cooldown: 5,
    task(bot, msg, args, config) {
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
                bot.createMessage(msg.channel.id, `${err}`);
            }
            if (!err && res.statusCode == 200) {
                try {
                    body = JSON.parse(body);
                } catch (err) {
                    console.log(err);
                    bot.createMessage(msg.channel.id, `${err}`);
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
                    });
                }
            }
        });
    }
};