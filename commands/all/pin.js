module.exports = {
  desc: "Pins the message with the given message id.",
  usage: "<Message ID>",
  requiredPermission: 'manageMessages',
  task(bot, msg, suffix) {
    if (!suffix) return 'wrong usage'
    bot.pinMessage(msg.channel.id, suffix).catch(err => {
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
    })
  }
};
