$(onReady);

function onReady() {
  console.log("jq and js");
  getList();
  $("#listItems").on("click", ".deleteButton", deleteSwal);
  $("#addButton").on("click", postItem);
  $("#listItems").on("click", ".completedButton", updateItem);
}

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

function appendDom(data) {
    $("#listItems").empty();
  
    for (let i = 0; i < data.length; i += 1) {
      let task = data[i];
      let completedClass = task.completed ? "completed" : ""; // Add this line
  
      // For each task, append a new row to our table with the appropriate class
      $("#listItems").append(`
        <tr>
          <td class="${completedClass}">${task.task}</td>
          <td>${task.completed}</td>
          <td><button class="completedButton" data-id=${task.id} data-completed=${task.completed}>
            ${task.completed ? "Not Completed" : "Completed"}
          </button></td>
          <td><button class="deleteButton" data-id=${task.id}>Delete</button></td>
        </tr>
      `);
    }
  }
  

function postItem() {
  let task = $("#taskIn").val();
  let completed = $("#completedIn").val();
  console.log("in postItem on add button click");
  let taskToSend = {
    task: task,
    completed: completed,
  };

  if (!task || !completed) {
    alert("Please fill in all of the fields and try again!");
    return;
  }
  $("#taskIn").val("");
  $("#completedIn").val("");

  $.ajax({
    method: "POST",
    url: "/list",
    data: taskToSend,
  })
    .then(() => getList())
    .catch((err) => console.log(err));
}

function updateItem(event) {
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

const deleteItem = (event) => {
  const id = $(event.target).data("id");
  $.ajax({
    method: "DELETE",
    url: `/list/${id}`,
  })
    .then(() => getList())
    .catch((err) => console.log(err));
}; // end of deleteItem
