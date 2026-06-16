import LostFound from "../models/LostFound.js";


export const dashboard = async(req,res)=>{


const posts =
await LostFound.getUserPosts(
req.user.id
);


res.render(
"pages/dashboard",
{
user:req.user,
posts
}
);


};