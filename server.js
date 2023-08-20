const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const clarifai = require('clarifai');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'posttest',
      database : 'postgres'
    }
  });
    
db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();
app.use(express.json());
app.use(cors())

app.get('/',(req,res) => {
    res.send(database.user);
})


app.post('/signin',(req,res) => {signin.SignInhandle(req,res,db,bcrypt)})


app.post("/register", (req,res) => { register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => { profile.ProfileHandle(req,res,db)})

app.put('/image',(req,res) => { image.ImageHandle(req,res,db)})

app.post('/imageurl',(req,res) => { image.ImageURL(req,res)})
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