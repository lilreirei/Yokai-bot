const RESPONSES = [
    c => `I chose **${c}**`,
    c => `I pick ${c}`,
    c => `${c} is the best choice`,
    c => `${c} is my choice`,
    c => `${c} of course!`
];

module.exports = {
    desc: "Makes a choice for you.",
    usage: "<choice> | <choice> [| choice...]",
    aliases: ['c', 'pick', 'decide', 'choice'],
    cooldown: 5,
    task(bot, msg, suffix) {
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
        bot.createMessage(msg.channel.id, RESPONSES[~~(Math.random() * RESPONSES.length)](choices[pick])).catch(err => {
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