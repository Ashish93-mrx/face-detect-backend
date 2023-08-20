const SignInhandle = (req,res,db,bcrypt) => {
const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json('please enter all details');
    }
    //Load hash from your password DB.
    // bcrypt.compare("haha", '$2a$10$7.nQuaeO9drS2n6p4UnJE.yH99O16/zYkDgzCo1RpwQ620Q8uljQS', function(err, res) {
    //     // res == true
    //     console.log('first',res);
    // });
    // bcrypt.compare("veggies", '$2a$10$7.nQuaeO9drS2n6p4UnJE.yH99O16/zYkDgzCo1RpwQ620Q8uljQS', function(err, res) {
    //     res = false
    //    console.log('sec',res);
    // });
    //   if(req.body.email === database.user[0].email && req.body.password === database.user[0].password)
    //   {
    //   res.json(database.user[0]);
    //   } else {
    //     res.status(400).json('error logging in');
    //   }
        db.select('email','hash').from('login')
        .where('email','=',req.body.email)
        .then( data =>{
            const isValid = bcrypt.compareSync(password, data[0].hash);
    
            if(isValid){
                return db.select('*').from('users')
                    .where('email','=',email)
                    .then( user =>{
                        res.json(user[0])
                    })
                .catch(err =>res.status(400).json('unable to get user'))
            }
            else{
            res.status(400).json('wrong credentials')
            }
        })
        .catch(err =>res.status(400).json(' wrong credentials'))
    
    }

module.exports = {
    SignInhandle: SignInhandle
}
