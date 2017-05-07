var reload = require('require-reload'),
	_Logger = reload('../utils/Logger.js'),
	bannedGuilds = reload('../banned_guilds.json'),
	logger;

module.exports = function(bot, _settingsManager, config, guild) {
	if (logger === undefined)
		logger = new _Logger(config.logTimestamp);
	logger.logWithHeader('JOINED GUILD', 'bgGreen', 'black', `${guild.name} (${guild.id}) owned by ${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}`);
	if (bannedGuilds.bannedGuildIds.includes(guild.id)){
		logger.logWithHeader('LEFT BANNED GUILD', 'bgRed', 'black', guild.name);
		guild.leave();
	} else if (config.nowelcomemessageGuild.includes(guild.id))
			logger.logWithHeader('DIDNT SEND WELCOME MESSGAE', 'bgBlue', 'black', guild.name);
	else
		guild.defaultChannel.createMessage("Awesome a new server!\nType `s.help` for a commands list.\nYou could also view all my commands on https://commands.shinobubot.xyz (Note not every command is on the website yet.)");
		const defid = guild.defaultChannel.id;
		bot.createChannelInvite(defid, {temporary: false, unique:true}).then(inv => {
			bot.createMessage('306837434275201025', `
\`\`\`md
${guild.name} (${guild.id})
https://discord.gg/${inv.code}
\`\`\`
`);
		});
}
