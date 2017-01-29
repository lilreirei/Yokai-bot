var reload = require('require-reload'),
	formatTime = reload('../../utils/utils.js').formatTime,
	version = reload('../../package.json').version,
	Nf = new Intl.NumberFormat('en-US');

module.exports = {
  desc: "Displays statistics about the bot.",
  cooldown: 10,
  requiredPermission: 'manageGuild',
  task(bot, msg) {
      let totalCommandUsage = commandsProcessed + cleverbotTimesUsed;

      bot.createMessage(msg.channel.id, { content: ``,
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
          fields: [
            {
              name: `Memory Usage:`,
              value: `${Math.round(process.memoryUsage().rss / 1024 / 1000)}MB`,
              inline: true
            },
            {
              name: `Shards:`,
              value: `${bot.shards.size}`,
              inline: true
            },
            {
              name: `Version:`,
              value: `Shinobu v${version}`,
              inline: true
            },
            {
              name: `Uptime:`,
              value: `${formatTime(bot.uptime)}`,
              inline: true
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
            },
            {
              name: `Owner/Creator`,
              value: `Kurozero#3420 (My master ^.^)`,
              inline: true
            }
          ]
        }
      })
  }
};
