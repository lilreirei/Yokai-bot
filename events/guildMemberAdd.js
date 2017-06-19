module.exports = (bot, settingsManager, _config, guild, member) => {
    let welcomeMessage = settingsManager.getWelcome(guild, member);
    if (member.user.bot === true) return;
    if (welcomeMessage !== null) {
        if (welcomeMessage[0] === 'DM') {
            member.user.getDMChannel().then(chan => {
                chan.createMessage(welcomeMessage[1]);
            });
        } else
            bot.createMessage(welcomeMessage[0], welcomeMessage[1]);
    }

    let joinEventChannel = settingsManager.getEventSetting(guild.id, 'memberjoined');
    if (joinEventChannel !== null)
        bot.createMessage(joinEventChannel, `\`[${new Date().toLocaleString()}]\` **Member Joined:** ${member.user.username}`);

    if (guild.id === '240059867744698368') {
        member.addRole('304266397947789322', 'New member')
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
    }
}