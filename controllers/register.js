const handleRegister = (req,res,db,bcrypt) =>{
    const {email , name, password } = req.body;

    if(!email || !name || !password){
        return res.status(400).json('please enter all details');
    }
    // bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
    //     console.log(hash);
    // });
    // database.user.push({
    //     id: "124",
    //     name: name,
    //     email: email,
    //     //password: password,
    //     entries: 0,
    //     joined: new Date()
    // })
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                 email: loginEmail[0].email,
                 name: name,
                 joined: new Date()
    })
    .then(user => {
        res.json(user[0]);
    })

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('errorr'))
}

module.exports = {
    handleRegister: handleRegister
}

