import express from "express";
import multer from "multer";

import auth from "../middleware/authMiddleware.js";

import {

createProduct,
getProducts,
getProduct,
deleteProduct,
markSold

}

from "../controllers/productController.js";

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
createProduct
);



router.get(
"/",
getProducts
);



router.get(
"/:id",
getProduct
);



router.put(
"/:id/sold",
auth,
markSold
);



router.delete(
"/:id",
auth,
deleteProduct
);

export default router;