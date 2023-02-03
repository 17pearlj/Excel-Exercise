const mongoose = require("mongoose");

const ObjectSchema = new mongoose.Schema({
type: Number,
name: String,
imageUrl: {
    type: String,
    default: `https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`,
},
title: String,
description: Array,
value: Array,
userId: String
});

// compile model from schema
module.exports = mongoose.model("object", ObjectSchema);
  