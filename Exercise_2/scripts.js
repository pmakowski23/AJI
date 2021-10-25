"use strict";

let todoList = [];

// initialization of todos
(() => {
  // from localStorage
  // const savedList = window.localStorage.getItem("todos");
  // if (savedList != null) todoList = JSON.parse(savedList);
  // // or placeholder with some default values
  // else
  //   todoList.push(
  //     {
  //       title: "Learn JS",
  //       description: "Create a demo application for my TODO's",
  //       place: "445",
  //       dueDate: new Date(2019, 10, 16),
  //     },
  //     {
  //       title: "Lecture test",
  //       description: "Quick test from the first three lectures",
  //       place: "F6",
  //       dueDate: new Date(2019, 10, 17),
  //     }
  //   );
  $.ajax({
    url: "https://api.jsonbin.io/v3/b/6176a4deaa02be1d445e8cbe/latest",
    type: "GET",
    success: (data) => {
      todoList = data.record;
    },
    error: (err) => {
      console.log(err.responseJSON);
    },
  });
})();

let updateJSONbin = function () {
  $.ajax({
    url: "https://api.jsonbin.io/v3/b/6176a4deaa02be1d445e8cbe",
    type: "PUT",
    headers: {
      "X-Bin-Versioning": false,
    },
    contentType: "application/json",
    data: JSON.stringify(todoList),
    success: (data) => {
      console.log(data);
    },
    error: (err) => {
      console.log(err.responseJSON);
    },
  });
};

// updating todos
const updateTodoList = function () {
  const todoListDiv = $("#todoListTable")[0];

  // clear todos before updating
  while (todoListDiv.firstChild) {
    todoListDiv.removeChild(todoListDiv.firstChild);
  }

  const filterInput = $("#inputSearch")[0];

  // create new todos for the update
  for (const todo in todoList) {
    // TODO: add other filters
    // render elements only if they fit the filter value
    const d1 = $("#startDate")[0].value;
    const d2 = $("#endDate")[0].value;
    const c = todoList[todo].dueDate;
    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    function isValidDate(d) {
      return d instanceof Date && !isNaN(d);
    }

    if (
      isValidDate(from) && isValidDate(to)
        ? check > from && check < to
        : filterInput.value === "" ||
          todoList[todo].title.includes(filterInput.value) ||
          todoList[todo].description.includes(filterInput.value)
    ) {
      // const newElement = document.createElement("p");
      // const newContent = document.createTextNode(
      //   todoList[todo].title + " " + todoList[todo].description
      // );
      // newElement.appendChild(newContent);
      // todoListDiv.appendChild(newElement);
      // const newElement = $("<p></p>").text(
      //   todoList[todo].title + " " + todoList[todo].description
      // )[0];

      const newElement = $(`<tr></tr>`)
        .append($(`<td>${todoList[todo].title}</td>`))
        .append($(`<td>${todoList[todo].description}</td>`))
        .append($(`<td>${todoList[todo].place}</td>`))
        .append($(`<td>${todoList[todo].dueDate.split("T")[0]}</td>`))[0];

      // add "x" button
      // const newDeleteButton = document.createElement("input");
      // newDeleteButton.type = "button";
      // newDeleteButton.value = "x";
      // newDeleteButton.addEventListener("click", () => {
      //   deleteTodo(todo);
      // });
      newElement.append(
        $(
          '<td><button type="submit" class="btn btn-danger pt-0">x</button><td>'
        ).click(() => {
          deleteTodo(todo);
        })[0]
      );

      // add new todo
      todoListDiv.append(newElement);
    }
  }
};

setInterval(updateTodoList, 1000);
// setTimeout(() => {
//   updateTodoList();
// }, 1000);

const deleteTodo = function (index) {
  // remove todo
  todoList.splice(index, 1);
  // update localStorage
  // TODO: use pasteBin
  updateJSONbin();
  // window.localStorage.setItem("todos", JSON.stringify(todoList));
};

const addTodo = function () {
  // get the values from the form
  const newTitle = $("#inputTitle")[0].value;
  const newDescription = $("#inputDescription")[0].value;
  const newPlace = $("#inputPlace")[0].value;
  const newDate = new Date($("#inputDate")[0].value);
  // create new Todo
  const newTodo = {
    title: newTitle,
    description: newDescription,
    place: newPlace,
    dueDate: newDate,
  };
  // add todo to the list
  todoList.push(newTodo);
  // update todos on the backend
  updateJSONbin();
  // window.localStorage.setItem("todos", JSON.stringify(todoList));
};
