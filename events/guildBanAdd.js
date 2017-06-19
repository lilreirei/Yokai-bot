module.exports = (bot, settingsManager, _config, guild, user) => {
    let banEventChannel = settingsManager.getEventSetting(guild.id, 'userbanned');
    if (banEventChannel !== null)
        bot.createMessage(banEventChannel, {
            content: ``,
            embed: {
                color: 0xdb0f0f,
                author: {
                    name: `${user.username}#${user.discriminator} (${user.id})`,
                    icon_url: `${user.avatarURL}`
                },
                title: `Type:`,
                description: `Ban :hammer:`,
                footer: {
                    icon_url: ``,
                    text: `${new Date().toLocaleString()}`
                }
            }
        });
}