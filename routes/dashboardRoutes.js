import express from "express";
import auth from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import LostFound from "../models/LostFound.js";

const router = express.Router();


router.get("/", auth, async(req,res)=>{

try{


const user =
await User.findById(req.user.id);

const stats =
await LostFound.getUserStats(
req.user.id
);

const posts =
await LostFound.getUserPosts(
req.user.id
);


res.render(
"pages/dashboard",
{
user,
stats,
posts
}
);


}catch(error){

res.status(500).send(error.message);

}


});


export default router;