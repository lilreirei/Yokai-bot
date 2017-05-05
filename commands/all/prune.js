module.exports = {
  desc: "Prunes the given number of messages. If no number is given it's standard 50.",
  usage: "<number to prune>",
  aliases: ['purge', 'clear'],
  guildOnly: true,
  requiredPermission: 'manageMessages',
  task(bot, msg, suffix) {
    let limit = '';

    if (!suffix) {
      limit = 50 + 1; // +1 for the command message kek
    } else if (suffix) {
      let count = parseInt(suffix),
        msgTodelete = count + 1, // yea same here nugget
        limit = msgTodelete;
    }
    bot.purgeChannel(msg.channel.id, limit).then((del, sentMsg) => {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `Deleted: ${del} messages`
        }
      }).then(sentMsg => {
        let delay = 5000;
        setTimeout(function() {
          bot.deleteMessage(sentMsg.channel.id, sentMsg.id);
        }, delay);
      }).catch(err => {
        bot.createMessage(msg.channel.id, {
          content: ``,
          embed: {
            color: 0xff0000,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${err}`,
            fields: [{
              name: `For support join:`,
              value: `https://discord.gg/Vf4ne5b`,
              inline: true
            }]
          }
        });
      });
    }).catch(err => {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${err}`,
          fields: [{
            name: `For support join:`,
            value: `https://discord.gg/Vf4ne5b`,
            inline: true
          }]
        }
      });
    });
  }
};
