const pussy = require('../../pussy.json');
const randomItem = require('random-item');

module.exports = {
    desc: "Sends a random pussy pic.",
    usage: "",
    aliases: [],
    cooldown: 5,
    guildOnly: true,
    task(bot, msg, args, config, settingsManager) {
        const nsfw = settingsManager.getNSFW(msg.channel.guild.id, msg.channel.id);
        if (!nsfw) return bot.createMessage(msg.channel.id, 'You can only use this command in an **nsfw** channels, use \`s.settings nsfw <allow/deny>\`.');
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: ``,
                image: {
                    url: `${randomItem(pussy)}`
                }
            }
        });
    }
}