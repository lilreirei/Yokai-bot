var gagScraper = require('9gag-scraper')

module.exports = {
	desc: "Sends a random 9gag post.",
	usage: "",
	cooldown: 5,
	task(bot, msg) {
		new gagScraper().getRandom(function (error, data) {
			bot.createMessage(msg.channel.id, { content: ``,
				embed: {
					color: 0xf4ce11,
					author: {
						name: `${data.title}`,
						url: `${data.url}`,
						icon_url: ``
					},
					description: `${data.url}`,
					image: {
	          url: `${data.image}`
	        },
					footer: {
              text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
              icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
          }
				},
			});
		});
	}
};
