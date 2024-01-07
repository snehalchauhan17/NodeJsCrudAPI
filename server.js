const express = require('express')
const mongoose =require('mongoose')
const Product =require('./models/productModel')
const app =express()
//routesq
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Hello Node API')
})

app.get('/blog',(req,res)=>{
    res.send('Hello blog')
})

app.get('/products',async(req,res)=>{
    try{
        const products= await Product.find({});
        res.status(200).json(products);
    
      }
      catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message});
      }
})

app.get('/products/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const product= await Product.findById(id);
        res.status(200).json(product);
    
      }
      catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message});
      }
})
app.post('/product',async(req,res)=>{
  try{
    const product= await Product.create(req.body)
    res.status(200).json(product);

  }
  catch(error){
console.log(error.message);
res.status(500).json({message:error.message});
  }
})

app.put('/product/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const product= await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:'cant find any product with Id ${id}'})
        }
        const updatedProduct =await Product.findById(id);
        res.status(200).json(updatedProduct);
    
      }
      catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message});
      }
})

app.delete('/product/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const product= await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:'cant find any product with Id ${id}'})
        }
        res.status(200).json(updatedProduct);
    
      }
      catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message});
      }
})

mongoose.set('strictQuery',false)
mongoose.connect('mongodb+srv://admin:admin123@cluster0.v7a6kuo.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connect to MongoDB')
    app.listen(3001, ()=> {
        console.log('Node API app is running on port 3001')
    })
   
}).catch((error)=>{
    console.log(error)
})