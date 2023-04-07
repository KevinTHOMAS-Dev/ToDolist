//selecteur
const todoinput = document.querySelector(".todo_input");
const todobutton = document.querySelector(".todo_button");
const todolist = document.querySelector(".todo_list");
const filteroption = document.querySelector(".todo_filter");

//ecouteur
document.addEventListener("DOMContentLoaded", gettodos)
todobutton.addEventListener("click", addTodo);
todolist.addEventListener("click", deletecheck);
filteroption.addEventListener("input", filtertodo);


//function
function addTodo(event) {
    event.preventDefault();
    //todo Div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    //Cree le li
    const newtodo = document.createElement("li");
    newtodo.innerText = todoinput.value;
    newtodo.classList.add("todo_item");
    tododiv.appendChild(newtodo);
    //ajout des todo depuis la base de donnée
    savelocaltodo(todoinput.value);
    //button check
    const completedbutton = document.createElement("button")
    completedbutton.innerHTML = '<i class="fas fa-check"></i>';
    completedbutton.classList.add("btn_completed");
    tododiv.appendChild(completedbutton);
    //Button supprimer
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("btn_trash");
    tododiv.appendChild(trashbutton);
    //Ajout de notre todo à la list
    todolist.appendChild(tododiv);
    todoinput.value = "";
}

function deletecheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === "btn_trash") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removelocaltodo(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    //Check Todo
    if (item.classList[0] === "btn_completed") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filtertodo(e) {
    const todo = todolist.childNodes;
    todo.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";                
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function savelocaltodo(todo) {
    //check des items existant
    let todos;
    if (localStorage.getItem ("todos") === null) {
        todos = []
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function gettodos() {
        //check des items existant
        let todos;
        if (localStorage.getItem ("todos") === null) {
            todos = []
        } else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
    todos.forEach(function (todo) {
        //todo Div
        const tododiv = document.createElement("div");
        tododiv.classList.add("todo");
        //Cree le li
        const newtodo = document.createElement("li");
        newtodo.innerText = todo
        newtodo.classList.add("todo_item");
        tododiv.appendChild(newtodo);
        //button check
        const completedbutton = document.createElement("button")
        completedbutton.innerHTML = '<i class="fas fa-check"></i>';
        completedbutton.classList.add("btn_completed");
        tododiv.appendChild(completedbutton);
        //Button supprimer
        const trashbutton = document.createElement("button");
        trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
        trashbutton.classList.add("btn_trash");
        tododiv.appendChild(trashbutton);
        //Ajout de notre todo à la list
        todolist.appendChild(tododiv);
        todoinput.value = "";
    });
}

function removelocaltodo (todo){
    //check des items existant
    let todos;
    if (localStorage.getItem ("todos") === null) {
            todos = []
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}