import express, { json } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { SignInhandle } from './controllers/signin.js';
import { ProfileHandle } from './controllers/profile.js';
import { ImageHandle, ImageURL } from './controllers/image.mjs';
import clarifai from 'clarifai';


// const db = knex({
//     client: 'pg',
//     connection: {
//       connectionString : process.env.DATABASE_URL,
//       ssl: { rejectUnauthorized: false },
//       host: process.env.DATABASE_HOST,
//       port : 5432,
//       user : process.env.DATABASE_USER,
//       password : process.env.DATABASE_PW,
//       database : process.env.DATABASE_DB
//     }

//   });

// Custom middleware to check input length
const validateInputLength = (maxAllowedLength) => (req, res, next) => {
    // Check the length of the request body or query parameters, depending on your usage
    const requestData = req.body || req.query;
  
    for (const key in requestData) {
      if (requestData[key].length > maxAllowedLength) {
        return res.status(400).json({ error: `Input data for '${key}' exceeds the allowed length.` });
      }
    }
  
    next(); // Proceed to the next middleware
  };
  

  const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user : 'facedetectbackendx22_user',
      password : 'Ay3N8TbWMD80rhnorOmo0cs0l72tsZl1',
      database : 'facedetectx22'
    }

  });
    
db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();
app.use(json());
app.use(cors())

app.get('/',(req,res) => {
    res.send(database.user);
})


app.post('/signin', validateInputLength(20),(req,res) => {SignInhandle(req,res,db,bcrypt)})


app.post("/register", validateInputLength(20),(req,res) => { handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => { ProfileHandle(req,res,db)})

app.put('/image',(req,res) => { ImageHandle(req,res,db)})

app.post('/imageurl', validateInputLength(50),(req,res) => { ImageURL(req,res)})
    // let found = false;
    // database.user.forEach(i => {
    //     if(i.id===id) {
    //        found = true;
    //        i.entries++;
    //        return res.json(i.entries);
    //     }
    // })
    // if(!found){
    //     res.status(404).json('no such user');
    // }



app.listen(3000, ()=> {
    console.log('app is runing')
})
