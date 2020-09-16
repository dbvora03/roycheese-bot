require('dotenv').config();

const { Client, Attachment } = require('discord.js');

const ytdl = require('ytdl-core');



var d = new Date();
var n = d.getDay();

const bot = new Client();
const PREFIX = ">"

var servers  = {};

var version = '1.2'


bot.on('ready', async (message) => {
    console.log(`${bot.user.tag} has logged in`)


    if (n == 3) {
        message.channel
    }

});

/*
bot.on('message'. async (message) => {

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
    } else if (message.content.startsWith('ping')) {
            message.channel.send('pong');
    } else if (message.content.startsWith('roycheese?')) {
            const replies = ['nah, call me pablo', 'tf you want?', 'no']
            var selection = Math.random() * 3
            var parsedSelection = selection.
            message.channel.send("nah, call me Pablo ");
    }


})

*/

bot.on('message', async (message) => {

    if (n == 3) {
        message.channel.send("Happy WOO Wednesday")
    }

    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith('roycheese?') || message.content.startsWith('Roycheese?')) {
        message.channel.send("nah, call me Pablo")
    }

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...more] = message.content.trim().substring(PREFIX.length).split(/\s+/);
        console.log(CMD_NAME);
        console.log(more)

        switch (CMD_NAME) {
            case 'kick':
                if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("nah, im gonna intervene")
                if (args.length === 0 ) return message.reply('please provide an argument') 
                //const member = message.guild.membe\irs.cache
                const member = message.guild.members.cache.get(more[0]);
                if (member) {
                    member.kick().then((member) => message.channel.send(`${member} was kicked for not complying with roycheese`)).catch((err) => message.channel.send("Nah"))
                } else {
                    message.channel.send("who?!?")
                }

        }


    }


    let args = message.content.substring(PREFIX.length).split(" ")
    //const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
    switch (args[0]) {
        case 'play':

            function play(connection, message) {
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audio"}));
                message.channel.send("You've been cooperating lately, here is your song")

                server.queue.shift();

                server.dispatcher.on("end", function() {
                    if(server.queue[0]) {
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                })
            }

            if(!args[1]) {
                message.channel.send("you gonna say sumn?");
                return;
            }

            if(!message.member.voice.channel) {
                message.channel.send("Alone? Nahh")
                return;
            }

            if(!servers[message.guild.id]){ 
                servers[message.guild.id] = {
                    queue: []
                }
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) {
                message.member.voice.channel.join().then(function(connection) {
                play(connection, message);

            })
        }

        case 'skip':
            var server = servers[message.guild.id]
            if (server.dispatcher) {
                server.dispatcher.end()
                message.channel.send("I'll enforce your skip request just this time")
            }
            

        case 'stop':
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection) {
                for (var i = server.queue.length - 1 ; i >= 0 ; i--) {
                server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                message.channel.send("I had to intervene")
            }

            if(message.guild.connection) {
                message.guild.voiceConnection.disconnect();
            }
    }



    
    
    
})

bot.on('messageReactionAdd', async (reaction, user) => {
    
    
    message.channel.send('tf you reacting at?')
});

bot.login(process.env.ROYCHEESE_BOT_TOKEN)