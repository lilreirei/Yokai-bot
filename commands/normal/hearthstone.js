var Hearthstone = require('hearthstone-mashape')('Uhpw4la1oxmsh4QBHISImGfoMFPSp1k0Ar9jsn8s6Ojj6jlHa2', 'enUS');
const COLORS = [
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
  desc: "Search hearthstone card by name.",
	usage: "<card name>, [gold] (Make sure to seperate card name and gold with a comma!)",
	aliases: ['hs'],
  task(bot, msg, args) {
    if(!args) {
      return 'wrong usage'
    }
    let choose = ~~(Math.random() * COLORS.length);
		var color = COLORS[choose];
    var str = args.toString();
    var array = str.split(', '),
        a = array[0],
        b = array[1];
    var params = {
      name: `${a}`,
      collectible: 1
    };
    Hearthstone.card(params, function(err, data) {
      if(data === null) {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${err}, make sure you used the correct name.`
          }
        })
      }
      else {
        if(b === undefined) {
          bot.createMessage(msg.channel.id, { content: ``,
            embed: {
              color: color,
              author: {
                name: `${msg.author.username}`,
                url: `${data[0].img}`,
                icon_url: `${msg.author.avatarURL}`
              },
              description: `Name: ${data[0].name}
Card Set: ${data[0].cardSet}
Type: ${data[0].type}
Rarity: ${data[0].rarity}
Flavor: ${data[0].flavor}
Artist: ${data[0].artist}
[Click here for the direct image url](${data[0].img})`,
              image: {
                url: `${data[0].img}`
              },
              footer: {
                  text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                  icon_url: `${msg.channel.guild ? msg.channel.guild.iconURL : ""}`
              }
            }
          });
        } else {
          bot.createMessage(msg.channel.id, { content: ``,
            embed: {
              color: color,
              author: {
                name: `${msg.author.username}`,
                url: `${data[0].imgGold}`,
                icon_url: `${msg.author.avatarURL}`
              },
              description: `Name: ${data[0].name}
Card Set: ${data[0].cardSet}
Type: ${data[0].type}
Rarity: ${data[0].rarity}
Flavor: ${data[0].flavor}
Artist: ${data[0].artist}
[Click here for the direct image url](${data[0].imgGold})`,
              image: {
                url: `${data[0].imgGold}`
              },
              footer: {
                  text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                  icon_url: `${msg.channel.guild ? msg.channel.guild.iconURL : ""}`
              }
            }
          });
        }
      }
    });
  }
}
