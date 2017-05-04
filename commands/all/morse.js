const morse = require('morse-node').create();

module.exports = {
  desc: "Encode or decode morse code",
  usage: "<encode/decode> | <text/morse code>",
  aliases: [],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, args) {
    let str = args.split(/ ?\| ?/),
      type = str[0],
      value = str[1];
    if (!args) return 'wrong usage';
    if (!type) return 'wrong usage';
    if (!value) return 'wrong usage';
    let lType = type.toLowerCase();
    if (lType === "encode") {
      try {
        let encoded = morse.encode(value);
        if (!encoded) return bot.createMessage(msg.channel.id, {
          content: ``,
          embed: {
            color: 0xff0000,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `Ahh eh oops, something went wrong please try again.`,
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
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${encoded}`
          }
        });
      } catch (e) {
        bot.createMessage(msg.channel.id, {
          content: ``,
          embed: {
            color: 0xff0000,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${e}`,
            fields: [{
              name: `For support join:`,
              value: `https://discord.gg/Vf4ne5b`,
              inline: true
            }]
          }
        });
      }
    } else if (lType === "decode") {
      try {
        let decoded = morse.decode(value);
        if (!decoded) return bot.createMessage(msg.channel.id, {
          content: ``,
          embed: {
            color: 0xff0000,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `Ahh eh oops, something went wrong please try again.`,
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
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${decoded}`
          }
        });
      } catch (e) {
        bot.createMessage(msg.channel.id, {
          content: ``,
          embed: {
            color: 0xff0000,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${e}`,
            fields: [{
              name: `For support join:`,
              value: `https://discord.gg/Vf4ne5b`,
              inline: true
            }]
          }
        });
      }
    }
  }
};
