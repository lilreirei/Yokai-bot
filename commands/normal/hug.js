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
const hugs = require('../../hugs.json');

module.exports = {
	desc: "Hug someone.",
  usage: "<@mention>",
	aliases: ['hugs', 'huggel'],
	cooldown: 2,
	task(bot, msg) {
		let choice = ~~(Math.random() * COLORSDECIAML.length);
		var response = hugs[Math.floor(Math.random()*hugs.length)];
		if (msg.mentions.length === 1) {
			bot.createMessage(msg.channel.id, { content: ``,
	       embed: {
	         color: COLORSDECIAML[choice],
	         author: {
	           name: ``,
	           url: ``,
	           icon_url: ``
	         },
	         description: `<@${msg.author.id}> **hugs** <@${msg.mentions[0].id}>`,
	         image: {
	           url: `${response}`
	         }
	       }
	     });
		} else {
			return 'wrong usage';
		}
	}
}
