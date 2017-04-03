var weather = require('yahoo-weather');

module.exports = {
  desc: "Get the weather from the specified city",
	usage: "<City>, <Weather unit> ((C = celsius or F = fahrenheit)Make sure to seperate the city and the weather unit with a comma!)",
	aliases: ['we'],
  task(bot, msg, args) {
    if(!args) {
      return 'wrong usage'
    }
    var str = args.toString();
    var array = str.split(', '),
        a = array[0],
        b = array[1];
    weather(`${a}`, `${b}`).then(info => {
      if((b === 'f') || (b === 'F')) {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: 0xf4ce11,
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
            color: 0xf4ce11,
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
            color: 0xf4ce11,
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
          color: 0xf4ce11,
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
