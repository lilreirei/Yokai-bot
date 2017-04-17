const catFacts = require('cat-facts');
var request = require('request');

module.exports = {
	desc: "Gives you a random catfact with a cute cat image.",
	usage: "",
  cooldown: 5,
	guildOnly: true,
  aliases: ['catfact'],
	task(bot, msg) {
    let randomFact = catFacts.random();
		request("http://random.cat/meow", function(err, response, body) {
			var cat = JSON.parse(body);
			bot.createMessage(msg.channel.id, { content: ``,
				embed: {
					color: 0xf4ce11,
					author: {
						name: `Click here for the direct image url`,
						url: `${cat.file}`,
						icon_url: ``
					},
					description: ``,
          thumbnail: {
            url: `${cat.file}`
          },
          fields: [
            {
              name: `**Cat fact:**`,
              value: `${randomFact}`
            }
          ],
          footer: {
              text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
              icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
          }
				},
			});
		});
	}
};
