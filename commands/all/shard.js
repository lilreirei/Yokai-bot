// incomplete command!

module.exports = {
  desc: "Shows shard stats",
  aliases: ['shards'],
  usage: "",
  ownerOnly: true,
  task(bot, msg) {
    var id = bot.shards.map(shard => shard.id.toString()),
        status = bot.shards.map(shard => shard.status),
        guildCount = bot.shards.map(shard => shard.guildCount);

      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            icon_url: ``
          },
          description: `ID: ${id}
Status: ${status}
Guild Count: ${guildCount}`
        }
      })
  }
};
