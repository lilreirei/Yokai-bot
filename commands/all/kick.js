module.exports = {
  desc: "Kick the mentioned member.",
  usage: "<mention>",
  guildOnly: true,
  requiredPermission: 'kickMembers',
  task(bot, msg, suffix) {
    if (!suffix) {
      return 'wrong usage'
    }
    else {
      msg.channel.guild.members.get(bot.user.id).permission.json.kickMembers
      bot.kickGuildMember(msg.channel.guild.id, msg.mentions[0].id);
    }
  }
}
