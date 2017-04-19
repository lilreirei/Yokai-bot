var blasphemer = require('blasphemy');

module.exports = {
  desc: "Generate an actual insult.",
  usage: "<username | ID | @username>",
  cooldown: 5,
  guildOnly: true,
	aliases: [],
  task(bot, msg, args) {
		if(!args) {
      const insult = blasphemer.blaspheme();
			console.log(insult);
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
			const insult = blasphemer.blaspheme();
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
