const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const income = new Schema({
  incomeSource : {
    type : String,
    required : true
  },
  incomeAmount : {
    type : Number,
    required : true,
    default : 0
  },
  date : {
    type : Date,
    default : Date.now
  }
})


const expense = new Schema({
  expenseCategory : {
    type : String,
    required : true
  },
  expenseAmount : {
    type : Number,
    required : true,
    default : 0
  },
  date : {
    type : Date,
    default : Date.now
  }
})

// Create Schema
const UserSchema = new Schema({
  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  income:{
    type : [income],
    default : null
  },
  expense: {
    type : [expense],
    default : null
  }
});
module.exports = User = mongoose.model("users", UserSchema);