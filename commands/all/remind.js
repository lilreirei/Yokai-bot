const schedule = require('node-schedule');
const moment = require('moment');
const date = require('date.js');

module.exports = {
    desc: "Set a reminder for yourself or someone else.",
    usage: "<me/someone_else> | <reminder> | <time>",
    cooldown: 10,
    guildOnly: true,
    task(bot, msg, args) {
        if (!args) return 'wrong usage';
        args = args.split(/ ?\| ?/);
        if (!args[0]) return 'wrong usage';
        if (!args[1]) return 'wrong usage';
        if (!args[2]) return 'wrong usage';
        const person = args[0];
        const reminder = args[1];
        const time = args[2];

        const newDate = date(time);
        if (newDate <= new Date()) {
            return bot.createMessage(msg.channel.id, 'that date doesn\'t seem to be valid.');
        }

        schedule.scheduleJob(newDate, () => {
            if (person == 'me') {
                bot.createMessage(msg.channel.id, `${msg.author.mention}, I'm reminding you to **${reminder}**`);
            } else {
                const user = this.findMember(msg, person)
                if (!user) return bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xff0000,
                        author: {
                            name: ``,
                            url: ``,
                            icon_url: ``
                        },
                        description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
                    }
                });
                bot.createMessage(msg.channel.id, `${user.mention}, I'm reminding you to **${reminder}**`);
            }
        });
        bot.createMessage(msg.channel.id, 'reminder set for ' + moment(newDate).format('dddd, MMMM Do YYYY, h:mm:ss a ZZ'));
    }
};