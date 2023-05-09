const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// on créé le fichier JSON s'il n'existe pas
const jsonPath = "todos.json";

function loadTodos() {
    if (!fs.existsSync(jsonPath)) fs.writeFileSync(jsonPath, "[]", "utf8");
    let todosObj = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (!Array.isArray(todosObj)) todosObj = []; // ici petite sécurité pour éviter les erreurs si le fichier JSON est corrompu (si ce n'est pas un tableau)
 
    return todosObj;
}
function saveTodos() {
    fs.writeFileSync(jsonPath, JSON.stringify(todos), "utf8");
}
function getNextId() {
    return todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
}


let todos = loadTodos();

// on redirige l'url / vers la liste des todos
app.get("/", function (req, res) {
    let html = fs.readFileSync("views/index.html", "utf8");
    res.send(html);
});

// retourne la liste des todos
app.get("/todos", function (req, res) {
    res.send(todos);
});
// retourne la todo dont l'id est passé en paramètre
app.get("/todo/:id", function (req, res) {
});
// ajoute une todo
app.post("/todo", function (req, res) {
    
    const description = req.body.description;
    const color = req.body.color;
    const id = getNextId();
    const todo = { id: id, description:description, color: color, done: false };
    todos.push(todo);
    fs.writeFile("todos.json", JSON.stringify(todos), utf8);

    console.log(req.body);

    res.send({succèss:true});
})

// modifie une todo
app.put("/todo/:id", function (req, res) {

    //Pour cela, il faut récupérer l'id de la todo à modifier dans     l'url (utiliser req.params)
    const id = req.params.id;
    const done = req.body.done;


     //cherche id
    const todo = todos.find(function(item) {
        return item.id == id;
        
      });

        //modifie
      todo.done = done;


      //enrengistre
      saveTodos();
      res.send({succèss:true});

    });



// supprime toutes les todos dont le champ done est à true
app.delete("/todos", function (req, res) {

    todos =[];
    saveTodos();
    
    
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});