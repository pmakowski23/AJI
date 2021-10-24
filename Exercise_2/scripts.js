"use strict";

let todoList = []; //declares a new array for Your todo list

const initList = function () {
  const savedList = window.localStorage.getItem("todos");
  if (savedList != null) todoList = JSON.parse(savedList);
  //code creating a default list with 2 items
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
      // of course the lecture test mentioned above will not take place
    );
};

initList();

const updateTodoList = function () {
  const todoListDiv = document.getElementById("todoListView");

  //remove all elements
  while (todoListDiv.firstChild) {
    todoListDiv.removeChild(todoListDiv.firstChild);
  }

  //add all elements
  for (const todo in todoList) {
    const newElement = document.createElement("div");
    const newContent = document.createTextNode(
      `${todoList[todo].title} ${todoList[todo].description}`
    );
    newElement.appendChild(newContent);

    //remove event
    const newDeleteButton = document.createElement("input");
    newDeleteButton.type = "button";
    newDeleteButton.value = "x";
    newDeleteButton.addEventListener("click", function () {
      deleteTodo(todo);
    });

    newElement.appendChild(newDeleteButton);

    todoListDiv.appendChild(newElement);
  }
};

setInterval(updateTodoList, 1000);

const deleteTodo = function (index) {
  todoList.splice(index, 1);
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
  //create new item
  const newTodo = {
    title: newTitle,
    description: newDescription,
    place: newPlace,
    dueDate: newDate,
  };
  //add item to the list
  todoList.push(newTodo);

  window.localStorage.setItem("todos", JSON.stringify(todoList));
};

//add all elements
const filterInput = document.getElementById("inputSearch");
for (const todo in todoList) {
  if (
    filterInput.value == "" ||
    todoList[todo].title.includes(filterInput.value) ||
    todoList[todo].description.includes(filterInput.value)
  ) {
    const newElement = document.createElement("p");
    const newContent = document.createTextNode(
      todoList[todo].title + " " + todoList[todo].description
    );
    newElement.appendChild(newContent);
    newElement.appendChild(newDeleteButton);
    todoListDiv.appendChild(newElement);
  }
}
