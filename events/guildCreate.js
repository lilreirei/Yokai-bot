var reload = require('require-reload'),
    _Logger = reload('../utils/Logger.js'),
    bannedGuilds = reload('../banned_guilds.json'),
    formatTime = reload('../utils/utils.js').formatTime,
    version = reload('../package.json').version,
    Nf = new Intl.NumberFormat('en-US'),
    logger;
moment = require('../node_modules/moment');
const round = require('../utils/utils.js').round;

module.exports = (bot, _settingsManager, config, guild) => {
    const defid = guild.defaultChannel.id,
        bots = bot.guilds.get(guild.id).members.filter(user => user.user.bot).length,
        total = bot.guilds.get(guild.id).memberCount,
        humans = total - bots,
        roles = guild.roles.map(c => c).length,
        createdOn = moment(guild.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss') + ' UTC ' + '(' + moment(guild.createdAt).fromNow() + ')',
        validate = `${createdOn === null ? `n/a` : ''}${createdOn !== null ? createdOn : ''}`,
        humanper = humans / total * 100,
        botper = bots / total * 100;

    bannedGuilds = reload('../banned_guilds.json');
    if (logger === undefined)
        logger = new _Logger(config.logTimestamp);
    logger.logWithHeader('JOINED GUILD', 'bgGreen', 'black', `${guild.name} (${guild.id}) owned by ${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}`);
    if (bannedGuilds.bannedGuildIds.includes(guild.id)) {
        logger.logWithHeader('LEFT BANNED GUILD', 'bgRed', 'black', guild.name);
        guild.leave();
    } else if (botper >= 90) {
        logger.logWithHeader('LEFT BOT FARM', 'bgRed', 'black', `${guild.name}, Humans: ${humans}(${round(humanper, 2)}%), Bots: ${bots}(${round(botper, 2)}%)`);
        guild.leave();
    } else if (config.nowelcomemessageGuild.includes(guild.id))
        logger.logWithHeader('DIDNT SEND WELCOME MESSGAE', 'bgBlue', 'black', guild.name);
    else
        guild.defaultChannel.createMessage("Awesome a new server!\nType `s.help` for a commands list.\nYou could also view all my commands on https://commands.shinobubot.xyz (Note not every command is on the website yet.)")
            .catch(err => {
                try {
                    error = JSON.parse(err.response);
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                } catch (error) {
                    logger.error('\n' + err, 'ERROR');
                }
            });
    const createInstantInvite = guild.defaultChannel.permissionsOf(bot.user.id).has('createInstantInvite');
    if (createInstantInvite === false) {
        bot.createMessage('306837434275201025', {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: `${guild.name} (${guild.id})`,
                    url: ``,
                    icon_url: ``
                },
                description: ``,
                thumbnail: {
                    url: `${guild.iconURL === null ? `` : ''}${guild.iconURL !== null ? guild.iconURL : ''}`
                },
                fields: [{
                        name: `Owner`,
                        value: `${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}\n(${guild.ownerID})`,
                        inline: true
                    },
                    {
                        name: `Total members`,
                        value: `${total}`,
                        inline: true
                    },
                    {
                        name: `Humans`,
                        value: `${humans}, ${round(humanper, 2)}%`,
                        inline: true
                    },
                    {
                        name: `Bots`,
                        value: `${bots}, ${round(botper, 2)}%`,
                        inline: true
                    },
                    {
                        name: `Emotes`,
                        value: `${guild.emojis.length}`,
                        inline: true
                    },
                    {
                        name: `Roles`,
                        value: `${roles}`,
                        inline: true
                    },
                    {
                        name: `Created on`,
                        value: `${validate}`,
                        inline: false
                    },
                    {
                        name: `Default channel`,
                        value: `#${guild.defaultChannel.name}\n(${defid})`,
                        inline: true
                    },
                    {
                        name: `Invite`,
                        value: `I didn't had permission ;(`,
                        inline: true
                    }
                ]
            }
        }).catch(err => {
            try {
                error = JSON.parse(err.response);
                logger.error(error.code + '\n' + error.message, 'ERROR');
            } catch (error) {
                logger.error('\n' + err, 'ERROR');
            }
        });
    } else {
        bot.createChannelInvite(defid, {
            maxAge: Infinity,
            maxUses: Infinity,
            temporary: false,
            unique: true
        }).then(inv => {
            bot.createMessage('306837434275201025', {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${guild.name} (${guild.id})`,
                        url: ``,
                        icon_url: ``
                    },
                    description: ``,
                    thumbnail: {
                        url: `${guild.iconURL === null ? `` : ''}${guild.iconURL !== null ? guild.iconURL : ''}`
                    },
                    fields: [{
                            name: `Owner`,
                            value: `${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}\n(${guild.ownerID})`,
                            inline: true
                        },
                        {
                            name: `Total members`,
                            value: `${total}`,
                            inline: true
                        },
                        {
                            name: `Humans`,
                            value: `${humans}, ${round(humanper, 2)}%`,
                            inline: true
                        },
                        {
                            name: `Bots`,
                            value: `${bots}, ${round(botper, 2)}%`,
                            inline: true
                        },
                        {
                            name: `Emotes`,
                            value: `${guild.emojis.length}`,
                            inline: true
                        },
                        {
                            name: `Roles`,
                            value: `${roles}`,
                            inline: true
                        },
                        {
                            name: `Created on`,
                            value: `${validate}`,
                            inline: false
                        },
                        {
                            name: `Default channel`,
                            value: `#${guild.defaultChannel.name}\n(${defid})`,
                            inline: true
                        },
                        {
                            name: `Invite`,
                            value: `https://discord.gg/${inv.code}`,
                            inline: true
                        }
                    ]
                }
            }).catch(err => {
                try {
                    error = JSON.parse(err.response);
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                } catch (error) {
                    logger.error('\n' + err, 'ERROR');
                }
            });
        }).catch(err => {
            try {
                error = JSON.parse(err.response);
                logger.error(error.code + '\n' + error.message, 'ERROR');
            } catch (error) {
                logger.error('\n' + err, 'ERROR');
            }
        });
    }
}