## Weekend Challenge: SQL To-Do List


## The To-Do App

You are going to create a 'TO DO' application. 

**Here are the specific components for the challenge:**

[x] Create a front end experience that allows a user to create a Task.
[x] When the Task is created, it should be stored inside of a database (SQL)
[x] Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
[x] Each Task should have an option to 'Complete' or 'Delete'.
[x] When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be  'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
[x] Whether or not a Task is complete should also be stored in the database.
[x] Deleting a Task should remove it both from the front end as well as the Database.

### Styling

Use CSS styling to move the aesthetic of the page beyond the vanilla HTML look:
  - background color of the page
  - font family and size
  - text color & or background color of tasks *to show whether or not they have been completed*

### Create a Database

Create a new database with the name `weekend-to-do-app`. 

### Database Structure

Included a `database.sql` text file in the repo that includes all of the `CREATE TABLE` queries. This is so we can re-create your database while testing your app.

## Stretch Goals

For each of your strech goals, you will be practicing git branching. Please refer to the branching notes for a reminder on commands. Each branch will be merged into main using `--no-ff`. This will allow us to see that you branched your feature when you turn in your code.

- `feature-styling-bootstrap` 

    - [ x] Buttons -- make the creation buttons and completion buttons green and the delete red.
      -  Inputs -- make your text inputs styled in the bootstrap way
      -  Responsive -- make your app responsive to different screen sizes -- check out the [Layout](https://getbootstrap.com/docs/4.1/layout/overview/) section

- `feature-confirm-delete`

    - [ x]  In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task.
    Used [Sweet Alerts](https://sweetalert.js.org/guides/): 
    Did this right away so a branch wasnt made

- `feature-ordering-task-query` 

    - [ ]  Research [Query Params](https://expressjs.com/en/api.html#req.query) to have the request reverse the order of the returned todos. 
    
- `feature-time-completed` 

    - [ ]  Add the ability to record when a task was completed. Show the completed date on the frontend in a pretty format.
