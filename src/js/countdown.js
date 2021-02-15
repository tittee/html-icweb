"use strict"
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
		
    const count = +counter.innerText;
		
    // Lower inc to slow and higher to slow
    const inc = target / speed;
		
    // console.log(Math.floor(inc);
    // console.log(count);

    // Check if target is reached
    if (count < target) {
      // Add inc to count and output in counter
      counter.innerText = count + inc;
      // Call function every ms
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});


var scrollableElement = document.body;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
scrollableElement.addEventListener("wheel", checkScrollDirection);

function checkScrollDirection(event) {
  if (checkScrollDirectionIsUp(event)) {
    // console.log("up");
  } else {
    // console.log("down");
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