"use strict";

fetch("list.json")
  .then(e => e.json())
  .then(data => showData(data));

let student = "";
const studentArray = [];

function showData(data) {
  data.forEach(fullName => {
    student = Object.create(objStudent);
    student.splitName(fullName);
    studentArray.push(student);
  });
  displayList(studentArray);
  console.log(studentArray);
  console.log(student);
}

// function showStudent() {
//   studentArray.forEach(displayList);
// }

// DISPLAY DATA

function displayList(student) {
  let templateList = document.querySelector("#list_template").content;

  studentArray.forEach(student => {
    let clone = templateList.cloneNode(true);
    clone.querySelector("h2").textContent = student.toString();
    let list = document.querySelector("#list");
    list.appendChild(clone);
  });
}

// CREATE OBJECT STUDENT

const objStudent = {
  firstname: "",
  lastname: "",
  splitName(fullName) {
    const firstSpace = fullName.indexOf(" ");
    this.firstname = fullName.substring(0, firstSpace);
    this.lastname = fullName.substring(firstSpace + 1);
  },
  toString() {
    return this.firstname + " " + this.lastname;
  }
};

// ADD MIDDLE NAMES FOR SOME OF US ?

// SORTING FUNCTIONS :

// function sortFirstName() {
//   studentArray.sort();
//   return;
// }

// function sortLastName() {
//   function compareLastName(a, b) {
//     if (a.lastname < b.lastname) {
//       return -1;
//     } else if (a.lastname > b.lastname) {
//       return 1;
//     } else {
//       return 0;
//     }
//   }
// }
