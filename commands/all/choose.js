const RESPONSES = [
    c => `I chose **${c}**`,
    c => `I pick ${c}`,
    c => `${c} is the best choice`,
    c => `${c} is my choice`,
    c => `${c} of course!`
];
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Makes a choice for you.",
    usage: "<choice> | <choice> [| choice...]",
    aliases: ['c', 'pick', 'decide', 'choice'],
    cooldown: 5,
    task(bot, msg, suffix) {
        /**
         * perm checks
         * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         */
        const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        if (!suffix)
            return 'wrong usage';
        let choices = suffix.split(/ ?\| ?/);
        if (choices.length < 2 && suffix.includes(','))
            choices = suffix.split(/, ?/);
        choices = choices.filter(c => c !== ''); //Remove empty choices
        if (choices.length < 2)
            return 'wrong usage';

        let pick = ~~(Math.random() * choices.length);
        choices.forEach((c, i) => {
            if ((c.includes('homework') || c.includes('sleep') || c.includes('study') || c.includes('productiv')) && Math.random() < .3)
                return pick = i; //Higher chance to pick choices containing key words
        });
        bot.createMessage(msg.channel.id, RESPONSES[~~(Math.random() * RESPONSES.length)](choices[pick]))
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
    }
};