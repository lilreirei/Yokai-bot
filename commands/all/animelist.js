var reload = require('require-reload')(require),
  config = reload('../../config.json'),
  error,
  logger,
  logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
  desc: "Gets info about your anime list using the following tags <watching/completed/onhold>. (note: completed doesn't return all completed.)",
  usage: "<watching/completed/onhold>, <mal username>",
  aliases: ['mallist', 'alist'],
  cooldown: 10,
  task(bot, msg, suffix) {
    /**
     * perm checks
     * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
     * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
     */
    const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
    const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
    if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
      .catch(err => {
        error = JSON.parse(err.response);
        if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
        logger.error(error.code + '\n' + error.message, 'ERROR');
      });
    if (sendMessages === false) return;
    var args = suffix.toString();
    var data = args.split(', '),
      type = data[0],
      username = data[1];
    var myAnimeList = require('myanimelist')({
      username: `${username}`
    })
    if (type === undefined) return 'wrong usage';
    var type = type.toLowerCase();
    if (type === 'watching') {
      myAnimeList.getAnimeList(1, (err, resp) => {
        if (err) {
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
            logger.error('\n' + err, 'ERROR')
          });
        }
        var t = resp.map(function (title) {
          return title.series_title;
        }).toString();
        var titles = t.split(',').join('\n');
        var s = resp.map(function (score) {
          return score.my_score;
        }).toString();
        var scores = s.split(',').join('\n');
        var w = resp.map(function (watched) {
          return watched.my_watched_episodes;
        }).toString();
        var watchedep = s.split(',').join('\n');
        let embed = {
          color: 0xf4ce11,
          author: {
            name: `Currently Watching`,
            url: ``,
            icon_url: ``
          },
          description: ``,
          fields: [{
              name: `Titles:`,
              value: `${titles === null ? `None` : ''}${titles !== null ? titles : ''}`,
              inline: true
            },
            {
              name: `Score:`,
              value: `${scores === null ? `None` : ''}${scores !== null ? scores : ''}`,
              inline: true
            }
          ]
        }
        bot.createMessage(msg.channel.id, {
          embed: embed
        }).catch(err => {
          error = JSON.parse(err.response);
          if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
          logger.error(error.code + '\n' + error.message, 'ERROR');
        });
      })
    } else if (type === 'completed') {
      var myAnimeList = require('myanimelist')({
        username: `${username}`
      })
      myAnimeList.getAnimeList(2, (err, resp) => {
        if (err) {
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
            logger.error('\n' + err, 'ERROR')
          });
        }
        var t = resp.map(function (title) {
          return title.series_title;
        }).toString();
        var titles = t.split(',').join('\n');
        var s = resp.map(function (score) {
          return score.my_score;
        }).toString();
        var scores = s.split(',').join('\n');
        var w = resp.map(function (watched) {
          return watched.my_watched_episodes;
        }).toString();
        var watchedep = s.split(',').join('\n');
        let embed = {
          color: 0xf4ce11,
          author: {
            name: `Completed`,
            url: ``,
            icon_url: ``
          },
          description: ``,
          fields: [{
              name: `Titles:`,
              value: `${titles === null ? `None` : ''}${titles !== null ? titles : ''}`,
              inline: true
            },
            {
              name: `Score:`,
              value: `${scores === null ? `None` : ''}${scores !== null ? scores : ''}`,
              inline: true
            }
          ]
        }
        bot.createMessage(msg.channel.id, {
          embed: embed
        }).catch(err => {
          error = JSON.parse(err.response);
          if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
          logger.error(error.code + '\n' + error.message, 'ERROR');
        });
      })
    } else if (type === 'onhold') {
      var myAnimeList = require('myanimelist')({
        username: `${username}`
      })
      myAnimeList.getAnimeList(3, (err, resp) => {
        if (err) {
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
            logger.error('\n' + err, 'ERROR')
          });
        }
        var t = resp.map(function (title) {
          return title.series_title;
        }).toString();
        var titles = t.split(',').join('\n');
        var s = resp.map(function (score) {
          return score.my_score;
        }).toString();
        var scores = s.split(',').join('\n');
        var w = resp.map(function (watched) {
          return watched.my_watched_episodes;
        }).toString();
        var watchedep = s.split(',').join('\n');
        let embed = {
          color: 0xf4ce11,
          author: {
            name: `On Hold`,
            url: ``,
            icon_url: ``
          },
          description: ``,
          fields: [{
              name: `Titles:`,
              value: `${titles === null ? `None` : ''}${titles !== null ? titles : ''}`,
              inline: true
            },
            {
              name: `Score:`,
              value: `${scores === null ? `None` : ''}${scores !== null ? scores : ''}`,
              inline: true
            }
          ]
        }
        bot.createMessage(msg.channel.id, {
          embed: embed
        }).catch(err => {
          error = JSON.parse(err.response);
          if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
          logger.error(error.code + '\n' + error.message, 'ERROR');
        });
      })
    }
  }
}