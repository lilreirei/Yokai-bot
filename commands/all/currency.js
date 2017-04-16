var currency = require('y-currency');

module.exports = {
	desc: "Convert currency",
	usage: "<value>, <from currency>, <to currency> (Make sure to seperate them with a comma)\nex. s!currency 10, EUR, USD",
	aliases: ['cc'],
	task(bot, msg, args) {
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
            color: 0xf4ce11,
            author: {
              name: `${msg.author.username}`,
              url: `${msg.author.avatarURL}`,
              icon_url: `${msg.author.avatarURL}`
            },
            description: `${b}: ${a}
${c}: ${converted}`,
            footer: {
                text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
            }
          }
        });
      }
    })
	}
};

/**/
