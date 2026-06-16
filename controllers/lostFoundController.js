import LostFound from "../models/LostFound.js";

export const createLostFound = async(req,res)=>{

try{

const {
type,
category,
title,
description,
location,
contact
}=req.body;

const image =
req.file ? req.file.filename : null;

const post =
await LostFound.create({

user_id:req.user.id,

type,
category,
title,
description,
location,
contact,
image

});

res.status(201).json({

message:"Lost and Found post created",

post

});

}

catch(error){

res.status(500).json({
error:error.message
});

}

};

export const getLostFound = async(req,res)=>{

try{

const posts =
await LostFound.getAll();

res.render(
"pages/lost-found",
{
posts
}
);

}

catch(error){

res.status(500).send(error.message);

}

};

export const getSingleLostFound = async(req,res)=>{

try{

const post =
await LostFound.getOne(req.params.id);

if(!post){

return res.status(404).json({
message:"Post not found"
});

}

res.json(post);

}

catch(error){

res.status(500).json({
error:error.message
});

}

};

export const deleteLostFound = async(req,res)=>{

try{

await LostFound.delete(
req.params.id,
req.user.id
);

res.json({
message:"Post deleted"
});

}

catch(error){

res.status(500).json({
error:error.message
});

}

};
export const markReturned = async(req,res)=>{

try{

const post =
await LostFound.changeStatus(
req.params.id,
"returned",
req.user.id
);

res.json({
message:"Post marked as returned",
post
});

}

catch(error){

res.status(500).json({
error:error.message
});

}

};