import { initializeApp, applicationDefault, cert }from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'
import cors from "cors"
import bodyParser from "body-parser"
import express from "express";
initializeApp();

const app = express();
const PORT = 5008

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res)=>{
    console.log("HELLO WORLD")
});
app.post("api/postInformation" , (req,res)=>{
    
})
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

// const db = getFirestore();

// const docRef = db.collection('users').doc('alovelace');

// await docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

// const aTuringRef = db.collection('users').doc('aturing');

// await aTuringRef.set({
//   'first': 'Alan',
//   'middle': 'Mathison',
//   'last': 'Turing',
//   'born': 1912
// });

// const snapshot = await db.collection('users').get();
// snapshot.forEach((doc) => {
//   console.log(doc.id, '=>', doc.data());
// });