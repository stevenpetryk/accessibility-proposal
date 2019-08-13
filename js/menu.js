const menus = document.querySelectorAll(".menu-with-button");

for (const menuWrapper of menus) {
  const button = menuWrapper.querySelector("[aria-haspopup]");
  const menu = menuWrapper.querySelector("[role=menu]");
  const manageFocus = !menuWrapper.classList.contains("no-focus-mgmt");

  function closeIfLostFocus(event) {
    if (!event.target || !menuWrapper.contains(event.target)) {
      hideMenu();
    }
  }

  function showMenu() {
    menu.removeAttribute("hidden");
    button.setAttribute("aria-expanded", true);
    window.addEventListener("click", closeIfLostFocus);

    if (manageFocus) {
      window.addEventListener("focusin", closeIfLostFocus);
      button.setAttribute("tabindex", "-1");
    }
  }

  function hideMenu() {
    menu.setAttribute("hidden", true);
    button.removeAttribute("aria-expanded");
    window.removeEventListener("click", closeIfLostFocus);

    if (manageFocus) {
      button.setAttribute("tabindex", "0");
      window.removeEventListener("focusin", closeIfLostFocus);
    }
  }

  button.addEventListener("click", event => {
    if (button.getAttribute("aria-expanded")) {
      hideMenu();
    } else {
      showMenu();

      const isKeyboard = event.screenX === 0 && event.screenY === 0;

      if (isKeyboard) {
        selectButton(menu.querySelector("[role=menuitem]"));
      }
    }
  });

  hideMenu();

  menu.addEventListener("click", event => {
    if (event.target.getAttribute("role") !== "menuitem") return;

    hideMenu();
    alert("✓ " + event.target.innerText.trim());
    button.focus();
  });

  function selectButton(button) {
    if (!manageFocus) return;

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

      case "Home":
        event.preventDefault();
        selectButton(menu.querySelector("[role=menuitem]"));
        break;

      case "End":
        event.preventDefault();
        selectButton(menu.querySelector("li:last-child [role=menuitem]"));
        break;

      case "Escape":
        hideMenu();
        button.focus();
        break;
    }
  });
}
