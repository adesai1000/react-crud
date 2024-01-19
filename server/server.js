const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/productModels.js');
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
require('dotenv').config()


app.get('/', (req,res)=>{
    res.send("Node API is working")
})

app.get('/blog',(req,res)=>{
    res.send("Node Blog")
})
//Fetch Items
app.get('/products', async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
        }
    catch (error){
        res.status(500).json({message: error.message})
    }
})
//Fetch by ID
app.get('/products/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Create Items
app.post('/products', async(req,res)=>{
try{
    const product = await Product.create(req.body)
    res.status(200).json(product);
}
catch(error){
console.log(error.message);
res.status(500).json({message: error.message})
}
})

//Update Items
app.put('/products/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: `Cannot find a product with ID ${id}` })
        }
        const Updatedproduct = await Product.findByIdAndUpdate(id, req.body)
        res.status(200).json(Updatedproduct);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//Delete Items
app.delete('/products/:id', async(req,res)=>{
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with ID ${id}` })
        }
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongo DB");
    app.listen(3000,()=>{
        console.log("Node API is running on 3000.")
    })
}).catch((error)=>{
    console.log(error)
})


