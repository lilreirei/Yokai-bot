const EMOTES = [
  ":jack_o_lantern:",
  ":thinking:",
  ":fire:",
  ":zap:",
  ":eggplant:",
  ":poop:",
  ":basketball:",
  ":video_game:"
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
  task(bot, msg) {
		let choice = ~~(Math.random() * EMOTES.length);
    if(!msg.mentions[0])
      return('wrong usage');
    else if(msg.author.id === msg.mentions[0].id) {
      bot.createMessage(msg.channel.id, `waaat don't throw stuff at yourself dummy.`)
    }
    else if(msg.mentions[0].id === "239467119589195777") {
      bot.createMessage(msg.channel.id, `nonono we're not throwing stuff at me!`)
    }
    else if(msg.mentions[0].id === "93973697643155456") {
      bot.createMessage(msg.channel.id, `NO! Don't hurt my master you meany ;-;`)
    }
    else {
    	bot.createMessage(msg.channel.id,
`**${msg.author.username}** threw ${EMOTES[choice]} at **${msg.mentions[0].username}**

${msg.mentions[0].username}: ${RECEIVED[choice]}
${msg.author.username}: ${GIVE[choice]}`);
    }
  }
};
