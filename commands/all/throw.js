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
  usage: "<username | ID | @username>",
  cooldown: 2,
  guildOnly: true,
  task(bot, msg, suffix) {
    let choice = ~~(Math.random() * EMOTES.length);
    var emotechoice = EMOTES[choice];
    let choice2 = ~~(Math.random() * RECEIVED.length);
    var receivedchoice = RECEIVED[choice2];
    var givechoice = GIVE[choice2];
    const user = this.findMember(msg, suffix);
    if (!suffix) return 'wrong usage';
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
    });

    if (msg.author.id === user.id) return bot.createMessage(msg.channel.id, {
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

    if (user.id === bot.user.id) return bot.createMessage(msg.channel.id, {
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

    if (user.id === "93973697643155456") return bot.createMessage(msg.channel.id, {
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

    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `**${msg.author.username}** threw ${emotechoice} at **${user.username}**

${user.username}: ${receivedchoice}
${msg.author.username}: ${givechoice}`
      }
    });
  }
};
