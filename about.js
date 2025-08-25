// about.js
const sections = document.querySelectorAll(".about-section section");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      section.classList.add("visible");
    }
  });
});

// trigger on load for sections already in view
window.addEventListener("load", () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      section.classList.add("visible");
    }
  });
});
