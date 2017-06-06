const randomColor = require('random-color');
const hexRgb = require('hex-rgb');
const converter = require('hex2dec');
const randomFloat = require('random-floating');

module.exports = {
    desc: "Generate a random color.",
    aliases: ['colour'],
    cooldown: 5,
    task(bot, msg) {
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
    }
};