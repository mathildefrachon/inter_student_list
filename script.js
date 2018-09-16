"use strict";

/* BACKEND JAVASCRIPT */

window.addEventListener("DOMContentLoaded", init);

function init() {
  // fetch JSON
  fetch("list.json")
    .then(e => e.json())
    .then(data => showData(data));
}

let student = "";
const studentArray = [];

function showData(data) {
  // build the list
  data.forEach(fullName => {
    student = Object.create(objStudent);
    student.splitName(fullName);
    //assign this student a unique ID
    student.id = generateUUID();
    studentArray.push(student);
  });
  // display the list
  displayList(studentArray);
}

// CREATE OBJECT STUDENT

const objStudent = {
  firstname: "",
  lastname: "",
  middlename: "",
  splitName(fullName) {
    const firstSpace = fullName.indexOf(" ");
    const lastSpace = fullName.lastIndexOf(" ");
    // const secondSpace = fullName.indexOf(" ", firstSpace + 1);
    this.firstname = fullName.substring(0, firstSpace);
    this.middlename = fullName.substring(firstSpace + 1, lastSpace);
    this.lastname = fullName.substring(lastSpace + 1);
  },
  toString() {
    return this.firstname + " " + this.middlename + " " + this.lastname;
  }
};

// GENERATE AN ID

// from: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// DELETE STUDENT

function deleteStudent(studentId) {
  const index = studentArray.findIndex(findStudent);
  console.log("found index:" + index);

  studentArray.splice(index, 1);

  // function that returns true when student.id==studentId
  function findStudent(student) {
    if (student.id === studentId) {
      return true;
    } else {
      return false;
    }
  }
}

function studentDetail(studentId) {
  const index = studentArray.findIndex(findStudent);
  console.log("found index:" + index);

  // function that returns true when student.id==studentId
  function findStudent(student) {
    if (student.id === studentId) {
      return true;
    } else {
      return false;
    }
  }
  return studentArray[index];
}

//SORTING FUNCTIONS :

function sortFirstName() {
  studentArray.sort();
  return;
}

function sortLastName() {
  studentArray.sort(compareLastName);
  function compareLastName(a, b) {
    if (a.lastname < b.lastname) {
      return -1;
    } else if (a.lastname > b.lastname) {
      return 1;
    } else {
      return 0;
    }
  }
}
