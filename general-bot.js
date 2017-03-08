var Discord = require("discord.js");
var settings = require("./settings.json");
var login = require("./login.json");
var client = new Discord.Client();

var currentVoiceChannel = null;
client.on("debug", function(m) {console.log("[debug]", m)});
client.on("warn", function(m){console.log("[warn]", m)});
client.on("message", function(message) {
    
    
    // Moves all members of the senders voice channel to the specified voice channel
    if(message.content.indexOf("!moveChannelTo") == 0){
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
    else if (message.content === "!test"){
        client.replyTTS(message,"It's working!");
        client.reply(message, "https://giphy.com/gifs/9K2nFglCAQClO");
    }
     else if (message.content.match(/^\/r\/.*/)){
        var afterR = message.content.match(/^\/r\/.*/);
        if (afterR.length > 1)
            return;
        afterR = afterR[0];
        if (afterR.length < 4)
            return;
        var index = afterR.indexOf(' ');
        var endSub = index >= 0 ? index : afterR.length;
        var url = 'http://reddit.com' + afterR.substring(0,endSub) + '/top/?sort=top&t=all';
        client.reply(message, url);
    }
});

function exitVoiceChannel(){
    if(currentVoiceChannel){
        client.leaveVoiceChannel(currentVoiceChannel);
        currentVoiceChannel = null;
    }
}

client.login(login.username , login.pass);
