const RESPONSES = [
  "would you like your eggs scrambled or fried?",
  "I am jelly ;-;",
  "Carpet.",
  "I hid the body 👍",
  "UNICORNS POOPED IN MY BED!",
  "whatever you do, don't turn off the light tonight!",
  "Do you have a pickle?",
  "Sorry, I'm to busy giving my unicorn a bath.",
  "Go to the bathroom and lock the door if u hear anything run!!",
  "I'm pregnant, I think you're the dad."
];

var Nf = new Intl.NumberFormat('en-US');

module.exports = {
  desc: "Sends a random line of text.",
  aliases: ['text', 'randomt', 'rt'],
  cooldown: 2,
  task(bot, msg) {
		let choice = ~~(Math.random() * RESPONSES.length);
    	bot.createMessage(msg.channel.id, `${RESPONSES[choice]}`);
  }
};
