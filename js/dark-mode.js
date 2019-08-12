const html = document.querySelector("html");
const button = document.querySelector(".dark-theme-button");

function lighten() {
  html.classList.remove("dark");
  button.innerText = "Dark theme";
  localStorage.setItem("theme", "light");
}

function darken() {
  html.classList.add("dark");
  button.innerText = "Light theme";
  localStorage.setItem("theme", "dark");
}

button.addEventListener("click", () => {
  if (html.classList.contains("dark")) {
    lighten();
  } else {
    darken();
  }
});

if (window.localStorage) {
  if (localStorage.getItem("theme") === "dark") {
    darken();
  }
}
