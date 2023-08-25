export const ProfileHandle = (req, res,db) => {
    const { id } = req.params;
    //let found = false;
    // database.user.forEach(i => {
    //     if(i.id===id) {
    //        found = true;
    //        return res.json(i);
    //     }
    // })
    db.select('*').from('users').where({id})
    .then( user => {
        if(user.length){
        res.json(user[0]);
        }
        else{
            res.status(404).json('not found');
        }
    })
    // if(!found){
    //     res.status(404).json('no such user');
    // }
    .catch(err => res.status(404).json('error getting user'))
}

// module.exports = {
//     ProfileHandle
// }