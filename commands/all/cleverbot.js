const axios = require("axios");
const antiSpam = {};

module.exports = {
    desc: "Chat with the bot.",
    usage: "<question>",
    aliases: ['cb'],
    cooldown: 2,
    task(bot, msg, args, config, settingsManager) {
        function spamCheck(userId, args) {
            if (!antiSpam.hasOwnProperty(userId)) {
                antiSpam[userId] = args;
                return true;
            }
            if (antiSpam[userId] == args)
                return false;
            antiSpam[userId] = args;
            return true;
        }
        if (spamCheck(msg.author.id, args)) {
            cleverbotTimesUsed++;
            msg.channel.sendTyping();
            if (!args) return bot.createMessage(msg.channel.id, `${msg.author.username}, What do you want to talk about?`);
            axios.get(`http://api.program-o.com/v2/chatbot/?bot_id=6&say=${args}&convo_id=${msg.author.id}&format=json`).then(res => {
                bot.createMessage(msg.channel.id, `${msg.author.username}, ${res.data.botsay.replace("Program-O", bot.user.username)}`).catch(err => {
                    const error = JSON.parse(err.response);
                    if (error.code === 50013) {
                        bot.createMessage(msg.channel.id, `❌ I do not have the required permissions for this command to function normally.`).catch(err => {
                            bot.getDMChannel(msg.author.id).then(dmchannel => {
                                dmchannel.createMessage(`I tried to respond to a command you used in **${msg.channel.guild.name}**, channel: ${msg.channel.mention}.\nUnfortunately I do not have the required permissions. Please speak to the guild owner.`).catch(err => {
                                    return;
                                });
                            }).catch(err => {
                                return;
                            });
                        });
                    } else {
                        bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
Code: ${error.code}
Message: ${error.message}

For more help join the support server.
Get the invite link by doing s.support
\`\`\`
`).catch(err => {
                            return;
                        });
                    }
                });
            }).catch(err => {
                console.log(err);
                bot.createMessage(msg.channel.id, `${msg.author.username}, I don't wanna talk right now :slight_frown:`).catch(err => {
                    return;
                });
            });
        }
    }
};