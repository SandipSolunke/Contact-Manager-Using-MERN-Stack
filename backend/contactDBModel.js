import mongoose from "mongoose"

const x=new mongoose.Schema({

  "username" : {type: String},
  "password" : {type : String},
  "email" :{type : String},

  "contacts" :[{
  "name" :{type : String},
  "email": {type : String}
  }]

  })

const contactsDBModel= mongoose.model("contacts",x)

export default contactsDBModel