const axios = require("axios"),
    antiSpam = {};
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Chat with the bot.",
    usage: "<question>",
    aliases: ['cb'],
    cooldown: 2,
    task(bot, msg, args, config, settingsManager) {
        /**
         * perm checks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         */
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (sendMessages === false) return;

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
            if (!args) return bot.createMessage(msg.channel.id, `${msg.author.username}, What do you want to talk about?`)
                .catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
            axios.get(`http://api.program-o.com/v2/chatbot/?bot_id=6&say=${args}&convo_id=${msg.author.id}&format=json`)
                .then(res => {
                    let answer = res.data.botsay;
                    answer = answer.replace("Program-O", bot.user.username);
                    answer = answer.replace(/<br\/> ?/, "\n")
                    bot.createMessage(msg.channel.id, `${msg.author.username}, ${answer}`)
                        .catch(err => {
                            error = JSON.parse(err.response);
                            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                            logger.error(error.code + '\n' + error.message, 'ERROR');
                        });
                })
                .catch(err => {
                    logger.error('\n' + err, 'ERROR')
                    bot.createMessage(msg.channel.id, `${msg.author.username}, I don't wanna talk right now :slight_frown:`)
                        .catch(err => {
                            logger.error('\n' + err, 'ERROR')
                        });
                });
        }
    }
};
