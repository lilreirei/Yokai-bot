module.exports = {
    desc: "Add a reaction to the provided message id. (Custom emotes do NOT work yet.)",
    usage: "<messageID> | <:emote:> (Custom emotes do NOT work yet.)",
    cooldown: 5,
    guildOnly: true,
    aliases: ['react'],
    requiredPermission: 'addReactions',
    task(bot, msg, args) {
        /**
         * perm checks
         * @param {boolean} addReactions - Checks if the bots permissions has addReactions
         */
        const addReactions = msg.channel.permissionsOf(bot.user.id).has('addReactions');
        if (addReactions === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`addReactions\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        const str = args + "";
        const array = str.split(/ ?\| ?/),
            msgid = array[0],
            emote = array[1];
        bot.addMessageReaction(msg.channel.id, msgid, emote)
            .then(() => {
                bot.deleteMessage(msg.channel.id, msg.id)
                    .catch(err => {
                        logger.error('\n' + err, 'ERROR')
                    });
            })
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
    }
};