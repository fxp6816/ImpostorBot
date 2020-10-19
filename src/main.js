
/*
    IMPOSTOR BOT v1
    Author: Francisco Paliouras
    @version Wed Oct 14th, 2020
*/ 


//loading enviroment variables with node.js (dotenv)
require('dotenv').config();
//initializing the discord api
const Discord = require('discord.js');
const client = new Discord.Client();

//arrays of dead and alive (String values)
var alivePlayers = [];
var deadPlayers = [];

var gameStarted = false;

client.once('ready', () => {
    console.log('Runinng!');
    
});

client.on('message',(msg) => {
    //msg is of type Message in hte discord.js library
    const content = msg.content;

    if(msg.content === "/help"){
        msg.channel.send("/startRound :  starts the game, mutes all players in the channel. (Make Sure to that ll players join the voice channel before.)");
        msg.channel.send("/unmute: unmutes players when a death has been reported. Also give miner report on the game.");
        msg.channel.send("/idied: yet to implemnet");


    }else if(msg.content === '/startRound'){
        //if user in a voice channel
        console.log("********************* logging msg.member.voice.channel.guild.members");
        //console.log(msg.member.voice.channel.guild.members);
        if(msg.member.voice.channel){

            var voiceChannel = msg.member.voice.channel;
            var channelName = msg.member.voice.channel.name;
            var memberList = msg.member.voice.channel.guild.members.cache;
        
            memberList.filter(member => {
                if(member.voice.channelID === '765765952792559636'){
                    if(!gameStarted){
                        alivePlayers.push({
                            id: member.user.id ,
                            username: member.user.username
                        });
                    }
                    member.voice.setMute(true);
                }
            });
            gameStarted = true;
        }else{
            console.log("Nothing happens Stupid");
        }


        //output message with starting message and mute everyone

    }else if(msg.content === '/unmute'){

        if(msg.member.voice.channel){

            var voiceChannel = msg.member.voice.channel;
            var channelName = msg.member.voice.channel.name;
            var memberList = msg.member.voice.channel.guild.members.cache;

            memberList.filter(member => {
                if(member.voice.channelID === '765765952792559636'){
                    console.log(member.voice.channelID);
                    member.voice.setMute(false);
                }
            });
        }else{
            console.log("Nothing happens Stupid");
        }


        msg.channel.send("Everyone is Unmuted, THERE HAS BEEN DED PPL");
        // loop for alive and dead people
        msg.channel.send("Alive people:" );
        for(item of alivePlayers){
            msg.channel.send( item.username );
        }
        msg.channel.send("Dead people:" );
        if(deadPlayers.length > 0){
            for(item of deadPlayers){
                msg.channel.send( item.username );
            }
        }
        

    }else if(msg.content === '/iDied'){
        //move the player that declared themselves dead from  the alive array to the dead array
        var authorId = msg.author.id;
        var authorUsername = msg.author.username;
        var index = alivePlayers.indexOf({authorId,authorUsername});
        
        for(var i = 0; i < alivePlayers.length; i++){
            if(alivePlayers[i].id === authorId){
                alivePlayers.splice(i,1);
            }
        }

        deadPlayers.push({
            id:authorId,
            username: authorUsername
        });

    }else if(msg.content === '%ImposterFound'){
        //end game
        //clear all the arrays 
    }else if(msg.content === '%accuse'){
        //accuse someone and generate a voting through reactions on the message the bot sends!!
    }else if(msg.content === '%setVoiceChannel'){
        //accuse someone and generate a voting through reactions on the message the bot sends!!
    }
});
//last line on your file
client.login(process.env.DISCORDJS_BOT_TOKEN);