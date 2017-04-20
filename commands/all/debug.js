var reload = require('require-reload'),
  version = reload('../../package.json').version,
  Nf = new Intl.NumberFormat('en-US');

module.exports = {
  desc: "Get debug info for shinobu.",
  usage: "",
  cooldown: 5,
  guildOnly: true,
	hidden: true,
  task(bot, msg) {
		const shardid = bot.shards.map(s => s.id)
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
        fields: [{
            name: `Shinobu version:`,
            value: `${version}`,
            inline: true
          },
          {
            name: `Shard:`,
            value: `${shardid}/${bot.shards.size}`,
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
            name: `Users:`,
            value: `${Nf.format(bot.users.size)}`,
            inline: true
          },
          {
            name: `Private Channels:`,
            value: `${Nf.format(bot.privateChannels.size)}`,
            inline: true
          },
          {
            name: `Memory Usage:`,
            value: `${Math.round(process.memoryUsage().rss / 1024 / 1000)}MB`,
            inline: true
          }
        ]
      },
    });
  }
};
