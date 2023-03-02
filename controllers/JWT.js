import jwt from "jsonwebtoken";

export const createUserToken = (user)=>{
  const token = jwt.sign(user, process.env.USER_SERCRET_KEY, {expiresIn: '2h'})

  return token
}

export const validateUserToken = (req, res, next)=>{
  try{
    const token = req.cookies['user_token']
    if(!token){
      console.log(token);
      res.status(403).json("Not Authenticated")
    }
    else{
      const valid = jwt.verify(token,process.env.USER_SERCRET_KEY)
      if(valid){
        req.body.token = valid
        next();
      }      
      else{
        res.status(403).json("Session Expired")
      }
    }
  }
  catch(err){
    res.status(500).json("Something went Wrong")
  }
}


export const deleteToken = (req, res, next)=>{
  res.clearCookie('user_token')
  next()
}