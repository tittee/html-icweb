"use strict";

import WOW from "wow.js/dist/wow.js";
import imagesLoaded from "imagesloaded";

var Isotope = require('isotope-layout');
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

// WOW
var wow = new WOW({
  boxClass: "wow", // animated element css class (default is wow)
  animateClass: "animate__animated", // animation css class (default is animated)
  offset: 0, // distance to the element when triggering the animation (default is 0)
  mobile: true, // trigger animations on mobile devices (default is true)
  live: true, // act on asynchronously loaded content (default is true)
  callback: function (box) {
    // the callback is fired every time an animation is started
    // the argument that is passed in is the DOM node being animated
  },
  scrollContainer: null, // optional scroll container selector, otherwise use window,
  resetAnimation: true, // reset animation on end (default is true)
});
wow.init();

/* Masonry & Isotope */
var elem = document.querySelector('.gridMasonry');
var iso = new Isotope( elem, {
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
  percentPosition: true,
  masonry: {
    // use element for option
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer'
  }
});

// bind filter button click
var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener( 'click', function( event ) {
  // only work with buttons
  // if ( !matchesSelector( event.target, 'button' ) ) {
  //   return;
  // }
  var filterValue = event.target.getAttribute('data-filter');
  // use matching filter function
  filterValue = filterFns[ filterValue ] || filterValue;
  iso.arrange({ filter: filterValue });
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function( itemElem ) {
    var number = itemElem.querySelector('.number').textContent;
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function( itemElem ) {
    var name = itemElem.querySelector('.name').textContent;
    return name.match( /ium$/ );
  }
};

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
  buttonGroup.addEventListener( 'click', function( event ) {
    // only work with buttons    
    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
    event.target.classList.add('is-checked');
  });
}


