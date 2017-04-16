const RESPONSES = [
	"pong",
	"It's not like I wanted to say pong or anything b-baka!",
	"pong!",
	"what!?",
	"E-ehh pong?",
  "No..."
];

var Nf = new Intl.NumberFormat('en-US');

module.exports = {
	desc: "Responds with pong.",
	help: "Used to check if the bot is working.\nReplies with 'pong' and the response delay.",
	aliases: ['p'],
	cooldown: 2,
	task(bot, msg) {
		let choice = ~~(Math.random() * RESPONSES.length);

    bot.createMessage(msg.channel.id, { content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: `${RESPONSES[choice]}`,
          icon_url: ``
        },
        description: ``
      }
    }).then(sentMsg => {
      bot.editMessage(msg.channel.id, sentMsg.id, { content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: `${RESPONSES[choice]}`,
            icon_url: ``
          },
          description: `Took me ${Nf.format(sentMsg.timestamp - msg.timestamp)}ms`
        }
    })
	});
}
};
