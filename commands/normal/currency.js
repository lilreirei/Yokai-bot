var currency = require('y-currency');
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
	desc: "Convert currency",
	usage: "<value>, <from currency>, <to currency> (Make sure to seperate them with a comma)\nex. s!currency 10, EUR, USD",
	aliases: ['cc'],
	task(bot, msg, args) {
    let choose = ~~(Math.random() * COLORSDECIAML.length);
		var color = COLORSDECIAML[choose];
    var str = args.toString();
    var array = str.split(', '),
        a = parseInt(array[0], 10),
        b = array[1],
        c = array[2];
        console.log(a, b, c);
    if(!args) {
      return 'wrong usage'
    }
    currency.convert(a, b, c, function(err, converted) {
      if (err){
        bot.createMessage(msg.channel.id, `${err}`)
      }
      else{
        console.log(converted);
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: `${msg.author.username}`,
              url: `${msg.author.avatarURL}`,
              icon_url: `${msg.author.avatarURL}`
            },
            description: `${b}: ${a}
${c}: ${converted}`,
            footer: {
                text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                icon_url: `${msg.channel.guild ? msg.channel.guild.iconURL : ""}`
            }
          }
        });
      }
    })
	}
};

/**/
