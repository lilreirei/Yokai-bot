const RESPONSES = [
	"pong",
	"It's not like I wanted to say pong or anything b-baka!",
	"pong!",
	"what!?",
	"E-ehh pong?",
  "No..."
];

const COLORSDECIAML = [
  0x46A030,
  0x2B54CE,
  0x00FFFF,
  0xFF0000,
  0xFFFF00,
  0xFF8000,
  0x9932CC
];

var Nf = new Intl.NumberFormat('en-US');

module.exports = {
	desc: "Responds with pong.",
	help: "Used to check if the bot is working.\nReplies with 'pong' and the response delay.",
	aliases: ['p'],
	cooldown: 2,
	task(bot, msg) {
		let choice = ~~(Math.random() * RESPONSES.length);
    let color = ~~(Math.random() * COLORSDECIAML.length);
    var final = COLORSDECIAML[color];

    bot.createMessage(msg.channel.id, { content: ``,
      embed: {
        color: final,
        author: {
          name: `${RESPONSES[choice]}`,
          icon_url: ``
        },
        description: ``
      }
    }).then(sentMsg => {
      bot.editMessage(msg.channel.id, sentMsg.id, { content: ``,
        embed: {
          color: final,
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
