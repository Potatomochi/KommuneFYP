import axios from "axios"
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import express from "express";

// everytime you start ngrok ensure that your port exposed = process.env.PORT
// also ensure that you change the server url everytime you start ngrok

dotenv.config({path:'../.env'});
const { CHATBOT_TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${CHATBOT_TOKEN}`
const URI = `webhook/${CHATBOT_TOKEN}`
const WEBHOOK_URL = SERVER_URL

const port = process.env.PORT ;

// const url = `https://api.telegram.org/bot${process.env.CHATBOT_TOKEN}`;
// const URI = `/webhook/${process.env.CHATBOT_TOKEN}`
// const WEBHOOK_URL = process.env.SERVER_URL + URI

console.log(WEBHOOK_URL)


const app = express();
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}
const answerCallbacks = {};
// bot.onText('questions', function (message) {
//      bot.sendMessage(message.chat.id, "Enter your name").then(function () {
//          answerCallbacks[message.chat.id] = function (answer) {
//              var name = answer.text;
//              bot.sendMessage(message.chat.id, "Enter your address").then(function () {
//                  answerCallbacks[message.chat.id] = function (answer) {
//                      var address = answer.text;
//                      bot.sendMessage(message.chat.id, "Enter your address").then(function () {
//                          answerCallbacks[message.chat.id] = function (answer) {
//                              var phone = answer.text;
//                              bot.sendMessage(message.chat.id, name + address + phone + " saved!");
//                          }
//                      });
//                  }
//              });
//          }
//      });
//  });

app.post( "/", async (req, res) => {
    console.log(req.body);
    
    const chatId = req.body.message.chat.id;
    const sentMessage = req.body.message.text;     // Regex for hello
    if (sentMessage.match(/booking/gi)) {
          while (sentMessage !== "stop"){
               axios.post(`${TELEGRAM_API}/sendMessage`,
               {
                    chat_id: chatId,
                    text: 'Hello! Thanks for your interest in Kommune, if you would like to make a booking, could we have your mobile number?'
               })
               .then(function () {
                    answerCallbacks[req.body.message.chat.id] = function (answer) {
                    var name = answer.text;
                    axios.post(`${TELEGRAM_API}/sendMessage`,
                    {
                         chat_id: chatId,
                         text: 'May I have your name'
                    })
               }}).catch((error) => {
                    res.send(error);
               });
          }

    } else {
         // if no hello present, just respond with 200 
         res.status(200).send({});
    }
//     return res.send()
})
// app.post( "/", async (req, res) => {
//      console.log(req.body);
     
//      const chatId = req.body.message.chat.id;
//      const sentMessage = req.body.message.text;     // Regex for hello
//      if (sentMessage.match(/booking/gi)) {
//            while (sentMessage !== "stop"){
//                 axios.post(`${TELEGRAM_API}/sendMessage`,
//                 {
//                      chat_id: chatId,
//                      text: 'Hello! Thanks for your interest in Kommune, if you would like to make a booking, could we have your mobile number?'
//                 })
//                 .then((response) => { 
//                       console.log(req.body)
//                      res.status(200).send(response);
//                 }).catch((error) => {
//                      res.send(error);
//                 });
//            }
 
//      } else {
//           // if no hello present, just respond with 200 
//           res.status(200).send({});
//      }
//  //     return res.send()
//  })
// const init = async () => {
//     const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//     console.log(res.data)
// }

// app.post(URI, async (req, res) => {
//     console.log(req.body)

//     // const chatId = req.body.message.chat.id
//     // const text = req.body.message.text

//     // await axios.post(`${TELEGRAM_API}/sendMessage`, {
//     //     chat_id: chatId,
//     //     text: text
//     // })
//     return res.send()
// })

app.listen(port , async () => {
    console.log(`server hosted on port ${port}`)
//     await init()
})