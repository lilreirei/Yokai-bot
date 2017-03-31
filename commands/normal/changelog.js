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
	desc: "Sends the latest changelog from the support server.",
	usage: "",
	guildOnly: true,
	task(bot, msg, suffix, channel) {
		let choose = ~~(Math.random() * COLORSDECIAML.length);
		var color = COLORSDECIAML[choose];
		let c_ = bot.getChannel('240154536856125440')

		c_.getMessages(0).then(function(value) {
			let embed = {
			color: color,
	           author: {
	            name: 'Changelog',
	             icon_url: 'https://b.catgirlsare.sexy/kMDk.jpg'
	           },
	           fields: [
							 {
								 name: `Latest changelog:`,
								 value: `${value[0].content}`
							 }
					]
	       }
			bot.createMessage(msg.channel.id,{embed: embed});
		})
	}
};
