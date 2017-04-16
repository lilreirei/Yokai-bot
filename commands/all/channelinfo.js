moment = require('../../node_modules/moment');

module.exports = {
  desc: "Shows info of the channel this command is used in. (only text channels for now)",
  aliases: ['ci', 'cinfo', 'channel'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, suffix) {
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
          color: 0xf4ce11,
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
