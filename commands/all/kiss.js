const request = require('request-promise');
const kiss = require('../../kiss.json');
var randomItem = require('random-item');

module.exports = {
	desc: "Kiss someone.",
  usage: "<@mention>",
	aliases: ['kisses', 'kissu'],
	cooldown: 2,
	guildOnly: true,
	task(bot, msg) {
		var gif = randomItem(kiss);
		if (msg.mentions.length === 1) {
			bot.createMessage(msg.channel.id, { content: ``,
	       embed: {
	         color: 0xf4ce11,
	         author: {
	           name: ``,
	           url: ``,
	           icon_url: ``
	         },
	         description: `<@${msg.author.id}> **kisses** <@${msg.mentions[0].id}> :flushed:`,
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
