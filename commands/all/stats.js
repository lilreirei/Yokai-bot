var reload = require('require-reload'),
    formatSeconds = require("../../utils/utils.js").formatSeconds,
    version = reload('../../package.json').version,
    Nf = new Intl.NumberFormat('en-US'),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Displays statistics about the bot.",
    cooldown: 30,
    guildOnly: true,
    task(bot, msg) {
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
        let totalCommandUsage = commandsProcessed + cleverbotTimesUsed;
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                type: 'rich',
                author: {
                    name: `Shinobu Statistics:`,
                    url: `https://shinobubot.xyz`,
                    icon_url: `${bot.user.avatarURL}`
                },
                thumbnail: {
                    url: `${bot.user.avatarURL}`
                },
                fields: [{
                        name: `Memory Usage:`,
                        value: `${Math.round(process.memoryUsage().rss / 1024 / 1000)}MB`,
                        inline: true
                    },
                    {
                        name: `Shards:`,
                        value: `Current: ${msg.channel.guild.shard.id}\nTotal: ${bot.shards.size}`,
                        inline: true
                    },
                    {
                        name: `Version:`,
                        value: `Shinobu v${version}`,
                        inline: true
                    },
                    {
                        name: `Node Version:`,
                        value: `${process.version}`,
                        inline: true
                    },
                    {
                        name: `Uptime:`,
                        value: `${formatSeconds(process.uptime())}`,
                        inline: false
                    },
                    {
                        name: `Guilds:`,
                        value: `${Nf.format(bot.guilds.size)}`,
                        inline: true
                    },
                    {
                        name: `Channels:`,
                        value: `${Nf.format(Object.keys(bot.channelGuildMap).length)}`,
                        inline: true
                    },
                    {
                        name: `Private Channels:`,
                        value: `${Nf.format(bot.privateChannels.size)}`,
                        inline: true
                    },
                    {
                        name: `Users:`,
                        value: `${Nf.format(bot.users.size)}`,
                        inline: true
                    },
                    {
                        name: `Average Users/Guild:`,
                        value: `${Nf.format((bot.users.size / bot.guilds.size).toFixed(2))}`,
                        inline: true
                    },
                    {
                        name: `Total | Commands | Cleverbot:`,
                        value: `${Nf.format(totalCommandUsage)} | ${Nf.format(commandsProcessed)} | ${Nf.format(cleverbotTimesUsed)}`,
                        inline: true
                    },
                    {
                        name: `Average:`,
                        value: `${(totalCommandUsage / (bot.uptime / (1000 * 60))).toFixed(2)}/min`,
                        inline: true
                    }
                ]
            }
        }).catch(err => {
            error = JSON.parse(err.response);
            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
    }
};