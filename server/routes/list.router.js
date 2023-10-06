const express = require("express");
const listRouter = express.Router();

//db connection
const pool = require("../modules/pool");


// GET route
listRouter.get("/", (req, res) =>{
    console.log('GET request made to /list/');
    // want the order to have the new items added to the top
    const queryText = `SELECT * FROM "list" ORDER BY "completed" ASC, "id" ASC;`;
    pool
    .query(queryText)
    .then((response)=> res.send(response.rows))
    .catch((err) => {
        console.log("Error in GET request", err);
        res.sendStatus(500)
    });
});

// POST route
listRouter.post("/", (req, res) => {
    let item = req.body;
    console.log("POST REQUEST adding list item:", item);
    // sanitize the data
    let queryText = `INSERT INTO "list" ("task", "completed")
    VALUES ($1, $2);`;
    // backend validation
    if (!item.task || !item.completed){
        res.sendStatus(400);
        return
    };
    pool
    .query(queryText, [item.task, item.completed])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error adding new listItem`, error);
        res.sendStatus(500);
      });

})

// PUT route
// using id as param
listRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const item = req.body;
    console.log(item);
    let queryText;
    console.log("UPDATE item in /list with id:", id);
    // sanitize the data and allow update to the "true or false" of item completed
    queryText = `UPDATE "list" SET "completed" = $1 WHERE "id" = $2;`;
    console.log("querytext for true or false", queryText);
    pool.query(queryText, [item.completed, id])
    .then(() => {
        res.sendStatus(204); // 204 no content
      })
      .catch((err) => {
        console.log("error in UPDATING item from list table", err);
        res.sendStatus(500);
    });
})

// DELETE route
// using id as param
listRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log("DELETE route /list with id of:", id);
    // sanitize data
    const queryText = `DELETE FROM "list" WHERE "id" = $1;`
    pool
    .query(queryText, [id])
    .then(() => {
        res.sendStatus(204); // 204 no content
      })
    .catch((err) => {
        console.log("error in DELETing item from list table", err);
        res.sendStatus(500);
    });
})



//export router- keep at bottom
module.exports = listRouter;