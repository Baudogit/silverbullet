
```space

html[data-theme="light"] {
    --top-background-color: white;
    --progress-mon-type-color: #00E439;
}

/* en-tête d'iframe */
.explorer-header {
  border-top: 1px solid var(--explorer-border-color);
  border-left: 1px solid var(--explorer-border-color);
  border-right: 1px solid var(--explorer-border-color);
}

/* ********* TOOLBAR **********

/* --- Buttons: mode Switcher --- */
#searchInfo {
  padding-left: 5px;
  padding-right: 8px;
  justify-content: center;
}
.mode-switcher {
    display: flex;
    background: oklch(0.75 0 0 / 0.1);
    padding: 1px;
    border-radius: 8px;
    border: 1px solid var(--explorer-border-color);
}
.mode-switcher div {
    display: flex;
    background: transparent;
    border: none;
    padding: 2px 6px;
    cursor: pointer;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    font-size: 0.9em;
    color: inherit;
    opacity: 0.6;
}
.mode-switcher div:hover {
    opacity: 1;
    background: var(--explorer-hover-bg);
}
.mode-switcher div.active {
    background: oklch(from var(--explorer-accent-color) l c h);
    color: white;
    opacity: 1;
}
/* Transition for hide when input focus */
.mode-switcher {
    max-width: 200px;
    opacity: 1;
    display: flex;
    transition:
        max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        padding-inline 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
/* When input focus */
.input-wrapper:focus-within ~ .mode-switcher{
    max-width: 0;
    opacity: 0;
    padding-inline: 0;
    pointer-events: none;
}

/* Button: open view mode */
  .blue-icon { color: blue; }
  .green-icon { color: #00D836; }
  #openingMode-btn.explorer-action-btn.active { background: var(--explorer-tile-bg);}

/* Breadcrumbs */
.explorer-breadcrumbs2{
  padding: 3px 0px 0px 15px;
  color: blue;
  display: flex;
  justify-content: space-between;
}

#temp-message1, #temp-message2 {
  color: grey;
  text-align: center;
  display: none;
  font-style: italic;
}
#temp-message3 {
  color: grey;
  text-align: right;
  padding-right: 15px;
  display: inline;
  font-style: italic;
}

/* ********* LIST ***********/
.document-explorer{
  border-top: 1px solid #C0C0C0;
  border-left: 1px solid #C0C0C0;
  border-right: 1px solid #C0C0C0;
  padding: 0px;
}

/* Grille */
/*.document-explorer2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--tile-size), 1fr));
  grid-auto-rows: 3 * var(--tile-size);
}*/

/* Page Name */
.sb-TaskExplorer-div-page{
  color: blue;
  text-align: right;
  font-weight: bold;
  box-sizing: border-box;
  outline: 1px solid #C0C0C0;
  padding-right: 20px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.sb-TaskExplorer-span-page{
  padding-left: 25px;
}

/* Wrapper (DIV) of the task */
.sb-TaskExplorer-div-task {
  margin-bottom: 0px;
  padding: 3px 15px;
  display: flex;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}
.sb-TaskExplorer-div-task:hover {
  background-color: gold;
}
.sb-TaskExplorer-div-task {
  outline: 1px solid #C0C0C0;
}

/* Wrapper (SPAN) of the task */
.sb-TaskExplorer-span-task {
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: flex-start;
  box-sizing: border-box;
}

/* Wrapper (DIV child) of the task */
#divTaskchild{
  flex: 1;
  cursor: pointer;
  vertical-align: top;
  box-sizing: border-box;
  line-height: 1.4;
  position: relative;
}

/* for DEBUG */
/*.cm-task-checked {
  outline: 1px solid blue;
}*/

````

