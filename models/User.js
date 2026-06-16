import pool from "../config/db.js";

const User = {


create: async (name,email,password,phone)=>{

const result = await pool.query(

`
INSERT INTO users
(name,email,password,phone)

VALUES($1,$2,$3,$4)

RETURNING *
`,
[
name,
email,
password,
phone
]

);


return result.rows[0];

},



findByEmail: async(email)=>{

const result = await pool.query(

`
SELECT *
FROM users
WHERE email=$1
`,
[email]

);


return result.rows[0];

},



findById: async(id)=>{


const result = await pool.query(

`
SELECT id,name,email,phone
FROM users
WHERE id=$1
`,
[id]

);


return result.rows[0];


}


};


export default User;