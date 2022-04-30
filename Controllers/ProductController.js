const { Validator } = require('node-input-validator');
const Product = require('../models/Product');
const {ResponsePayload } = require('../helper/helper');
const CreateProduct =async(req,res)=>{

    const v = new Validator(req.body, {
        name:'required',
        quantity: 'required',
        amount: 'required',
    });
    let validationFailed = true;
    console.log(req.user.user_id)
    await v.check().then((matched) => {
      if (!matched) {
        validationFailed = true;
      }else{
        validationFailed = false;
      }
    });

    if(validationFailed === true){
      res.status(422).send({...v.errors, status:303});
    }
    else{

      try {
        const {name,quantity,amount} = req.body;
        const product = new Product({
            name:name,
            quantity: quantity,
            amount: amount,
            createdBy:req.user.user_id
        });
        try{
            await product.save();
            return res.status(200).json(ResponsePayload(200,"Products Saved"));
        }
        catch(error)
        {
            console.log(error)
            return res.status(400).json(ResponsePayload());
        }
        
      }catch(error){
        // console.log(error)
        return res.status(400).json({ message : "Technical Error. Please try again later"});
      }
    }
}


const AllProducts =async(req,res)=>{

    try{
        let {size,page} = req.body;
        if(!page){
            page = 1;
        }

        if(!size){
            size=8;
        }

        const limit  = parseInt(size);
        const skip = (page -1) * limit;
        
         try{
             const user = await Product.find().limit(limit).skip(skip)//get paginated Products
             res.status(200).json(ResponsePayload(200,"Success",user))  
         }
         catch(error){
            
             console.log(error)
            res.status.json(ResponsePayload())
         }
    }
    catch(error){
        console.log(error)
    }
    
}


const JoinProductsWithUser =async(req,res)=>{

    try{
        Product.find({},(error,result)=>{
            if(error){
                console.log(error)
                res.status.json(ResponsePayload())
            }else{
                res.status(200).json(ResponsePayload(200,"Success",result))
            }
        })
        .populate({path:"createdBy",select:["name","email"]}) //returns only the selected columns
        // .populate("createdBy"); //this returns every thing 
    }
    catch(error){
        console.log(error)
    }
    
}

module.exports={
    CreateProduct,
    AllProducts,
    JoinProductsWithUser
}

