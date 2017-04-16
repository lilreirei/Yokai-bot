module.exports = {
  desc: "Gets info about your anime list using the following tags <watching|completed|onhold>. (note: completed doesn't return all completed.)",
	usage: "<watching|completed|onhold>, <mal username>",
	aliases: ['mallist', 'alist'],
  task(bot, msg, suffix) {
    var args = suffix.toString();
    var data = args.split(', '),
        type = data[0],
        username = data[1];
    var myAnimeList = require('myanimelist')({username: `${username}`})
    if(type === undefined) {
      return 'wrong usage';
    }
    var type = type.toLowerCase();
    if(type === 'watching') {
      myAnimeList.getAnimeList(1, (err, resp) => {
        if (err) {
          let embed = {
            color: 0xf4ce11,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `Ewps something bad happened: ${err}`
          }
          bot.createMessage(msg.channel.id, {embed: embed})
        }
        var t = resp.map(function (title) { return title.series_title; }).toString();
        var titles = t.split(',').join('\n');
        var s = resp.map(function (score) { return score.my_score; }).toString();
        var scores = s.split(',').join('\n');
        let embed = {
          color: 0xf4ce11,
          author: {
            name: `Currently Watching`,
            url: ``,
            icon_url: ``
          },
          description: ``,
          fields: [
            {
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
        bot.createMessage(msg.channel.id, {embed: embed}).catch(err => {
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
      })
    }
    else if(type === 'completed') {
      var myAnimeList = require('myanimelist')({username: `${username}`})
      myAnimeList.getAnimeList(2, (err, resp) => {
        if (err) {
          let embed = {
            color: 0xf4ce11,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `Ewps something bad happened: ${err}`
          }
          bot.createMessage(msg.channel.id, {embed: embed})
        }
        var t = resp.map(function (title) { return title.series_title; }).toString();
        var titles = t.split(',').join('\n');
        var s = resp.map(function (score) { return score.my_score; }).toString();
        var scores = s.split(',').join('\n');
        let embed = {
          color: 0xf4ce11,
          author: {
            name: `Completed`,
            url: ``,
            icon_url: ``
          },
          description: ``,
          fields: [
            {
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
        bot.createMessage(msg.channel.id, {embed: embed}).catch(err => {
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
      })
    }
    else if(type === 'onhold') {
      var myAnimeList = require('myanimelist')({username: `${username}`})
      myAnimeList.getAnimeList(3, (err, resp) => {
        if (err) {
          let embed = {
            color: 0xf4ce11,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `Ewps something bad happened: ${err}`
          }
          bot.createMessage(msg.channel.id, {embed: embed})
        }
        var t = resp.map(function (title) { return title.series_title; }).toString();
        var titles = t.split(',').join('\n');
        var s = resp.map(function (score) { return score.my_score; }).toString();
        var scores = s.split(',').join('\n');
        let embed = {
          color: 0xf4ce11,
          author: {
            name: `On Hold`,
            url: ``,
            icon_url: ``
          },
          description: ``,
          fields: [
            {
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
        bot.createMessage(msg.channel.id, {embed: embed}).catch(err => {
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
      })
    }
  }
}
