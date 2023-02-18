const jwt =  require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token =req.cookies   //req.cookies.token actually but variable is named token js does it for us  {token } will also work


    //what if token is not there
    if(!token)
    {
        return res.status(400).send("no token is there")
    }

    //verify token

    try {

        const decode = jwt.verify(token,process.env.SECERT)
        console.log(decode)
        req.user = decode
        
    } catch (error) {
        return res.status(400).send(" token is invalid")
        
    }
    next()



   //extract the id form form token and query the DB

   
}

module.exports= auth