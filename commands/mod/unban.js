module.exports = {
  desc: "Unban a member by id.",
  usage: "<userID>",
  guildOnly: true,
  requiredPermission: 'banMembers',
  task(bot, msg, suffix) {
    if (!suffix) {
      return 'wrong usage'
    }
    else {
      msg.channel.guild.members.get(bot.user.id).permission.json.banMembers
      bot.unbanGuildMember(msg.channel.guild.id, suffix);
    }
  }
}
