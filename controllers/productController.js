import Product from "../models/Product.js";



export const createProduct = async(req,res)=>{

try{

const {
title,
description,
price,
category,
product_type,
quantity,
condition
}=req.body;

const image =
req.file ? req.file.filename : null;

const product =
await Product.create({

user_id:req.user.id,

title,
description,
price,
category,
image,

product_type:
product_type || "regular",

quantity:
quantity || 1,

condition:
condition || null

});

res.status(201).json({

message:"Product created",

product

});

}

catch(error){

res.status(500).json({
error:error.message
});

}

};





export const getProducts = async(req,res)=>{

try{

const products =
await Product.getAll();

const stats =
await Product.getStats();


const featuredProducts =
products.slice(0,9);

res.render(
"pages/marketplace",
{
products,
stats,
featuredProducts

}
);

}

catch(error){

res.status(500).send(error.message);

}

};





export const getProduct = async(req,res)=>{

try{

const product =
await Product.getOne(
req.params.id
);

const similarProducts =
await Product.getSimilar(
product.category,
product.id
);

res.render(
"pages/product-details",
{
product,
similarProducts
}
);

}

catch(error){

res.status(500)
.send(error.message);

}

};





export const markSold = async(req,res)=>{

try{

const product =
await Product.changeStatus(

req.params.id,
"sold",
req.user.id

);

res.json(product);

}

catch(error){

res.status(500).json({
error:error.message
});

}

};





export const deleteProduct = async(req,res)=>{

try{

await Product.delete(
req.params.id,
req.user.id
);

res.json({
message:"Product deleted"
});

}

catch(error){

res.status(500).json({
error:error.message
});

}

};