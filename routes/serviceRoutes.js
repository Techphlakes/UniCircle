import express from "express";
import multer from "multer";

import auth from "../middleware/authMiddleware.js";
import Service from "../models/Service.js";

import {

createService,
getServices,
getService

}

from "../controllers/serviceController.js";

const router = express.Router();

const storage =
multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/");

},

filename:(req,file,cb)=>{

cb(
null,
Date.now()+"-"+file.originalname
);

}

});

const upload = multer({storage});

router.post(

"/",

upload.single("image"),

auth,

createService

);



/*
SERVICES PAGE
*/
router.get(

"/page",

async(req,res)=>{

try{

const services =
await Service.getAll();

res.render(
"pages/services",
{
services
}
);

}

catch(error){

res.status(500).send(
error.message
);

}

}

);



/*
JSON API
*/
router.get(

"/",

getServices

);



/*
SINGLE SERVICE
*/
router.get(

"/:id",

getService

);

export default router;