var weather = require('yahoo-weather');
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
  desc: "Get the weather from the specified city",
	usage: "<City>, <Weather unit> ((C = celsius or F = fahrenheit)Make sure to seperate the city and the weather unit with a comma!)",
	aliases: ['we'],
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
    weather(`${a}`, `${b}`).then(info => {
      if((b === 'f') || (b === 'F')) {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `**Weather for ${info.location.city}, ${info.location.country}**
  **Weather:** ${info.item.condition.text}
  **Temp:** ${info.item.condition.temp}°F
  **Humidity:** ${info.atmosphere.humidity}%
  **Wind:** ${info.wind.speed}mph
  **Sunrise:** ${info.astronomy.sunrise} **Sunset:** ${info.astronomy.sunset}`,
            image: {
              url: ``
            },
            footer: {
                text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                icon_url: `${msg.channel.guild ? msg.channel.guild.iconURL : ""}`
            }
          }
        })
      }
      else if ((b === 'c') || (b === 'C')) {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `**Weather for ${info.location.city}, ${info.location.country}**
  **Weather:** ${info.item.condition.text}
  **Temp:** ${info.item.condition.temp}°C
  **Humidity:** ${info.atmosphere.humidity}%
  **Wind:** ${info.wind.speed}kph
  **Sunrise:** ${info.astronomy.sunrise} **Sunset:** ${info.astronomy.sunset}`,
            image: {
              url: ``
            },
            footer: {
                text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                icon_url: `${msg.channel.guild ? msg.channel.guild.iconURL : ""}`
            }
          }
        })
      }
      else {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `Specified weather unit is invalid`
          }
        })
      }
    }).catch(err => {
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: color,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${err}`
        }
      })
    });
  }
}
