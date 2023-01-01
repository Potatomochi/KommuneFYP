
const dotenv=require('dotenv')
// require('./booking.js')
dotenv.config({path:'../.env'});

const { CHATBOT_TOKEN, SERVER_URL } = process.env
const TelegramBot = require('node-telegram-bot-api')
const token = CHATBOT_TOKEN

// const bot = new TelegramBot(token)
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
const triggerWords = ["/booking" , "/help" , "/cancel" , "/test"]
var answerCallbacks = {};
const isFlowCancelled = false
bot.on('message', function (message) {
    var callback = answerCallbacks[message.chat.id];
    if (callback) {
        delete answerCallbacks[message.chat.id];
        return callback(message);
    }
    if(!triggerWords.includes(message.text.toString().toLowerCase())){
        bot.sendMessage(message.chat.id,"Welcome to Kommune's Chatbot! Please select an option or type '/booking' to get started. If you need help, do /help ",{
                    "reply_markup": {
                        "keyboard": [["/booking"],   ["/help"], ["/cancel"]]
                        }
                    });
    }
});


bot.onText(/\/booking/, function (message) {

    // console.log(message.chat.id)
    // console.log(bot.onReplyToMessage(message.chat.id,message.chat.message_id))
     bot.sendMessage(message.chat.id, "Hello! Thanks for your interest in Kommune, if you would like to make a booking, could we have your mobile number?").then(function () {
        // console.log(bot.onReplyToMessage(message.chat.id,message.chat.message_id))
         answerCallbacks[message.chat.id] = function (answer) {
             var mobileNumber = answer.text;
            if(mobileNumber !== "cancel"){
                bot.sendMessage(message.chat.id, "Please select an activity you would like to book (Selective options) (Selective options)" , {
                    "reply_markup": {
                        "keyboard": [["Karaoke"],   ["stuff"], ["Idinahoi"]]
                        }
                    }).then(function () {
                     answerCallbacks[message.chat.id] = function (answer) {
                         var option = answer.text;
                         if(option !== "cancel"){
                            bot.sendMessage(message.chat.id, "How many people are you bringing to Kommune (including yourself) ?").then(function () {
                                answerCallbacks[message.chat.id] = function (answer) {
                                    var people = answer.text;
                                    if(people !== "cancel"){
                                        bot.sendMessage(message.chat.id, "Can we have the date for booking").then(function (){
                                            answerCallbacks[message.chat.id] = function (answer) {
                                                var date = answer.text;
                                                if(date !== "cancel"){
                                                    bot.sendMessage(message.chat.id, "What is the duration of your booking in Kommune?").then(function(){
                                                        answerCallbacks[message.chat.id] = function (answer){
                                                            var duration = answer.text
                                                            if(true){
                                                                //if weekday
                                                                bot.sendMessage(message.chat.id , "Great! 😄Your booking is confirmed for <date> at <time> for <duration> hours of <room type> for <pax> pax! Please be reminded to bring $<price> for payment.  Bookings will only be held for a *maximum of 5 minutes*, and will be automatically released if you do not come on time without informing staff. Use /help to learn more.")
                                                                // const detailsToSend = {option, mobileNumber,people,data,duration}
                                                            }else {
                                                                //if weekend
                                                                bot.sendMessage(message.chat.id, "Thanks! We need an upfront payment for peak period reservations to confirm your booking. Please *Paynow _amount_ to our UEN number 202022998K (Kidults Ground Pte Ltd) by _time_ today* and send us the screenshot of the payment. Thank you! 😄")
                                                            }
                                                            
                                                        }
                                                    })
                                                }

                                            }
                                         })
                                    }
;
                                }
                            });
                         }

                     }
                 })
            }
;
         }
     });
     // this sends immediately after first message
    //  bot.sendMessage(message.chat.id,"check me")
     
 });

 bot.onText(/\/help/ , (msg) =>{

 } )
 bot.onText(/\/test/ , (msg) =>{
    //because polling is set to true the below code won't work. Think...I have yet to try an axios request and we will see how
    // because webhook is not like...functional checks or APIs its webhook to and fro telegram server which is already achieved by polling

    // console.log(bot.openWebHook())
    //  bot.sendMessage(message.chat.id,"check me").then(function (){
    //     bot.sendMessage(message.chat.id,"second check").then(function (){
    //         bot.sendMessage(message.chat.id,"thrid check")})
    //  })
    console.log(msg.text)
    
 } )
 bot.onText(/\/cancel/ , async (msg) => {
    // bot.removeTextListener(/\/booking/)
    // await bot.stopPolling({cancel:true})
    console.log(msg.chat.id)
    bot.clearReplyListeners()

 })
 const cancelFlow = async() => {
    await bot.stopPolling({cancel:true})
    bot.startPolling().then(
    bot.sendMessage(message.chat.id,"Welcome to Kommune's Chatbot! Please select an option or type '/booking' to get started. If you need help, do /help ",{
        "reply_markup": {
            "keyboard": [["/booking"],   ["/help"], ["/cancel"]]
            }
        }))
 }

console.log('working')