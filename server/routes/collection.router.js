const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('GET router reached');
        const queryText = `SELECT * FROM collections WHERE "person_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((result)=>{
            res.send(result.rows);
        }).catch((err)=>{
            console.log('error collections GET route', err)
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    if (req.isAuthenticated()){
        let queryText='INSERT INTO "collections" ("collection", person_id) VALUES ($1, $2);';
        pool.query(queryText, [req.body.collection, req.user.id]).then((result) =>{
            res.sendStatus(200);
        }).catch((err) =>{
            res.sendStatus(500);
        })
    } else{
        res.sendStatus(403);
    }
});

module.exports = router;