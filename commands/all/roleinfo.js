module.exports = {
        desc: "Get info about a role.",
        usage: "<rolename> (Case-sensitive)",
        aliases: ['role', 'ri'],
        cooldown: 5,
        guildOnly: true,
        task(bot, msg, suffix) {
            if (!suffix) return 'wrong usage';
            const role = msg.channel.guild.roles.find(o => o.name === `${suffix}`);
            if (!role) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `Couldn't find role, remember it's case-sensitive.`
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
            bot.createMessage(msg.channel.id, {
                        content: ``,
                        embed: {
                            color: 0xf4ce11,
                            author: {
                                name: `Info about: ${role.name}`,
                                url: ``,
                                icon_url: ``
                            },
                            description: ``,
                            thumbnail: {
                                url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
        },
        fields: [{
            name: `ID`,
            value: `${role.id}`,
            inline: true
          },
          {
            name: `Hoist`,
            value: `${role.hoist}`,
            inline: true
          },
          {
            name: `Position`,
            value: `${role.position}`,
            inline: true
          },
          {
            name: `Permissions`,
            value: `${role.permissions.allow}`,
            inline: true
          }
        ],
        footer: {
          text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`
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
};