module.exports = {
	desc: "Sends a random smug image from http://smug.moe",
	usage: "",
	task(bot, msg) {
		bot.createMessage(msg.channel.id, "http://smug.moe/smg/"+ ran() +".png" || 'Smug');
	}
};

function ran(p1) {
	return Math.floor((Math.random() * 58) + 1);
}
