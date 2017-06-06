const exec = require('child_process').exec;

module.exports = {
    desc: "Execute command line.",
    usage: "<things>",
    aliases: [],
    cooldown: 5,
    hidden: true,
    ownerOnly: true,
    task(bot, msg, args) {
        exec(`${args}`, { maxBuffer: Infinity }, (err, stdout, stderr) => {
            if (err) return bot.createMessage(msg.channel.id, `
\`\`\`glsl
${err}
\`\`\``);
            if (stderr) return bot.createMessage(msg.channel.id, `
\`\`\`glsl
${stderr}
\`\`\``);
            let str = stdout;
            let senpai = str.replace('● Agent Online | Dashboard Access: https://app.keymetrics.io/#/r/2pd59t8ulpqlkoi | Server name: Shinobu.js', '');
            bot.createMessage(msg.channel.id, `
\`\`\`glsl
${senpai}
\`\`\``);
        });
    }
};