const mongoose = require("mongoose")


const MONGODB_URL = process.env.MONGODB_URL


exports.connect=()=>{
    mongoose.connect(MONGODB_URL,
        {
            useNewUrlParser : true,
            useUnifiedTopology:true,

        }).then(console.log("connected with DB"))
        .catch((error)=>{
            console.log(error )
            console.log("it failed")
            process.exit(1)

        })
}