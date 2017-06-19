var reload = require('require-reload'),
  games = reload('../../special/games.json');

module.exports = {
  desc: "Change the bot's status to streaming. Available flags are:\n\t-f   Force the game to stay the same.\n\t-r   Return to random game cycling, ignoring the input.",
  help: "Start with a valid game object `{\"name\": \"\", \"type\": 0, \"url\": \"\"}`",
  usage: "<status object | url> <flag>",
  hidden: true,
  ownerOnly: true,
  task(bot, msg, suffix, config) {
    if (!suffix) return bot.createMessage(msg.channel.id, 'No suffix provided');
    if (suffix.endsWith('-r')) return bot.editStatus({"name": `${games[~~(Math.random() * games.length)]}`, "type": 1, "url": `${suffix.replace(/ *\-r$/, '')}`});

    if (suffix.endsWith('-f')) {
      config.cycleGames = false;
      bot.editStatus(JSON.parse(suffix.replace(/ *\-f$/, '')));
    }
  }
};

