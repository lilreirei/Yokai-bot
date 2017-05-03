const OwnerId = require('../../config.json').adminIds[0];
const moment = require('../../node_modules/moment');

module.exports = {
  desc: "Send feedback or suggestion directly to my(bot owner(Kurozero🔥#9917)) DMs without having to join the support server.",
  usage: "<feedback/suggestion>",
  aliases: ['feedback', 'report', 'bug'],
  cooldown: 3600,
  guildOnly: true,
  task(bot, msg, args) {
    bot.getDMChannel(OwnerId).then(dmchannel => {
      const time = Date.now();
      const owner = msg.channel.guild.members.get(msg.channel.guild.ownerID);
      const user = msg.author;
      dmchannel.createMessage({
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: `Report from: ${msg.member.user.username}#${msg.member.user.discriminator} (${msg.member.user.id})`,
            icon_url: `${user.avatarURL}`
          },
          description: ``,
          fields: [{
              name: `Timestamp`,
              value: `${moment(time).utc(+2).format('ddd MMM DD YYYY | kk:mm:ss')} UTC+2`,
              inline: true
            },
            {
              name: `Owner`,
              value: `${owner.username}#${owner.discriminator} (${msg.channel.guild.ownerID})`,
              inline: true
            },
						{
              name: `Channel ID`,
              value: `${msg.channel.id}`,
              inline: false
            },
            {
              name: `Report`,
              value: `${args}`,
              inline: false
            }
          ],
          footer: {
            text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
            icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
          }
        },
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
        });
      });
      bot.createMessage(msg.channel.id, `:white_check_mark: Successfully send your feedback/suggestion.`);
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
      });
    });
  }
};
