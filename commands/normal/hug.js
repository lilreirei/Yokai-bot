const request = require('request-promise');
const hugs = require('../../hugs.json');

module.exports = {
	desc: "Hug someone.",
  usage: "<@mention>",
	aliases: ['hugs', 'huggel'],
	cooldown: 2,
	task(bot, msg) {
		var response = hugs[Math.floor(Math.random()*hugs.length)];
		if (msg.mentions.length === 1) {
			bot.createMessage(msg.channel.id, { content: ``,
	       embed: {
	         color: 0xf4ce11,
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
