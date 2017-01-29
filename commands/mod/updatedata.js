var fs = require('fs');

var obj = {
   table: []
};

module.exports = {
  desc: "Displays statistics about the bot.",
  aliases: ['update'],
  hidden: true,
	ownerOnly: true,
  task(bot, msg) {
    var fs = require('fs');

    var data = {}
    data.table = []
       var obj = {
           serverCount: bot.guilds.size,
           userCount: bot.users.size
       }
    data.table.push(obj)
    fs.writeFile ("stats.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('succesfully wrote data to: stats.json');
        }
    );
  }
}
