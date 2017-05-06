var toUnicode = require('to-unicode');

module.exports = {
  desc: "Convert text to unicode characters.",
  usage: "<text> | [option/font] ('list' for a list of options/fonts)",
  aliases: ['uni'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, args) {
    if (!args) return 'wrong usage';
    const str = args + "";
    const array = str.split(/ ?\| ?/),
      text = array[0],
      font = array[1];
    var lower = text.toLowerCase();
    if (lower === 'list') return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: `Full list of all options/fonts:`,
          url: ``,
          icon_url: ``
        },
        description: `circled: ⓐⓑⓒ
circledNeg: 🅐🅑🅒
fullWidth: ａｂｃ
mathBold: 𝐚𝐛𝐜
mathBoldFraktur: 𝖆𝖇𝖈
mathBoldItalic: 𝒂𝒃𝒄
mathBoldScript: 𝓪𝓫𝓬
mathDouble: 𝕒𝕓𝕔
mathMono: 𝚊𝚋𝚌
mathSans: 𝖺𝖻𝖼
mathSansBold: 𝗮𝗯𝗰
mathSansBoldItalic: 𝙖𝙗𝙘
mathSansItalic: 𝘢𝘣𝘤
parenthesized: ⒜⒝⒞
squared: 🄰🄱🄲
squaredNeg: 🅰🅱🅲
rockDots: äḅċ
smallCaps: ᴀʙᴄ
stroked: Ⱥƀȼ
inverted: ɐqɔ
reversed: Adↄ-`
      }
    });
    if (!font) {
      var ransom_note = text;
      var scrambled = ransom_note.split("").map(function(letter) {
        return toUnicode(letter)
      }).join("")
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${scrambled}`
        }
      });
    } else {
      var ransom_note = text;
      var scrambled = ransom_note.split("").map(function(letter) {
        return toUnicode(letter, font)
      }).join("")
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${scrambled}`
        }
      });
    }
  }
};
