```space-style

html[data-theme="light"] {
    /*Main UI Color*/
    --top-background-color: white;
}

/* ********* TOOLBAR **********

/* Buttons: inside the search area*/
#clearSearch,
#goSearch {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    background: var(--explorer-hover-bg);
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    cursor: pointer;
}
#clearSearch {
    right: 25px;
}
#goSearch {
    right: 5px;
    color: red;
}
.input-wrapper:focus-within #clearSearch,
.input-wrapper:focus-within #goSearch {
    display: inline;
}

/* --- Buttons: mode Switcher --- */
#searchInfo {
  padding-left: 5px;
  padding-right: 8px;
  justify-content: center;
}
.mode-switcher {
    display: flex;
    background: oklch(0.75 0 0 / 0.1);
    padding: 1px; /* 3 */
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
/* --------- Hide mode switcher buttons when Filter in focus ------------- */
.mode-switcher {
    max-width: 200px;
    opacity: 1;
    display: flex;
    transition:
        max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        padding-inline 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
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

/* ********* LIST FORMAT **********

/* Grille */
.mode-grid .document-explorer2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--tile-size), 1fr));
  grid-auto-rows: 3 * var(--tile-size);
}

/* Page Name */
.sb-TaskExplorer-div-page{
  color: blue;
  text-align: right;
  margin-top: 5px;
  margin-right: 15px;
  margin-bottom: 5px;
  font-weight: bold;
}
.sb-TaskExplorer-span-page{
  padding-left: 25px;
}

/* Wrapper (DIV) of the task */
.sb-TaskExplorer-div-task {
  margin-bottom: 0px;
  padding: 0px 10px;
  display: flex;
  gap: 8px;  /* 8 */
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

/* ********* TASK FORMAT **********
  for SilverBullet AND TaskExplorer  
  <<<<<<<< examples >>>>>>>>> */

/* Values*/
.sb-attribute[data-statut] > .sb-list.sb-frontmatter:not(.sb-meta):not(.sb-atom) {
  background-color: red;
  color: white;
}
.sb-attribute[data-attrib1] > .sb-list.sb-frontmatter:not(.sb-meta):not(.sb-atom) {
  color:#800080;
  background-color: #C8A7D3;
}
.sb-attribute[data-attrib2] > .sb-list.sb-frontmatter:not(.sb-meta):not(.sb-atom) {
  color: green;
}
.sb-attribute[data-attrib2] {
  background-color: #C4FFC4;
}
.sb-attribute[data-date] > .sb-list.sb-frontmatter:not(.sb-meta):not(.sb-atom) {
  color: blue;
}

/* Structure */
.sb-attribute> .sb-list.sb-frontmatter.sb-meta {
    display: none;
}
.sb-attribute> .sb-list.sb-frontmatter.sb-meta:is(:has(+ .sb-frontmatter:not(.sb-meta):not(.sb-atom))) {
    display: inline;
}
.sb-attribute[data-date]> .sb-list.sb-frontmatter.sb-meta:is(:has(+ .sb-frontmatter:not(.sb-meta):not(.sb-atom))) {
    display: none;
}
.sb-attribute[data-date] > .sb-list.sb-frontmatter.sb-atom {
    display: none;
}

/* Attribute */
/*.sb-frontmatter[data-date="statut"][data-attr-value="hors délai"] {
      background-color: red !important;
      color: white !important;
      padding: 2px 6px !important;
      border-radius: 3px !important;
}*/

/* Task checked : remove line-through */
#sb-main .cm-editor .cm-task-checked {
    text-decoration: none !important;
    font-weight: normal;
}

/* Task checked : change background and character display */
.cm-task-checked, .cm-task-checked .sb-frontmatter {
      background: #F0F0F0 !important;
      font-weight: normal;
      color:grey !important;
      box-sizing: border-box;
}

/* for DEBUG */
/*.cm-task-checked {
  outline: 1px solid blue;
}*/

````

