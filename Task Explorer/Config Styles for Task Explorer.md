```space-style

/* ****** TASK EXPLORER ******** */

/* Toolbar - Open view mode */
  .blue-icon { color: blue; }
  .green-icon { color: #00D836; }
  #openingMode-btn.explorer-action-btn.active { background: var(--explorer-tile-bg);}

/* Breadcrumbs */
.explorer-breadcrumbs2{
  margin: 3px;
  color: grey;
  text-align: center;
  font-size: smaller;
}

/* Grille */
.mode-grid .document-explorer2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--tile-size), 1fr));
  grid-auto-rows: 3 * var(--tile-size);
}

/* Page Name */
.sb-TaskExplorer-div-page{
  border: solid grey; /*#80FF00;
  background-color: #D8FFB2;*/
  color: grey;
  text-align: center;
  margin-top: 12px;
}

/* Wrapper (div) of the task */
.sb-TaskExplorer-div-task {
  margin-top: 12px;
}

/* ****** TASKS ******** <<<<<<<<<<<<< EXAMPLE >>>>>>>>>>>>>>> */
/* for SilverBullet AND TaskExplorer  */

/* Attribute */
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

/* Customize the display based on the value of an attribute */
/*.sb-frontmatter[data-date="statut"][data-attr-value="hors délai"] {
      background-color: red !important;
      color: white !important;
      padding: 2px 6px !important;
      border-radius: 3px !important;
}*/

/* Checked : remove line-through */
#sb-main .cm-editor .cm-task-checked {
    text-decoration: none !important;
    font-weight: normal;
}

/* Checked : change background and character display */
.cm-task-checked, .cm-task-checked .sb-frontmatter {
      background: #F0F0F0 !important;
      font-weight: normal;
      color:grey !important;
}

````

