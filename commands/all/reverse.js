const reverse = require('ascii-art-reverse');

module.exports = {
  desc: "Reverse text.",
  usage: "<text>",
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, args) {
		if (!args) return 'wrong usage';
		const art = args;
		const text = reverse(art);
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: `${msg.author.username}`,
          url: ``,
          icon_url: ``
        },
        description: `${text}`
      },
    });
  }
};
