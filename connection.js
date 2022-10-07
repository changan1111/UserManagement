const mongoose = require("mongoose")

require('dotenv').config();


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const uri = process.env.connectionstringuri;

console.log(uri)

//const uri = {{ secrets.CONNECTIONSTRINGURI }};

const connexion = mongoose.connect(uri,connectionParams).then (()=> console.log("connected to mongodb")).catch((err)=>console.log(err))

module.exports=connexion
