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

const htmlEditor = new EditorView({
  doc: `<h1>Hello World</h1>`,
  parent: document.getElementById("editor-html"),
  extensions: [basicSetup, html()],
});

const cssEditor = new EditorView({
  doc: `body{
color: #4f46e5
}`,
  parent: document.getElementById("editor-css"),
  extensions: [basicSetup, css()],
});

const jsEditor = new EditorView({
  doc: `console.log("Hello");`,
  parent: document.getElementById("editor-js"),
  extensions: [basicSetup, javascript()],
});
