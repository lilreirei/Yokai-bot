const fs = require('fs');

let points = JSON.parse(fs.readFileSync(`./db/points.json`, 'utf8'));

module.exports = {
	handler(bot, msg, CommandManagers, config, prefix, settingsManager) {
		if (msg.author.bot === true)
			return;

	  if (!points[msg.author.id]) points[msg.author.id] = {
	    points: 0,
	    level: 0
	  };
	  let userData = points[msg.author.id];
	  userData.points++;

	  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
	  if (curLevel > userData.level) {
	    // Level up!
	    userData.level = curLevel;
			let message = JSON.parse(fs.readFileSync(`./db/message.json`, 'utf8'));
			if (config.nowelcomemessageGuild.includes(msg.channel.guild.id)) return;
			if (message[msg.channel.guild.id].type.includes("false")) return;
	    bot.createMessage(msg.channel.id, `<@${msg.author.id}> You've leveled up to level **${curLevel}**!`);
	  }

	  fs.writeFile(`./db/points.json`, JSON.stringify(points), (err) => {
	    if (err) console.error(err)
	  });
	}
}
