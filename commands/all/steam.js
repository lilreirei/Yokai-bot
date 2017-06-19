const reload = require('require-reload'),
    config = reload('../../config.json'),
    superagent = require('superagent'),
    moment = require('../../node_modules/moment');

module.exports = {
    desc: "Get info about a steam user.",
    usage: "<SteamID64/SteamID32/CustomURL>",
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, args) {
        superagent.get(`http://api.thegathering.xyz/steamid/?s=${args}&key=${config.steam_key}`)
            .end(function (err, res) {
                if (err) return logger.error('\n' + err, 'ERROR');
                const data = res.body;
                if (data.status != 200) return bot.createMessage(msg.channel.id, 'Oops something went wrong. Make sure you used the correct usage, to check do \`s.help steam\`')
                    .catch(err => {
                        logger.error('\n' + err, 'ERROR')
                    });
                const lastlogoff = new Date(data.profile.lastlogoff * 1000).toISOString();
                const timecreated = new Date(data.profile.timecreated * 1000).toISOString();
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
                            url: `${data.avatars.avatarfull}`
                        },
                        fields: [{
                                name: `General info:`,
                                value: `\u200B`,
                                inline: false
                            },
                            {
                                name: `Real name`,
                                value: `${data.profile.realname === '' ? `n/a` : ''}${data.profile.realname !== '' ? data.profile.realname : ''}`,
                                inline: true
                            },
                            {
                                name: `Privacy`,
                                value: `${data.profile.privacy}`,
                                inline: true
                            },
                            {
                                name: `Last logoff`,
                                value: `${moment(lastlogoff).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC`,
                                inline: true
                            },
                            {
                                name: `Last seen`,
                                value: `${data.profile.state}`,
                                inline: true
                            },
                            {
                                name: `Created at`,
                                value: `${moment(timecreated).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(timecreated).fromNow()})`,
                                inline: false
                            },
                            {
                                name: `Current state`,
                                value: `${data.profile.personastate}`,
                                inline: true
                            },
                            {
                                name: `Location`,
                                value: `${data.profile.location === '' ? `n/a` : ''}${data.profile.location !== '' ? data.profile.location : ''}`,
                                inline: true
                            },
                            {
                                name: `\u200B`,
                                value: `\u200B`,
                                inline: false
                            },
                            {
                                name: `Bans:`,
                                value: `\u200B`,
                                inline: false
                            },
                            {
                                name: `Vac ban`,
                                value: `${data.bans.vac}`,
                                inline: true
                            },
                            {
                                name: `Vac bans`,
                                value: `${data.bans.vacamount}`,
                                inline: true
                            },
                            {
                                name: `Days since last vac ban`,
                                value: `${data.bans.dayssince === '' ? `n/a` : ''}${data.bans.dayssince !== '' ? data.bans.dayssince + ' days' : ''}`,
                                inline: false
                            },
                            {
                                name: `\u200B`,
                                value: `\u200B`,
                                inline: false
                            },
                            {
                                name: `Fav group:`,
                                value: `\u200B`,
                                inline: false
                            },
                            {
                                name: `Name`,
                                value: `${data.favgroup.name === '' ? `n/a` : ''}${data.favgroup.name !== '' ? data.favgroup.name : ''}`,
                                inline: true
                            },
                            {
                                name: `ID`,
                                value: `${data.favgroup.id === '' ? `n/a` : ''}${data.favgroup.id !== '' ? data.favgroup.id : ''}`,
                                inline: true
                            },
                            {
                                name: `Members`,
                                value: `${data.favgroup.members === '' ? `n/a` : ''}${data.favgroup.members !== '' ? data.favgroup.members : ''}`,
                                inline: true
                            },
                            {
                                name: `Avatar`,
                                value: `${data.favgroup.avatar === '' ? `n/a` : ''}${data.favgroup.avatar !== '' ? data.favgroup.avatar : ''}`,
                                inline: true
                            },
                            {
                                name: `URL`,
                                value: `${data.favgroup.url === '' ? `n/a` : ''}${data.favgroup.url !== '' ? data.favgroup.url : ''}`,
                                inline: true
                            }
                        ]
                    }
                }).catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
            });
    }
};