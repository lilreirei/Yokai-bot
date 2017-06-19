var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Sends someone's avatar url. (The file size can be 128, 256, 512, 1024, or 2048. Defaults to 2048.)",
    usage: "<-s/--size> <size> OR <username/ID/@username> | <size>",
    aliases: ['ava', 'pfp', 'avi'],
    guildOnly: true,
    cooldown: 5,
    task(bot, msg, args) {
        /**
         * perm checks
         * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
         * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
         */
        const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
        const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (embedLinks === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        if (sendMessages === false) return;
        let format = '';
        let size = 2048;
        if (!args) {
            // s.avatar
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Your Avatar:`,
                        url: `${msg.author.dynamicAvatarURL(format, size)}`,
                        icon_url: `${msg.author.dynamicAvatarURL(format, size)}`
                    },
                    description: `**[Click here for direct image link](${msg.author.dynamicAvatarURL(format, size)})**`,
                    image: {
                        url: `${msg.author.dynamicAvatarURL(format, size)}`
                    }
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        } else if ((args.startsWith('--size')) || (args.startsWith('-s'))) {
            // s.avatar -s <size> || s.avatar --size <size>
            const str = args + "";
            const array = str.split(' ');
            let int = array[1];
            size = parseInt(int);
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `Your Avatar:`,
                        url: `${msg.author.dynamicAvatarURL(format, size)}`,
                        icon_url: `${msg.author.dynamicAvatarURL(format, size)}`
                    },
                    description: `**[Click here for direct image link](${msg.author.dynamicAvatarURL(format, size)})**`,
                    image: {
                        url: `${msg.author.dynamicAvatarURL(format, size)}`
                    }
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        } else {
            // s.avatar <user> | <size>
            const str = args + "";
            const array = str.split(/ ?\| ?/);
            let member = array[0];
            let int = array[1];
            size = parseInt(int);
            if (!int)
                size = 2048;
            const user = this.findMember(msg, member);
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
            }).catch(err => {
                logger.error('\n' + err, 'ERROR')
            });
            const id = msg.channel.guild.members.get(user.id);
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${id.username}'s Avatar:`,
                        url: `${user.dynamicAvatarURL(format, size)}`,
                        icon_url: `${user.dynamicAvatarURL(format, size)}`
                    },
                    description: `**[Click here for direct image link](${user.dynamicAvatarURL(format, size)})**`,
                    image: {
                        url: `${user.dynamicAvatarURL(format, size)}`
                    }
                }
            }).catch(err => {
                error = JSON.parse(err.response);
                if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                logger.error(error.code + '\n' + error.message, 'ERROR');
            });
        }
    }
};