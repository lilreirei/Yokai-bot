const translate = require('google-translate-api');

module.exports = {
        desc: "Translate words/sentences.",
        usage: "<word(s)/sentance>, <from lang>, <to lang> (Make sure to seperate them with a comma)\nex. s.translate I'm feeling sick, en, nl",
        aliases: ['tl', 'trans'],
        cooldown: 10,
        guildOnly: true,
        task(bot, msg, args) {
            var str = args + "";
            var array = str.split(', '),
                a = array[0],
                b = array[1],
                c = array[2];
            if (!args) {
                return 'wrong usage'
            }
            translate(`${a}`, { from: `${b}`, to: `${c}` }).then(res => {
                        var old = res.from.text.value;
                        var oldres = old.replace(/&#39;/, "'")

                        var neww = res.text;
                        var newwres = neww.replace(/&#39;/, "'")
                        if (res.from.text.autoCorrected === true) {
                            bot.createMessage(msg.channel.id, {
                                        content: ``,
                                        embed: {
                                            color: 0xf4ce11,
                                            author: {
                                                name: `${msg.author.username}`,
                                                url: `${msg.author.avatarURL}`,
                                                icon_url: `${msg.author.avatarURL}`
                                            },
                                            description: `${b}: ${oldres}
          ${c}: ${newwres}`,
                                            footer: {
                                                text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                  icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
              }
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
        else {
          bot.createMessage(msg.channel.id, { content: ``,
            embed: {
              color: 0xf4ce11,
              author: {
                name: `${msg.author.username}`,
                url: `${msg.author.avatarURL}`,
                icon_url: `${msg.author.avatarURL}`
              },
              description: `${b}: ${a}
          ${c}: ${newwres}`,
              footer: {
                  text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                  icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
              }
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
      }).catch(err => {
				bot.createMessage(msg.channel.id, {
					content: ``,
					embed: {
						color: 0xff0000,
						author: {
							name: ``,
							url: ``,
							icon_url: ``
						},
						description: `${err}`,
						fields: [{
							name: `For support join:`,
							value: `https://discord.gg/Vf4ne5b`,
							inline: true
						}]
					}
				}).catch(err => {
          return;
        });
      });
	}
};