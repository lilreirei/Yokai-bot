var reload = require('require-reload')(require),
    utils = reload('../../utils/utils.js'),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);
const fs = require('fs');

const RESPONSES = [
    ":heart:",
    ":yellow_heart:",
    ":green_heart:",
    ":blue_heart:",
    ":purple_heart:"
];

module.exports = {
    desc: "Pay your respect.",
    aliases: ['f'],
    cooldown: 2,
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
        let choice = ~~(Math.random() * RESPONSES.length);
        if (!suffix) {
            let respect = JSON.parse(fs.readFileSync(`./db/respect.json`, 'utf8'));
            let count = respect["res"];
            count.total++;
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `**${msg.author.username}** has paid their respect ${RESPONSES[choice]}`,
                    fields: [{
                        name: `Total respects paid:`,
                        value: `${count.total}`,
                        inline: true
                    }]
                }
            }).then(() => {
                utils.safeSave('db/respect', '.json', JSON.stringify(respect));
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        } else {
            let respect = JSON.parse(fs.readFileSync(`./db/respect.json`, 'utf8'));
            let count = respect["res"];
            count.total++;
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `**${msg.author.username}** has paid their respect for **${suffix}** ${RESPONSES[choice]}`,
                    fields: [{
                        name: `Total respects paid:`,
                        value: `${count.total}`,
                        inline: true
                    }]
                }
            }).then(() => {
                utils.safeSave('db/respect', '.json', JSON.stringify(respect));
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        }
    }
};