module.exports = {
  desc: "Replay to a suggestion.",
  usage: "<channelid> | <message>",
  hidden: true,
  ownerOnly: true,
  task(bot, msg, args) {
    const str = args + "";
    const array = str.split(/ ?\| ?/),
      channelid = array[0],
      message = array[1];
    bot.createMessage(channelid, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: `Reply from owner:`,
          url: ``,
          icon_url: ``
        },
        description: `${message}`
      },
    }).catch(err => {
      bot.createMessage(msg.channel.id, {
        content: ``,
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
};
