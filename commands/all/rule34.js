var request = require('request');

const COLORSDECIAML = [
    0x2B54CE,
    0xFF8000,
    0x9932CC,
    0x008080,
    0x800080,
    0x808080,
    0xEE82EE,
    0xFFB6C1,
    0x86B3E8,
    0x93FFAA,
    0x979E79
];

module.exports = {
    desc: "Sends image from http://rule34.xxx [nsfw]",
    usage: "<tags>",
    aliases: ['r34'],
    task(bot, msg, suffix, config, settingsManager) {
      /*
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
      */
      let choose = ~~(Math.random() * COLORSDECIAML.length);
  		var color = COLORSDECIAML[choose];
      bot.createMessage(msg.channel.id, { content: ``,
  			embed: {
  				color: color,
  				author: {
  					name: ``,
  					url: ``,
  					icon_url: ``
  				},
  				description: `rule34 has been changed to \`s.booru\`, type: \`s.help booru\` to get more info of the command.
Dw you can still use rule34 just added a few extra sites to use. To view a list of all the sites use \`s.booru list\`.
(Make sure to join [Shinobu's support server](https://discord.gg/Vf4ne5b) to stay updated on all the bot changes and annoucements.)`
  			}
  		})
    }
};
