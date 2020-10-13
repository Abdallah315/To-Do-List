let inputVal=document.getElementById('todo-input');
let btn=document.querySelector('.todo-button');
let todoList=document.querySelector('ul');
let filterTodo=document.querySelector('.filter-todo');



document.addEventListener("DOMContentLoaded", getTodos);
btn.addEventListener('click',addTodo)
todoList.addEventListener('click',deletecheck);
filterTodo.addEventListener('click',filterToDo);

function addTodo(event){
    event.preventDefault();
let todoDiv=document.createElement('div');
todoDiv.classList.add('todo');
let todoLi=document.createElement('li');
todoLi.classList.add('todo-item');
let checkButton=document.createElement('button');
let trashButton=document.createElement('button');
checkButton.innerHTML='<i class="fas fa-check"></i>';
checkButton.classList.add('check-btn');
trashButton.classList.add('trash-btn');
trashButton.innerHTML='<i class="fas fa-trash"></i>';
todoDiv.appendChild(todoLi);
todoDiv.appendChild(checkButton);
todoDiv.appendChild(trashButton);
todoLi.innerText=inputVal.value;
todoList.appendChild(todoDiv);
saveLocalTodos(inputVal.value);

inputVal.value='';
}
function deletecheck(e){
let trashEvent=e.target;
if(trashEvent.classList[0]==='trash-btn'){
let trashParent=trashEvent.parentElement;
trashParent.classList.add('fall');
removeLocalTodos(trashParent);
trashParent.addEventListener('transitionend',function(){
    trashParent.remove();
})
}


if(trashEvent.classList[0]==='check-btn'){
    let checkParent=trashEvent.parentElement;
    checkParent.classList.toggle('completed');
}
}

function filterToDo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
switch (e.target.value) {
    case "all":
      todo.style.display = "flex";
      break;
    case "completed":
      if (todo.classList.contains("completed")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
      break;
    case "uncompleted":
      if (!todo.classList.contains("completed")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
  }
});     
  
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    let todoDiv=document.createElement('div');
todoDiv.classList.add('todo');
let todoLi=document.createElement('li');
todoLi.classList.add('todo-item');
todoLi.innerText=todo;
todoDiv.appendChild(todoLi);
inputVal.value='';
let checkButton=document.createElement('button');
let trashButton=document.createElement('button');
checkButton.innerHTML='<i class="fas fa-check"></i>';
checkButton.classList.add('check-btn');
trashButton.classList.add('trash-btn');
trashButton.innerHTML='<i class="fas fa-trash"></i>';
todoDiv.appendChild(checkButton);
todoDiv.appendChild(trashButton);
todoList.appendChild(todoDiv);
  });
}