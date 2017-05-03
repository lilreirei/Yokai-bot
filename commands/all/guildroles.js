module.exports = {
  desc: "Show all guild roles.",
  usage: "",
  aliases: ['serverroles', 'groles', 'sroles'],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: `All guild roles:`,
          url: ``,
          icon_url: ``
        },
        description: `${msg.channel.guild.roles.map(c => c.name).join(', ')}`,
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
