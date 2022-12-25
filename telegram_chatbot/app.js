
const dotenv=require('dotenv')
// require('./booking.js')
dotenv.config({path:'../.env'});

const { CHATBOT_TOKEN, SERVER_URL } = process.env
const TelegramBot = require('node-telegram-bot-api')
const token = CHATBOT_TOKEN

const bot = new TelegramBot(token, {polling: true})
module.exports = bot

// bot.on('message', (msg) => {
//     bot.sendMessage(msg.chat.id,"Welcome to Kommune's Chatbot! Please select an option or type 'Booking' to get started. If you need help, do /help ",{
//         "reply_markup": {
//             "keyboard": [["Booking"],   ["Enquiries/Help"], ["Cancel"]]
//             }
//         });
//     if(msg.text.toString().toLowerCase().includes("booking")){
//         return
//     }
    
// });
// bot.onText(/\/idiot/, (msg) => {

//     bot.sendMessage(msg.chat.id, "this is to check");
    
//     });
var answerCallbacks = {};
bot.on('message', function (message) {
    var callback = answerCallbacks[message.chat.id];
    if (callback) {
        delete answerCallbacks[message.chat.id];
        return callback(message);
    }
});


bot.onText(/\/booking/, function (message) {
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
                             bot.sendMessage(message.chat.id, "Can we have the date for booking").then(function (){
                                answerCallbacks[message.chat.id] = function (answer) {
                                    var date = answer.text;
                                    bot.sendMessage(message.chat.id, "What is the duration of your booking in Kommune?").then(function(){
                                        answerCallbacks[message.chat.id] = function (answer){
                                            var duration = answer.text
                                        }
                                    })
                                }
                             });
                         }
                     });
                 }
             });
         }
     });
     bot.sendMessage(message.chat.id,"check me")
 });

console.log('working')