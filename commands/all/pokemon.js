var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

module.exports = {
	desc: "Search a pokemon by name. (Alola region not included)",
	usage: "<pokemon name>",
	cooldown: 5,
	guildOnly: true,
	task(bot, msg, args) {
		if(!args) {
			return 'wrong usage'
		}
		else {
			var pokemon = args.toLowerCase('');
			P.getPokemonByName(`${pokemon}`) // with Promise
	    .then(function(response) {
				bot.createMessage(msg.channel.id, { content: ``,
					embed: {
						color: 0xf4ce11,
						author: {
							name: `${response.name}`,
							url: `${response.sprites.front_default}`,
							icon_url: ``
						},
						description: `-`,
						thumbnail: {
							url: `${response.sprites.front_default}`
						},
						 fields: [
	             {
	               name: `Height/Weight`,
	               value: `Height: ${response.height}\nWeight: ${response.weight}`,
	               inline: true
	             },
	             {
	               name: `Base exp:`,
	               value: `${response.base_experience}`,
	               inline: true
	             },
	             {
	               name: `Type(s):`,
	               value: `${response.types[0] === undefined ? `` : ''}${response.types[0] !== undefined ? response.types[0].type.name : ''}\n${response.types[1] === undefined ? `` : ''}${response.types[1] !== undefined ? response.types[1].type.name : ''}`,
	               inline: true
	             },
	             {
	               name: `Abilities:`,
	               value: `${response.abilities[0] === undefined ? `` : ''}${response.abilities[0] !== undefined ? response.abilities[0].ability.name : ''}
${response.abilities[1] === undefined ? `` : ''}${response.abilities[1] !== undefined ? response.abilities[1].ability.name : ''}
${response.abilities[2] === undefined ? `` : ''}${response.abilities[2] !== undefined ? response.abilities[2].ability.name : ''}
${response.abilities[3] === undefined ? `` : ''}${response.abilities[3] !== undefined ? response.abilities[3].ability.name : ''}`,
	               inline: true
	             }
	           ],
						image: {
			         url: ``
			       },
						footer: {
		            text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
		            icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
		        }
					},
				});
	    })
	    .catch(function(error) {
	      console.log('There was an ERROR: ', error);
				bot.createMessage(msg.channel.id, 'There was an ERROR: '+error+'\nMost likely you typed the name wrong.')
	    });
		}
	}
};
