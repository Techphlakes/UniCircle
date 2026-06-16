import Profile from "../models/Profile.js";




export const createProfile = async(req,res)=>{


try{


const {
department,
level,
bio
}=req.body;



const image =
req.file ? req.file.filename : null;



const profile =
await Profile.create({

user_id:req.user.id,

department,

level,

bio,

profile_image:image

});



res.json(profile);


}

catch(error){

res.status(500).json({
error:error.message
});

}


};







export const getProfile = async(req,res)=>{


try{


const profile =
await Profile.getByUser(req.params.id);



res.json(profile);


}


catch(error){

res.status(500).json({
error:error.message
});

}


};







export const updateProfile = async(req,res)=>{


try{


const {
department,
level,
bio
}=req.body;



const image =
req.file ? req.file.filename : null;




const profile =
await Profile.update(

req.user.id,

{

department,
level,
bio,
profile_image:image

}

);



res.json(profile);



}

catch(error){

res.status(500).json({
error:error.message
});

}


};