require('dotenv').config();

const { Client, Attachment } = require('discord.js');
const { appendFile } = require('fs');

const ytdl = require('ytdl-core');



var d = new Date();
var n = d.getDay();

const bot = new Client();
const PREFIX = ">"

var servers  = {};

var version = '1.2'

eventList = []

class gameEvent {
    constructor (name) {
        this.name = name
        this.date = date


    }

}


bot.on('ready', async (message) => {
    console.log(`${bot.user.tag} has logged in`)
});


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

    if (message.content.startsWith(PREFIX)) {
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
                return

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

        case 'help':
            message.channel.send(
            ```
            Here are a list of commands for Roycheese bot.\n
            \`>play [song-name]\` Skips song\n
            \`>skip\` skips the current song being played\n
            \`>stop\` stops all songs from playing\n
            \`>kick [user]\` kicks the player, (you and the bot must have permissions)\n
            \`>event create\` creates a new game event\n
            \`>event view\` shows all events that currently exist\n
            \`>event delete [name]\` deletes the event
            ```
            )
        
        case 'event':
            if (!args[1]) {
                message.channel.send("If you want to use the event features, type >help for more info")
            }
            if (args[1] == 'create') {
                message.channel.send("What do you want to name the Event?").then(function() {
                    let tempName = message.channel.content;                
                }).then(function() {
                    message.channel.send("When is the event? Enter in the form Month:Day:Year:Hour:Minute")
                    let tempDate = message.channel.content;

                    eventList.append(eventList[eventList.length + 1])
                    new gameEvent = eventList[eventList.length + 1](tempName, tempDate)
                    message.channel.send(`Your event has been created!\n Details: \n ${tempName.name} will be happening on ${tempName.date} \n Make sure to let your friends know!`)
                })
            } else if (args[1] == 'view') {
                if (eventList.length == 0) {
                    message.channel.send("You currently have no events")
                } else {
                    for (evento in eventList) {
                        message.channel.send(`Event ${evento}: ${evento.name} happens on ${evento.date}`)
                }
            } 
        } else if (args[1] == 'delete') {
            if (!message.member.hasRole('eventMan')) return message.reply("nah, im gonna intervene")
            if (!args[2]) return message.channel.reply("You need to mention an event -_-  ")
            for (evento in eventList) {
                if (evento == args[3]) {
                    eventList.splice(evento.index, 1)
                    message.channel.content("Your event has been removed! Noone showed up huh? Loner")

                }
            }
        }


    }
}


    
    
    
})

bot.login(process.env.ROYCHEESE_BOT_TOKEN)