import {Useer }from '../models/user_models.js'
export const CreateNewUser= (async(req,res)=>{
    try{
    const user = req.body
    await Useer.create(user)
return(res.status(200).send ('The user is created'))
    }
catch(error){
 res.status(400).send({message:error.message})
}
})