const axios = require("axios");

module.exports = {
    desc: "Chat with the bot.",
    usage: "<question>",
    aliases: ['cb'],
    cooldown: 2,
    task(bot, msg, args) {
        axios.get(`http://api.program-o.com/v2/chatbot/?bot_id=6&say=${args}&convo_id=${msg.author.id}&format=json`).then(function(res) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${msg.author.mention}, ${res.data.botsay.replace("Program-O", bot.user.username)}`
                }
            });
        }).catch(function(err) {
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${msg.author.mention}, I don't wanna talk right now :slight_frown:`
                }
            });
        });
    }
};