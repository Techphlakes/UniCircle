import pool from "../config/db.js";

const Service = {

create: async(data)=>{

const {
user_id,
title,
description,
price,
category,
image
}=data;

const result = await pool.query(

`
INSERT INTO services
(
user_id,
title,
description,
price,
category,
image
)

VALUES($1,$2,$3,$4,$5,$6)

RETURNING *
`,

[
user_id,
title,
description,
price,
category,
image
]

);

return result.rows[0];

},





getAll: async()=>{

const result =
await pool.query(

`
SELECT

services.*,
users.name

FROM services

JOIN users

ON services.user_id = users.id

WHERE status='active'

ORDER BY featured DESC,
created_at DESC
`

);

return result.rows;

},





getOne: async(id)=>{

const result =
await pool.query(

`
SELECT

services.*,
users.name,
users.phone

FROM services

JOIN users

ON services.user_id = users.id

WHERE services.id=$1

`,
[id]

);

return result.rows[0];

},





getSimilar: async(category,id)=>{

const result =
await pool.query(

`
SELECT

services.*,
users.name

FROM services

JOIN users

ON services.user_id = users.id

WHERE services.category=$1
AND services.id <> $2

ORDER BY RANDOM()

LIMIT 6
`,
[
category,
id
]

);

return result.rows;

}

};

export default Service;