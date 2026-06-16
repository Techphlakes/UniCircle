import pool from "../config/db.js";

const Claim = {

create: async(data)=>{

const {
post_id,
claimant_name,
phone,
message
}=data;

const result =
await pool.query(

`
INSERT INTO claims
(
post_id,
claimant_name,
phone,
message
)

VALUES($1,$2,$3,$4)

RETURNING *
`,
[
post_id,
claimant_name,
phone,
message
]

);

return result.rows[0];

}

};

export default Claim;