export function setTheme(element) {
  element.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

export function setToggleButton(btn, editors) {
  btn.addEventListener("click", function (e) {
    if (e.target.nodeName !== "BUTTON") return;

    // button styling
    const buttons = btn.querySelectorAll(".tab");
    buttons.forEach((button) => (button.ariaSelected = "false"));
    e.target.ariaSelected = "true";
    toggleEditors(`#editor-${e.target.dataset.lang}`, editors);
  });
}

// Toggle Editors
function toggleEditors(editorId, editors) {
  editors.forEach((editor) => editor.classList.add("hidden"));
  document.querySelector(editorId).classList.remove("hidden");
}
