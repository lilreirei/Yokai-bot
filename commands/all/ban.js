module.exports = {
  desc: "Ban the mentioned member.",
  usage: "<username | ID | @username> [days] (days is standart 0)",
  guildOnly: true,
  requiredPermission: 'banMembers',
  task(bot, msg, suffix) {
    const user = this.findMember(msg, suffix);
    var deletedays = 0;
    if (!suffix) return 'wrong usage';
    if (!user) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
      }
    });
    msg.channel.guild.members.get(bot.user.id).permission.json.banMembers
    bot.banGuildMember(msg.channel.guild.id, user.id, deletedays);
  }
}
