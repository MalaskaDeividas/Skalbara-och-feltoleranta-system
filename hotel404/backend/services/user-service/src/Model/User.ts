import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  }, 
  username: {
    type: String, 
    required: true
  }, 
  lastname: {
    type: String, 
    required: true
  }, 
  age: {
    type: Number, 
    required: true
  }, 
  password: {
    type: String, 
    required: true
  }, 
  isAdmin: {
    type: Boolean, 
    required: true
  }, 
})

export const User = mongoose.model('Users', userSchema);
