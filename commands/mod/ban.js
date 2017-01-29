module.exports = {
  desc: "Ban the mentioned member.",
  usage: "<mention> [days] (days is standart 0)",
  guildOnly: true,
  requiredPermission: 'banMembers',
  task(bot, msg, suffix) {
    if (!suffix) {
	return 'wrong usage'
    }
    else {
      var deletedays = 0;
      msg.channel.guild.members.get(bot.user.id).permission.json.banMembers
      bot.banGuildMember(msg.channel.guild.id, msg.mentions[0].id, deletedays);
    }
  }
}
