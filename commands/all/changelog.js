module.exports = {
	desc: "Sends the latest changelog from the support server.",
	usage: "",
	cooldown: 5,
	guildOnly: true,
	task(bot, msg, suffix, channel) {
		let c_ = bot.getChannel('240154536856125440')

		c_.getMessages(0).then(function(value) {
			let embed = {
			color: 0xf4ce11,
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
