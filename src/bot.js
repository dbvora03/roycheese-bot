require('dotenv').config();

const { Client } = require('discord.js');

const bot = new Client();
const PREFIX = ">"

bot.on('ready', () => {
    console.log(`${bot.user.tag} has logged in`)
});

bot.on('message', async (message) => {
    if(message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
        console.log(CMD_NAME);
        console.log(args)

        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("nah, im gonna intervene")
            if (args.length === 0 ) return message.reply('please provide an argument') 
            //const member = message.guild.membe\irs.cache
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member.kick().then((member) => message.channel.send(`${member} was kicked for not complying with roycheese`)).catch((err) => message.channel.send("Nah"))
            } else {
                message.channel.send("who?!?")
            }
        } 
    } else if (message.content.startsWith('@747949168571711639')) {
            message.channel.send('pong');
    } else if (message.content.startsWith('roycheese?')) {
            const replies = ['nah, call me pablo', 'tf you want?', 'no']
            var selection = Math.random() * 3
            var parsedSelection = selection.
            message.channel.send("nah, call me Pablo ");
    }
})

bot.on('messageReactionAdd', async (reaction, user) => {
    
    
    message.channel.send('tf you reacting at?')
});

bot.login(process.env.ROYCHEESE_BOT_TOKEN)