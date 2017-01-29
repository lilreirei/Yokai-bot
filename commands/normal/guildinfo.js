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
  desc: "Shows info of the guild.",
  usage: "Nothing, for your info | <@user> for someone else's info",
  aliases: ['ginfo', 'guild', 'server', 'serverinfo'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg) {
    let color = ~~(Math.random() * COLORSDECIAML.length);
    var final = COLORSDECIAML[color];
      var afkTimer = msg.channel.guild.afkTimeout/60;
      var owner = msg.channel.guild.members.get(msg.channel.guild.ownerID);

      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: final,
          type: 'rich',
          author: {
            name: `Guild info of ${msg.channel.guild.name === null ? `` : ''}${msg.channel.guild.name !== null ? msg.channel.guild.name : ''}`,
            icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
          },
          description: `ID: ${msg.channel.guild.id}`,
          thumbnail: {
            url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
          },
          fields: [
            {
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
              value: `${msg.channel.guild.region}`,
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
            }
          ]
        }
      })
  }
};
