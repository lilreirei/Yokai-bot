var request = require('request');

module.exports = {
	desc: "Sends random cat image from http://random.cat",
	usage: "",
	task(bot, msg, suffix) {
		request("http://random.cat/meow", function(err, response, body) {
			var cat = JSON.parse(body);
			bot.createMessage(msg.channel.id, cat.file);
		});
	}
};
