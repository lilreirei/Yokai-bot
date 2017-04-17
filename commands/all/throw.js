const EMOTES = [
    ":trophy:",
    ":blue_car:",
    ":knife:",
    ":wrench:",
    ":tv:",
    ":poop:",
    ":basketball:",
    ":hammer:",
    ":paperclip:",
    ":scissors:",
    ":key:",
    ":syringe:"
];

const RECEIVED = [
    "You lil cunt",
    "Whyy!!",
    "Please don't do that again",
    "Go away...",
    "Not again >.>",
    "JESUS, why?",
    "common bruh",
    "fek yuu"
];

const GIVE = [
    "Hehe :stuck_out_tongue:",
    "Cus I can!",
    "Ohh I will hehe",
    "tchh ಠ_ಠ",
    "sowwy bby",
    ":yum:",
    "u wot",
    "Hm luv ya 2"
];

var Nf = new Intl.NumberFormat('en-US');

module.exports = {
    desc: "Throw a user.",
    usage: "<@user>",
    cooldown: 2,
    guildOnly: true,
    task(bot, msg) {
        let choice = ~~(Math.random() * EMOTES.length);
        var emotechoice = EMOTES[choice];
        let choice2 = ~~(Math.random() * RECEIVED.length);
        var receivedchoice = RECEIVED[choice2];
        var givechoice = GIVE[choice2];
        if (!msg.mentions[0])
            return ('wrong usage');
        else if (msg.author.id === msg.mentions[0].id) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `waaat don't throw stuff at yourself dummy.`
                }
            })
        } else if (msg.mentions[0].id === "239467119589195777") {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `nonono we're not throwing stuff at me!`
                }
            })
        } else if (msg.mentions[0].id === "93973697643155456") {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `NO! Don't hurt my master you meany ;-;`
                }
            })
        } else {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `**${msg.author.username}** threw ${emotechoice} at **${msg.mentions[0].username}**

${msg.mentions[0].username}: ${receivedchoice}
${msg.author.username}: ${givechoice}`
                }
            });
        }
    }
};
