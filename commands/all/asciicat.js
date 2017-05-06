var catMe = require('cat-me');

module.exports = {
  desc: "Sends a unicode cat ;3",
  usage: "[option] ('list' to view all options)",
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, suffix) {
    let cat = catMe();
    if (!suffix) return bot.createMessage(msg.channel.id, `\`\`\`${cat}\`\`\``);
    let lower = suffix.toLowerCase();
    if (lower === 'list') {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: `All cat options:`,
            url: ``,
            icon_url: ``
          },
          description: `grumpy
approaching
tubby
confused
playful
thoughtful
delighted
nyan
resting`
        }
      });
    } else {
      cat = catMe(`${suffix}`);
      bot.createMessage(msg.channel.id, `\`\`\`${cat}\`\`\``);
    }
  }
};
