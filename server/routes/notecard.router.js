const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('GET router reached');
        const queryText = `SELECT * FROM notecards WHERE collection_name = $1 AND collection_id = $2`;
        pool.query(queryText, [req.params.id, req.user.id]).then((result)=>{
            console.log('notecards GET success', result.rows);
            res.send(result.rows);
        }).catch((err)=>{
            console.log('error notecards GET route', err)
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

// router.post('/', (req, res) => {
//     if (req.isAuthenticated()){
//         let queryText='INSERT INTO "collections" ("collection", person_id) VALUES ($1, $2);';
//         pool.query(queryText, [req.body.collection, req.user.id]).then((result) =>{
//             res.sendStatus(200);
//         }).catch((err) =>{
//             res.sendStatus(500);
//         })
//     } else{
//         res.sendStatus(403);
//     }
// });



module.exports = router;