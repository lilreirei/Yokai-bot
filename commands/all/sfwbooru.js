const booru = require('sfwbooru');

module.exports = {
  desc: "Sends random image from a sfw booru site.",
  usage: "<site>\nType: \"s.sfwbooru list\" for a list of sites the bot can get a picture from.",
  aliases: ["sfw"],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, args) {
    if (!args)
      return 'wrong usage';
    const site = args;
    const lower = site.toLowerCase();
    if (lower === 'list') {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: `${msg.author.username}`,
            icon_url: `${msg.author.avatarURL}`
          },
          description: `e926.net, aliases: ["e9","e926"]
konachan.net, aliases: ["kn","konan","knet"]
safebooru.org, aliases: ["sb","safe","safebooru"]
tbib.org, aliases: ["tb", "tbib","big"]
dollbooru.org, aliases: ["do","doll","dollbooru"]`,
          footer: {
            text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
            icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
          }
        }
      }).catch(err => {
				bot.createMessage(msg.channel.id, { content: ``,
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
    } else {
      booru.search(site, ['', '', 's'], {
          limit: 1,
          random: true
        })
        .then(booru.commonfy)
        .then(images => {
          for (let image of images) {
            const tag = image.common.tags + "";
            const tags = tag.split(',').join(', ');
            const img = image.common.file_url.toString(" ");
            const imguri = img.replace(/ /g, "%20");
            bot.createMessage(msg.channel.id, {
              content: ``,
              embed: {
                color: 0xf4ce11,
                author: {
                  name: `${msg.author.username}`,
                  url: `${imguri}`,
                  icon_url: `${msg.author.avatarURL}`
                },
                description: `[Click here for the direct image url](${imguri})
Tags: ${tags}
Score: ${image.common.score}
Rating: ${image.common.rating}`,
                image: {
                  url: `${imguri}`
                },
                footer: {
                  text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
                  icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
                }
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
        })
        .catch(err => {
          if (err.name === 'booruError') {
            console.log(err.message)
            bot.createMessage(msg.channel.id, {
              content: ``,
              embed: {
                color: 0xf4ce11,
                author: {
                  name: ``,
                  url: ``,
                  icon_url: ``
                },
                description: `${err.message}`
              }
            })
          } else {
            console.log(err)
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
          }
        })
    }
  }
};
