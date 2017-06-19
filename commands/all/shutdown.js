module.exports = {
  desc: "Shuts down shinobu.",
  usage: "",
  ownerOnly: true,
  hidden: true,
  aliases: ['stop', 'end', 'sd'],
  task(bot, msg) {
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `Shutting down, baii baii masta :heart:`
      }
    }).then(end => {
      let exitCode = 1;
      process.exit(exitCode)
    });
  }
};
