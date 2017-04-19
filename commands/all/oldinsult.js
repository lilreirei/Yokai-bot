module.exports = {
  desc: "Generate old shakespeare-rified insult.",
  usage: "<username | ID | @username>",
  cooldown: 5,
  guildOnly: true,
	aliases: ['oinsult'],
  task(bot, msg, args) {
    var oldinsult = require('shakespeare-insult1.1.0').random();
		if(!args) {
      const insult = oldinsult;
	    bot.createMessage(msg.channel.id, {
	      content: ``,
	      embed: {
	        color: 0xf4ce11,
	        author: {
	          name: ``,
	          url: ``,
	          icon_url: ``
	        },
	        description: `${insult}`
	      },
	    });
		} else {
			const insult = oldinsult;
			const user = this.findMember(msg, args)
      if (!user) return bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
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
	        description: `<@${user.id}>, ${insult}`
	      },
	    });
		}
  }
};
