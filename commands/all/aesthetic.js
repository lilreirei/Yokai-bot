const aesthetics = require('aesthetics');

module.exports = {
    desc: "Convert text to aesthetic text.",
    usage: "<text>",
    aliases: ['aes'],
    guildOnly: true,
    cooldown: 5,
    task(bot, msg, suffix) {
        if (!suffix) return 'wrong usage';
        const conv = aesthetics(suffix);
        bot.createMessage(msg.channel.id, conv);
    }
};