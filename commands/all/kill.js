var randomItem = require('random-item');

module.exports = {
    desc: "Kill someone.",
    usage: "<username | ID | @username>",
    aliases: [],
    cooldown: 2,
    guildOnly: true,
    task(bot, msg, args) {
        const user = this.findMember(msg, args);
        let ded = [
            `${msg.author.mention} pesonally hogtied ${user.mention} and threw him/her on the train tracks, baibai :wave:`,
            `${msg.author.mention} dragged ${user.mention} behind his/her horse.`,
            `${msg.author.mention} shootes ${user.mention} between the legs, wewlad that must hurt.`,
            `${msg.author.mention} hogtied ${user.mention} and threw you at the wolves.`,
            `${msg.author.mention} got his/her bug net launcher gun and shot it at ${user.mention}, wasn't very effective tho.`,
            `${msg.author.mention} kicked ${user.mention} from the roof.`,
            `${msg.author.mention} hit ${user.mention} with a pickup.`,
            `There's noway ${msg.author.mention} can kill ${user.mention} lol.`,
            `${msg.author.mention} grabbed a flamethrower and burned everything around him including ${user.mention}.`,
            `${msg.author.mention} tried to kill ${user.mention} but he/she killed him/herself lmao nugget.`,
            `${msg.author.mention} used shadow clone jutsu and rasengan on ${user.mention}.`,
            `${msg.author.mention} killed ${user.mention} with a massive fart.`,
            `${msg.author.mention} ripped off his/her clothes and ${user.mention} died from a massive nosebleed`,
            `Violence is never the solution.`,
            `${msg.author.mention} grabbed his pocked knife, too bad ${user.mention} had a gun.`
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
            return;
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
            return;
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
            return;
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
            return;
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