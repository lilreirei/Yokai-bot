const request = require('request-promise');
const kiss = require('../../kiss.json');

module.exports = {
	desc: "Kiss someone.",
  usage: "<@mention>",
	aliases: ['kisses', 'kissu'],
	cooldown: 2,
	task(bot, msg) {
		var response = kiss[Math.floor(Math.random()*kiss.length)];
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
	           url: `${response}`
	         }
	       }
	     });
		} else {
			return 'wrong usage';
		}
	}
}
