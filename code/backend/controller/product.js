const express=require("express")
const productModel=require("../schema/productSchema")
const router=express.Router()
router.post("/addProducts",(req,res)=>{
    if(req.headers.token){
        productModel.create({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category
        }).then((data)=>{
            res.status(200).send("Data added successfully")
        })
    }else{
        res.status(400).send("Token not found")
    }
    
})
router.get("/products",async(req,res)=>{
    if(req.headers.token){
    const { page = 1, limit = 2 } = req.query;

    try {
      const product= await productModel.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await productModel.countDocuments();
  
      res.json({
        product,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
}else{
    res.status(400).send("Token not found")
}
    
})
router.get("/products/:id",(req,res)=>{
    if(req.headers.token){
    productModel.findOne({_id:req.params.id}).then((data)=>{
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:"Item not found"})
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
}else{
    res.status(400).send("Token not found")
}
})
router.delete("/products/:id",(req,res)=>{
    if(req.headers.token){
    productModel.deleteOne({_id:req.params.id}).then((data)=>{
        if(data){
            res.status(200).send("Data deleted")
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
}else{
    res.status(400).send("Token not found")
}
})
router.put("/update/:id",(req,res)=>{
    if(req.headers.token){
    productModel.findOneAndUpdate (
        {_id: req.params.id},
        {$set: req.body},
        {new: true}
      ).then((data)=>{
        if(data){
            res.status(200).send(data)
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
}else{
    res.status(400).send("Token not found")
}
})
router.get("/product/electronics",(req,res)=>{
    if(req.headers.token){
    productModel.find({category:"Electronics"}).then((Electronics)=>{
        console.log(Electronics)
        res.status(200).send({Electronics})
    }).catch((err)=>{
        console.log(err)
    })
}else{
    res.status(400).send("Token not found")
}
})
router.get("/product/furniture",(req,res)=>{
    if(req.headers.token){
    productModel.find({category:"Furniture"}).then((Furniture)=>{
        console.log(Furniture)
        res.status(200).send({Furniture})
    }).catch((err)=>{
        console.log(err)
    })
}else{
    res.status(400).send("Token not found")
}
})
router.get("/product/price",(req,res)=>{
    if(req.headers.token){
    productModel.find({price:{$gte:2000,$lte:32000 }}).then((price)=>{
        console.log(price)
        res.status(200).send({price})
    }).catch((err)=>{
        console.log(err)
    })
}else{
    res.status(400).send("Token not found")
}
})
router.get("/product/name",(req,res)=>{
    if(req.headers.token){
    productModel.find({name:req.body.name}).then((name)=>{
        console.log(name)
        res.status(200).send({name})
    }).catch((err)=>{
        console.log(err)
    })
}else{
    res.status(400).send("Token not found")
}
})
module.exports=router