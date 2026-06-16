import pool from "../config/db.js";


const Profile = {


create: async(data)=>{


const {
user_id,
department,
level,
bio,
profile_image
}=data;


const result = await pool.query(

`
INSERT INTO profiles
(
user_id,
department,
level,
bio,
profile_image
)

VALUES($1,$2,$3,$4,$5)

RETURNING *
`,

[
user_id,
department,
level,
bio,
profile_image
]

);


return result.rows[0];

},





getByUser: async(user_id)=>{


const result = await pool.query(

`
SELECT

profiles.*,
users.name,
users.email

FROM profiles

JOIN users

ON profiles.user_id = users.id

WHERE user_id=$1

`,
[user_id]

);


return result.rows[0];


},




update: async(user_id,data)=>{


const {

department,
level,
bio,
profile_image

}=data;



const result = await pool.query(

`
UPDATE profiles

SET
department=$1,
level=$2,
bio=$3,
profile_image=$4

WHERE user_id=$5

RETURNING *
`,

[
department,
level,
bio,
profile_image,
user_id
]

);


return result.rows[0];

}


};


export default Profile;