const Leetscript = require('leetscript')

module.exports = {
  desc: "Convert text to leetspeak.",
  usage: "<simple/advanced> | <text>",
  aliases: ['leet'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, args) {
    if (!args) return 'wrong usage';
    const str = args + "";
    const array = str.split(/ ?\| ?/),
      option = array[0],
      text = array[1];
    const lower = option.toLowerCase();
    if (lower === 'simple') {
      const LeetSimple = new Leetscript(true);
      const simple = LeetSimple.encode(`${text}`);
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${simple}`
        }
      });
    } else if (lower === 'advanced') {
      const LeetAdvanced = new Leetscript();
      const advanced = LeetAdvanced.encode(`${text}`)
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${advanced}`
        }
      });
    } else {
      return 'wrong usage';
    }
  }
};
