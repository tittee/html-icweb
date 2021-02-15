"use strict";

import Swiper, { Navigation, Pagination } from "swiper";
import './../scss/index.scss';
import WOW from "wow.js/dist/wow.js";
import imagesLoaded from "imagesloaded";
import './countdown.js'

let Isotope = require('isotope-layout');


// core version + navigation, pagination modules:

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

imagesLoaded( elem ).on( 'progress', function() {
  // layout Isotope after each image loads
  iso.layout();
});


var timer;
// elem.style.display = 'none';
function endAndStartTimer() {
  window.clearTimeout(timer);
  //var millisecBeforeRedirect = 10000; 
  timer = window.setTimeout(function(){
    // elem.style.display = 'block';
    document.getElementById("elemAll").click();
  },5000); 
}

endAndStartTimer()

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


