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

listRouter.post("/", (req, res) => {
    let item = req.body;
    console.log("POST REQUEST adding list item:", item);
    let queryText = `INSERT INTO "list" ("task", "completed")
    VALUES ($1, $2);`;
    // backend validation
    // if (!listItem.task || !listItem.completed){
    //     res.sendStatus(400);
    //     return
    // };
    pool
    .query(queryText, [item.task, Boolean(item.completed)])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error adding new listItem`, error);
        res.sendStatus(500);
      });

})

// PUT route
listRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const item = req.body;
    console.log(req.body);
    let queryText;
    console.log("UPDATE item in /list with id:", id);
    queryText = `UPDATE "list" SET "completed" = ${item.completed} WHERE "id" = $1;`;
    console.log("querytext for true or false", queryText);
    pool.query(queryText, [id])
    .then(() => {
        res.sendStatus(204); // 204 no content
      })
      .catch((err) => {
        console.log("error in UPDATING item from list table", err);
        res.sendStatus(500);
    });
})

// DELETE route

listRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log("DELETE route /list with id of:", id);
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



//export router
module.exports = listRouter;