const menus = document.querySelectorAll(".menu-with-button");

for (const menuWrapper of menus) {
  const button = menuWrapper.querySelector("[aria-haspopup]");
  const menu = menuWrapper.querySelector("[role=menu]");
  const noFocusMgmt = menuWrapper.classList.contains("no-focus-mgmt");

  function showMenu() {
    menu.removeAttribute("hidden");
    button.setAttribute("aria-expanded", true);
  }

  function hideMenu() {
    menu.setAttribute("hidden", true);
    button.setAttribute("aria-expanded", false);
  }

  button.addEventListener("click", () => {
    if (button.getAttribute("aria-expanded") === "false") {
      showMenu();
      if (!noFocusMgmt) {
        selectButton(menu.querySelector("[role=menuitem]"));
      }
    } else {
      hideMenu();
    }
  });

  window.addEventListener("click", event => {
    if (!menuWrapper.contains(event.target)) {
      hideMenu();
    }
  });

  hideMenu();

  menu.addEventListener("click", event => {
    if (event.target.getAttribute("role") !== "menuitem") return;

    hideMenu();
    alert("✓ " + event.target.innerText.trim());
    button.focus();
  });

  if (noFocusMgmt) continue;

  function selectButton(button) {
    Array.from(menu.querySelectorAll("[role=menuitem]")).forEach(b =>
      b.setAttribute("tabindex", "-1")
    );
    button.focus();
    button.setAttribute("tabindex", "0");
  }

  button.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        showMenu();
        selectButton(menu.querySelector("li:last-child [role=menuitem]"));

        break;
      case "ArrowDown":
        event.preventDefault();
        showMenu();
        selectButton(menu.querySelector("[role=menuitem]"));
        break;
    }
  });

  menu.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        if (!event.target) return false;

        if (event.target.parentNode.nextElementSibling) {
          selectButton(event.target.parentNode.nextElementSibling.children[0]);
        } else {
          selectButton(menu.querySelector("[role=menuitem]"));
        }

        break;
      case "ArrowUp":
        event.preventDefault();

        if (event.target.parentNode.previousElementSibling) {
          selectButton(
            event.target.parentNode.previousElementSibling.children[0]
          );
        } else {
          selectButton(menu.querySelector("li:last-child [role=menuitem]"));
        }
        break;
      case "Escape":
        hideMenu();
        button.focus();
        break;
    }
  });
}
