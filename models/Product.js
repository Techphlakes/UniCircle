import pool from "../config/db.js";

const Product = {

create: async(data)=>{

const {
user_id,
title,
description,
price,
category,
image,
product_type,
quantity,
condition
}=data;

const result =
await pool.query(

`
INSERT INTO products
(
user_id,
title,
description,
price,
category,
image,
product_type,
quantity,
condition
)

VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)

RETURNING *
`,
[
user_id,
title,
description,
price,
category,
image,
product_type,
quantity,
condition
]
);

return result.rows[0];

},



getAll: async()=>{

const result =
await pool.query(

`
SELECT
products.*,
users.name

FROM products

JOIN users
ON products.user_id = users.id

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
products.*,
users.name,
users.phone

FROM products

JOIN users
ON products.user_id = users.id

WHERE products.id=$1
`,
[id]
);

return result.rows[0];

},



getStats: async()=>{

const result =
await pool.query(

`
SELECT

COUNT(*) AS total_products,

COUNT(
CASE
WHEN status='available'
THEN 1
END
) AS available_products,

COUNT(
CASE
WHEN status='sold'
THEN 1
END
) AS sold_products,

COUNT(
CASE
WHEN featured=true
THEN 1
END
) AS featured_products

FROM products
`
);

return result.rows[0];

},

getSimilar: async(category,currentId)=>{

const result =
await pool.query(

`
SELECT
products.*,
users.name

FROM products

JOIN users
ON products.user_id = users.id

WHERE products.category=$1
AND products.id != $2

ORDER BY RANDOM()

LIMIT 6
`,
[
category,
currentId
]

);

return result.rows;

},

getFeatured: async()=>{

const result =
await pool.query(

`
SELECT
products.*,
users.name

FROM products

JOIN users
ON products.user_id = users.id

WHERE featured=true

ORDER BY created_at DESC

LIMIT 10
`

);

return result.rows;

},

changeStatus: async(id,status,user_id)=>{

const result =
await pool.query(

`
UPDATE products

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

},



delete: async(id,user_id)=>{

await pool.query(

`
DELETE FROM products

WHERE id=$1
AND user_id=$2
`,
[
id,
user_id
]
);

}

};

getSimilar: async(category,currentId)=>{

const result =
await pool.query(

`
SELECT
products.*,
users.name

FROM products

JOIN users
ON products.user_id = users.id

WHERE category=$1
AND id != $2

ORDER BY RANDOM()

LIMIT 6
`,
[
category,
currentId
]

);

return result.rows;

}
export default Product;

