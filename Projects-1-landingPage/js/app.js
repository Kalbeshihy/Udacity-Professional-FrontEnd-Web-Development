/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
// select all sections
const allSections = document.querySelectorAll("section");
// seclect ul by its id
const navList = document.getElementById("navbar__list");
// Variables to define scroll to button
const scrollTop = document.getElementById("scroll_top");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav

allSections.forEach(function (section) {
  // add list items with insertAdjacentHTML method insted of appendChild
  navList.insertAdjacentHTML(
    "beforeend",
    `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`
  );
});

// Add class 'active' to section when near top of viewport
window.onscroll = () => {
  allSections.forEach((active) => {
    let activeLink = navList.querySelector(`[data-nav=${active.id}]`);
    if (
      active.getBoundingClientRect().top >= -400 &&
      active.getBoundingClientRect().top <= 150
    ) {
      // in the Viewport
      active.classList.add("your-active-class"); // add active class to section
      activeLink.classList.add("active-link"); // add active class to Navbar
    } else {
      // Remove from Viewport
      active.classList.remove("your-active-class"); // remove active class from section
      activeLink.classList.remove("active-link"); // remove active class from Navbar
    }
  });
};

// Scroll to anchor ID smoothly
navList.addEventListener("click", (toSection) => {
  toSection.preventDefault();
  if (toSection.target.dataset.nav) {
    document
      .getElementById(`${toSection.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${toSection.target.dataset.nav}`;
    }, 300);
  }
});

// When the user clicks on the button, scroll to the top of the document

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// // When the user scrolls down 400px from the top of the document, show the button
window.addEventListener("scroll", () => {
  // Show or Hide Scroll To Top button
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    // Show
    scrollTop.classList.remove("hide");
  } else {
    // Hide
    scrollTop.classList.add("hide");
  }
});

// scroll to top when refresh the page

window.onbeforeunload = function () {
  window.screenTop(0);
};
