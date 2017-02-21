var request = require('request');
module.exports = {
    desc: "Sends image from http://rule34.xxx [nsfw]",
    usage: "<tags>",
    aliases: ['r34'],
    task(bot, msg, suffix, config, settingsManager) {
		var nsfw = settingsManager.getNSFW(msg.channel.guild.id, msg.channel.id);
		if(!nsfw){
			bot.createMessage(msg.channel.id, 'You can only use this command in an **nsfw** channels, use \`s$settings nsfw <allow/deny>\`.');
		}
		else {
			    request("http://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1&pid=0&tags=" + suffix, function(err, response, body) {
                    var countRegex = /count="(\d*)"/m;
                    var matchCount = countRegex.exec(body);
                    if (matchCount != null && parseInt(matchCount[1]) != null) {
                        var count = parseInt(matchCount[1]);
                        if (count <= 0) {
                            bot.createMessage(msg.channel.id, 'Nothing found with those tags try something else.');
                            return;
                        }
                        var page = Math.floor((Math.random() * count) + 1);
                        request("http://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1&pid=" + page + "&tags=" + suffix, function(err, response, body) {
                            var urlRegex = /file_url="\/\/(.+?)"/m
                            var matchUrl = urlRegex.exec(body);
                            if (matchUrl != null) {
                                bot.createMessage(msg.channel.id, "http://" + matchUrl[1]);
                            }
                        })
                    }
                });

		}
    }
};
