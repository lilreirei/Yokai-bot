var reload = require('require-reload')(require),
    cleverbot = reload('../special/cleverbot.js'),
    utils = reload('../utils/utils.js'),
    points = reload('../db/points.json'),
    message = reload('../db/message.json'),
    bannedUsers = reload('../banned_users.json'),
    updatePoints = false,
    updateMessage = false;
const fs = require('fs');
//let points = JSON.parse(fs.readFileSync(`./db/points.json`, 'utf8'));

module.exports = {
    handler(bot, msg, CommandManagers, config, settingsManager) {
        if (msg.author.bot === true) return;

        for (let i = 0; i < CommandManagers.length; i++) {
            if (msg.content.startsWith(CommandManagers[i].prefix))
                return CommandManagers[i].processCommand(bot, msg, config, settingsManager);
        }

        if (config.cleverbot && msg.channel.guild === undefined || (msg.mentions.length !== 0 && msg.content.search(new RegExp(`^<@!?${bot.user.id}>`)) === 0))
            cleverbot(bot, msg, config, settingsManager);

        if (!points[msg.author.id]) points[msg.author.id] = {
            points: 0,
            level: 0
        };
        let userData = points[msg.author.id];
        updatePoints = true;
        userData.points++;

        let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
        if (curLevel > userData.level) {
            // Level up!
            userData.level = curLevel;
            let message = JSON.parse(fs.readFileSync(`./db/message.json`, 'utf8'));
            if (config.nowelcomemessageGuild.includes(msg.channel.guild.id)) return;
            if ((!message[msg.channel.guild.id]) || (message[msg.channel.guild.id].type.includes("true"))) {
                bot.createMessage(msg.channel.id, `<@${msg.author.id}> You've leveled up to level **${curLevel}**!`).catch(error => { return; });
            } else if (message[msg.channel.guild.id].type.includes("false")) {
                return;
            }
        }
    },
    reloadCleverbot(bot, channelId) {
        try {
            cleverbot = reload('../special/cleverbot.js');
            bot.createMessage(channelId, "Reloaded special/cleverbot");
        } catch (error) {
            console.error(error);
            bot.createMessage(channelId, `Error reloading cleverbot: ${error}`);
        }
    }
}

// points/message shit
const interval = setInterval(() => {
    if (updatePoints === true) {
        utils.safeSave('db/points', '.json', JSON.stringify(points));
        updatePoints = false;
    }
    if (updateMessage === true) {
        utils.safeSave('db/message', '.json', JSON.stringify(message));
        updateMessage = false;
    }
}, 30000);

function handleShutdown() {
    return Promise.all([utils.safeSave('db/points', '.json', JSON.stringify(points)), utils.safeSave('db/message', '.json', JSON.stringify(message))]);
}

function destroy() {
    clearInterval(interval);
    if (updateCommand === true)
        utils.safeSave('db/points', '.json', JSON.stringify(points));
    if (updateMessage === true)
        utils.safeSave('db/message', '.json', JSON.stringify(message));
}