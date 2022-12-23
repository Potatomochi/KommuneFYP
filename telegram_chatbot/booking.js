const { keyboard } = require('telegraf/typings/markup');
const bot = require('./app');

bot.onText('booking', function (message) {
     bot.sendMessage(message.chat.id, "Hello! Thanks for your interest in Kommune, if you would like to make a booking, could we have your mobile number?").then(function () {
         answerCallbacks[message.chat.id] = function (answer) {
             var mobileNumber = answer.text;
             bot.sendMessage(message.chat.id, "Please select an activity you would like to book (Selective options) (Selective options)" , {
                "reply_markup": {
                    "keyboard": [["Karaoke"],   ["stuff"], ["Idinahoi"]]
                    }
                }).then(function () {
                 answerCallbacks[message.chat.id] = function (answer) {
                     var option = answer.text;
                     bot.sendMessage(message.chat.id, "How many people are you bringing to Kommune (including yourself) ?").then(function () {
                         answerCallbacks[message.chat.id] = function (answer) {
                             var people = answer.text;
                             bot.sendMessage(message.chat.id, name + address + phone + " saved!").then(function ());
                         }
                     });
                 }
             });
         }
     });
 });