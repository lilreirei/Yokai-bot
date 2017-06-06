const booru = require('sfwbooru')

module.exports = {
        desc: "Sends a sfw image from a booru site with the given tags. (Max 2 tags, seperate tags by space!",
        usage: "<site> [<tag1> <tag2>] (Max 2 tags, tags must be seperated by space!).\nType: \"s.sfwbooru list\" for a list of sites the bot can get a picture from.",
        aliases: ['sfw'],
        cooldown: 5,
        guildOnly: true,
        task(bot, msg, args) {
            if (!args) {
                return 'wrong usage'
            } else {
                var str = args + "";
                var array = str.split(' '),
                    a = array[0],
                    b = array[1],
                    c = array[2];

                const lower = a.toLowerCase();
                if (lower === 'list') {
                    bot.createMessage(msg.channel.id, {
                                content: ``,
                                embed: {
                                    color: 0xf4ce11,
                                    author: {
                                        name: `${msg.author.username}`,
                                        icon_url: `${msg.author.avatarURL}`
                                    },
                                    description: `konachan.com, aliases: ["kc","konac","kcom"]
konachan.net, aliases: ["kn","konan","knet"]
yande.re, aliases: ["yd","yand","yandere"]
safebooru.org, aliases: ["sb","safe","safebooru"]
tbib.org, aliases: ["tb", "tbib","big"]
dollbooru.org, aliases: ["do","doll","dollbooru"]
lolibooru.moe, aliases: ["lb", "lol", "loli", "lolibooru"]`,
                                    footer: {
                                        text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
              icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
            }
          }
        }).catch(err => {
            const error = JSON.parse(err.response);
            if (error.code === 50013) {
                bot.createMessage(msg.channel.id, `❌ I do not have the required permissions for this command to function normally.`).catch(err => {
                    bot.getDMChannel(msg.author.id).then(dmchannel => {
                        dmchannel.createMessage(`I tried to respond to a command you used in **${msg.channel.guild.name}**, channel: ${msg.channel.mention}.\nUnfortunately I do not have the required permissions. Please speak to the guild owner.`).catch(err => {
                            return;
                        });
                    }).catch(err => {
                        return;
                    });
                });
            } else {
                bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
Code: ${error.code}
Message: ${error.message}

For more help join the support server.
Get the invite link by doing s.support
\`\`\`
`).catch(err => {
                    return;
                });
            }
        });
      } else {
        if((b) && (!c)) {
          booru.search(`${a}`, [`${b}`, `s`], {
              limit: 1,
              random: true
            })
            .then(booru.commonfy)
            .then(images => {
              for (let image of images) {
                var img = image.common.file_url.toString(" ");
                var imguri = img.replace(/ /g, "%20");
                bot.createMessage(msg.channel.id, {
                  content: ``,
                  embed: {
                    color: 0xf4ce11,
                    author: {
                      name: `Click here for the direct image url`,
                      url: `${imguri}`,
                      icon_url: `${msg.author.avatarURL}`
                    },
                    description: `Searched tags: ${b}
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
            const error = JSON.parse(err.response);
            if (error.code === 50013) {
                bot.createMessage(msg.channel.id, `❌ I do not have the required permissions for this command to function normally.`).catch(err => {
                    bot.getDMChannel(msg.author.id).then(dmchannel => {
                        dmchannel.createMessage(`I tried to respond to a command you used in **${msg.channel.guild.name}**, channel: ${msg.channel.mention}.\nUnfortunately I do not have the required permissions. Please speak to the guild owner.`).catch(err => {
                            return;
                        });
                    }).catch(err => {
                        return;
                    });
                });
            } else {
                bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
Code: ${error.code}
Message: ${error.message}

For more help join the support server.
Get the invite link by doing s.support
\`\`\`
`).catch(err => {
                    return;
                });
            }
        });
              }
            })
            .catch(err => {
              if (err.name === 'booruError') {
                bot.createMessage(msg.channel.id, {
                  content: ``,
                  embed: {
                    color: 0xff0000,
                    author: {
                      name: ``,
                      url: ``,
                      icon_url: ``
                    },
                    description: `${err.message}`,
                    fields: [{
                      name: `For support join:`,
                      value: `https://discord.gg/Vf4ne5b`,
                      inline: true
                    }]
                  }
                }).catch(err => {
                  return;
                });
              } else {
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
                }).catch(err => {
                  return;
                });
              }
            })
        } else if((!b) && (!c)) {
          booru.search(`${a}`, [`s`], {
              limit: 1,
              random: true
            })
            .then(booru.commonfy)
            .then(images => {
              for (let image of images) {
                var img = image.common.file_url.toString(" ");
                var imguri = img.replace(/ /g, "%20");
                bot.createMessage(msg.channel.id, {
                  content: ``,
                  embed: {
                    color: 0xf4ce11,
                    author: {
                      name: `Click here for the direct image url`,
                      url: `${imguri}`,
                      icon_url: `${msg.author.avatarURL}`
                    },
                    description: `Score: ${image.common.score}
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
            const error = JSON.parse(err.response);
            if (error.code === 50013) {
                bot.createMessage(msg.channel.id, `❌ I do not have the required permissions for this command to function normally.`).catch(err => {
                    bot.getDMChannel(msg.author.id).then(dmchannel => {
                        dmchannel.createMessage(`I tried to respond to a command you used in **${msg.channel.guild.name}**, channel: ${msg.channel.mention}.\nUnfortunately I do not have the required permissions. Please speak to the guild owner.`).catch(err => {
                            return;
                        });
                    }).catch(err => {
                        return;
                    });
                });
            } else {
                bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
Code: ${error.code}
Message: ${error.message}

For more help join the support server.
Get the invite link by doing s.support
\`\`\`
`).catch(err => {
                    return;
                });
            }
        });
              }
            })
            .catch(err => {
              if (err.name === 'booruError') {
                bot.createMessage(msg.channel.id, {
                  content: ``,
                  embed: {
                    color: 0xff0000,
                    author: {
                      name: ``,
                      url: ``,
                      icon_url: ``
                    },
                    description: `${err.message}`,
                    fields: [{
                      name: `For support join:`,
                      value: `https://discord.gg/Vf4ne5b`,
                      inline: true
                    }]
                  }
                }).catch(err => {
                  return;
                });
              } else {
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
                }).catch(err => {
                  return;
                });
              }
            })
        } else {
          booru.search(`${a}`, [`${b}`, `${c}`, `s`], {
              limit: 1,
              random: true
            })
            .then(booru.commonfy)
            .then(images => {
              for (let image of images) {
                var img = image.common.file_url.toString(" ");
                var imguri = img.replace(/ /g, "%20");
                bot.createMessage(msg.channel.id, {
                  content: ``,
                  embed: {
                    color: 0xf4ce11,
                    author: {
                      name: `Click here for the direct image url`,
                      url: `${imguri}`,
                      icon_url: `${msg.author.avatarURL}`
                    },
                    description: `Searched tags: ${b}, ${c}
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
            const error = JSON.parse(err.response);
            if (error.code === 50013) {
                bot.createMessage(msg.channel.id, `❌ I do not have the required permissions for this command to function normally.`).catch(err => {
                    bot.getDMChannel(msg.author.id).then(dmchannel => {
                        dmchannel.createMessage(`I tried to respond to a command you used in **${msg.channel.guild.name}**, channel: ${msg.channel.mention}.\nUnfortunately I do not have the required permissions. Please speak to the guild owner.`).catch(err => {
                            return;
                        });
                    }).catch(err => {
                        return;
                    });
                });
            } else {
                bot.createMessage(msg.channel.id, `
\`\`\`
ERROR
Code: ${error.code}
Message: ${error.message}

For more help join the support server.
Get the invite link by doing s.support
\`\`\`
`).catch(err => {
                    return;
                });
            }
        });
              }
            })
            .catch(err => {
              if (err.name === 'booruError') {
                bot.createMessage(msg.channel.id, {
                  content: ``,
                  embed: {
                    color: 0xff0000,
                    author: {
                      name: ``,
                      url: ``,
                      icon_url: ``
                    },
                    description: `${err.message}`,
                    fields: [{
                      name: `For support join:`,
                      value: `https://discord.gg/Vf4ne5b`,
                      inline: true
                    }]
                  }
                }).catch(err => {
                  return;
                });
              } else {
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
                }).catch(err => {
                  return;
                });
              }
            })
        }
      }
    }
  }
};