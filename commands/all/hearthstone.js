var Hearthstone = require('hearthstone-mashape')('Uhpw4la1oxmsh4QBHISImGfoMFPSp1k0Ar9jsn8s6Ojj6jlHa2', 'enUS');

module.exports = {
  desc: "Search hearthstone card by name.",
  usage: "<card name>, [gold] (Make sure to seperate card name and gold with a comma!)",
  aliases: ['hs'],
  cooldown: 10,
  guildOnly: true,
  task(bot, msg, args) {
    if (!args) {
      return 'wrong usage'
    }
    var str = args.toString();
    var array = str.split(', '),
      a = array[0],
      b = array[1];
    var params = {
      name: `${a}`,
      collectible: 1
    };
    Hearthstone.card(params, function(err, data) {
      if (err) return bot.createMessage(msg.channel.id, {
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
      if (data === null) {
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
      } else {
        if (b === undefined) {
          bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
              color: 0xf4ce11,
              author: {
                name: `${msg.author.username}`,
                url: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? data[0].img : ''}`,
                icon_url: `${msg.author.avatarURL}`
              },
              description: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Name: `+data[0].name : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Card Set: `+data[0].cardSet : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Type: `+data[0].type : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Rarity: `+data[0].rarity : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Flavor: `+data[0].flavor : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Artist: `+data[0].artist : ''}
${data[0] === undefined ? `Make sure to use a card name.` : ''}${data[0] !== undefined ? `[Click here for the direct image url](`+data[0].img+`)` : ''}`,
              image: {
                url: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? data[0].img : ''}`
              }
            }
          });
        } else {
          bot.createMessage(msg.channel.id, {
            content: ``,
            embed: {
              color: 0xf4ce11,
              author: {
                name: `${msg.author.username}`,
                url: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? data[0].imgGold : ''}`,
                icon_url: `${msg.author.avatarURL}`
              },
              description: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Name: `+data[0].name : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Card Set: `+data[0].cardSet : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Type: `+data[0].type : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Rarity: `+data[0].rarity : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Flavor: `+data[0].flavor : ''}
${data[0] === undefined ? `` : ''}${data[0] !== undefined ? `Artist: `+data[0].artist : ''}
${data[0] === undefined ? `Make sure to use a card name.` : ''}${data[0] !== undefined ? `[Click here for the direct image url](`+data[0].imgGold+`)` : ''}`,
              image: {
                url: `${data[0] === undefined ? `` : ''}${data[0] !== undefined ? data[0].imgGold : ''}`
              }
            }
          });
        }
      }
    });
  }
}
