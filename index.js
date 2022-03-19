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


app.listen(3000, () => console.log("Server up"))

app.get('/',(req, res) => {
    db.select("*").from("todo").then(data =>{
        res.render("todo.ejs", { todos: data })
    });
    
})

app.post('/', (req, res) => {
    console.log(req.body);
})

