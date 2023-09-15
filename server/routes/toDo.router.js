const express = require("express");
const listRouter = express.Router();

//db connection
const pool = require("../modules/pool");


// GET route

listRouter.get("/", (req, res) =>{
    console.log('GET request made to /list/');
    const queryText = `SELECT * FROM "list" ORDER BY "id" ASC;`;
    pool
    .query(queryText)
    .then((response)=> res.send(response.rows))
    .catch((err) => {
        console.log("Error in GET request", err);
        res.sendStatus(500)
    });
});

// POST route


// PUT route


// DELETE route





//export router
module.exports = toDoRouter;