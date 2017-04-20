const RATES = [
	"1/10",
	"2/10",
	"3/10",
	"4/10",
	"5/10",
	"6/10",
	"7/10",
	"8/10",
	"9/10",
	"10/10",
	"11/10 :ok_hand:"
];

module.exports = {
	desc: "Rates your waifu.",
	usage: "<name>",
	aliases: ['rw', 'rwaifu'],
	cooldown: 2,
	task(bot, msg, suffix) {
		if (!suffix) return 'wrong usage';

		var pusi = suffix.toString();
		var dick = suffix.toLowerCase();
		let choice = ~~(Math.random() * RATES.length);

		if (dick === 'kurozero') return bot.createMessage(msg.channel.id, ` My master is always an 11/10 :heart:`);

		if (!msg.mentions[0]) return bot.createMessage(msg.channel.id, suffix + ` is a ${RATES[choice]} waifu`);

		if (msg.mentions[0].id === "93973697643155456") return bot.createMessage(msg.channel.id, ` My master is always an 11/10 :heart:`);

		bot.createMessage(msg.channel.id, suffix + ` is a ${RATES[choice]} waifu`);
	}
};
