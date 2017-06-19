module.exports = {
    desc: "",
    cooldown: 5,
    hidden: true,
    ownerOnly: true,
    task(bot, msg, suffix) {
        const channelid = `${suffix}`;
        bot.createChannelInvite(channelid, { temporary: false, unique: true }).then(inv => {
            bot.createMessage(msg.channel.id, `https://discord.gg/${inv.code}`);
        });
    }
}