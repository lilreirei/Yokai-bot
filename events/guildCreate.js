var reload = require('require-reload'),
	_Logger = reload('../utils/Logger.js'),
	logger;

module.exports = function(bot, _settingsManager, config, guild) {
	if (logger === undefined)
		logger = new _Logger(config.logTimestamp);
	logger.logWithHeader('JOINED GUILD', 'bgGreen', 'black', `${guild.name} owned by ${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}`);
	if (config.bannedGuildIds.includes(guild.id)){
		logger.logWithHeader('LEFT BANNED GUILD', 'bgRed', 'black', guild.name);
		guild.leave();
	} else if (config.nowelcomemessageGuild.includes(guild.id))
			logger.logWithHeader('DIDNT SEND WELCOME MESSGAE', 'bgBlue', 'black', guild.name);
	else
		guild.defaultChannel.createMessage("Awesome a new server!\nA few commands to help you out: `s!help` for normal commands and `s$help` for moderation commands.\nYou could also view all my commands on https://commands.shinobubot.xyz (this part of the site is sill in development by my master) :heart:");
}
