var reload = require('require-reload'),
    _Logger = reload('../utils/Logger.js'),
    bannedGuilds = reload('../banned_guilds.json'),
    logger;
moment = require('../node_modules/moment');

module.exports = function(bot, _settingsManager, config, guild) {
        if (logger === undefined)
            logger = new _Logger(config.logTimestamp);
        logger.logWithHeader('JOINED GUILD', 'bgGreen', 'black', `${guild.name} (${guild.id}) owned by ${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}`);
        if (bannedGuilds.bannedGuildIds.includes(guild.id)) {
            logger.logWithHeader('LEFT BANNED GUILD', 'bgRed', 'black', guild.name);
            guild.leave();
        } else if (config.nowelcomemessageGuild.includes(guild.id))
            logger.logWithHeader('DIDNT SEND WELCOME MESSGAE', 'bgBlue', 'black', guild.name);
        else
            guild.defaultChannel.createMessage("Awesome a new server!\nType `s.help` for a commands list.\nYou could also view all my commands on https://commands.shinobubot.xyz (Note not every command is on the website yet.)");
        const defid = guild.defaultChannel.id;
        const bots = bot.guilds.get(guild.id).members.filter(user => user.user.bot).length;
        const total = bot.guilds.get(guild.id).memberCount;
        const humans = total - bots;
        const roles = guild.roles.map(c => c).length;
        const createdOn = moment(guild.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss') + ' UTC ' + '(' + moment(guild.createdAt).fromNow() + ')';
        const validate = `${createdOn === null ? `n/a` : ''}${createdOn !== null ? createdOn : ''}`;
    bot.createChannelInvite(defid, { temporary: false, unique: true }).then(inv => {
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
                    url: `${guild.iconURL}`
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
                        value: `${humans}`,
                        inline: true
                    },
                    {
                        name: `Bots`,
                        value: `${bots}`,
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
                        value: `<#${defid}>`,
                        inline: true
                    },
                    {
                        name: `Invite`,
                        value: `https://discord.gg/${inv.code}`,
                        inline: true
                    }
                ]
            }
        });
    });
}