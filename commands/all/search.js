var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Sends a google link with the search term.",
    usage: "<Search terms>",
    aliases: ['google', 'srch'],
    cooldown: 2,
    task(bot, msg, args) {
        /**
         * perm checks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         */
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (sendMessages === false) return;
        if (!args) return 'wrong usage';
        let search = args.toString();
        search = encodeURIComponent(search.trim());
        bot.createMessage(msg.channel.id, `https://www.google.com/search?q=` + `${search}`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
    }
};