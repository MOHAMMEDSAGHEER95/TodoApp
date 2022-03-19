const express = require("express")

const knex = require("knex")

const db = knex({
    client: "pg",  // postgres
    connection: {
    host: "127.0.0.1",
    user: "muse",
    password: "muse",
    database: "todolist"
    }
    });


const app = express();

app.use("/static", express.static("public"));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs")




app.get('/',(req, res) => {
    db.select("*").from("todo").orderBy("id", "desc").then(data =>{
        res.render("todo.ejs", { todos: data })
    });
    
})

app.post('/', (req, res) => {
    console.log(req.body.content);
    db("todo").insert({"task": req.body.content})
    .then(_ => res.redirect("/"));
});


app.put("/moveTaskDone", (req, res) => {
    console.log(req.body);
    
    db("todo").where("id","=",req.body.id).update("status", 1).returning("status").then(_ => res.json({"id":req.body.id}));
   
    
});


app.listen(3000, () => console.log("Server up"))