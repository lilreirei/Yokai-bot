module.exports = {
  desc: "Show all guild emotes.",
  usage: "",
  aliases: ['serveremotes', 'gemotes', 'semotes'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: `All guild emotes:`,
          url: ``,
          icon_url: ``
        },
        description: `<:${msg.channel.guild.emojis.map(c => c.name + ":" + c.id).join('> <:')}>`,
        footer: {
          text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
          icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
        }
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
