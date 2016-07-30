var Discord = require("discord.js");
var credentials = require("./auth.json");
var settings = require("./settings.json");

var client = new Discord.Client();

var currentVoiceChannel = null;
client.on("debug", function(m) {console.log("[debug]", m)});
client.on("warn", function(m){console.log("[warn]", m)});
client.on("message", function(message) {
    
    // Initialize music bot
    if(message.content === "!music init"){
        for(var curChan of message.channel.server.channels){
            if(curChan instanceof Discord.VoiceChannel && curChan.name == settings.musicBotChannel){
                client.reply(message, " you sure you can handle these beats?");
                client.joinVoiceChannel(curChan);
                currentVoiceChannel = curChan;
                break;
            }   
        }
    }
    else if(message.content === "!music test"){
        if (client.internal.voiceConnection) {
			client.voiceConnection.playFile('./420.mp3', function(err, intent){
                console.log(err);
            });
        }
    }
    else if(message.content.indexOf("!music play") == 0){
        console.log(getDirectories(settings.musicPath + "/AFI"));
    }
    // Stop music playback
    else if(message.content === "!music stop"){
        if(client.internal.voiceConnection)
            client.internal.voiceConnection.stopPlaying();
    }
    // Exit music bot
    else if(message.content === "!music quit"){
           exitVoiceChannel();
    }
    // Moves all members of the senders voice channel to the specified voice channel
    else if(message.content.indexOf("!moveChannelTo") == 0){
        // Get the channel name out of the command
        var dest = message.content.split(" ");
        dest = dest.slice(1,dest.length);
        dest = dest.join(" ");
        var srcMembers = message.author.voiceChannel.members;

        // Find the destination channel
        for(var curChan of message.channel.server.channels){
            if(curChan instanceof Discord.VoiceChannel && curChan.name == dest){
                // Move each member of the source channel to the destination
                for(var mem of srcMembers){
                    client.moveMember(mem,curChan);
                    setTimeout(function(){},150);
                }                
                break; 
            }
        }
    }
});

function exitVoiceChannel(){
    if(currentVoiceChannel){
        client.leaveVoiceChannel(currentVoiceChannel);
        currentVoiceChannel = null;
    }
}

client.login(credentials.email , credentials.password);