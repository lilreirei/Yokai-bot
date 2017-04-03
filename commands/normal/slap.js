const request = require('request-promise');
const slap = require('../../slap.json');

module.exports = {
	desc: "Slap someone.",
  usage: "<@mention>",
	aliases: ['punish'],
	cooldown: 2,
	task(bot, msg) {
		var response = slap[Math.floor(Math.random()*slap.length)];
		if (msg.mentions.length === 1) {
			bot.createMessage(msg.channel.id, { content: ``,
	       embed: {
	         color: 0xf4ce11,
	         author: {
	           name: ``,
	           url: ``,
	           icon_url: ``
	         },
	         description: `<@${msg.author.id}> **slaps** <@${msg.mentions[0].id}> :smirk:`,
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
