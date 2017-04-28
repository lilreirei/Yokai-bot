module.exports = {
  desc: "Forces the bot to leave a guild.",
  usage: "<guildID>",
  aliases: ['fleave', 'fuckoff'],
  guildOnly: true,
  ownerOnly: true,
  hidden: true,
  task(bot, msg, suffix) {
    const guildID = suffix;
    bot.createMessage(guildID, {
      content: ``,
      embed: {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `This server has been blacklisted, bye.`,
        image: {
          url: ``
        }
      }
    }).then(msg => {
      bot.leaveGuild(guildID);
    }).then(left => {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `:white_check_mark: Succesfully left guild.`,
          image: {
            url: ``
          }
        }
      });
    });
  }
};
