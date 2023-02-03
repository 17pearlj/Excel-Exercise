const Objects = require("../models/object");
const User = require("../models/user");

const isUserLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.status(400).json({
      error: "You are not logged in",
    });
  } else {
    next();
  }
};

const doesObjectExist = async (req,res,next) =>{
  let objectId = req.params.objectId;
  try{
    let object = await Objects.findOne({_id: objectId});
    if (object){
      next()
    }else{
      res.status(401).send("Could not find object")
    }

  }catch{
    res.status(401).send("Object not found")
  }
}


const doesUserExist = async (req,res,next) =>{
  let userId = req.params.userId;
  try{
    let user = await User.findOne({_id: userId});
    if (user){
      next()
    }else{
      res.status(401).send("Could not find user")
    }

  }catch{
    res.status(401).send("User not found")
  }
}

module.exports = Object.freeze({isUserLoggedIn, doesObjectExist, doesUserExist})