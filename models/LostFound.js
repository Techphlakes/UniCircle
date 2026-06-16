import pool from "../config/db.js";


const LostFound = {


create: async(data)=>{


const {
user_id,
type,
category,
title,
description,
location,
contact,
image
}=data;


const result = await pool.query(

`
INSERT INTO lost_found
(
user_id,
type,
category,
title,
description,
location,
contact,
image
)

VALUES($1,$2,$3,$4,$5,$6,$7,$8)

RETURNING *
`,

[
user_id,
type,
category,
title,
description,
location,
contact,
image
]

);


return result.rows[0];

},




// ALL POSTS FOR PUBLIC LOST FOUND PAGE

getAll: async()=>{


const result =
await pool.query(

`
SELECT
lost_found.*,
users.name

FROM lost_found

JOIN users
ON lost_found.user_id = users.id

ORDER BY created_at DESC
`

);


return result.rows;

},






// ONE POST

getOne: async(id)=>{


const result =
await pool.query(

`
SELECT
lost_found.*,
users.name

FROM lost_found

JOIN users
ON lost_found.user_id = users.id

WHERE lost_found.id=$1
`,
[id]

);


return result.rows[0];

},





// USER DASHBOARD POSTS

getUserPosts: async(user_id)=>{


const result =
await pool.query(

`
SELECT *
FROM lost_found
WHERE user_id=$1
ORDER BY created_at DESC
`,
[user_id]

);


return result.rows;

},

getUserStats: async(user_id)=>{

const result = await pool.query(

`
SELECT

COUNT(*) AS total_posts,

COUNT(
CASE
WHEN type='lost'
THEN 1
END
) AS lost_posts,

COUNT(
CASE
WHEN type='found'
THEN 1
END
) AS found_posts

FROM lost_found

WHERE user_id=$1
`,
[user_id]

);

return result.rows[0];

},





// EDIT POST

update: async(id,data)=>{


const {
title,
description,
location,
contact,
category
}=data;



const result =
await pool.query(

`
UPDATE lost_found

SET

title=$1,
description=$2,
location=$3,
contact=$4,
category=$5

WHERE id=$6

RETURNING *

`,

[
title,
description,
location,
contact,
category,
id
]

);



return result.rows[0];


},






// DELETE

delete: async(id,user_id)=>{


await pool.query(

`
DELETE FROM lost_found

WHERE id=$1
AND user_id=$2
`,

[
id,
user_id
]

);


},





// MARK AS FOUND / RETURNED

changeStatus: async(id,status,user_id)=>{


const result =
await pool.query(

`
UPDATE lost_found

SET status=$1

WHERE id=$2
AND user_id=$3

RETURNING *

`,

[
status,
id,
user_id
]

);



return result.rows[0];


}



};


export default LostFound;