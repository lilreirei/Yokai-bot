const randomColor = require('random-color'),
    hexRgb = require('hex-rgb'),
    converter = require('hex2dec'),
    randomFloat = require('random-floating');

var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Generate a random color.",
    aliases: ['colour'],
    cooldown: 5,
    task(bot, msg) {
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
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        // generate random number
        const rn = randomFloat({
            min: 0.3,
            max: 0.99,
            fixed: 2
        });
        const rn2 = randomFloat({
            min: 0.3,
            max: 0.99,
            fixed: 2
        });
        // generate random color
        const color = randomColor(rn, rn2);
        const hex = color.hexString();
        // convert to rgb
        const rgb = hexRgb(`${hex}`).join(', ');
        // make usable for dec
        const hex2 = hex.replace("#", "0x");
        // convert to decimal
        const dec = converter.hexToDec(`${hex2}`);
        bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
                color: dec,
                author: {
                    name: ``,
                    url: ``,
                    icon_url: ``
                },
                description: ``,
                thumbnail: {
                    url: `http://api.thegathering.xyz/color/index.php?color=${hex.replace("#", "")}`
                },
                fields: [{
                        name: `Hex`,
                        value: `${hex}`,
                        inline: false
                    },
                    {
                        name: `RGB`,
                        value: `(${rgb})`,
                        inline: false
                    },
                    {
                        name: `Decimal`,
                        value: `${dec}`,
                        inline: false
                    }
                ]
            }
        }).catch(err => {
            error = JSON.parse(err.response);
            logger.error(error.code + '\n' + error.message, 'ERROR');
        });
    }
};