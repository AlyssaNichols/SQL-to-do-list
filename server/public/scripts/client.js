$(onReady);

function onReady() {
  console.log("jq and js");
  getList();
  // add click listeners with corresponding function
  $("#listItems").on("click", ".deleteButton", deleteSwal);
  $("#addButton").on("click", postItem);
  $("#listItems").on("click", ".completedButton", updateItem);
}

// ajax get function to /list
function getList() {
  console.log("in getList");
  // ajax call to server to get list items
  $.ajax({
    method: "GET",
    url: "/list",
  })
    .then((response) => {
      appendDom(response);
    })
    .catch((err) => console.log(err));
}

// append dom
function appendDom(data) {
 // empty the table body so multiples arent added everytime the add button is clicked
  $("#listItems").empty();
// loop through array (will be the response from the server side)
//using data as a param
  for (let i = 0; i < data.length; i += 1) {
    let task = data[i];
    // using completedClass variable to update so I am able to update the color of the
    //  background when task is completed
    let completedClass;
    if (task.completed) {
      completedClass = "completed";
    } else {
      completedClass = "";
    }
    // For each task, append a new row to our table with the appropriate class
    // using the completed class variable for background color change
    // using ternanry for button that can switch back and forth from completed to not completed
    $("#listItems").append(`
        <tr class="${completedClass} row">
          <td>${task.task}</td>
          <td><button class="completedButton" data-id=${
            task.id
          } data-completed=${task.completed}>
            ${task.completed ? "Not Completed" : "Completed"}
          </button></td>
          <td><button class="deleteButton" data-id=${
            task.id
          }>Delete</button></td>
        </tr>
      `);
  }
}

// ajax POST function
function postItem() {
    // gather values from inputs
  let task = $("#taskIn").val();
  let completed = $("#completedIn").val();
  console.log("in postItem on add button click");
  // new object to send in ajax post function
  let taskToSend = {
    task: task,
    completed: completed,
  };
  console.log(taskToSend);
// making sure all fields are filled in otherwise will alert client
  if (!task || !completed) {
    alert("Please fill in all of the fields and try again!");
    return;
  }
  // empty out input fields after info is gathered
  $("#taskIn").val("");
  $("#completedIn").val("");
// POST to /list
  $.ajax({
    method: "POST",
    url: "/list",
    data: taskToSend,
  })
    .then(() => getList())
    .catch((err) => console.log(err));
}

// PUT ajax function
function updateItem(event) {
    // get id and completed data attributes
  const id = $(event.target).data("id");
  const completed = $(event.target).data("completed");
  console.log(id, completed);

  $.ajax({
    method: "PUT",
    url: `/list/${id}`,
    data: { completed: !completed },
  })
    .then(() => {
      getList();
    })
    .catch((err) => {
      console.log("Error with PUT ajax", err);
    });
}

// sweet alert function for delete, calls original delete function 
function deleteSwal(event) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, this task will be gone forever!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((confirm) => {
    console.log(confirm);
    if (confirm) {
      deleteItem(event);
      console.log("testing delete swal!");
      swal("The List Item has been removed", {
        icon: "success",
      });
    } else {
      swal("You can still mark this one off in the future!");
    }
  });
}

// this is the delete function that is called in the sweet alert
// otherwise the sweet alert would override this function
const deleteItem = (event) => {
  const id = $(event.target).data("id");
  $.ajax({
    method: "DELETE",
    url: `/list/${id}`,
  })
    .then(() => getList())
    .catch((err) => console.log(err));
}; 

