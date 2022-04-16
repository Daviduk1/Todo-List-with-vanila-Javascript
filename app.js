let todos = [
    {id: 0, text: 'Complete online Javascript course', active: false, completed: false},
    {id: 1, text: 'Jog around the park', active: false, completed: false},
    {id: 2, text: '10 minutes meditation', active: false, completed: false},
    {id: 3, text: 'Read for one hour', active: false, completed: false},
    {id: 4, text: 'Pick up groceries', active: false, completed: false},
    {id: 5, text: 'Complete todo app', active: false, completed: false}
];

const app = document.querySelector('#app');
const modeBtn = document.querySelector('#mode');
const todoInput = document.querySelector('#todo-input');
const contentArea = document.querySelector('.content');
const progress = document.querySelector('.progress');

const showAllBtn = document.querySelector('#show-all');
const showActiveBtn = document.querySelector('#show-active');
const showCompletedBtn = document.querySelector('#show-completed');
const clearCompletedBtn = document.querySelector('#clear-completed');

// A function to render a list of todo items in html using the todos array
function showTodos (todosArray) {
    let list = todosArray.map(item => {
        return `
            <div class="todo" ${item.active ? 'active' : ''} ${item.completed ? 'completed' : ''} id="${item.id}">
                <label for="check-${item.id}">
                    <img src="./images/icon-check.svg">
                </label>
                <input type="checkbox" id="check-${item.id}">
                <span>${item.text}</span>
            </div>

        `     

    })
    contentArea.innerHTML = list.join('');
    let allTodos = document.querySelectorAll('.todo');
    // deleting a todo
    allTodos.forEach(item => {
        item.ondblclick = function () {
            let itemID = item.id;
            let newList = todos.filter(item => item.id.toString() !== itemID);
            todos = newList;
            showTodos(todos);
            
        }
    });

    let allTodoSpan = document.querySelectorAll('.todo span');
    allTodoSpan.forEach(todoitem => {
        todoitem.onclick = function () {
            let modifiedList = todos.map(item => {
                if (todoitem.innerHTML === item.text) {
                    return {...item, completed: !item.completed}
                } else {
                    return item;
                }
            })

            todos = modifiedList;
            showTodos(todos);
        }
    })

    let allTodoCheckbox = document.querySelectorAll('.todo input')
    allTodoCheckbox.forEach(checkbox => {
        checkbox.onchange = function () {
            let modifiedList = todos.map(item => {
                if (checkbox.id.includes(item.id.toString())) {
                    checkbox.checked = true;
                    return {...item, active: !item.active}
                } else {
                    return item;
                }
            })

            todos = modifiedList;
            showTodos(todos);
        }

    })

    showStatus()
    
}

showTodos(todos);

function createNewTodo () {
    let newTodo = {
        id: todos.length,
        text: todoInput.value,
        active: false,
        completed: false
    }

    todos.push(newTodo);
    showTodos(todos);
}

todoInput.onkeypress = function (event) {
    if (event.key === 'Enter') {
        if (todoInput.value.trim() === "") {
            alert('You did not create a todo');
            return;
        } else {
            createNewTodo();
        }
            
    }
}

function showAll () {
    showTodos(todos);
}

function showActive () {
    let activeTodos = todos.filter(todo => todo.active === true);
    showTodos(activeTodos);
}

function showCompleted () {
    let completedTodos = todos.filter(todo => todo.completed === true);
    showTodos(completedTodos);
}


function clearCompleted () {
    let newTodoList = todos.filter(todo => todo.completed === false);
    todos = newTodoList;
    showTodos(todos);
}

function showStatus () {
    letcompletedCount = 0;
    todos.forEach(todo => {
        if (todo.completed === false) {
            completedCount++;
        }
    })
    progress.innerHTML = '${completedCount} item left.'
}

function switchMode () {
    if (app.className === 'darkmode') {
        app.className = 'lightmode'
    } else {
        app.className = 'darkmode'
    }
}

showAllBtn.onclick = showAll;
showActiveBtn.onclick = showActive;
showCompletedBtn.onclick = showCompleted;
clearCompletedBtn.onclick = clearCompleted;
modeBtn.onclick = switchMode;