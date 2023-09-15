const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const toDoRouter = require('./routes/toDo.router')

app.use(express.static('server/public'));
app.use(express.urlencoded({ extended: true }));

// using the router
app.use('/to-do', toDoRouter)



// KEEP AT BOTTOM- listening for requests on port that was declared
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});
