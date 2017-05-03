var reload = require('require-reload'),
	setAvatar = reload('../../utils/utils.js').setAvatar;

module.exports = {
	desc: "Set the bot's avatar from a URL.",
	usage: "<URL>",
	hidden: true,
	ownerOnly: true,
	task(bot, msg, suffix) {
		setAvatar(bot, suffix)
			.then(() => {
				bot.createMessage(msg.channel.id, 'Avatar updated');
			}).catch(error => {
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
				});
			});
	}
};
