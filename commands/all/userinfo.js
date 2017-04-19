moment = require('../../node_modules/moment');

module.exports = {
  desc: "Shows info of a user.",
  usage: "<username | ID | @username>",
  aliases: ['ui', 'uinfo', 'user'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, args) {
    if(!args) {
      const user = msg.author;
      const userroles = msg.member.roles.map(r=>msg.channel.guild.roles.get(r).name).join(', ');
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: 0xf4ce11,
          type: 'rich',
          author: {
            name: `User info of ${msg.author.username}`,
            icon_url: `${user.avatarURL}`
          },
          description: `Playing ${msg.member.game === null ? `n/a` : ''}${msg.member.game !== null ? '**'+msg.member.game.name+'**' : ''}`,
          thumbnail: {
            url: `${user.avatarURL}`
          },
          fields: [
            {
              name: `Username:`,
              value: `${msg.member.user.username}#${msg.member.user.discriminator}`,
              inline: true
            },
            {
              name: `Bot:`,
              value: `${msg.member.user.bot}`,
              inline: true
            },
            {
              name: `User Id:`,
              value: `${msg.member.user.id}`,
              inline: true
            },
            {
              name: `Nickname:`,
              value: `${msg.member.nick === null ? `n/a` : ''}${msg.member.nick !== null ? msg.member.nick : ''}`,
              inline: true
            },
            {
              name: `Created at:`,
              value: `${msg.member.user.createdAt === null ? `` : ''}${moment(msg.member.user.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(msg.member.user.createdAt).fromNow()})`
            },
            {
              name: `Joined at:`,
              value: `${msg.member.joinedAt === null ? `` : ''}${moment(msg.member.joinedAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(msg.member.joinedAt).fromNow()})`
            },
            {
              name: `Status:`,
              value: `${msg.member.status}`
            },
            {
              name: `Roles:`,
              value: `${msg.member.roles === undefined ? `n/a` : ''}${msg.member.roles !== undefined ? `${userroles}` : ''}`
            }
          ]
        }
      }).catch(err => {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: 0xff0000,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${err}`
          }
        })
      });
    } else {
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
      const id = msg.channel.guild.members.get(user.id);
      const userroles = id.roles.map(r => msg.channel.guild.roles.get(r).name).join(', ');
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: 0xf4ce11,
          type: 'rich',
          author: {
            name: `User info of ${user.username}`,
            icon_url: `${user.avatarURL}`
          },
          description: ``,
          thumbnail: {
            url: `${user.avatarURL}`
          },
          fields: [
            {
              name: `Username`,
              value: `${user.username}#${user.discriminator}`,
              inline: true
            },
            {
              name: `Bot`,
              value: `${user.bot}`,
              inline: true
            },
            {
              name: `ID`,
              value: `${user.id}`,
              inline: true
            },
            {
              name: `Nickname`,
              value: `${id.nick === null ? `n/a` : ''}${id.nick !== null ? id.nick : ''}`,
              inline: true
            },
            {
              name: `Status`,
              value: `${id.status}`,
              inline: true
            },
            {
              name: `Playing`,
              value: `${id.game === null ? `n/a` : ''}${id.game !== null ? '**'+id.game.name+'**' : ''}`,
              inline: true
            },
            {
              name: `Created at`,
              value: `${user.createdAt === null ? `` : ''}${moment(user.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(user.createdAt).fromNow()})`,
              inline: false
            },
            {
              name: `Joined at`,
              value: `${id.joinedAt === null ? `` : ''}${moment(id.joinedAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(id.joinedAt).fromNow()})`,
              inline: false
            },
            {
              name: `Roles`,
              value: `${id.roles === undefined ? `n/a` : ''}${id.roles !== undefined ? `${userroles}` : ''}`,
              inline: false
            }
          ]
        }
      }).catch(err => {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: 0xff0000,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${err}`
          }
        })
      });
    }
  }
};
