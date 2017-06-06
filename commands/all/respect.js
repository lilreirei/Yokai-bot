var reload = require('require-reload')(require),
    utils = reload('../../utils/utils.js');
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
    }
};