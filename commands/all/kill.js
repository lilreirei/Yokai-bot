var randomItem = require('random-item');

module.exports = {
  desc: "Pat someone.",
  usage: "<username | ID | @username>",
  aliases: [],
  cooldown: 2,
  guildOnly: true,
  task(bot, msg, args) {
    const user = this.findMember(msg, args);
    let ded = [
      `<@${msg.author.id}> pesonally hogtied <@${user.id}> and threw him/her on the train tracks, baibai :wave:`,
      `<@${msg.author.id}> dragged <@${user.id}> behind his/her horse.`,
      `<@${msg.author.id}> shootes <@${user.id}> between the legs, wewlad that must hurt.`,
      `<@${msg.author.id}> hogtied <@${user.id}> and threw you at the wolves.`,
      `<@${msg.author.id}> got his/her bug net launcher gun and shot it at <@${user.id}>, wasn't very effective tho.`,
      `<@${msg.author.id}> kicked <@${user.id}> from the roof.`,
      `<@${msg.author.id}> hit <@${user.id}> with a pickup.`,
      `There's noway <@${msg.author.id}> can kill <@${user.id}> lol.`,
      `<@${msg.author.id}> grabbed a flamethrower and burned everything around him including <@${user.id}>.`,
      `<@${msg.author.id}> tried to kill <@${user.id}> but he/she killed him/herself lmao nugget.`,
      `<@${msg.author.id}> used shadow clone jutsu and rasengan on <@${user.id}>.`,
      `<@${msg.author.id}> killed <@${user.id}> with a massive fart.`,
      `<@${msg.author.id}> ripped off his/her clothes and <@${user.id}> died from a massive nosebleed`,
      `Violence is never the solution.`,
      `<@${msg.author.id}> grabbed his pocked knife, too bad <@${user.id}> had a gun.`
    ];
    const text = randomItem(ded);
    if (!args) return 'wrong usage';
    if (!user) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
      }
    })
    if (user.id === msg.author.id) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `Oh boii lets not kill ourselves :heart:`
      }
    })
    if (user.id === bot.user.id) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `Please don't kill me ;-;`
      }
    })
    if (user.id === '93973697643155456') return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `Nuuuu don't kill my masta please ;-;`
      }
    })
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `${text}`
      }
    }).catch(err => {
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
      })
    });
  }
}
