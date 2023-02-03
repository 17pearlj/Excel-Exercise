const express = require("express");
const router = express.Router();
const { addObject, editObject, deleteObject, getAllObjects } = require("../controllers/object");
const { isUserLoggedIn, doesObjectExist, doesUserExist } = require("../middleware/index");

/**
 *
 * POST /object
 * adds a new object to the databse
 *
 */

router.post("/", [], async (req, res) => {
  
  let { type, name, imageUrl, title, description, value, userId } = req.body;

  const object = await addObject(
    type,
    name,
    imageUrl,
    title,
    description,
    value,
    userId,
  );
  if (object) {
    res.status(200).send(object);
  } else {
    res.status(401).send({});
  }
});

/**
 * GET api/object/:userId
 *
 * gets all objects associated with a userId
 *
 */
router.get("/:userId", [isUserLoggedIn, doesUserExist], async (req, res) => {
  let userId= req.params.userId;
  let allObjects = await getAllObjects(userId);
  if (allObjects) {
    res.send(allObjects);
  } else {
    res.status(401).send({});
  }
});

/**
 * PATCH api/object/:objectId
 *
 * edits a specific object 's property with a objectId
 *
 */
router.patch("/:objectId", [isUserLoggedIn, doesObjectExist],async (req, res) => {

  let objectId = req.params.objectId;
  let data  = req.body;
  let response = await editObject(objectId, data);
  if (response) {
    res.status(200).send("Sucessfully edited object");
  } else {
    res.status(304).send({ error: `Failed to edit frame with id ${objectId}` });
  }
});

/**
 *
 * DELETE api/object/:objectId
 *
 * deletes a specific object with objectId
 *
 */
router.delete("/:objectId",[isUserLoggedIn, doesObjectExist],async (req, res) => {
  let objectId = req.params.objectId;
  let response = await deleteObject(objectId);
  if (response) {
    res.status(200).send("Sucessfully deleted object");
  } else {
    res.status(304).send({ error: `Failed to delete object with id ${objectId}` });
  }
});


module.exports = router;

