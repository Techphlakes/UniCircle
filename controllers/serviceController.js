import Service from "../models/Service.js";




export const createService = async(req,res)=>{


try{


const {
title,
description,
price,
category
}=req.body;



const image =
req.file ? req.file.filename : null;



const service =
await Service.create({

user_id:req.user.id,

title,

description,

price,

category,

image

});



res.status(201).json({

message:"Service created",

service

});


}


catch(error){

res.status(500).json({

error:error.message

});

}


};







export const getServices = async(req,res)=>{


try{


const services =
await Service.getAll();


res.json(services);


}


catch(error){

res.status(500).json({

error:error.message

});

}


};







export const getService = async(req,res)=>{

try{

const service =
await Service.getOne(
req.params.id
);

const similarServices =
await Service.getSimilar(
service.category,
service.id
);

res.render(
"pages/service-details",
{
service,
similarServices
}
);

}

catch(error){

res.status(500).send(
error.message
);

}

};