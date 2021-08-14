'use strict';



let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'); //выполненные дела

    
    
    let todoData = [];
    if (localStorage.getItem('todoData') !== null) {

    todoData = JSON.parse(localStorage.getItem("todoData"));
    }

    const render = function(){
        todoList.textContent = '';
        todoCompleted.textContent = '';

      
        todoData.forEach(function(item){
          const li = document.createElement('li');
          li.classList.add('todo-item');

          li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

            if (item.completed) {
              todoCompleted.append(li);
            } else {
              todoList.append(li);
            }

            const btnTodoComplete = li.querySelector('.todo-complete');
            btnTodoComplete.addEventListener('click', function(){
                item.completed = !item.completed;
                render();
            })
           const btnTodoRemove = li.querySelector('.todo-remove');
           btnTodoRemove.addEventListener('click', function(){
                li.remove();

           })
        });
        localStorage.setItem("todoData", JSON.stringify(todoData));
    };

    todoControl.addEventListener('submit', function(event){
        event.preventDefault(); //странииа не перегружается теперь

        const newTodo = {
          value: headerInput.value,
          completed: false //невыполненное задание
        };
        if (headerInput.value === '') {
          todoData.pull(newTodo);
        } else {
          todoData.push(newTodo); //когда сабмит произойдет в массив добавится новый объект
        }
        headerInput.value = '';
        render();
    });

    render();

