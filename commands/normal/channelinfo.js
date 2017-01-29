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
  desc: "Shows info of the channel this command is used in. (only text channels for now)",
  aliases: ['ci', 'cinfo', 'channel'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, suffix) {
    let color = ~~(Math.random() * COLORSDECIAML.length);
    var final = COLORSDECIAML[color];
      var afkTimer = msg.channel.guild.afkTimeout/60;
      var owner = msg.channel.guild.members.get(msg.channel.guild.ownerID);

      if (suffix) {
        var delay = 3000;
        bot.createMessage(msg.channel.id, "Don't add anything behind the command.").then(sentMsg => {
          setTimeout(function (){
    				bot.deleteMessage(sentMsg.channel.id, msg.id)
    				bot.deleteMessage(sentMsg.channel.id, sentMsg.id)
    			}, delay);
        });
      }
      else {
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: final,
          type: 'rich',
          author: {
            name: `Channel info of ${msg.channel.name === null ? `` : ''}${msg.channel.name !== null ? msg.channel.name : ''}`,
            icon_url: ``
          },
          description: `ID: ${msg.channel.id}`,
          thumbnail: {
            url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
          },
          fields: [
            {
              name: `Guild:`,
              value: `${msg.channel.guild.name === null ? `` : ''}${msg.channel.guild.name !== null ? msg.channel.guild.name : ''}`,
              inline: true
            },
            {
              name: `Name:`,
              value: `${msg.channel.mention === null ? `` : ''}${msg.channel.mention !== null ? msg.channel.mention : ''}`,
              inline: true
            },
            {
              name: `Position:`,
              value: `${msg.channel.position === null ? `` : ''}${msg.channel.position !== null ? msg.channel.position : ''}`,
              inline: true
            },
            {
              name: `Topic:`,
              value: `${msg.channel.topic === null ? `None` : ''}${msg.channel.topic !== null ? msg.channel.topic : ''}`,
              inline: true
            },
            {
              name: `Created On:`,
              value: `${moment(msg.channel.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} UTC (${moment(msg.channel.createdAt).fromNow()})`
            },
          ]
        }
      })
    }
  }
};
