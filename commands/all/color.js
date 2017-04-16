const COLORSDECIAML = [
  0x46A030,
  0x2B54CE,
  0x00FFFF,
  0xFF0000,
  0xFFFF00,
  0xFF8000,
  0x9932CC
];

const COLORSNAME = [
  "green",
  "blue",
  "cyan",
  "red",
  "yellow",
  "orange",
  "purple"
];

module.exports = {
  desc: "Show a random color or a color from the hex/decimal code given.",
  aliases: ['colour'],
  task(bot, msg, suffix) {
    if(!suffix) {
      let choice = ~~(Math.random() * COLORSDECIAML.length);
      let hex = (COLORSDECIAML[choice]).toString(16);
      var c = COLORSDECIAML[choice];
      var components = {
        r: (c & 0xff0000) >> 16,
        g: (c & 0x00ff00) >> 8,
        b: (c & 0x0000ff)
    }

      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: COLORSDECIAML[choice],
          author: {
            name: `${COLORSNAME[choice]}`,
            icon_url: ``
          },
          description: `**Hex: #${hex}**
**Decimal: ${COLORSDECIAML[choice]}**
**RGB: (${components.r}, ${components.g}, (${components.b})**`
        }
      })
    }
    else {
      var suf = suffix;

      if(suf.charAt( 0 ) === '#') {
        suf = suf.slice( 1 );
      let color = parseInt(suf, 16);
      var c = color;
      var components = {
        r: (c & 0xff0000) >> 16,
        g: (c & 0x00ff00) >> 8,
        b: (c & 0x0000ff)
    }
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: `Custom color`,
              icon_url: ``
            },
            description: `**Hex: #${suf}**
**Decimal: ${color}**
**RGB: (${components.r}, ${components.g}, ${components.b})**

Requested by *${msg.author.username}*`
          }
        })
      }
      else if((suf.charAt(0) === '0') && (suf.charAt(1) === 'x')) {
        suf = suf.slice( 2 );
      let color = parseInt(suf, 16);
      var c = color;
      var components = {
        r: (c & 0xff0000) >> 16,
        g: (c & 0x00ff00) >> 8,
        b: (c & 0x0000ff)
    }
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: `Custom color`,
              icon_url: ``
            },
            description: `**Hex: #${suf}**
**Decimal: ${color}**
**RGB: (${components.r}, ${components.g}, ${components.b})**

Requested by *${msg.author.username}*`
          }
        })
      }
      else if(suffix.length === 6) {
        let color = parseInt(suf, 16);
        var c = color;
        var components = {
          r: (c & 0xff0000) >> 16,
          g: (c & 0x00ff00) >> 8,
          b: (c & 0x0000ff)
      }
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: `Custom color`,
              icon_url: ``
            },
            description: `**Hex: #${suf}**
**Decimal: ${color}**
**RGB: (${components.r}, ${components.g}, ${components.b})**

Requested by *${msg.author.username}*`
          }
        })
      }
      else {
        var int = parseInt(suffix);
        let hex = (int).toString(16);
        var c = int;
        var components = {
          r: (c & 0xff0000) >> 16,
          g: (c & 0x00ff00) >> 8,
          b: (c & 0x0000ff)
      }
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: suf,
            author: {
              name: `Custom color`,
              icon_url: ``
            },
            description: `**Hex: #${hex}**
**Decimal: ${suf}**
**RGB: (${components.r}, ${components.g}, ${components.b})**

Requested by *${msg.author.username}*`
          }
        })
      }
    }
  }
};
