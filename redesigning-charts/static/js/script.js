// start everything with class new as opacity 0

let newAxis = document.querySelectorAll(".g-axis-new");
let oldAxis = document.querySelectorAll(".g-axis-old");
let newAnnotations = document.querySelectorAll(".g-line-new, #annotations");
let newLine = document.querySelectorAll("#line-new");
let oldLine = document.querySelectorAll(".g-line-old");
let newTitle = document.querySelectorAll(".g-title-new");
let oldTitle = document.querySelectorAll(".g-title-old");
const points = document.querySelectorAll(".points-old");

const edit = [newAxis, newLine, newAnnotations, newTitle];
const old = [oldAxis, oldLine, oldTitle];

//first change old axis opacity 0 and axis new opacity 1
new Waypoint({
  element: document.getElementById("sAxis"),
  handler: function (direction) {
    if (direction == "down") {
      // change old axis opacity 0 and axis new opacity 1
      for (div of newAxis) {
        div.style.opacity = "1";
      }
      for (div of oldAxis) {
        div.style.opacity = "0";
      }
    } else {
      for (div of newAxis) {
        div.style.opacity = "0";
      }
      for (div of oldAxis) {
        div.style.opacity = "1";
      }
    }
  },
  offset: "50%",
});

// change line
new Waypoint({
  element: document.getElementById("sLine"),
  handler: function (direction) {
    if (direction == "down") {
      console.log("sLine");
      // change old axis opacity 0 and axis new opacity 1
      for (div of points) {
        div.style.opacity = "0";
      }
    } else {
      for (div of points) {
        div.style.opacity = "1";
      }
    }
  },
  offset: "50%",
});

// add anotations, line and color
new Waypoint({
  element: document.getElementById("sAnnotations"),
  handler: function (direction) {
    if (direction == "down") {
      console.log("sAnnotations");
      for (div of newAnnotations) {
        div.style.opacity = "1";
      }
      for (div of newLine) {
        div.style.opacity = 1;
      }
      for (div of oldLine) {
        div.style.opacity = 0;
      }
    } else {
      for (div of newAnnotations) {
        div.style.opacity = "0";
      }
      for (div of newLine) {
        div.style.opacity = 0;
      }
      for (div of oldLine) {
        div.style.opacity = 1;
      }
    }
  },
  offset: "50%",
});

// update title
new Waypoint({
  element: document.getElementById("sTitle"),
  handler: function (direction) {
    if (direction == "down") {
      console.log("sTitle");
      for (div of newTitle) {
        div.style.opacity = "1";
      }
      for (div of oldTitle) {
        div.style.opacity = 0;
      }
    } else {
      for (div of newTitle) {
        div.style.opacity = "0";
      }
      for (div of oldTitle) {
        div.style.opacity = 1;
      }
    }
  },
  offset: "50%",
});

// Keep track of which image is currently active
let isFirstImageActive = true;
let toggleTimer;

function toggleImages() {
  const images = document.querySelectorAll(".fade-image");
  images.forEach((img) => img.classList.toggle("active"));

  // Set different intervals based on which image is now active
  clearTimeout(toggleTimer);
  isFirstImageActive = !isFirstImageActive;

  if (isFirstImageActive) {
    // First image is now active, stay longer (e.g., 5 seconds)
    toggleTimer = setTimeout(toggleImages, 1500);
  } else {
    // Second image is now active, stay for original time
    toggleTimer = setTimeout(toggleImages, 3000);
  }
}

// Start with first image, set initial timeout
function startImageToggle() {
  isFirstImageActive = true;
  toggleTimer = setTimeout(toggleImages, 1500); // First image stays for 5 seconds
}

function init() {
  console.log("hello");
  for (divs of edit) {
    for (div of divs) {
      div.style.opacity = "0";
    }
  }
  startImageToggle();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
