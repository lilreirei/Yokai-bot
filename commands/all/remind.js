const schedule = require('node-schedule'),
    moment = require('moment'),
    date = require('date.js');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Set a reminder for yourself or someone else.",
    usage: "<me/someone_else> | <reminder> | <time>",
    cooldown: 10,
    guildOnly: true,
    task(bot, msg, args) {
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
        if (!args) return 'wrong usage';
        args = args.split(/ ?\| ?/);
        if (!args[0]) return 'wrong usage';
        if (!args[1]) return 'wrong usage';
        if (!args[2]) return 'wrong usage';
        const person = args[0];
        const reminder = args[1];
        const time = args[2];

        const newDate = date(time);
        if (newDate <= new Date()) {
            return bot.createMessage(msg.channel.id, 'that date doesn\'t seem to be valid.').catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
        }

        schedule.scheduleJob(newDate, () => {
            if (person == 'me') {
                bot.createMessage(msg.channel.id, `${msg.author.mention}, I'm reminding you to **${reminder}**`)
                    .catch(err => {
                        error = JSON.parse(err.response);
                        if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                        logger.error(error.code + '\n' + error.message, 'ERROR');
                    });
            } else {
                const user = this.findMember(msg, person)
                if (!user) return bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xff0000,
                        author: {
                            name: ``,
                            url: ``,
                            icon_url: ``
                        },
                        description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
                    }
                }).catch(err => {
                    logger.error('\n' + err, 'ERROR')
                });
                bot.createMessage(msg.channel.id, `${user.mention}, I'm reminding you to **${reminder}**`)
                    .catch(err => {
                        error = JSON.parse(err.response);
                        if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                        logger.error(error.code + '\n' + error.message, 'ERROR');
                    });
            }
        });
        bot.createMessage(msg.channel.id, 'reminder set for ' + moment(newDate).format('dddd, MMMM Do YYYY, h:mm:ss a ZZ'))
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
    }
};