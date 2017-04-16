module.exports = {
	desc: "Prunes the given number of messages. If no number is given it's standard 100.",
	usage: "<number to prune>",
  aliases: ['purge', 'clear'],
  guildOnly: true,
	requiredPermission: 'manageMessages',
	task(bot, msg, suffix) {
    var limit = '';

    if(!suffix){
      limit = 100 + 1;
    }
    else if(suffix){
			var count = parseInt(suffix);
			msgTodelete = count + 1;
      limit = msgTodelete;
    }

    bot.purgeChannel(msg.channel.id, limit)
	}
};
