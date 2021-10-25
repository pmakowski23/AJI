"use strict";

let todoList = [];

const initList = function () {
  const savedList = window.localStorage.getItem("todos");
  if (savedList != null) todoList = JSON.parse(savedList);
  else
    todoList.push(
      {
        title: "Learn JS",
        description: "Create a demo application for my TODO's",
        place: "445",
        dueDate: new Date(2019, 10, 16),
      },
      {
        title: "Lecture test",
        description: "Quick test from the first three lectures",
        place: "F6",
        dueDate: new Date(2019, 10, 17),
      }
    );
};

initList();

const updateTodoList = function () {
  const todoListDiv = document.getElementById("todoListView");

  // clear todos before updating
  while (todoListDiv.firstChild) {
    todoListDiv.removeChild(todoListDiv.firstChild);
  }

  const filterInput = document.getElementById("inputSearch");
  // create new todos for the update
  for (const todo in todoList) {
    // render elements only if they fit the filter value
    if (
      filterInput.value === "" ||
      todoList[todo].title.includes(filterInput.value) ||
      todoList[todo].description.includes(filterInput.value)
    ) {
      const newElement = document.createElement("p");
      const newContent = document.createTextNode(
        todoList[todo].title + " " + todoList[todo].description
      );
      newElement.appendChild(newContent);
      todoListDiv.appendChild(newElement);

      //remove button
      const newDeleteButton = document.createElement("input");
      newDeleteButton.type = "button";
      newDeleteButton.value = "x";
      newDeleteButton.addEventListener("click", function () {
        deleteTodo(todo);
      });
      newElement.appendChild(newDeleteButton);

      todoListDiv.appendChild(newElement);
    }
  }
};

setInterval(updateTodoList, 1000);

const deleteTodo = function (index) {
  // remove todo
  todoList.splice(index, 1);
  // update localStorage
  window.localStorage.setItem("todos", JSON.stringify(todoList));
};

const addTodo = function () {
  //get the elements in the form
  const inputTitle = document.getElementById("inputTitle");
  const inputDescription = document.getElementById("inputDescription");
  const inputPlace = document.getElementById("inputPlace");
  const inputDate = document.getElementById("inputDate");
  //get the values from the form
  const newTitle = inputTitle.value;
  const newDescription = inputDescription.value;
  const newPlace = inputPlace.value;
  const newDate = new Date(inputDate.value);
  //create new Todo
  const newTodo = {
    title: newTitle,
    description: newDescription,
    place: newPlace,
    dueDate: newDate,
  };
  //add todo to the list
  todoList.push(newTodo);
  // update localStorage
  window.localStorage.setItem("todos", JSON.stringify(todoList));
};
