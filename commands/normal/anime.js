var Anime = require('malapi').Anime;

module.exports = {
  desc: "Shows info about an anime.",
  usage: "<Anime Name>",
  cooldown: 10,
  task(bot, msg, args) {
    if (!args) {
        return 'wrong usage';
    } else {

      Anime.fromName(args).then(anime => {
        var genre = anime.genres.toString();
        var genres = genre.split(/, ?/).join(', ');
                let embed = {
                  color: 2706849,
                  type: `rich`,
                  author: {
                      name: `${anime.title}`,
                      icon_url: ``
                  },
                  description: `${anime.synopsis.split("\r")[0]}`,
                  url: `${anime.detailsLink}`,
                  image: {
                    url: `${anime.image}`
                  },
                  fields: [
                      {
                          name: `Type`,
                          value: `${anime.type}`,
                          inline: true
                      },
                      {
                          name: `Episodes`,
                          value: `${anime.episodes}`,
                          inline: true
                      },
                      {
                          name: `Status`,
                          value: `${anime.status}`,
                          inline: true
                      },
                      {
                          name: `Score`,
                          value: `${anime.statistics.score.value}`,
                          inline: true
                      },
                      {
                          name: `Ranking`,
                          value: `${anime.statistics.ranking}`,
                          inline: true
                      },
                      {
                        name: `Favorites`,
                        value: `${anime.statistics.favorites}`,
                        inline: true
                      },
                      {
                          name: `Aired`,
                          value: `${anime.aired}`,
                          inline: false
                      },
                      {
                          name: `Genres`,
                          value: `${genres}`,
                          inline: false
                      },
                      {
                          name: `Alternative titles`,
                          value: `${anime.alternativeTitles.english}
${anime.alternativeTitles.japanese}`,
                          inline: false
                      }
                  ],
                  footer: {
                      icon_url: `https://b.catgirlsare.sexy/Jxmy.png`,
                      text: `All information is provided by My Anime List`
                  }
                }
                bot.createMessage(msg.channel.id, {embed: embed}).catch(console.log);
        });
    }
  }
};
