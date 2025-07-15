import "./style.css";
import { setTheme, setToggleButton } from "./script.js";
import { basicSetup } from "codemirror";
import { EditorView } from "@codemirror/view";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

document.querySelector("#app").innerHTML = `
      <header class="app-header">
      <h1 class="app-title">Mini Code Editor</h1>
      <button id="theme-toggle" aria-label="Toggle dark mode">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-sun-medium-icon lucide-sun-medium"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v1" />
          <path d="M12 20v1" />
          <path d="M3 12h1" />
          <path d="M20 12h1" />
          <path d="m18.364 5.636-.707.707" />
          <path d="m6.343 17.657-.707.707" />
          <path d="m5.636 5.636.707.707" />
          <path d="m17.657 17.657.707.707" />
        </svg>
      </button>
    </header>

    <main class="editor-layout">
      <section class="editor-panel" aria-label="Code editor area">
        <nav class="tab-bar" role="tablist">
          <button
            class="tab"
            role="tab"
            aria-controls="editor-html"
            aria-selected="true"
            data-lang="html"
          >
            index.html
          </button>
          <button
            class="tab"
            role="tab"
            aria-controls="editor-html"
            aria-selected="false"
            data-lang="css"
          >
            style.css
          </button>
          <button
            class="tab"
            role="tab"
            aria-controls="editor-html"
            aria-selected="false"
            data-lang="js"
          >
            script.js
          </button>
          <button
            class="runCode"
            role="run code"
            aria-controls="run-code"
            aria-selected="true"
          >
            Run
          </button>
        </nav>

        <div class="editor-container">
          <!-- CodeMirror instances will be injected here -->
          <div id="editor-html" class="code-editor" aria-label="HTML editor">
          </div>
          <div
            id="editor-css"
            class="code-editor hidden"
            aria-label="CSS editor"
          >
          </div>
          <div id="editor-js" class="code-editor hidden" aria-label="JS editor">
          </div>
        </div>
      </section>

      <section class="preview-panel" aria-label="Live output">
        <iframe
          id="live-preview"
          title="Live preview area"
          sandbox="allow-scripts"
        ></iframe>
      </section>
    </main>
`;

// Theme Toggle
setTheme(document.getElementById("theme-toggle"));
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") document.body.classList.add("dark");

// Toggle Editor Buttons and Editor
setToggleButton(
  document.querySelector(".tab-bar"),
  document.querySelectorAll(".code-editor")
);

// Editor Styling
const customTheme = EditorView.theme({
  "&": {
    fontSize: "1.4rem",
    height: "100%",
  },
});
const localHtml = localStorage.getItem("html");
const localCss = localStorage.getItem("css");
const localJs = localStorage.getItem("js");
console.log(localHtml, localCss, localJs);
// Working Editors
const htmlEditor = new EditorView({
  doc: localHtml != null ? localHtml : `<h1></h1>`,
  parent: document.getElementById("editor-html"),
  extensions: [basicSetup, html(), customTheme, EditorView.lineWrapping],
});

const cssEditor = new EditorView({
  doc:
    localCss != null
      ? localCss
      : `body{
background-color: #4f46e5;
color: white;
}`,
  parent: document.getElementById("editor-css"),
  extensions: [basicSetup, css(), customTheme, EditorView.lineWrapping],
});

const jsEditor = new EditorView({
  doc:
    localJs != null
      ? localJs
      : `document.querySelector("h1").textContent = "Hello Baby";`,
  parent: document.getElementById("editor-js"),
  extensions: [basicSetup, javascript(), customTheme, EditorView.lineWrapping],
});

// Preview tab using iframe
const previewTab = document.getElementById("live-preview");

function previewCodeHandler(html, css, js) {
  previewTab.srcdoc = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${css}</style>
    <title>Mini App</title>
  </head>
  <body>
    ${html}
    <script>${js}</script>
  </body>
</html>
`;
}

const runBtn = document.querySelector(".runCode");

runBtn.addEventListener("click", () => {
  const htmlCode = htmlEditor.state.doc.toString();
  const cssCode = cssEditor.state.doc.toString();
  const jsCode = jsEditor.state.doc.toString();
  previewCodeHandler(htmlCode, cssCode, jsCode);
  localStorage.setItem("html", htmlCode);
  localStorage.setItem("css", cssCode);
  localStorage.setItem("js", jsCode);
});

previewCodeHandler(
  htmlEditor.state.doc.toString(),
  cssEditor.state.doc.toString(),
  jsEditor.state.doc.toString()
);
