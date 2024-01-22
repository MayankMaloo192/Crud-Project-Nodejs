const mongoose = require('mongoose');


const productSchema = mongoose.Schema(
    {
    
        name:{
            type: String,
            required: [true,"Please enter name"],
        },

        quantity:{
            type: Number,
            required:true,
            default:0
        },
        price:{
            type:Number,
            required:true
        },

        img:{
            type:String,
            required:false
        }
    },

    {
        timestamp:true
    }


)


const Product = mongoose.model("Product",productSchema);

module.exports = Product