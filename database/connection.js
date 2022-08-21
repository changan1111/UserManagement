const mongoose = require("mongoose")

require('dotenv').config();


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const uri = process.env.connectionstringuri;

const connexion = mongoose.connect(uri,connectionParams).then (()=> console.log("connected to cloud atlas")).catch((err)=>console.log(err))

module.exports=connexion
