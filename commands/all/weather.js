const reload = require('require-reload'),
    config = reload('../../config.json');
let Wunderground = require('wunderground-api');
let client = new Wunderground(`${config.wu_key}`);


module.exports = {
    desc: "Get the weather from the specified city and state/country.",
    usage: "<City> | <State/Country>",
    aliases: ['we'],
    cooldown: 30,
    guildOnly: true,
    task(bot, msg, args) {
        if (!args) return 'wrong usage'
        let str = args.toString();
        let array = str.split(/ ?\| ?/),
            city = array[0],
            state = array[1];
        let opts = {
            city: `${city}`,
            state: `${state}`
        }
        client.conditions(opts, function(err, data) {
            if (err) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `${err}`,
                    fields: [{
                        name: `For support join:`,
                        value: `https://discord.gg/Vf4ne5b`,
                        inline: true
                    }]
                }
            });
            if (!data) return bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xff0000,
                    author: {
                        name: ``,
                        url: ``,
                        icon_url: ``
                    },
                    description: `There was no data found for this location :(`,
                    fields: [{
                        name: `For support join:`,
                        value: `https://discord.gg/Vf4ne5b`,
                        inline: true
                    }]
                }
            });
            bot.createMessage(msg.channel.id, {
                content: ``,
                embed: {
                    color: 0xf4ce11,
                    author: {
                        name: `${data.icon}`,
                        url: `${data.icon_url}`,
                        icon_url: `${data.icon_url}`
                    },
                    description: ``,
                    thumbnail: {
                        url: `${data.icon_url}`
                    },
                    fields: [{
                            name: `Location:`,
                            value: `${data.display_location.full}`,
                            inline: false
                        },
                        {
                            name: `Time:`,
                            value: `${data.observation_time}`,
                            inline: false
                        },
                        {
                            name: `Wind:`,
                            value: `${data.wind_string}`,
                            inline: false
                        },
                        {
                            name: `Temperature:`,
                            value: `Fahrenheit: ${data.temp_f}°F\nCelsius: ${data.temp_c}°C`,
                            inline: true
                        },
                        {
                            name: `\"Feelslike\" temperature:`,
                            value: `Fahrenheit: ${data.feelslike_f}°F\nCelsius: ${data.feelslike_c}°C`,
                            inline: true
                        },
                        {
                            name: `Humidity:`,
                            value: `${data.relative_humidity}`,
                            inline: true
                        },
                        {
                            name: `Wind Speed:`,
                            value: `${data.wind_mph}mph\n${data.wind_kph}kph`,
                            inline: true
                        },
                        {
                            name: `Visibility:`,
                            value: `${data.visibility_mi}mi\n${data.visibility_km}km`,
                            inline: true
                        }
                    ]
                }
            });
        });
    }
};