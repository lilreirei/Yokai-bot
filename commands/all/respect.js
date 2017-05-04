var reload = require('require-reload')(require),
  utils = reload('../../utils/utils.js');
const fs = require('fs');

const RESPONSES = [
  ":heart:",
  ":yellow_heart:",
  ":green_heart:",
  ":blue_heart:",
  ":purple_heart:"
];

var Nf = new Intl.NumberFormat('en-US');

module.exports = {
  desc: "Pay your respect.",
  aliases: ['f'],
  cooldown: 2,
  task(bot, msg, suffix) {
    let choice = ~~(Math.random() * RESPONSES.length);
    if (!suffix) {
      let respect = JSON.parse(fs.readFileSync(`./db/respect.json`, 'utf8'));
      let count = respect["res"];
      count.total++;
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `**${msg.author.username}** has paid their respect ${RESPONSES[choice]}`,
          fields: [{
            name: `Total respects paid:`,
            value: `${count.total}`,
            inline: true
          }]
        }
      }).then(() => {
        utils.safeSave('db/respect', '.json', JSON.stringify(respect));
      });
    } else {
      let respect = JSON.parse(fs.readFileSync(`./db/respect.json`, 'utf8'));
      let count = respect["res"];
      count.total++;
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `**${msg.author.username}** has paid their respect for **${suffix}** ${RESPONSES[choice]}`,
          fields: [{
            name: `Total respects paid:`,
            value: `${count.total}`,
            inline: true
          }]
        }
      }).then(() => {
        utils.safeSave('db/respect', '.json', JSON.stringify(respect));
      });
    }
  }
};
