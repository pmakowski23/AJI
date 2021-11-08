"use strict";

let todoList = [];

const isDueDateAMatch = (from, to, dueDate) => {
  const areBothDatesProvided = from && to;
  const isAnyDateProvided = from || to;

  const isDueDateBeforeEndDate = dueDate < to;
  const isDueDateAfterStartDate = from ? dueDate > from : false;

  const isDueDateBetweenDates =
    isDueDateBeforeEndDate && isDueDateAfterStartDate;

  if (!isAnyDateProvided) {
    return true;
  }

  if (areBothDatesProvided) {
    return isDueDateBetweenDates;
  }

  if (isAnyDateProvided) {
    return isDueDateBeforeEndDate || isDueDateAfterStartDate;
  }

  return false;
};

const isSearchAMatch = (filterValue, title, description) => {
  const isFilterEmpty = filterValue === "";
  const doesTitleIncludeFilter = title.includes(filterValue);
  const doesDescriptionIncludeFilter = description.includes(filterValue);

  return (
    isFilterEmpty || doesTitleIncludeFilter || doesDescriptionIncludeFilter
  );
};

// we want results when:
// - all filters are empty
// - values match both filters (if blank then matches)

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
    const from = $("#startDate")[0].value;
    const to = $("#endDate")[0].value;
    const dueDate = todoList[todo].dueDate;

    const filterValue = filterInput.value;
    const title = todoList[todo].title;
    const description = todoList[todo].description;

    // render elements only if they fit the filter value

    if (
      isSearchAMatch(filterValue, title, description) &&
      isDueDateAMatch(from, to, dueDate)
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
        .append($(`<td>${todoList[todo].dueDate}</td>`))[0];

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
  updateJSONbin();
  // update localStorage
  // window.localStorage.setItem("todos", JSON.stringify(todoList));
};

const addTodo = function () {
  // get the values from the form
  const newTitle = $("#inputTitle")[0].value;
  const newDescription = $("#inputDescription")[0].value;
  const newPlace = $("#inputPlace")[0].value;
  const newDate = $("#inputDate")[0].value;
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
