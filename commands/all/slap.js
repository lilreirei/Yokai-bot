const request = require('request-promise');
const slap = require('../../slap.json');
var randomItem = require('random-item');

module.exports = {
	desc: "Slap someone.",
  usage: "<@mention>",
	aliases: ['punish'],
	cooldown: 2,
	guildOnly: true,
	task(bot, msg) {
		var gif = randomItem(slap);
		if (msg.mentions.length === 1) {
			bot.createMessage(msg.channel.id, { content: ``,
	       embed: {
	         color: 0xf4ce11,
	         author: {
	           name: ``,
	           url: ``,
	           icon_url: ``
	         },
	         description: `<@${msg.author.id}> **slaps** <@${msg.mentions[0].id}>`,
	         image: {
	           url: `${gif}`
	         }
	       }
	     });
		} else {
			return 'wrong usage';
		}
	}
}
