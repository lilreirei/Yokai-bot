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

const request = require('request-promise');
const catgirls = require('../../catgirls.json');

module.exports = {
	desc: "Posts a random catgirl.",
	aliases: ['neko', 'nekos', 'catgirls'],
	cooldown: 2,
	task(bot, msg, args) {
		let choice = ~~(Math.random() * COLORSDECIAML.length);
		try {
			var response = catgirls[Math.floor(Math.random()*catgirls.length)];
			if (response.includes("/a/")) { // If image is an album.
				bot.createMessage(msg.channel.id, { content: ``,
	        embed: {
	          color: COLORSDECIAML[choice],
	          author: {
	            name: `${msg.author.username} requested a catgirl`,
	            url: `${msg.author.avatarURL}`,
	            icon_url: `${msg.author.avatarURL}`
	          },
	          description: `**URL:\r\n${response}**`,
	          image: {
	            url: `${response}`
	          }
	        }
	      });
			} else {
				bot.createMessage(msg.channel.id, { content: ``,
	        embed: {
	          color: COLORSDECIAML[choice],
	          author: {
	            name: `${msg.author.username} requested a catgirl`,
	            url: `${msg.author.avatarURL}`,
	            icon_url: `${msg.author.avatarURL}`
	          },
	          description: `**URL: ${response}**`,
	          image: {
	            url: `${response}`
	          }
	        }
	      });
			}
		} catch (err) {
			console.log(err);
			bot.createMessage(msg.channel.id, 'Oh dear! Looks like that request failed...');
		}
	}
}
