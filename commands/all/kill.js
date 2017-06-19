const findMember = require('../../utils/utils.js').findMember,
    randomItem = require('random-item');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Kill someone.",
    usage: "<username | ID | @username>",
    aliases: [],
    cooldown: 2,
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
        const user = findMember(msg, args);
        let ded = [
            `${msg.author.username} pesonally hogtied ${user.username} and threw him/her on the train tracks, baibai :wave:`,
            `${msg.author.username} dragged ${user.username} behind his/her horse.`,
            `${msg.author.username} shootes ${user.username} between the legs, wewlad that must hurt.`,
            `${msg.author.username} hogtied ${user.username} and threw you at the wolves.`,
            `${msg.author.username} got his/her bug net launcher gun and shot it at ${user.username}, wasn't very effective tho.`,
            `${msg.author.username} kicked ${user.username} from the roof.`,
            `${msg.author.username} hit ${user.username} with a pickup.`,
            `There's noway ${msg.author.username} can kill ${user.username} lol.`,
            `${msg.author.username} grabbed a flamethrower and burned everything around him including ${user.username}.`,
            `${msg.author.username} tried to kill ${user.username} but he/she killed him/herself lmao nugget.`,
            `${msg.author.username} used shadow clone jutsu and rasengan on ${user.username}.`,
            `${msg.author.username} killed ${user.username} with a massive fart.`,
            `${msg.author.username} ripped off his/her clothes and ${user.username} died from a massive nosebleed`,
            `Violence is never the solution.`,
            `${msg.author.username} grabbed his pocked knife, too bad ${user.username} had a gun.`
        ];
        const text = randomItem(ded);
        if (!args) return 'wrong usage';
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
        if (user.id === msg.author.id) return bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `Oh boii lets not kill ourselves :heart:`
            }
        }).catch(err => {
            logger.error('\n' + err, 'ERROR')
        });
        if (user.id === bot.user.id) return bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `Please don't kill me ;-;`
            }
        }).catch(err => {
            logger.error('\n' + err, 'ERROR')
        });
        if (user.id === '93973697643155456') return bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `Nuuuu don't kill my masta please ;-;`
            }
        }).catch(err => {
            logger.error('\n' + err, 'ERROR')
        });
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: 0xf4ce11,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: `${text}`
            }
        }).catch(err => {
            error = JSON.parse(err.response);
            if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
    }
}