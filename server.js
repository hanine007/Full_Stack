
import configg from './config/config.js';
import app from './Server/express.js'
import mongoose from 'mongoose';









app.listen (configg.port,(err)=>{
    if (err){
        console.log(err);
    }
    console.log(`server is running on port ${configg.port}`)
})
mongoose.connect(configg.mongoUri).then(()=>{
    console.log(`connect to the database`)

})
.catch((error)=>{
    console.log('Error: elle arrive pas a ce connecter',error)

})
