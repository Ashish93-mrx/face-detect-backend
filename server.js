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


  const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user : 'postgres',
      password : 'posttest',
      database : 'postgres'
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


app.post('/signin',(req,res) => {SignInhandle(req,res,db,bcrypt)})


app.post("/register", (req,res) => { handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => { ProfileHandle(req,res,db)})

app.put('/image',(req,res) => { ImageHandle(req,res,db)})

app.post('/imageurl',(req,res) => { ImageURL(req,res)})
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