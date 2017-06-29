const reload = require('require-reload')(require),
    config = reload('../../config.json'),
    formatSeconds = require("../../utils/utils.js").formatSeconds,
    API = require('lol-riot-api-module');

module.exports = {
    desc: "Get your profile info by name.",
    usage: "<region> | <name>",
    cooldown: 10,
    guildOnly: true,
    task(bot, msg, args) {
        /** 
         * Waiting for api key confirmation
         * Status: Pending
         * https://developer.riotgames.com/
         */

        /*
        if (!args) return 'wrong usage';
        const str = args + "";
        const array = str.split(/ ?\| ?/),
            region = array[0],
            user = array[1];
        if (!user) return 'wrong usage';
        const api = new API({
            key: config.league_key,
            region: region
        });
        const options = { name: user };
        api.getSummoner(options, (err, data) => {
            const date = new Date(data.revisionDate);
            msg.channel.createMessage({
                    content: ``,
                    embed: {
                        color: 0xf4ce11,
                        author: {
                            name: `Info of ${data.name}`,
                            url: ``,
                            icon_url: ``
                        },
                        description: `ID: ${data.id}`,
                        fields: [{
                                name: `Account ID`,
                                value: `${data.accountId}`,
                                inline: true
                            },
                            {
                                name: `Summoner Level`,
                                value: `${data.summonerLevel}`,
                                inline: true
                            }
                        ],
                        footer: {
                            text: `${date.toString()}`
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        });
        */
    }
};