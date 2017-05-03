moment = require('../../node_modules/moment');

module.exports = {
  desc: "Shows info of the guild.",
  usage: "Nothing, for your info | <@user> for someone else's info",
  aliases: ['ginfo', 'guild', 'server', 'serverinfo'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg) {
    var afkTimer = msg.channel.guild.afkTimeout / 60;
    var owner = msg.channel.guild.members.get(msg.channel.guild.ownerID);
    var roles = msg.channel.guild.roles.map(c => c.name).join(', '),
      rolelength = (roles.match(/, /g) || []).length + 1;
    var emotes = msg.channel.guild.emojis.map(c => c.name).join(', '),
      emotelength = (emotes.match(/, /g) || []).length + 1;
    let guildRegion = msg.channel.guild.region;
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        type: 'rich',
        author: {
          name: `Guild info of ${msg.channel.guild.name === null ? `` : ''}${msg.channel.guild.name !== null ? msg.channel.guild.name : ''}`,
          icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
        },
        description: `ID: ${msg.channel.guild.id}`,
        thumbnail: {
          url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
        },
        fields: [{
            name: `Guild Members:`,
            value: `${msg.channel.guild.memberCount}`,
            inline: true
          },
          {
            name: `Default Channel:`,
            value: `${msg.channel.guild.defaultChannel.name === null ? `` : ''}${msg.channel.guild.defaultChannel.name !== null ? msg.channel.guild.defaultChannel.mention : ''}`,
            inline: true
          },
          {
            name: `Guild Region:`,
            value: `${guildRegion === null ? `` : ''}${guildRegion !== null ? guildRegion : ''}`,
            inline: true
          },
          {
            name: `Verification Level:`,
            value: `${msg.channel.guild.verificationLevel === null ? `` : ''}${msg.channel.guild.verificationLevel !== null ? msg.channel.guild.verificationLevel : ''}`,
            inline: true
          },
          {
            name: `AFK Timeout:`,
            value: `${afkTimer === null ? `` : ''}${afkTimer !== null ? afkTimer+'min' : ''}`,
            inline: true
          },
          {
            name: `AFK Channel:`,
            value: `${msg.channel.guild.afkChannelID === null ? `` : ''}${msg.channel.guild.afkChannelID !== null ? '<#'+msg.channel.guild.afkChannelID+'>' : ''}`,
            inline: true
          },
          {
            name: `Created On:`,
            value: `${moment(msg.channel.guild.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(msg.channel.guild.createdAt).fromNow()})`
          },
          {
            name: `Guild Owner:`,
            value: `${owner.username}#${owner.discriminator} (${msg.channel.guild.ownerID})`
          },
          {
            name: `Roles:`,
            value: `${rolelength}`,
            inline: true
          },
          {
            name: `Emotes:`,
            value: `${emotelength === null ? `` : ''}${emotelength !== null ? emotelength : ''}`,
            inline: true
          }
        ]
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
      });
    })
  }
};
