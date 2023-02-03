const User = require("../models/user");
const Objects = require("../models/object");



async function addObject(type, name, imageUrl, title, description, value, userId) {
  try {

    let object = Objects({
      type: type,
      name: name,
      imageUrl: imageUrl,
      title: title,
      description: description,
      value: value,
      userId: userId,
    });
    
    return await object.save();
  } catch (error) {
    console.log("error saving", error)
    return false;
  }
}

/**
 * 
 * Needs to be fleshed out more
 * @param {*} objectId 
 * @param {*} data 
 * @returns 
 */

async function editObject(objectId,data){


    try {

        
        await Objects.updateOne({_id:objectId},data);
        // console.log("succssfukky updated")/
        return true;
    } catch (error){
        return false;
    }
}

/**
 * Needs to get all Objects
 * @param {*} userId 
 * @returns 
 */
async function getAllObjects(userId){
    try {
        let objectsFound = await Objects.find({userId: userId})
        return objectsFound;
    } catch (error) {
        return false;
    }
}

/**
 * 
 * Deletes a object with a specific objectId
 * @param {*} objectId 
 * @returns 
 */
async function deleteObject(objectId){
  try {
      let object = await Objects.findOne({_id:objectId});
      if (object){
        await Objects.deleteOne({_id: objectId});
      }
      return true;
  } catch (error) {
      return false;
  }
}


// /**
//  * 
//  * Deltes a 
//  * @param {*} frameId 
//  * @returns 
//  */
// async function deleteFrame(frameId){
//   try {
//       await Frame.deleteOne({_id: frameId});
//       return true;
//   } catch (error) {
//       return false;
//   }
// }

module.exports = Object.freeze({ addObject, editObject, getAllObjects, deleteObject });