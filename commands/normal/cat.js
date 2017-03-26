var request = require('request');
const COLORSDECIAML = [
    0x2B54CE,
    0xFF8000,
    0x9932CC,
    0x008080,
    0x800080,
    0x808080,
    0xEE82EE,
    0xFFB6C1,
    0x86B3E8,
    0x93FFAA,
    0x979E79
];

module.exports = {
	desc: "Sends random cat image from http://random.cat",
	usage: "",
	task(bot, msg, suffix) {
		let choose = ~~(Math.random() * COLORSDECIAML.length);
		var color = COLORSDECIAML[choose];
		request("http://random.cat/meow", function(err, response, body) {
			var cat = JSON.parse(body);
			bot.createMessage(msg.channel.id, { content: ``,
				embed: {
					color: color,
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
