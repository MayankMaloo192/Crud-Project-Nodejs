const express = require('express')

const mongoose = require('mongoose')
const productModel = require('./models/productModel')
const app = express();


app.use(express.json())

app.get('/', (req,res) =>{
    res.send('Hey there ')
})

app.get('/products', async(req,res)=>{
    //read all products

   try{
    const products = await productModel.find({})
    res.status(200).json(products)
   }

   catch(error){
    res.status(500).json(error.message)

   }

})

app.get('/products/:id', async(req,res)=>{
    //read product with id number

    try{
     const {id} =req.params;
     const product= await productModel.findById(id)

     res.status(200).json(product)
    }
 
    catch(error){
     res.status(500).json(error.message)
 
    }
 
 })


 //update product

 app.put('/products/:id', async(req,res)=>{
    //update product with id number

    try{
     const {id} =req.params;
     const product= await productModel.findByIdAndUpdate(id,req.body)
     if(!product){
        //can't find product with id 

        return res.status(500).send(`can't find product with ${id}`)
     }

     const updatedProduct = await productModel.findById(id);




     res.status(200).json(updatedProduct)
    }
 
    catch(error){
    console.log(error)
     res.status(500).json(error.message)
 
    }
 
 })


 // delete a product with id

 app.delete('/products/:id', async(req,res)=>{
    //delete product with id number

    try{
     const {id} =req.params;
     const product= await productModel.findByIdAndDelete(id)
     if(!product){
        //can't find product with id 

        return res.status(500).send(`can't find product with ${id}`)
     }

    



 
     res.status(200).json(product)
    }
 
    catch(error){
    console.log(error)
     res.status(500).json(error.message)
 
    }
 
 })



app.post('/products',async(req,res)=>{
    //add product to database
  try{
    const product = await productModel.create(req.body)
    res.status(200).json(req.body)

  }
  catch(error){
    console.log(error.message)
    res.status(500).json({msg:error.message})
  }
})


mongoose.connect('mongodb+srv://mayankmaloo3:mayankmaloo192@cluster0.qwmqcnu.mongodb.net/')
.then(()=>{
    console.log('connected to mongoose ')

    app.listen(3000,()=>{
        console.log('Server started !!')
    })


}).catch((err)=>{

    console.log(err);

})