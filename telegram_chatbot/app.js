
const dotenv=require('dotenv')
dotenv.config({path:'../.env'});

const { CHATBOT_TOKEN, SERVER_URL } = process.env
const TelegramBot = require('node-telegram-bot-api')
const token = CHATBOT_TOKEN

const bot = new TelegramBot(token, {polling: true})
module.exports = bot

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id,"Welcome to Kommune's Chatbot! Please select an option or type 'Booking' to get started. If you need help, do /help ",{
        "reply_markup": {
            "keyboard": [["Booking"],   ["Enquiries/Help"], ["Cancel"]]
            }
        });
    if(msg.text.toString().toLowerCase().includes("booking")){
        return
    }
    
});

console.log('working')