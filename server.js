
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User=require("./models/user")

dotenv.config()

const app = express()

// Middleware
app.use(express.json());

// Connexion db MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('db connected✅'))
  .catch((err) => console.log('Erreur❌', err))

// Routes

// 1. GET 
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// 2. POST 
app.post('/users', async (req, res) => {
    try{
        const user=await User.create({
            name:req.body.name,
            email:req.body.email,
            age:req.body.age
        })
        res.status(200).json({
            message:"user created successfully",
            user
        })
    }
    catch(err){
        res.status(400).json(err)
    }
})

// 3. PUT
app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, age } = req.body

  try {
    const user = await User.findByIdAndUpdate(req.params.id ,{
        name:req.body.name,
        email :req.body.email,
        age :age.body.age},
        {new:true}
    )
    res.status(200).json({
        message:"updated successfully!",
        user})

  } 
  catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// 4. DELETE 
app.delete('/users/:id', async (req, res) => {
    try{
        const user=await User.findAndDelete(req.params.id) 
        if(!user){
            res.status(400).json({
                message:`${req.params.id} not founded!!`
            })
        }
        res.status(200).json({
            message:` ${req.params.id} deleted successfully!`
        })
    }
    catch(err){
        res.status(400).json(err)
    }
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(` port running on port ${PORT}`)
})
