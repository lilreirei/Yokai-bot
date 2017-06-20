var reload = require('require-reload')(require),
  config = reload('../../config.json'),
  error,
  logger,
  logger = new(reload('../../utils/Logger.js'))(config.logTimestamp),
  moment = require('../../node_modules/moment'),
  findMember = require('../../utils/utils.js').findMember;

module.exports = {
  desc: "Shows info of a user.",
  usage: "<username | ID | @username>",
  aliases: ['ui', 'uinfo', 'user'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, args) {
    /**
     * perm checks
     * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
     * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
     */
    const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
    const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
    if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
      .catch(err => {
        error = JSON.parse(err.response);
        if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
        logger.error(error.code + '\n' + error.message, 'ERROR');
      });
    if (sendMessages === false) return;
    if (!args) {
      const user = msg.author;
      const userroles = msg.member.roles.map(r => msg.channel.guild.roles.get(r).name).join(', ');
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          type: 'rich',
          author: {
            name: `User info of ${msg.author.username}`,
            icon_url: `${user.avatarURL}`,
            url: `${user.avatarURL}`
          },
          description: ``,
          thumbnail: {
            url: `${user.avatarURL}`
          },
          fields: [{
              name: `Username`,
              value: `${msg.member.user.username}#${msg.member.user.discriminator}`,
              inline: true
            },
            {
              name: `Bot`,
              value: `${msg.member.user.bot}`,
              inline: true
            },
            {
              name: `ID`,
              value: `${msg.member.user.id}`,
              inline: true
            },
            {
              name: `Nickname`,
              value: `${msg.member.nick === null ? `n/a` : ''}${msg.member.nick !== null ? msg.member.nick : ''}`,
              inline: true
            },
            {
              name: `Status`,
              value: `${msg.member.status}`,
              inline: true
            },
            {
              name: `Playing`,
              value: `${msg.member.game === null ? `n/a` : ''}${msg.member.game !== null ? msg.member.game.name : ''}`,
              inline: true
            },
            {
              name: `Created at`,
              value: `${msg.member.user.createdAt === null ? `` : ''}${moment(msg.member.user.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(msg.member.user.createdAt).fromNow()})`,
              inline: false
            },
            {
              name: `Joined at`,
              value: `${msg.member.joinedAt === null ? `` : ''}${moment(msg.member.joinedAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(msg.member.joinedAt).fromNow()})`,
              inline: false
            },
            {
              name: `Roles`,
              value: `${userroles === '' ? `n/a` : ''}${userroles !== '' ? `${userroles}` : ''}`,
              inline: false
            }
          ]
        }
      }).catch(err => {
        error = JSON.parse(err.response);
        if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
        logger.error(error.code + '\n' + error.message, 'ERROR');
      });
    } else {
      const user = findMember(msg, args)
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
      }).catch(err => {
        logger.error('\n' + err, 'ERROR')
      });
      const id = msg.channel.guild.members.get(user.id);
      const userroles = id.roles.map(r => msg.channel.guild.roles.get(r).name).join(', ');
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          type: 'rich',
          author: {
            name: `User info of ${user.username}`,
            icon_url: `${user.avatarURL}`,
            url: `${user.avatarURL}`
          },
          description: ``,
          thumbnail: {
            url: `${user.avatarURL}`
          },
          fields: [{
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
              value: `${id.game === null ? `n/a` : ''}${id.game !== null ? id.game.name : ''}`,
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
              value: `${userroles === '' ? `n/a` : ''}${userroles !== '' ? `${userroles}` : ''}`,
              inline: false
            }
          ]
        }
      }).catch(err => {
        error = JSON.parse(err.response);
        if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
        logger.error(error.code + '\n' + error.message, 'ERROR');
      });
    }
  }
};