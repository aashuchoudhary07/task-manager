# Task Manager

A simple and responsive To-Do List application built using HTML, CSS, and JavaScript. It allows users to create and manage tasks while keeping task data saved in the browser.

## Live Demo

[Open Task Manager](https://task-managerbyaashu.netlify.app/)

## Features

* Add new tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Restore completed tasks
* Search tasks
* Filter tasks by:

  * All
  * Active
  * Completed
* Set task priority
* Add due dates
* View task completion progress
* Clear completed tasks
* Dark and Light theme
* Toast notifications
* Data persistence using browser LocalStorage
* Responsive layout for different screen sizes

## Technologies Used

* HTML5
* CSS3
* JavaScript
* DOM Manipulation
* LocalStorage

## How It Works

Tasks are managed using JavaScript and stored as objects in an array. Whenever a task is added, edited, completed, or deleted, the task list is updated and saved to LocalStorage.

Because the data is stored in the browser, tasks remain available after refreshing the page.

## Project Structure

```text
task-manager/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Purpose

This project was created to practice JavaScript fundamentals such as:

* DOM manipulation
* Event handling
* CRUD operations
* Array methods
* Filtering and searching
* State management
* LocalStorage
* Responsive UI design

## Author

**Aashu Choudhary**

---

If you find this project useful, feel free to explore the code and try the live demo.
