const fs = require('fs');

module.exports = {
  desc: "Enable/disable the level up message.",
  usage: "<enable/disable>",
  aliases: ['lvlmsg', 'levelmsg', 'levelmessage'],
  cooldown: 5,
  guildOnly: true,
  requiredPermission: 'administrator',
  task(bot, msg, suffix) {
    if (!suffix) return 'wrong usage';
    const lower = suffix.toLowerCase();
    let message = JSON.parse(fs.readFileSync(`./db/message.json`, 'utf8'));

    if (suffix === 'enable') {
      message[msg.channel.guild.id] = {
        type: "true"
      };
      fs.writeFile(`./db/message.json`, JSON.stringify(message), (err) => {
        if (err) console.error(err)
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
          description: `:white_check_mark: Level up message is now enabled!`
        },
      });
    } else if (suffix === 'disable') {
      message[msg.channel.guild.id] = {
        type: "false"
      };
      fs.writeFile(`./db/message.json`, JSON.stringify(message), (err) => {
        if (err) console.error(err)
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
          description: `:white_check_mark: Level up message is now disabled!`
        },
      });
    }
  }
};
