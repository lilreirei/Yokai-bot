const imdb = require('imdb-api'),
    reload = require('require-reload'),
    config = reload('../../config.json');
var error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Search for either a movie or serie on imdb.",
    usage: "<movie/serie>",
    aliases: [],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, suffix) {
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
        if (!suffix) return 'wrong usage';
        const movie = suffix.toString();
        imdb.get(movie, { apiKey: config.imdb_key }).then(movie => {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    type: `rich`,
                    author: {
                        name: `${movie.title}`,
                        icon_url: ``
                    },
                    description: `${movie.plot}`,
                    url: `${movie.imdburl}`,
                    image: {
                        url: `${movie.poster}`
                    },
                    fields: [{
                            name: `Rated:`,
                            value: `${movie.rated}`,
                            inline: true
                        },
                        {
                            name: `Runtime:`,
                            value: `${movie.runtime}`,
                            inline: true
                        },
                        {
                            name: `Languages:`,
                            value: `${movie.languages}`,
                            inline: true
                        },
                        {
                            name: `Awards:`,
                            value: `${movie.awards}`,
                            inline: true
                        },
                        {
                            name: `Rating:`,
                            value: `${movie.rating}`,
                            inline: true
                        },
                        {
                            name: `Type:`,
                            value: `${movie.type}`,
                            inline: true
                        },
                        {
                            name: `Genres:`,
                            value: `${movie.genres}`,
                            inline: false
                        },
                        {
                            name: `Released:`,
                            value: `${movie.released}`,
                            inline: false
                        }
                    ],
                    footer: {
                        icon_url: `https://b.catgirlsare.sexy/xgTw.png`,
                        text: `All information is provided by imdb`
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
                        name: `ERROR`,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${err}`
                }
            })
            .catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
        });
    }
};