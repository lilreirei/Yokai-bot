module.exports = {
  desc: "Add a reaction to the provided message id. (Custom emotes do NOT work yet.)",
  usage: "<messageID> | <:emote:> (Custom emotes do NOT work yet.)",
  cooldown: 5,
  guildOnly: true,
  aliases: ['react'],
  task(bot, msg, args) {
    const str = args + "";
    const array = str.split(/ ?\| ?/),
      msgid = array[0],
      emote = array[1];
    bot.addMessageReaction(msg.channel.id, msgid, emote).then(err => {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${err}`
        }
      });
    });
  }
};
