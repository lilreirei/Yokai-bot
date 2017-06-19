const mm = require('mario-maker');
var reload = require('require-reload')(require),
    config = reload('../../config.json'),
    error,
    logger,
    logger = new(reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
    desc: "Get info about a course.",
    usage: "<course_id> (e.g. AA64-0000-000F-7D4C)",
    aliases: ['mm'],
    cooldown: 5,
    task(bot, msg, args) {
        /**
         * perm checks
         * @param {boolean} embedLinks_check - Checks if the bots permissions has embedLinks
         * @param {boolean} sendMessages_check - Checks if the bots permissions has sendMessages
         */
        const embedLinks_check = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
        const sendMessages_check = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
        if (embedLinks_check === false) return bot.createMessage(msg.channel.id, `❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
            .catch(err => {
                return;
            });
        if (sendMessages_check === false) return;
        /**
         * courseID check
         * @param {string} courseID - The course id
         * @param {RegExp} courseID_check - Regex for the course id
         * @param {RegExp} regex - Create new RegExp from courseID_check
         */
        const courseID = args,
            courseID_check = /^[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}$/,
            regex = new RegExp(courseID_check);
        if (!courseID.match(regex)) return bot.createMessage(msg.channel.id, `${msg.author.mention}, That is **not** a valid course id.`)
            .catch(err => {
                return;
            });
        mm.getCourse(courseID, function (error, response, json) {
            if (!error && response.statusCode == 200) {
                bot.createMessage(msg.channel.id, {
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: `${json.course_title}`,
                            url: ``,
                            icon_url: ``
                        },
                        description: `\u200B`,
                        fields: [{
                                name: `Difficulty`,
                                value: `${json.difficulty}`,
                                inline: true
                            },
                            {
                                name: `Clear rate`,
                                value: `${json.clear_rate}%`,
                                inline: true
                            },
                            {
                                name: `Clears`,
                                value: `${json.clears}`,
                                inline: true
                            },
                            {
                                name: `Attempts`,
                                value: `${json.attempts}`,
                                inline: true
                            },
                            {
                                name: `Stars`,
                                value: `${json.stars}`,
                                inline: true
                            },
                            {
                                name: `Tag`,
                                value: `${json.tag}`,
                                inline: true
                            },
                            {
                                name: `Creator name`,
                                value: `${json.creator_name}`,
                                inline: true
                            },
                            {
                                name: `Created at`,
                                value: `${json.created_at}`,
                                inline: true
                            },
                            {
                                name: `\u200B`,
                                value: `\u200B`,
                                inline: true
                            },
                            {
                                name: `World record name`,
                                value: `${json.world_record.name}`,
                                inline: true
                            },
                            {
                                name: `World record time`,
                                value: `${json.world_record.time}`,
                                inline: true
                            },
                            {
                                name: `\u200B`,
                                value: `\u200B`,
                                inline: true
                            },
                            {
                                name: `First clear`,
                                value: `${json.first_clear.name == null ? `n/a` : ''}${json.first_clear.name != null ? json.first_clear.name : ''}`,
                                inline: true
                            },
                            {
                                name: `Recent player`,
                                value: `${json.recent_players.user_name == undefined ? `n/a` : ''}${json.recent_players.user_name != undefined ? json.recent_players.user_name : ''}`,
                                inline: true
                            },
                            {
                                name: `\u200B`,
                                value: `\u200B`,
                                inline: true
                            }
                        ],
                        image: {
                            url: `${json.course_img_full}`
                        }
                    }
                }).catch(err => {
                    error = JSON.parse(err.response);
                    if ((!error.code) && (!error.message)) return logger.error('\n' + err, 'ERROR')
                    logger.error(error.code + '\n' + error.message, 'ERROR');
                });
            } else {
                logger.error('\n' + response.statusCode, 'ERROR');
            }
        });
    }
};