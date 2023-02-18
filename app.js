
require("dotenv").config()
require("./config/database").connect()
const express = require("express")
const jswt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")


//import middlware
const auth = require("./middleware/auth")


//import - model user

const User = require("./model/user")
const app = express()

app.use(express.json()) //dicuss this later
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())   // it enjects the  use cookie in req everywhere


app.get("/",(req,res)=>{
    res.send("hello auth system")
})

app.post("/register",async(req, res)=>{
try{
    const {firstName ,lastName, email,password } = req.body

    //validaate if all the data are present 
    if(!(firstName&&lastName&&email&&password))
    {
        res.status(401).send("all fieds are required")
    }

    // check is the email is in right foramt

  

   // check is the user exist 
   const checker = await User.findOne({email})
   if(checker)
   {
        res.status(401).send("this email is already used")
   }

//encryt  the password

   const cryptPassword = await bcrypt.hash(password,10)


   // create a new entry in database

  const newUser =  await User.create(
    {
        firstName,
        lastName,
        email,
        password:cryptPassword
    
    
   })

   //create a token and send it to user

   const token = jswt.sign({
    id: newUser._id,email

   },process.env.SECERT,"2h")

   newUser.token = token

   //dont want to send the password 
   newUser.password = undefined

   res.status(201).json(newUser)









} catch(error)
{
    console.log(error)
    console.log("couldnt connect to database")

}


})
 

app.post("/login",async(req,res)=>{
    res.status(200).send("alles")

  
})

app.get("/dashboard",(req,auth,res)=>
{




})


module.exports = app;



