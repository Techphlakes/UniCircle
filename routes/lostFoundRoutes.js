import express from "express";
import LostFound from "../models/LostFound.js";

import {
createLostFound,
getLostFound,
getSingleLostFound,
deleteLostFound,
markReturned
}
from "../controllers/lostFoundController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
"/",
authMiddleware,
uploadMiddleware.single("image"),
createLostFound
);

router.get(
"/",
getLostFound
);

router.get(
"/:id",
async(req,res)=>{

try{

const post =
await LostFound.getOne(
req.params.id
);

res.render(
"pages/lost-found-details",
{
post
}
);

}

catch(error){

res.status(500)
.send(error.message);

}

});

router.delete(
"/:id",
authMiddleware,
deleteLostFound
);

router.put(
"/:id/returned",
authMiddleware,
markReturned
);
export default router;