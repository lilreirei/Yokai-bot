const Pokedex = require('oakdex-pokedex');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Search a pokemon by name or national pokedex id.",
    usage: "<name/national_pokedex_id>",
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
        if (!args) return 'wrong usage';
        const lower = args.toString().toLowerCase();
        const uppercaseFirstLetter = lower.charAt(0).toUpperCase();
        const stringWithoutFirstLetter = lower.slice(1);
        args = uppercaseFirstLetter + stringWithoutFirstLetter;
        try {
            Pokedex.findPokemon(args, function(res, err) {
                if (err) return bot.createMessage(msg.channel.id, {
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
                if (!res) return bot.createMessage(msg.channel.id, 'Couldn\'t find any data.')
                    .catch(err => {
                        logger.error('\n' + err, 'ERROR')
                    });
                const types = res.types.toString();
                const egg_groups = res.egg_groups.toString();
                const hatch_time = res.hatch_time.toString();

                let genderMale = '';
                let genderFemale = '';
                if (!res.gender_ratios) {
                    genderMale = 'n/a';
                    genderFemale = 'n/a';
                } else {
                    genderMale = res.gender_ratios.male + '%';
                    genderFemale = res.gender_ratios.female + '%';
                }

                let evolveTo = '' + res.evolutions.map(e => e.to);
                if (!evolveTo)
                    evolveTo = 'n/a';
                let evolveAt = 'lvl' + res.evolutions.map(e => e.level);
                if (evolveAt === 'lvl')
                    evolveAt = 'n/a';
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: `Info of ${res.names.en}`,
                            url: ``,
                            icon_url: ``
                        },
                        description: ``,
                        thumbnail: {
                            url: ``
                        },
                        fields: [{
                                name: `Names`,
                                value: `France: ${res.names.fr}\nGerman: ${res.names.de}\nItalian: ${res.names.it}\nEnglish: ${res.names.en}`,
                                inline: true
                            },
                            {
                                name: `Height/Weight`,
                                value: `Height: ${res.height_eu}\nWeight: ${res.weight_eu}`,
                                inline: true
                            },
                            {
                                name: `Types`,
                                value: `${types.split(',').join('\n')}`,
                                inline: true
                            },
                            {
                                name: `Gender ratios`,
                                value: `Male: ${genderMale}\nFemale: ${genderFemale}`,
                                inline: true
                            },
                            {
                                name: `Catch rate`,
                                value: `${res.catch_rate}`,
                                inline: true
                            },
                            {
                                name: `Egg groups`,
                                value: `${egg_groups.split(',').join('\n')}`,
                                inline: true
                            },
                            {
                                name: `Hatch time`,
                                value: `${hatch_time.split(',').join('/')}steps`,
                                inline: true
                            },
                            {
                                name: `Leveling rate`,
                                value: `${res.leveling_rate}`,
                                inline: true
                            },
                            {
                                name: `Evolutions`,
                                value: `To: ${evolveTo}\nAt: ${evolveAt}`,
                                inline: true
                            },
                            {
                                name: `Categories`,
                                value: `${res.categories.en}`,
                                inline: true
                            },
                            {
                                name: `National pokedex id`,
                                value: `${res.national_id}`,
                                inline: true
                            }
                        ]
                    },
                }).catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
            });
        } catch (error) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${error}`,
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

    }
};