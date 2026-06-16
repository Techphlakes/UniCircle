import express from "express";

import multer from "multer";

import auth from "../middleware/authMiddleware.js";


import {

createProfile,
getProfile,
updateProfile

}

from "../controllers/profileController.js";



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



const upload =
multer({storage});




router.post(

"/",

auth,

upload.single("image"),

createProfile

);





router.get(

"/:id",

getProfile

);





router.put(

"/",

auth,

upload.single("image"),

updateProfile

);





export default router;