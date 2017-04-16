const fs = require('fs');
const request = require('request');

module.exports = {
	desc: "Sends a gif from giphy using your search terms.",
	usage: "<tags>",
	task(bot, msg, suffix) {
		var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + suffix;
        download( url, 'gif.json', function(){
            var json = JSON.parse(fs.readFileSync('gif.json', 'utf8'));
						bot.createMessage(msg.channel.id, `${json.data.url || 'gif'}`).catch(err => {
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
        });
	}
};

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
		if(err) {
			bot.createMessage(msg.channel.id, { content: ``,
				embed: {
					color: 0xf4ce11,
					author: {
						name: ``,
						url: ``,
						icon_url: ``
					},
					description: `${err}`
				},
			});
		}
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
