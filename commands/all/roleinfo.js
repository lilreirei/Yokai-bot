module.exports = {
  desc: "Get info about a role.",
  usage: "<rolename> (Case-sensitive)",
  aliases: ['role', 'ri'],
  cooldown: 5,
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
      console.log(err);
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${err}`
        }
      });
    });
  }
};
