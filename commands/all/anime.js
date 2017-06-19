var Anime = require('malapi').Anime,
    reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Shows info about an anime.",
    usage: "<Anime Name>",
    cooldown: 10,
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
        if (!args) return 'wrong usage';
        Anime.fromName(args).then(anime => {
            var genre = anime.genres.toString();
            var genres = genre.split(/, ?/).join(', ');
            let embed = {
                color: 0xf4ce11,
                type: `rich`,
                author: {
                    name: `${anime.title}`,
                    icon_url: ``
                },
                description: `${anime.synopsis.split("\r")[0]}`,
                url: `${anime.detailsLink}`,
                image: {
                    url: `${anime.image}`
                },
                fields: [{
                        name: `Type`,
                        value: `${anime.type}`,
                        inline: true
                    },
                    {
                        name: `Episodes`,
                        value: `${anime.episodes}`,
                        inline: true
                    },
                    {
                        name: `Status`,
                        value: `${anime.status}`,
                        inline: true
                    },
                    {
                        name: `Score`,
                        value: `${anime.statistics.score.value}`,
                        inline: true
                    },
                    {
                        name: `Ranking`,
                        value: `${anime.statistics.ranking}`,
                        inline: true
                    },
                    {
                        name: `Favorites`,
                        value: `${anime.statistics.favorites}`,
                        inline: true
                    },
                    {
                        name: `Aired`,
                        value: `${anime.aired}`,
                        inline: false
                    },
                    {
                        name: `Genres`,
                        value: `${genres}`,
                        inline: false
                    },
                    {
                        name: `Alternative titles`,
                        value: `${anime.alternativeTitles.english}
${anime.alternativeTitles.japanese}`,
                        inline: false
                    }
                ],
                footer: {
                    icon_url: `https://b.catgirlsare.sexy/Jxmy.png`,
                    text: `All information is provided by My Anime List`
                }
            }
            bot.createMessage(msg.channel.id, {
                embed: embed
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