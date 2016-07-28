var Discord = require("discord.js");

var mybot = new Discord.Client();

mybot.on("message", function(message) {
    if(message.content === "!son") {
        mybot.reply(message, "ALL DAY SON!");
    }
});

mybot.login("email here" , "password here");