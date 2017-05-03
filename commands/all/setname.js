module.exports = {
	desc: "Set the bot's username.",
	usage: "<username>",
	hidden: true,
	ownerOnly: true,
	task(bot, msg, suffix) {
		if (!suffix)
			return bot.createMessage(msg.channel.id, 'Maybe you should give me a name to use?');
		bot.editSelf({username: suffix, avatar: bot.user.avatar})
			.then(() => {
				bot.createMessage(msg.channel.id, 'Username updated');
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
