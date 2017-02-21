module.exports = {
	desc: "Sends the latest changelog from the support server.",
	usage: "",
	guildOnly: true,
	task(bot, msg, suffix, channel) {
		let c_ = bot.getChannel('227728707555426315')

		c_.getMessages(0).then(function(value) {
			let embed = {
			color: 12391760,
	           author: {
	            name: 'Changelog',
	             icon_url: 'https://cdn.discordapp.com/avatars/237578660708745216/95ce0b98a1ef4774d4e9c586b5a45121.jpg'
	           },
	           fields: [{
							name: `Latest changelog:`,
	             value: `${value[0].content}`
						}]
	       }
			bot.createMessage(msg.channel.id,{embed: embed});
		})
	}
};
