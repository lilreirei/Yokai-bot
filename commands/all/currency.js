var currency = require('y-currency');

module.exports = {
  desc: "Convert currency",
  usage: "<value>, <from currency>, <to currency> (Make sure to seperate them with a comma)\nex. s.currency 10, EUR, USD",
  aliases: ['cc'],
  guildOnly: true,
  cooldown: 10,
  task(bot, msg, args) {
    var str = args.toString();
    var array = str.split(', '),
      a = parseInt(array[0], 10),
      b = array[1],
      c = array[2];
    if (!args) return 'wrong usage'
    currency.convert(a, b, c, function(err, converted) {
      if (err) return bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${err}`,
          fields: [{
            name: `For support join:`,
            value: `https://discord.gg/Vf4ne5b`,
            inline: true
          }]
        }
      });
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: `${msg.author.username}`,
            url: `${msg.author.avatarURL}`,
            icon_url: `${msg.author.avatarURL}`
          },
          description: `${b}: ${a}
${c}: ${converted}`
        }
      });
    })
  }
};
