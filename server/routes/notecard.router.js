const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/:id', (req, res) =>{
    if(req.isAuthenticated()){
        const queryText = `UPDATE "notecards" SET "frontside" = $1, "backside" = $2 WHERE "id" = $3;`
        pool.query(queryText, [req.body.editContent.frontside, req.body.editContent.backside, req.body.notecard.id])
        .then((result)=>{
            res.sendStatus(200);
        }).catch((err)=>{
            console.log('error put ', err)
            res.sendStatus(500);
        });
    } 
    else {
        res.sendStatus(403);
    }
})

router.delete('/:id', (req, res) => {
    if(req.isAuthenticated()) {
        const queryText = `DELETE FROM "notecards" WHERE id = $1`; 
        pool.query(queryText, [req.params.id])
        .then((result)=> {
            res.sendStatus(200);
        }).catch((err)=>{
            console.log('ERROR DELETE /api/collection', err)
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403); 
    }
});

router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('GET router reached');
        const queryText = `SELECT * FROM notecards WHERE collection = $1 AND collection_id = $2 ORDER BY id`;
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

router.post('/',(req, res)=>{
    if(req.isAuthenticated()){
        let queryText=`INSERT INTO "notecards" ("frontside", "backside", "collection", "collection_id") VALUES ($1, $2, $3, $4);`;
        pool.query(queryText, [req.body.frontside, req.body.backside, req.body.collection, req.user.id]).then((result)=>{
            res.sendStatus(200);
        }).catch((err)=>{
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})



module.exports = router;