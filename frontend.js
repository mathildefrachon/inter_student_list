"use strict";

window.addEventListener("DOMContentLoaded", initFrontend);

const modal = document.querySelector("#modal");

function initFrontend() {
  // register buttons for sorting
  const firstnameButton = document.querySelector("#firstname");
  firstnameButton.addEventListener("click", clickedFirstName);
  const lastnameButton = document.querySelector("#lastname");
  lastnameButton.addEventListener("click", clickedLastName);
  // register section clicks
  const list = document.querySelector("#list");
  list.addEventListener("click", clickedArticle);
  //register buttons for modal

  const cross = document.querySelector(".cross");
  cross.addEventListener("click", clickedCross);
}

// DISPLAY DATA

function displayList(student) {
  let templateList = document.querySelector("#list_template").content;
  //CLEAR THE TABLE
  clearList();
  // CLONE A H2 FOR EACH STUDENT
  studentArray.forEach(student => {
    let clone = templateList.cloneNode(true);
    // FILL IN THE CLONE
    clone.querySelector("h2").textContent = student.toString();

    clone.querySelector("article").dataset.studentId = student.id;
    let list = document.querySelector("#list");

    // APPEND THE CLONE TO THE LIST
    list.appendChild(clone);
  });
}

function clearList() {
  document.querySelector("#list").innerHTML = "";
}

// CLICKED FONCTIONS

function clickedArticle(event) {
  const clicked = event.target;
  if (clicked.id === "delete") {
    clickedDelete(clicked);
  } else if (clicked.id === "plus") {
    clickedPlus(clicked);
  }
}

function clickedDelete(deleteButton) {
  //find the parent article that has this delete icon inside
  let art = deleteButton.parentElement;
  while (art.tagName !== "ARTICLE") {
    // while the art name is not ARTICLE
    art = art.parentElement; // take the parent
  }
  const studentId = art.dataset.studentId;
  console.log(studentId);
  deleteStudent(studentId);
  animateDelete(art);
}

// MODAL
// clone.querySelector(".plus").addEventListener("click", function() {
//   console.log("show modal");
//   modal.classList.remove("hidden");
//   modal.classList.add("display");
//   modal.querySelector("h2").textContent = student.toString();

function clickedPlus(plusButton) {
  //show Modal
  console.log("show modal");
  modal.classList.remove("hidden");
  modal.classList.add("display");
  //find the parent article that has this delete icon inside
  let art = plusButton.parentElement;
  while (art.tagName !== "ARTICLE") {
    // while the art name is not ARTICLE
    art = art.parentElement; // take the parent
  }

  showDetails(art);
  let nextArt = art;

  document.querySelector(".next").addEventListener("click", function() {
    if (nextArt.nextElementSibling !== null) {
      nextArt = nextArt.nextElementSibling;
      console.log(nextArt);
      showDetails(nextArt);
    } else {
      nextArt = list.firstElementChild;
      showDetails(nextArt);
    }
  });

  document.querySelector(".previous").addEventListener("click", function() {
    if (nextArt.previousElementSibling !== null) {
      nextArt = nextArt.previousElementSibling;

      showDetails(nextArt);
    } else {
      nextArt = list.lastElementChild;
      showDetails(nextArt);
    }
  });
}

function showDetails(row) {
  const studentId = row.dataset.studentId;
  console.log(studentId);
  let studentObj = studentDetail(studentId);
  console.log(studentObj);
  modal.querySelector("h2").textContent = studentObj.toString();
}

function clickedFirstName() {
  sortFirstName();
  displayList(student);
}

function clickedLastName() {
  sortLastName();
  displayList(student);
}

function clickedCross() {
  modal.classList.remove("display");
  modal.classList.add("hidden");
}

// ANIMATION DELETE

function animateDelete(art) {
  //animation just in the js
  art.style.opacity = "0";
  art.style.transition = "opacity 0.3s ease";
  // gives x, y , height, width of the client

  const rect = art.getBoundingClientRect();
  console.log(rect);
  art.addEventListener("transitionend", function() {
    //find the nextSiblig
    let nextSibling = art.nextElementSibling;

    if (nextSibling !== null) {
      // if its not the last student
      nextSibling.addEventListener("transitionend", function() {
        // reset all the translateY
        let nextArt = art.nextElementSibling;
        while (nextArt !== null) {
          nextArt.style.transform = "translateY(0)";
          nextArt.style.transition = "transform 0s";
          nextArt = nextArt.nextElementSibling;
        }

        //remove that article
        art.remove();
      });
      while (nextSibling !== null) {
        // animate translate Y of next sibling on a loop until last one
        nextSibling.style.transform = "translateY(-" + rect.height + "px)";
        nextSibling.style.transition = "transform 0.5s";
        nextSibling = nextSibling.nextElementSibling;
      }
    } else {
      // just remove without the next sibling moving cause its the last student
      art.remove();
    }
  });
}
