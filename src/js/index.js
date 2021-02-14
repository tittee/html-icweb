"use strict";

let Countdown = require("countdown-js");

// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from "swiper";

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// init Swiper:
const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  },
});

var scrollableElement = document.body;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
scrollableElement.addEventListener("wheel", checkScrollDirection);

function checkScrollDirection(event) {
  if (checkScrollDirectionIsUp(event)) {
    console.log("up");
  } else {
    console.log("down");
  }
}

function checkScrollDirectionIsUp(event) {
  if (event.wheelDelta) {
    // console.log(event.wheelDelta);
    // return event.wheelDelta > 0;
    // scrollIfNeeded();
  }
  return event.deltaY < 0;
}

const progress = document.querySelector(".time-1");
const final = parseInt(progress.getAttribute("data-done"));

const duration = 1000;
let start;

const step = (ts) => {
  if (!start) {
    start = ts;
  }
  // get the time passed as a fraction of total duration
  let prog = (ts - start) / duration;
  progress.textContent = Math.floor(prog * final);
  // if (prog < 1) {
  //   // if not done, request another frame
  //   requestAnimationFrame(step);
  // }
};


  
    
function scrollIfNeeded(element, container) {
  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop;
  } else {
    const offsetBottom = element.offsetTop + element.offsetHeight;
    const scrollBottom = container.scrollTop + container.offsetHeight;
    if (offsetBottom > scrollBottom) {
      container.scrollTop = offsetBottom - container.offsetHeight;
    }
  }
}