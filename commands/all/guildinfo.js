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
    let afkChanID = msg.channel.guild.afkChannelID;
    let createdOn = moment(msg.channel.guild.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss') + ' UTC ' + '(' + moment(msg.channel.guild.createdAt).fromNow() + ')';
    let verificationLevel = msg.channel.guild.verificationLevel;
    let defChan = msg.channel.guild.defaultChannel;
    let guildMembers = msg.channel.guild.memberCount;
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
            value: `${guildMembers === null ? `n/a` : ''}${guildMembers !== null ? guildMembers : ''}`,
            inline: true
          },
          {
            name: `Default Channel:`,
            value: `${defChan === null ? `n/a` : ''}${defChan !== null ? defChan.mention : ''}`,
            inline: true
          },
          {
            name: `Guild Region:`,
            value: `${guildRegion === null ? `n/a` : ''}${guildRegion !== null ? guildRegion : ''}`,
            inline: true
          },
          {
            name: `Verification Level:`,
            value: `${verificationLevel === null ? `n/a` : ''}${verificationLevel !== null ? verificationLevel : ''}`,
            inline: true
          },
          {
            name: `AFK Timeout:`,
            value: `${afkTimer === null ? `n/a` : ''}${afkTimer !== null ? afkTimer+'min' : ''}`,
            inline: true
          },
          {
            name: `AFK Channel:`,
            value: `${afkChanID === null ? `n/a` : ''}${afkChanID !== null ? '<#'+afkChanID+'>' : ''}`,
            inline: true
          },
          {
            name: `Created On:`,
            value: `${createdOn === null ? `n/a` : ''}${createdOn !== null ? createdOn : ''}`
          },
          {
            name: `Guild Owner:`,
            value: `${owner.username}#${owner.discriminator} (${msg.channel.guild.ownerID})`
          },
          {
            name: `Roles:`,
            value: `${rolelength === null ? `n/a` : ''}${rolelength !== null ? rolelength : ''}`,
            inline: true
          },
          {
            name: `Emotes:`,
            value: `${emotelength === null ? `n/a` : ''}${emotelength !== null ? emotelength : ''}`,
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
    });
  }
};
