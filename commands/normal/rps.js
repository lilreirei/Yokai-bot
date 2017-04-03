const RPS = [
	'rock',
	'paper',
	'scissors'
];

module.exports = {
	desc: "Play rps against shinobu",
	aliases: [],
	cooldown: 5,
	task(bot, msg, args) {
		let choice = ~~(Math.random() * RPS.length),
				chosen = RPS[choice];
		if(!args) {
			return 'wrong usage'
		}
		let user = args.toLowerCase();
		if(args === chosen) {
			bot.createMessage(msg.channel.id, { content: ``,
			  embed: {
			    color: 0xf4ce11,
			    author: {
			      name: ``,
			      icon_url: ``
			    },
			    description: `You: ${user}
			Shinobu: ${chosen}
			Rip it's a tied game...`
			  }
			})
		}
		else if((user === 'rock') && (chosen === 'scissors')) {
			bot.createMessage(msg.channel.id, { content: ``,
			  embed: {
			    color: 0xf4ce11,
			    author: {
			      name: ``,
			      icon_url: ``
			    },
			    description: `You: rock
			Shinobu: scissors
			Rock beats scissors, you win`
				}
			})
		}
		else if((user === 'rock') && (chosen === 'paper')) {
			bot.createMessage(msg.channel.id, { content: ``,
			  embed: {
			    color: 0xf4ce11,
			    author: {
			      name: ``,
			      icon_url: ``
			    },
			    description: `You: rock
			Shinobu: paper
			Paper beats rock, shinobu wins`
			  }
			})
		}
		else if((user === 'paper') && (chosen === 'rock')) {
			bot.createMessage(msg.channel.id, { content: ``,
			  embed: {
			    color: 0xf4ce11,
			    author: {
			      name: ``,
			      icon_url: ``
			    },
			    description: `You: paper
			Shinobu: rock
			Paper beats rock, you win`
			  }
			})
		}
		else if((user === 'paper') && (chosen === 'scissors')) {
			bot.createMessage(msg.channel.id, { content: ``,
			  embed: {
			    color: 0xf4ce11,
			    author: {
			      name: ``,
			      icon_url: ``
			    },
			    description: `You: paper
			Shinobu: scissors
			Scissors beats paper, shinobu wins`
			  }
			})
		}
		else if((user === 'scissors') && (chosen === 'paper')) {
			bot.createMessage(msg.channel.id, { content: ``,
			  embed: {
			    color: 0xf4ce11,
			    author: {
			      name: ``,
			      icon_url: ``
			    },
			    description: `You: scissors
			Shinobu: paper
			Scissor beats paper, you win`
			  }
			})
		}
		else if((user === 'scissors') && (chosen === 'rock')) {
			bot.createMessage(msg.channel.id, { content: ``,
			  embed: {
			    color: 0xf4ce11,
			    author: {
			      name: ``,
			      icon_url: ``
			    },
			    description: `You: scissors
			Shinobu: rock
			Rock beats scissors, shinobu wins`
			  }
			})
		}
	}
};
