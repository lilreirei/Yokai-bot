var request = require('request');

module.exports = {
	desc: "Sends random cat image from http://random.cat",
	usage: "",
	cooldown: 5,
	task(bot, msg, suffix) {
		request("http://random.cat/meow", function(err, response, body) {
			var cat = JSON.parse(body);
			bot.createMessage(msg.channel.id, { content: ``,
				embed: {
					color: 0xf4ce11,
					author: {
						name: `${msg.author.username} requested a cat ;3`,
						url: `${cat.file}`,
						icon_url: ``
					},
					description: `[Click here for the direct image link](${cat.file})`,
					image: {
	          url: `${cat.file}`
	        }
				},
			});
		});
	}
};
