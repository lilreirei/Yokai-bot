module.exports = {
  desc: "Sends a google link with the search term.",
  usage: "<Search terms>",
  aliases: ['google', 'srch'],
  cooldown: 2,
  task(bot, msg, args) {
    if (!args) {
      return 'wrong usage';
    }
    else {
      let search = args.toString();
      search = encodeURIComponent(search.trim());
      bot.createMessage(msg.channel.id, `https://www.google.com/search?q=`+`${search}`);
    }
  }
}
