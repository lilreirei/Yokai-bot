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

module.exports = {
	desc: "Echo",
	usage: "<text>",
	aliases: ['echo'],
	task(bot, msg, suffix) {
		let choose = ~~(Math.random() * COLORSDECIAML.length);
		var color = COLORSDECIAML[choose];
		bot.createMessage(msg.channel.id, { content: ``,
			embed: {
				color: color,
				author: {
					name: ``,
					url: ``,
					icon_url: ``
				},
				description: `:speech_balloon: ${suffix}` || 'echo'
			}
		});
	}
};
