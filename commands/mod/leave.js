module.exports = {
  desc: "Makes the bot leave.",
  guildOnly: true,
  requiredPermission: 'administrator',
  task(bot, msg) {
    bot.createMessage(msg.channel.id, `It's not like this server was fun anyways b-baka`).then(msg => {
      msg.channel.guild.leave();
    });
  }
}
