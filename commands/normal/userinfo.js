moment = require('../../node_modules/moment');
const COLORSDECIAML = [
  0x46A030,
  0x2B54CE,
  0x00FFFF,
  0xFF0000,
  0xFFFF00,
  0xFF8000,
  0x9932CC
];

module.exports = {
  desc: "Shows info of a user.",
  usage: "Nothing, for your info | <@user> for someone else's info",
  aliases: ['ui', 'uinfo', 'user'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, guild) {
    let color = ~~(Math.random() * COLORSDECIAML.length);
    var final = COLORSDECIAML[color];
    if (msg.mentions.length === 1) {
var user = msg.mentions[0];
      var id = msg.channel.guild.members.get(msg.mentions[0].id);
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: final,
          type: 'rich',
          author: {
            name: `User info of ${msg.mentions[0].username}`,
            icon_url: `${user.avatarURL}`
          },
          description: `Playing ${id.game === null ? `n/a` : ''}${id.game !== null ? '**'+id.game.name+'**' : ''}`,
          thumbnail: {
            url: `${user.avatarURL}`
          },
          fields: [
            {
              name: `Username:`,
              value: `${msg.mentions[0].username}#${msg.mentions[0].discriminator}`,
              inline: true
            },
            {
              name: `Bot:`,
              value: `${msg.mentions[0].bot}`,
              inline: true
            },
            {
              name: `User Id:`,
              value: `${msg.mentions[0].id}`,
              inline: true
            },
            {
              name: `Nickname:`,
              value: `${id.nick === null ? `n/a` : ''}${id.nick !== null ? id.nick : ''}`,
              inline: true
            },
            {
              name: `Created at:`,
              value: `${msg.mentions[0].createdAt === null ? `` : ''}${moment(msg.mentions[0].createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(msg.mentions[0].createdAt).fromNow()})`
            },
            {
              name: `Joined at:`,
              value: `${id.joinedAt === null ? `` : ''}${moment(id.joinedAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(id.joinedAt).fromNow()})`
            },
            {
              name: `Status:`,
              value: `${id.status}`
            }/*,
            {
              name: ``,
              value: `${id.roles.map(r=>msg.channel.guild.roles.get(r).name).join(', ')}`
            }*/
          ]
        }
      })
    }
    else {
	var user = msg.author;
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: final,
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
            }/*,
            {
              name: ``,
              value: `${msg.member.roles.map(r=>msg.channel.guild.roles.get(r).name).join(', ')}`
            }*/
          ]
        }
      })
    }
  }
};
