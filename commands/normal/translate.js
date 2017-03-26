const translate = require('google-translate-api');
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
	desc: "Translate words/sentences.",
	usage: "<word(s)/sentance>, <from lang>, <to lang> (Make sure to seperate them with a comma)\nex. s!translate I'm feeling sick, en, nl",
	aliases: ['tl', 'trans'],
	task(bot, msg, args) {
    let choose = ~~(Math.random() * COLORSDECIAML.length);
		var color = COLORSDECIAML[choose];
    var str = args + "";
    var array = str.split(', '),
        a = array[0],
        b = array[1],
        c = array[2];
    if(!args) {
      return 'wrong usage'
    }
    translate(`${a}`, {from: `${b}`, to: `${c}`}).then(res => {
        var old = res.from.text.value;
        var oldres = old.replace(/&#39;/, "'")

        var neww = res.text;
        var newwres = neww.replace(/&#39;/, "'")

      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: color,
          author: {
            name: `${msg.author.username}`,
            url: `${msg.author.avatarURL}`,
            icon_url: `${msg.author.avatarURL}`
          },
          description: `${b}: ${oldres}
      ${c}: ${newwres}`
        },
        footer: {
            text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
            icon_url: `${msg.channel.guild ? msg.channel.guild.iconURL : ""}`
        }
      });
    }).catch(err => {
        bot.createMessage(msg.channel.id, `${err}`);
    });
	}
};
