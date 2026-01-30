---
name: Library/baudogit/TaskExplorer
tags: meta/library
maj: 2026-01-29 21:00
pageDecoration.prefix: "📋 "
files:
- TaskExplorer.md
- lucide-icons.svg
- ConfigStyles_for_TaskExplorer.md
- Instructions_for_Task_Explorer.md
- where-examples.txt
- where-history.txt
- 12.png (for Instructions_for_Task_Explorer.md)
- 13.png (for Instructions_for_Task_Explorer.md)
share.uri: "github:Baudogit/silverbullet/tree/main/TaskExplorer"
---

> **note** Screenshots are available on the dedicated discussion thread of the SilverBullet community
>      The best solution: install and test !

---

# 📋Task Explorer (revisited)

The revisited tool benefits from an ==optimized interface== and ==advanced querying functionalities==.

> **success** **What’s the goal ?**
>    Display the task list according to the user-defined custom rendering, **target tasks according  to various criteria**, reverse their status and navigate to their original page.

Open the **new Task Explorer**: ${widgets.button("Toggle Task Explorer", function() editor.invokeCommand("Navigate: Toggle Task Explorer", tasksByPage()) end)} or Ctrl+Alt+v
after running the `System: Reload` command if necessary.

To add/hide a button to the SilverBullet toolbar, enable/disable this space-lua:
````space-lua
-- Show/hide Task Explorer
actionButton.define {
  icon = "list",
  description = "Task Explorer",
  priority = 1,
  run = function()
    editor.invokeCommand("Navigate: Toggle Task Explorer")
  end
}
````

> **warning** Warning
>      Depending on the panel chosen (see below), it may be necessary to click the button twice.
>     To avoid this, preferably use the command or the button above to **close** the panel.

---

# Features

> **note** Note 
>      Task Explorer uses multi-windowing functionalities developed by Mr.Red.

## ✨List view 

- displays the list of tasks
- every task is displayed on **several lines**:  
  - first, the ==text== of the task, without the attributes. Split text, broken down between attributes, is concatenated with "|" separator. Text can span multiple lines.
  - then, the ==attributes== only, on as many lines as necessary
- applies the **css rules** used in markdown pages
- show a **tooltip** with the original text of the task (in its raw version without CSS rules) increased by one line for **itags**
- open the **original task page** in the main editor window
  OR in a separate window integrated into the multi-windowed environment

## ✨Task update

- ==modify the status== of task with synchronized report in the original window and in the index
  OR in a window opened parallel to the panel (in this case, the update is not reported in the panel and you have to refresh it manually with a button).
- **custom statuses** are displayed but cannot be updated via Task Explorer. To do this, you must navigate to the original page and update manually.

## ✨List manipulations

- tasks are sorted by page and by position on their page. A **page break** is applied in the list. The ==page break== can be removed (and then reinstated) via a button.
- the list comes from an extraction of the index which **may or may not include completed tasks** (==toggle== button)
- the list can be regenerated at any time, without `where` restriction in the extraction and without display filter (==reset== button)

## ✨Filter and query

The list can be targeted in two modes:
- ==filter mode== : the list is filtered without re-extracting
- ==where mode== : the list is re-extracted after applying complex filters via a **custom** where clause
  
To activate these features, use the **Filter/Query toggle button** or click directly in the input box. Filter mode is selected by default. When the Filter/Query toggle button is activated, the input area has the focus and a list of items is proposed in a menu.

 Menu content depends on the mode chosen:
- for both modes: ==list of attributes== collected in the current list
- for where mode only (in addition): ==list of standard properties== of a task defined in the index
- for where mode only (in addition): ==library of where clauses examples==
- for where mode only (in addition): ==library of where clauses history==
A click on one of these items transfers its content to the input area.

To hide the drop-down menus, you can press Esc at any time or press X button.
      
      The input area accepts direct keyboard entry, copy-paste operation and paste from the menu.     
      After changing the content of input box:
          - filter mode: immediate application (live)
          - where mode: deferred application. Press Enter to execute the query.
    To exit the input area and hide the context menus, press Esc or click the X button.  

> **success** **Important !**
>  Rules for filtering and designing custom where clauses are outlined in a markdown page displayed via a button on the toolbar ==Instructions_for_Task_Explorer.md==.

---

# Technical concepts

## 🪟Multi-windowing

The multi-windowing concept uses two types of components:
- the **resizable floating panels** are an extension of the fixed panels integrated into SilverBullet These three fixed panels are identified by their position: ==lhs== (left), ==rhs== (right) and ==bhs== (bottom).
- **autonomous synthetic panels** designed directly in html, potentially in unlimited numbers

> **note** Note : all these objects are **iframes** but ...
>  - when a markdown page is opened in an “autonomous synthetic panels”, a new SilverBullet **session** is created, as would happen if the page was opened in a new browser tab
>  - although, Document Explorer and Task Explorer don’t generate a new SilverBullet session because they are designed on the fly in strict html associated with js and css.

Access to these features is **however limited** (as of 01/21/2026):

1- the management of the ==rhs== panel by SilverBullet is buggy: as soon as you start to type in the main window, the panel disappears. An issue was opened on 01/15/2026: [Bug: rhs panel is completely removed from the DOM when typing # 1779](https://github.com/silverbulletmd/silverbullet/issues/1779)
2- management of the ==bhs== panel by Mr.Red's `UnifiedAdvancedPanelControl.js` library is partial (it does not take into account bhs). A complementary development would be appreciated.

⚠️ **Limits**
Limits appear depending on the panel assigned to Task Explorer (see config below).
    
- **==Panel lhs==**: it is usually used by Document Explorer. The two tools cannot coexist in the same panel. The last one activated will replace the previous one in the panel. **This isn't necessarily a problem**, but it's something to be aware of. If you do not use Document Explorer or open it occasionally, it is recommended to use the lhs panel for Task Explorer.

- **==Panel rhs==**: the panel can be used to view tasks, filter, query, modify the status and open the original task page but if you want to update the original page, you must open a new session SilverBullet in a **secondary window (synthetic panel)** via a button on the toolbar.

- **==Panel bhs==**: this panel is not very suitable to mobile. Conversely, on a desk, it provides better visibility of the sometimes long text. But **multi-windowing is limited**: the panel, docked by default, can become floating but it cannot be docked again; to do this, you will have to close it then reopen it.

The **default panel** assigned to Task Explorer is: ==bhs==.
To customize this option, copy this text to your **Config.md** and modify it.

```space
config.set("explorer2", { position = "bhs" })
```

## 🖼️Styling

> **warning** Warning
>      Currently, Task Explorer is not compatible with dark mode !

- The **panel style** is managed by Mr.Red's `docex_styles.css`, the last section of which (11. MAIN UI (Colors)) can be customized in a `space-style` (see the Document Explorer presentation).
  
      ⚠️ docex_styles.css is loaded when the panel is opened. Many of rules in `docex_styles.css` refer to css variables through css variables defined in main.css, which is reloaded/reactivated just before loading docex_styles.css.

      So, if you want to change the default color of the panel background (like me !), modify directly the variable css in your space-style (section: html[data-theme="dark"] or: html[data-theme="light"]) like this;  "--top-background-color: white;“

- The **style of tasks** can be now finely customized since version 2.40 of SilverBullet (and the 2nd Edge version of 08/01). Rules can be applied individually to all or certain attributes and/or all or certain values. The `ConfigStyles_for_TaskExplorer.md` file includes several examples. An issue was created on 01/10 to target values more easily: [Add class to value attributes # 1768](https://github.com/silverbulletmd/silverbullet/issues/1768).

    Styles defined for tasks apply to ==both the original task and its reflection== in Task Explorer.

---

# Installation

1) First, install **Document Explorer** or **AdvancedPanelControl** by Mr.Red via his repository : https://github.com/Mr-xRed/silverbullet-libraries/blob/main/Repository/Mr-xRed.md
    with Library Manager.

> **note** This installation creates the folder `Library/Mr-xRed/` if it does not already exist
>      and drop in these two files required for Task Explorer:
              UnifiedAdvancedPanelControl.js (central multi-window script)
              docex_styles.css (css rules for panels and multi-windowing tools)

2) Then, install **Task Explorer**. Download eight files from [my Github](https://github.com/Baudogit/silverbullet/tree/main/Task%20Explorer):

           TaskExplorer.md (this file)
           lucide-icons.svg (icons)
           ConfigStyles_for_TaskExplorer.md (copy and modify his content to your own space-style)
           Instructions_for_Task_Explorer.md (documents filtering and querying rules)
           where-examples.txt (clauses where examples for sub-menu)
           where-history.txt (clauses where history for sub-menu)
           12.png (illustration)
           13.png (illustration)

     and put them in your SilverBullet space here: “Library/**baudogit**/“

## 🎲 Configuration

Copy the code below into your space-lua configuration (all items are **optional**):
````lua
config.set("explorer2", {
  position = "bhs",
  where = "not done and some(_.attrib1) ~= nil and string.sub(_.attrib1,1,10) <= '2026-01-01'",
  whereAlways = "true",
  maxWhereHistory = 25
})
````

## 💬Discussion

- Document Manager: https://community.silverbullet.md/t/document-explorer-for-silverbullet/3647/159
- Task Explorer (old version): https://community.silverbullet.md/t/task-explorer/3747/2
- Task Explorer revisited (this version): https://community.silverbullet.md/t/task-explorer-revisited/3805
- See also Task Manager: https://community.silverbullet.md/t/todo-task-manager-global-interactive-table-sorter-filtering/3767

## 🛠️Integration

The code (+ 1900 lines) is placed in 3 spaces-lua on `TaskExplorer.md` (this file):

::: ==space-lua 1== (main) ::: CONFIG | REFRESH LOGIC | **DRAW PANEL** | COMMANDS

    Details for DRAW PANEL:
TOOLBAR | BREADCRUMB | HTML INJECTION | **SCRIPT JS** | DISPLAY

    Details for SCRIPT JS:
TASK UPDATE | BUILD MENU | SEARCH FILTER | BUILD CUSTOM CLAUSE WHERE | **BUILD TASKS LIST** | STYLES INJECTION

    Functions used by BUILD TASKS LIST:

::: ==space-lua 2== ::: BUILD QUERY | BUILD TASK HTML | TEMPLATES
::: ==space-lua 3== ::: FORMAT PAGE | FORMAT TASK

---

# Development and issues

## ⚙️Interface
- adapt style to dark theme

##  ⚙️Filter
- when a filter is applied and page break active, count the number of tasks displayed per page

## ⚙️Queries
- add submenus to select itags, tags and/or parents

## ⚠️ Issues
none
  
---

```space-lua
-- priority: -1
-- ::: space-lua 1 :::

-- Structure of this code comes from the great work of Mr.Red

-- ---------- CONFIG ----------

-- Schema
config.define("explorer2", {
    type = "object",
    properties = {
        position = schema.string(),
        where = schema.string(),
        whereAlways = schema.string(),
        maxWhereHistory = schema.number()
    }
})

-- Icons
local ICONS = {
    list       =
    "<svg class='icon-list' style='width: 1em; height: 1em; vertical-align: middle;'><use href='/.fs/Library/baudogit/lucide-icons.svg#icon-list'></use></svg>",
    tree       =
    "<svg class='icon-tree' style='width: 1em; height: 1em; vertical-align: middle;'><use href='/.fs/Library/baudogit/lucide-icons.svg#icon-tree'></use></svg>",
    refresh    =
    "<svg class='icon-refresh' style='width: 1em; height: 1em; vertical-align: middle;'><use href='/.fs/Library/baudogit/lucide-icons.svg#icon-refresh'></use></svg>",
    close      =
    "<svg class='icon-close' style='width: 1em; height: 1em; vertical-align: middle;'><use href='/.fs/Library/baudogit/lucide-icons.svg#icon-close'></use></svg>",
    info       =
    "<svg class='icon-info' style='width: 1.3em; height: 1.3em; vertical-align: middle;'><use href='/.fs/Library/baudogit/lucide-icons.svg#icon-info'></use></svg>",
    squareplus =
    "<svg class='icon-square-plus' style='width: 1em; height: 1em; vertical-align: middle;'><use href='/.fs/Library/baudogit/lucide-icons.svg#icon-square-plus'></use></svg>",
    square     =
    "<svg class='icon-square' style='width: 1em; height: 1em; vertical-align: middle;'><use href='/.fs/Library/baudogit/lucide-icons.svg#icon-square'></use></svg>"
}

-- Load config
local cfg = config.get("explorer2") or {}
local PANEL_ID = cfg.position or "lhs"
local WHERE_INIT = cfg.where or ""
local WHERE_ALWAYS = cfg.whereAlways or "false"
local maxEntries = cfg.maxWhereHistory or 20

-- Others variables and constants
local PANEL_VISIBLE = false
local VIEW2_MODE_KEY = "list"

js.window.sessionStorage.setItem("searchMode", "list")
js.window.sessionStorage.setItem("searchInit", "true")
js.window.sessionStorage.setItem("searchTerm", WHERE_INIT)
js.window.sessionStorage.setItem("searchTermFilter", "")

-- ---------- REFRESH LOGIC ----------

-- last update
function triggerHighlightUpdate()
    clientStore.set("explorer2.lastUpdate", os.time() .. math.random())
end

-- Reset tasks list
function refreshExplorer2Button()
    if WHERE_ALWAYS == "true" then
        js.window.sessionStorage.setItem("searchTerm", WHERE_INIT)
        drawPanel("maj", WHERE_INIT)
    else
        js.window.sessionStorage.setItem("searchTerm", "")
        drawPanel("maj")
    end
    triggerHighlightUpdate()
end

-- Toggle with or without completed tasks
function toggleQueryButton()
    local whereClause = ""
    local current = clientStore.get("explorer2.queryAll")
    if current == "true" then
        clientStore.set("explorer2.queryAll", "false")
    else
        clientStore.set("explorer2.queryAll", "true")
    end

    -- Preserve custom query, if one exists
    local savedSearchTerm = js.window.sessionStorage.getItem("searchTerm");
    if savedSearchTerm ~= nil and savedSearchTerm ~= "" then
        whereClause = savedSearchTerm
    end

    drawPanel("maj", whereClause)
    triggerHighlightUpdate()
end

-- Updating task on original page
local function toggleTaskRemote(pageName, pos, currentState, statePerso)
    local content = space.readPage(pageName)
    if not content then return end

    -- Return if custom status
    if statePerso ~= "" then
        editor.flashNotification("Custom status. No modification!")
        return
    end

    -- Show a progress indicator
    editor.showProgress(0, "custom")

    -- Edit the original line (string between brackets at the start)
    local lineEnd = content:find("\n", pos + 1) or (#content + 1)
    local originalLine = content:sub(pos + 1, lineEnd - 1)

    local newLine = ""
    local timestamp = os.date("%Y-%m-%d %H:%M")

    if currentState == " " or currentState == "" then
        local cleaned = originalLine:gsub("%[%s*%]", "[x]")
        cleaned = cleaned:gsub("%s*%[completed: [^%]]+]", "")
        newLine = cleaned .. " [completed: " .. timestamp .. "]"
    else
        local cleaned = originalLine:gsub("%[[xX]%]", "[ ]")
        newLine = cleaned:gsub("%s*%[completed: [^%]]+]", "")
    end

    local prefix = content:sub(1, pos)
    local suffix = content:sub(lineEnd)
    local finalContent = prefix .. newLine .. suffix
    space.writePage(pageName, finalContent)

    -- Wait for asynchronous indexing to complete
    mq.awaitEmptyQueue("indexQueue")
    -- another await will be applied just before querying the tasks

    js.window.setTimeout(function()
        drawPanel("yes")
        triggerHighlightUpdate()
        editor.showProgress()
    end, 100)
end

-- ---------- HISTORY FILE ----------
-- Write query
local function writeToHistory(whereClause)
    if not whereClause or whereClause == "" then return end
    local historyFile = "Library/baudogit/where-history.txt"
    local contentBinary = space.readFile(historyFile) or ""
    local content = encoding.utf8Decode(contentBinary);

    -- Format: "NN | whereClause"
    local lines = {}

    for line in content:gmatch("[^\r\n]+") do
      --line = "" .. line
      local cleaned = string.gsub(string.gsub(string.gsub(line, '^"', ''), '",$', ''), '"$', '')
      if cleaned ~= "" then
          table.insert(lines, cleaned)
      end
    end

    -- Check if query already exists (avoid duplicates)
    local clauseOnly = whereClause:match("^%d+ | (.+)$") or whereClause
    for i, line in ipairs(lines) do
        if line:match("^%d+ | (.+)$") == clauseOnly then
            table.remove(lines, i)
            break
        end
    end

    -- Add new entry at top
    table.insert(lines, 1, clauseOnly)
    -- Keep only maxEntries
    while #lines > maxEntries do
        table.remove(lines)
    end
    -- Renumber and format
    local newContent = ""
    for i, line in ipairs(lines) do
        local num = string.format("%02d", maxEntries - i + 1)
        local clause = line:match("^%d+ | (.+)$") or line
        newContent = newContent .. '"' .. num .. " | " .. clause .. '",\n'
    end

    newContentBinary = encoding.utf8Encode(newContent)
    space.writeFile(historyFile, newContentBinary)
end

-- ---------- DRAW PANEL ----------
local function drawPanel(seeMess, clauseWhere)
    local currentWidth = clientStore.get("explorer2.panelWidth") or config.get("explorer2.panelWidth") or 0.8
    local viewMode = clientStore.get(VIEW2_MODE_KEY) or "list"
    local filterEnabled = clientStore.get("explorer2.disableFilter") ~= "true"
    local allTasks = clientStore.get("explorer2.queryAll") == "true"
    local h = {}

    table.insert(h, [[<div data-panel="myPanel" class="explorer-panel mode-]])
    table.insert(h, viewMode)

    -- ---------- DRAW | EN-TÊTE -----------
    js.window.sessionStorage.setItem("searchTermFilter", "")
    searchTermCh = js.window.sessionStorage.getItem("searchTerm")
    table.insert(h, [[">
            <div class="explorer-header">
              <div class="explorer-toolbar">
                <div class="input-wrapper">
                  <input id="tileSearch" title="Filter list or query index" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp; (filter ou query)" </input>
                </div>
                <div class="mode-switcher">
                  <div id="listMode" title="]])
    table.insert(h, "Filter : ")
    table.insert(h,
        [[" Mode list" class="" onclick="switchSearchMode('list', document.getElementById('tileSearch'))">Filter]])
    table.insert(h, [[</div>
                  <div id = "whereMode" title="]])
    table.insert(h, "Where : " .. searchTermCh)
    table.insert(h,
        [[" Mode query" class="" onclick="switchSearchMode('where', document.getElementById('tileSearch'))">Query]])
    table.insert(h, [[</div>
                    <div id= "searchInfo" title="Instructions for use"]])
    table.insert(h, [[" onclick="syscall('editor.invokeCommand','Open: Instructions')">]])
    table.insert(h, ICONS.info)
    table.insert(h, [[</div>
                </div>
                <div class="view-switcher">
                  <div title="Show/hide completed"
                        class="" id="tree-toggle-btn"
                        style="display: ]])
    table.insert(h, (viewMode == "list"))
    table.insert(h, [[" onclick="syscall('lua.evalExpression', 'toggleQueryButton()')">
                        <span id="tree-toggle-icon">]])
    if allTasks then
        table.insert(h, ICONS.squareplus)
    else
        table.insert(h, ICONS.square)
    end
    table.insert(h, [[</span></div>
                  <div title="List without page break" class="]])
    table.insert(h, (viewMode == "list" and "active" or ""))
    table.insert(h, [[" onclick="syscall('editor.invokeCommand','TaskExplorer: Change View Mode',{mode:'list'})">]])
    table.insert(h, ICONS.list)
    table.insert(h, [[</div>
                  <div title="List with page break" class="]])
    table.insert(h, (viewMode == "tree" and "active" or ""))
    table.insert(h, [[" onclick="syscall('editor.invokeCommand','TaskExplorer: Change View Mode',{mode:'tree'})">]])
    table.insert(h, ICONS.tree)
    table.insert(h, [[</div>
                </div>
                <div class="action-buttons" style="display: flex; gap: 4px;">]])
    table.insert(h, [[<div title="Reset the list" class="explorer-action-btn" id="refresh-btn"
                        onclick="syscall('lua.evalExpression', 'refreshExplorer2Button()')">]])
    table.insert(h, ICONS.refresh)
    local filterDisabled = clientStore.get("explorer2.disableFilter") == "true"
    local activeClass = filterDisabled and " active" or ""
    table.insert(h, [[</div>
                <div title="Toggle page opening mode"
                        class="explorer-action-btn]] .. activeClass .. [[" id="openingMode-btn"
                        onclick="syscall('editor.invokeCommand','TaskExplorer: Toggle Opening Mode')">]])
    table.insert(h, (filterDisabled and "🟢" or "🟠"))
    table.insert(h, [[</div>
                </div>

                  <div class="action-buttons" style="display: flex; gap: 4px;">
                        <div class="explorer-close-btn" title="Close Explorer" onclick="syscall('editor.invokeCommand', 'Navigate: Task Explorer')">]])
    table.insert(h, ICONS.close)
    table.insert(h, [[</div>
                </div>
              </div>]])

    local breadcrumbHtml = "<div class='explorer-breadcrumbs2' >" ..
        "<span class='titleTasks'>Tasks list</span><span id='temp-message1'>update done</span><span id='temp-message2'>refresh done</span><span id='temp-message3'></span></div>"
    table.insert(h, breadcrumbHtml)
    table.insert(h, [[
              </div>]])

    local gridClass = "document-explorer document-explorer2"
    table.insert(h, [[<div class="]] .. gridClass .. [[" id="explorerGrid" "]])
    table.insert(h, [[">]])

    -- ---------- DRAW | HTML INJECTION ----------
    -- 1) switch content of h into h2
    local h2 = {}
    for i = 1, #h do
        h2[i] = h[i]
    end

    -- 2) add html provided by tasksByPage
    local stadeInit = js.window.sessionStorage.getItem("searchInit");
    if stadeInit == "true" then
        clauseWhere = WHERE_INIT
        js.window.sessionStorage.setItem("searchInit", "false");
    else
        clauseWhere = clauseWhere or ""
    end
    stadeInit = js.window.sessionStorage.getItem("searchInit");
    local listVar = tasksByPage(allTasks, viewMode, clauseWhere)
    if some(listVar) == nil then return end

    -- 3) -- Write query to history file
    if clauseWhere ~= "" then writeToHistory(clauseWhere) end

    -- 4) feedback
    local addHtml = listVar[1]
    table.insert(h2, addHtml)
    table.insert(h2, "</div>")
    local nbTasks = listVar[2]
    local lib = " " -- (nbTasks > 1 and " tasks " or " task ")
    local finalHtml = table.concat(h2)
    finalHtml = finalHtml:gsub("<span id='temp%-message3'></span>",
        "<span id='temp-message3'> " .. nbTasks .. lib .. "displayed of " .. nbTasks .. lib .. "extracted</span>")

    -- ---------- DRAW | SCRIPT JS ----------
    local script = [[
(function() {
  ]]
    -- Show a message when Draw() is finished
    if seeMess ~= "" and seeMess ~= nil and seeMess ~= false then
        if seeMess == "maj" then
            script = script .. [[
        setTimeout(function() {
          document.getElementById('temp-message1').style.display = 'none';
          document.getElementById('temp-message2').style.display = 'inline';]]
        else
            script = script .. [[
        setTimeout(function() {
          document.getElementById('temp-message2').style.display = 'none';
          document.getElementById('temp-message1').style.display = 'inline';]]
        end
        script = script .. [[
          setTimeout(function() {
            document.getElementById('temp-message1').style.display = 'none';
            document.getElementById('temp-message2').style.display = 'none';
          }, 1300);
        }, 100);
      ]]
    end

    script = script .. [[
  // 1) Miscellaneous

(function () {
  // ============================================
  // BRANCHEMENT DES BOUTONS DE LA ZONE DE RECHERCHE
  // (à suspendre, car incompatible avec les menus)
  // ============================================
  function initBouton() {

    // Clear filter
    const buttonClear = document.getElementById('clearSearch');
    if (buttonClear) {
        buttonClear.addEventListener('mousedown', function () {
            document.getElementById("tileSearch").value = "";
            applySearchFilter("");
        });
    }

    // Execute query
    const buttonGo = document.getElementById('goSearch');
    if (buttonGo) {
      buttonGo.addEventListener('mousedown', function () {
        // Simuler l'appui sur Enter sur le champ de recherche
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true
        });
        // Dispatcher l'événement sur tileSearch
        const inputSearch = document.getElementById('tileSearch');
        inputSearch.dispatchEvent(enterEvent);
      });
    }
  }

  // ============================================
  // VARIABLES ET CONSTANTES
  // ============================================
   const shouldRestore = sessionStorage.getItem("shouldRestore");
  if (shouldRestore === "true") {
    const container = document.getElementById("explorerGrid");
    if (container) {
      container.style.opacity = "0";
      container.style.transition = "none";
    }
  }

  let searchMode = sessionStorage.getItem("searchMode") || "list";

  // Données (propriétés et exemples)
  const properties = [
    "ref",
    "tag",
    "name",
    "page",
    "parent",
    "pos",
    "toPos",
    "text",
    "state",
    "done",
    "deadline",
    "itags",
    "tags"
  ];

  // Clauses where examples
  let examples = [];
  // Load where-examples.txt asynchronously
  (async function loadExamples() {
    try {
      const content = await globalThis.syscall("space.readFile", "Library/baudogit/where-examples.txt");
      const lines = new TextDecoder().decode(content).split('\n');

      for (const line of lines) {
        let trimmed = line.trim();
        if (trimmed !== '') {
          trimmed = trimmed.replace(/^["']|["'],?$/g, '');
          examples.push(trimmed);
        }
      }
    } catch (error) {
      console.error("Error while reading:", error);
    }
  })();

  // Clauses where history
  let history = [];
  // Load where-history.txt asynchronously
  (async function loadHistory() {
    try {
      const content = await globalThis.syscall("space.readFile", "Library/baudogit/where-history.txt");
      const lines = new TextDecoder().decode(content).split('\n');

      for (const line of lines) {
        let trimmed = line.trim();
        if (trimmed !== '') {
          trimmed = trimmed.replace(/^["']|["'],?$/g, '');
          history.push(trimmed);
        }
      }
    } catch (error) {
      console.error("Error while reading:", error);
    }
  })();

  // ============================================
  // FONCTION DE MISE A JOUR D'UNE TÂCHE
  // ============================================
  window.toggleTask = function (namePage, positionStart, done, status) {
    const taskId = namePage + "@" + (positionStart - 2);
    const clickedElement = document.querySelector(
      '[data-task-id="' + taskId + '"]',
    );

    sessionStorage.setItem("lastTaskId", taskId);
    sessionStorage.setItem("shouldRestore", "true");

    syscall("editor.invokeCommand", "Task: Toggle_Done", [
      namePage,
      positionStart,
      done,
      status,
    ]);
  };

  // Positionner la ligne mise à jour en haut de la liste
  // (fonction ,déclenchée par l'initialisation du script js de Draw,
  // lequel est lancé par toggleTaskRemote() via Task: Toggle_Done)
  function restoreScrollPosition() {
    const shouldRestore = sessionStorage.getItem("shouldRestore");

    if (shouldRestore === "true") {
      const lastTaskId = sessionStorage.getItem("lastTaskId");

      if (lastTaskId) {
        const taskElement = document.querySelector(
          '[data-task-id="' + lastTaskId + '"]',
        );

        if (taskElement) {
          taskElement.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }
      }

      setTimeout(function () {
        const container = document.getElementById("explorerGrid");
        if (container) {
          container.style.opacity = "1";
        }
        sessionStorage.removeItem("shouldRestore");
      }, 200);
    }
  }

  // !!!============================================
  // FONCTION DE FILTRAGE MULTI-CHAÎNES
  // ============================================
  function applySearchFilter(searchTermFilter) {
    searchTermFilter = searchTermFilter.trim();
    const allTasks = document.querySelectorAll(".sb-TaskExplorer-div-task");

    // Parser les termes de recherche avec support des crochets, guillemets et opérateur +
    const orGroups = parseSearchTerms(searchTermFilter);

    // Filtrer les tâches
    let nbTasks = 0;
    allTasks.forEach(function (task) {
      const labelDiv = task.querySelector("#divTaskchild");

      if (labelDiv) {
        const labelText = labelDiv.textContent;

        // Si aucun terme de recherche, tout afficher
        if (orGroups.length === 0) {
          task.style.display = "";
        } else {
          // Vérifier qu'au moins un groupe (OU) est satisfait
          const anyGroupMatches = orGroups.some(function (andGroup) {
            // Pour qu'un groupe soit satisfait, tous ses termes (ET) doivent être trouvés
            return andGroup.every(function (term) {
              return matchTerm(term, labelText);
            });
          });

          if (anyGroupMatches) {
            task.style.display = "";
          } else {
            task.style.display = "none";
          }
        }
        if (task.style.display !== "none") {nbTasks++; };
      }
    });
    const span = document.getElementById('temp-message3');
    const displayedIndex = span.textContent.indexOf('displayed');
    let lib = "";
    if (nbTasks > 1) {lib = " tasks ";} else {lib = " task ";}
    span.textContent = nbTasks + lib + span.textContent.substring(displayedIndex);
    // Masquer les titres de page sans tâches visibles
    const allPageHeaders = document.querySelectorAll(
      ".sb-TaskExplorer-div-page",
    );
    allPageHeaders.forEach(function (header) {
      let sibling = header.nextElementSibling;
      let hasVisibleTasks = false;

      while (
        sibling &&
        !sibling.classList.contains("sb-TaskExplorer-div-page")
      ) {
        if (
          sibling.classList.contains("sb-TaskExplorer-div-task") &&
          sibling.style.display !== "none"
        ) {
          hasVisibleTasks = true;
          break;
        }
        sibling = sibling.nextElementSibling;
      }

      header.style.display = hasVisibleTasks ? "" : "none";
    });
  }

  // ============================================
  // FONCTION DE PARSING DES TERMES DE RECHERCHE
  // ============================================
  function parseSearchTerms(searchTermFilter) {
    // D'abord, séparer par espaces pour identifier les groupes ET (reliés par +)
    const orGroups = [];
    let currentGroup = [];
    let i = 0;

    while (i < searchTermFilter.length) {
      const char = searchTermFilter[i];

      // Ignorer les espaces au début
      if (char === ' ') {
        // Si on a un groupe en cours, on le termine (opérateur OU)
        if (currentGroup.length > 0) {
          orGroups.push(currentGroup);
          currentGroup = [];
        }
        i++;
        continue;
      }

      // Opérateur + : continue le groupe actuel (opérateur ET)
      if (char === '+') {
        i++;
        continue;
      }

      // Parser un terme
      const term = parseSingleTerm(searchTermFilter, i);
      if (term) {
        // N'ajouter que les termes valides (non null)
        if (term.term !== null) {
          currentGroup.push(term.term);
        }
        i = term.nextIndex;
      } else {
        i++;
      }
    }

    // Ajouter le dernier groupe s'il existe
    if (currentGroup.length > 0) {
      orGroups.push(currentGroup);
    }

    return orGroups;
  }

  // ============================================
  // PARSER UN TERME UNIQUE
  // ============================================
  function parseSingleTerm(searchTermFilter, startIndex) {
    let i = startIndex;
    const char = searchTermFilter[i];

    // Bloc entre crochets [...]
    if (char === '[') {
      const closingIndex = searchTermFilter.indexOf(']', i);
      if (closingIndex !== -1) {
        const content = searchTermFilter.substring(i + 1, closingIndex);
        return {
          term: { type: 'bracket', value: content },
          nextIndex: closingIndex + 1
        };
      } else {
        // Pas de crochet fermant trouvé, on ignore
        return { term: null, nextIndex: i + 1 };
      }
    }

    // Bloc entre guillemets doubles "..."
    if (char === '"') {
      const closingIndex = searchTermFilter.indexOf('"', i + 1);
      if (closingIndex !== -1) {
        const content = searchTermFilter.substring(i + 1, closingIndex);
        return {
          term: { type: 'quoted', value: content },
          nextIndex: closingIndex + 1
        };
      } else {
        // Pas de guillemet fermant trouvé, on ignore
        return { term: null, nextIndex: i + 1 };
      }
    }

    // Bloc entre guillemets simples '...'
    if (char === "'") {
      const closingIndex = searchTermFilter.indexOf("'", i + 1);
      if (closingIndex !== -1) {
        const content = searchTermFilter.substring(i + 1, closingIndex);
        return {
          term: { type: 'quoted', value: content },
          nextIndex: closingIndex + 1
        };
      } else {
        // Pas de guillemet fermant trouvé, on ignore
        return { term: null, nextIndex: i + 1 };
      }
    }

    // Mot normal (sans délimiteur spécial)
    let word = '';
    while (i < searchTermFilter.length &&
           searchTermFilter[i] !== ' ' &&
           searchTermFilter[i] !== '+' &&
           searchTermFilter[i] !== '[' &&
           searchTermFilter[i] !== '"' &&
           searchTermFilter[i] !== "'") {
      word += searchTermFilter[i];
      i++;
    }

    if (word.length > 0) {
      return {
        term: { type: 'normal', value: word },
        nextIndex: i
      };
    }

    return null;
  }

  // ============================================
  // FONCTION DE CORRESPONDANCE DES TERMES
  // ============================================
  function matchTerm(term, text) {
    if (term.type === 'bracket') {
      // Pour les crochets : chercher la chaîne qui commence juste après un [
      // Des caractères supplémentaires peuvent suivre, mais pas précéder
      const bracketBlocks = [];
      let inBracket = false;
      let currentBlock = '';

      for (let i = 0; i < text.length; i++) {
        if (text[i] === '[') {
          if (inBracket && currentBlock) {
            bracketBlocks.push(currentBlock);
          }
          inBracket = true;
          currentBlock = '';
        } else if (text[i] === ']' && inBracket) {
          if (currentBlock) {
            bracketBlocks.push(currentBlock);
          }
          inBracket = false;
          currentBlock = '';
        } else if (inBracket) {
          currentBlock += text[i];
        }
      }

      const searchValue = term.value.toLowerCase();
      // Vérifier que le bloc COMMENCE par le motif recherché
      return bracketBlocks.some(function(block) {
        return block.toLowerCase().startsWith(searchValue);
      });
    }
    else if (term.type === 'quoted') {
      // Pour les guillemets : chercher la chaîne exacte (insensible à la casse)
      return text.toLowerCase().includes(term.value.toLowerCase());
    }
    else {
      // Pour les mots normaux : chercher en mode insensible à la casse
      return text.toLowerCase().includes(term.value.toLowerCase());
    }
  }

  // !!!============================================
  // FONCTION DE RÉCUPÉRATION DES ATTRIBUTS
  // ============================================
  function getUniqueAttributes() {
    const attributeSpans = document.querySelectorAll(
      ".sb-list.sb-frontmatter.sb-atom",
    );
    const attributeSet = new Set();

    attributeSpans.forEach(function (span) {
      const attributeName = span.textContent.trim();
      // Retirer les ":" s'ils sont présents
      const cleanName = attributeName.replace(/:$/, "");
      if (cleanName) {
        attributeSet.add(cleanName);
      }
    });

    // Convertir en tableau et trier alphabétiquement
    return Array.from(attributeSet).sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  }

  // !!!============================================
  // FONCTION DE MENU CONTEXTUEL - VERSION DEUX MENUS
  // ============================================

  function createAttributeMenu() {
    // Supprimer le menu existant s'il y en a un
    const existingMenu = document.getElementById("attributeDropdownMenu");
    if (existingMenu) {
      existingMenu.remove();
    }

    const menu = document.createElement("div");
    menu.id = "attributeDropdownMenu";
    menu.style.cssText = `
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      max-height: 390px;
      overflow-y: auto;
      z-index: 10000;
      display: none;
      min-width: 200px;
      max-width: 200px;
    `;

    document.body.appendChild(menu);
    return menu;
  }

  function createSubMenu() {
    const existingSubMenu = document.getElementById("attributeSubMenu");
    if (existingSubMenu) {
      existingSubMenu.remove();
    }

    const subMenu = document.createElement("div");
    subMenu.id = "attributeSubMenu";
    subMenu.style.cssText = `
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      max-height: 300px;
      overflow-y: auto;
      z-index: 10001;
      display: none;
      min-width: 200px;
    `;

    document.body.appendChild(subMenu);
    return subMenu;
  }

  function hideSubMenu() {
    const subMenu = document.getElementById("attributeSubMenu");
    if (subMenu) {
      subMenu.style.display = "none";
    }
  }

  function hideAttributeMenu() {
    const menu = document.getElementById("attributeDropdownMenu");
    if (menu) {
      menu.style.display = "none";
    }
    hideSubMenu();
  }

  function showSubMenu(parentItem, items, type, searchInput) {
    const subMenu =
      document.getElementById("attributeSubMenu") || createSubMenu();

    // Vider le sous-menu
    subMenu.innerHTML = "";

    items.forEach(function (item) {
      const itemDiv = document.createElement("div");
      itemDiv.textContent = item;
      itemDiv.style.cssText = `
        padding: 6px 12px;
        cursor: pointer;
        transition: background-color 0.2s;
        white-space: nowrap;
      `;

      itemDiv.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "#f0f0f0";
      });

      itemDiv.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "";
      });

      itemDiv.addEventListener("click", function (e) {
        e.stopPropagation();

        const currentValue = searchInput.value;

        if (type === "property") {
          // Pour les propriétés, ajouter le préfixe "_."
          let prefix = "";
          if (currentValue) {
            prefix = " and _.";
          } else {
            prefix = "_.";
          }
          searchInput.value = currentValue + prefix + item + "==' '";
        } else if (type === "example") {
          // Pour les exemples, coller moins les 5 premiers caractères
          searchInput.value = currentValue + item.substring(5);
        } else if (type === "history") {
          // Pour l'historique, coller moins les 5 premiers caractères
          searchInput.value = currentValue + item.substring(5);
        } else if (type === "attribute") {
          // Pour les attributs
          let prefix = "";
          if (searchMode === "list") {
            prefix = currentValue && !currentValue.endsWith(" ") ? " [" : "[";
            searchInput.value = currentValue + prefix + item + ": ]";
          } else {
            // Mode where
            if (currentValue) {
              prefix = " and _.";
            } else {
              prefix = "_.";
            }
            searchInput.value = currentValue + prefix + item + "==' '";
          }
          sessionStorage.setItem("searchTermFilter", searchInput.value);
          if (searchMode === "list") {
            applySearchFilter(searchInput.value);
          }
        }

        // Garder le menu ouvert et replacer le focus
        searchInput.focus();

        // Fermer uniquement le sous-menu
        hideSubMenu();
      });

      subMenu.appendChild(itemDiv);
    });

    // Positionner le sous-menu à droite de l'item parent
    const rect = parentItem.getBoundingClientRect();
    subMenu.style.left = rect.right + 5 + "px";
    subMenu.style.top = rect.top + "px";
    subMenu.style.display = "block";
  }

  // !!!============================================
  // MENU MODE LISTE
  // ============================================

  function showListeModeMenu(searchInput) {
    const menu =
      document.getElementById("attributeDropdownMenu") || createAttributeMenu();
    const attributes = getUniqueAttributes();

    // Vider le menu
    menu.innerHTML = "";

    // Titre du mode (optionnel)
    const modeTitle = document.createElement("div");
    modeTitle.textContent = "Filter mode";
    modeTitle.style.cssText = `
      padding: 8px 12px;
      font-weight: bold;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
      color: #333;
    `;
    menu.appendChild(modeTitle);

    // Item Attributs avec sous-menu
    const attributesItem = document.createElement("div");
    attributesItem.textContent = "Attributs >";
    attributesItem.style.cssText = `
      padding: 6px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: blue;
    `;

    attributesItem.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f0f0f0";
      if (attributes.length === 0) {
        showSubMenu(this, ["Aucun attribut trouvé"], "none", searchInput);
      } else {
        showSubMenu(this, attributes, "attribute", searchInput);
      }
    });

    attributesItem.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    menu.appendChild(attributesItem);

    // Positionner le menu sous le champ de recherche
    const rect = searchInput.getBoundingClientRect();
    menu.style.left = rect.left + "px";
    menu.style.top = rect.bottom + 2 + "px";
    menu.style.width = rect.width / 2 + "px";
    menu.style.display = "block";
  }

  // !!!============================================
  // MENU MODE WHERE
  // ============================================

  function showWhereModeMenu(searchInput) {
    const menu =
      document.getElementById("attributeDropdownMenu") || createAttributeMenu();
    const attributes = getUniqueAttributes();

    // Vider le menu
    menu.innerHTML = "";

    // Titre du mode (optionnel)
    const modeTitle = document.createElement("div");
    modeTitle.textContent = "Query mode";
    modeTitle.style.cssText = `
      padding: 8px 12px;
      font-weight: bold;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
      color: #333;
    `;
    menu.appendChild(modeTitle);

    // Item Attributs
    const attributesItem = document.createElement("div");
    attributesItem.textContent = "Attributs >";
    attributesItem.style.cssText = `
      padding: 6px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: blue;
    `;

    attributesItem.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f0f0f0";
      if (attributes.length === 0) {
        showSubMenu(this, ["Aucun attribut trouvé"], "none", searchInput);
      } else {
        showSubMenu(this, attributes, "attribute", searchInput);
      }
    });

    attributesItem.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    menu.appendChild(attributesItem);

    // Item Propriétés
    const propItem = document.createElement("div");
    propItem.textContent = "Propriétés >";
    propItem.style.cssText = `
      padding: 6px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: blue;
    `;

    propItem.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f0f0f0";
      showSubMenu(this, properties, "property", searchInput);
    });

    propItem.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    menu.appendChild(propItem);

    // Item Exemples
    const exampleItem = document.createElement("div");
    exampleItem.textContent = "Exemples >";
    exampleItem.style.cssText = `
      padding: 6px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: blue;
    `;

    exampleItem.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f0f0f0";
      showSubMenu(this, examples, "example", searchInput);
    });

    exampleItem.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    menu.appendChild(exampleItem);

    // Item History
    const historyItem = document.createElement("div");
    historyItem.textContent = "History >";
    historyItem.style.cssText = `
      padding: 6px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: blue;
    `;

    historyItem.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f0f0f0";
      showSubMenu(this, history, "history", searchInput);
    });

    historyItem.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    menu.appendChild(historyItem);

    // Positionner le menu sous le champ de recherche
    const rect = searchInput.getBoundingClientRect();
    menu.style.left = rect.left + "px";
    menu.style.top = rect.bottom + 2 + "px";
    menu.style.width = rect.width / 2 + "px";
    menu.style.display = "block";
  }

  // !!!============================================
  // FONCTION GÉNÉRIQUE POUR AFFICHER LE BON MENU
  // ============================================

  function showMenuForCurrentMode(searchInput) {
    if (searchMode === "list") {
      showListeModeMenu(searchInput);
    } else if (searchMode === "where") {
      showWhereModeMenu(searchInput);
    }
  }

  // !!!============================================
  // FONCTION APPELÉE PAR LE BOUTON D'OPTION
  // ============================================

  /**
   * Cette fonction est appelée depuis l'interface HTML
   * lorsque l'utilisateur change de mode
   *
   * @param {string} mode - "list" ou "where"
   * @param {HTMLElement} searchInput - l'élément input de recherche
   */

  window.switchSearchMode = function(mode, searchInput) {
    searchMode = mode;
    // Visuel
    const inputSearchZone = document.querySelector('#tileSearch');
    document.querySelectorAll('.mode-switcher div').forEach(el => el.classList.remove('active'));
    if (mode === "list") {
      searchInput.value = "";
      sessionStorage.setItem("searchMode", "list");
      const btn = document.querySelector('#listMode');
      btn.classList.add('active');
      btn.title = "Filter mode : ";
      inputSearchZone.placeholder = "\u00A0\u00A0\u00A0\u00A0...\u00A0\u00A0 real-time filter (Esc to exit)";
      searchInput.style.backgroundColor = "white";
      applySearchFilter("");
    } else if (mode === "where") {
      searchInput.value = "";
      sessionStorage.setItem("searchMode", "where");
      const btn = document.querySelector('#whereMode');
      btn.classList.add('active');
      btn.title = "Where : " + sessionStorage.getItem("searchTerm");
      inputSearchZone.placeholder = "\u00A0\u00A0\u00A0\u00A0...\u00A0\u00A0 clause where (query with Enter or Esc to exit)";
      searchInput.style.backgroundColor = "#F2F7FF";
    }

    // Donner le focus au champ de recherche
    searchInput.focus();
    // Afficher le menu correspondant
    showMenuForCurrentMode(searchInput);
  }

  // !!!============================================
  // GESTION DES ÉVÉNEMENTS
  // ============================================

  function initializeSearchMenu(searchInput) {

    // Afficher le menu lors du focus
    searchInput.addEventListener('focus', function(e) {
      setTimeout(function() {
        showMenuForCurrentMode(searchInput);
      }, 50);
    });

    // Gérer la perte de focus
    searchInput.addEventListener('blur', function(e) {
      const menu = document.getElementById("attributeDropdownMenu");
      const subMenu = document.getElementById("attributeSubMenu");
      const relatedTarget = e.relatedTarget;
      if (relatedTarget &&
          ((menu && menu.contains(relatedTarget)) ||
           (subMenu && subMenu.contains(relatedTarget)))) {
        return;
      }
      setTimeout(function() {
        hideAttributeMenu();
      }, 200);
    });

    // Empêcher la fermeture lors des clics sur le menu
    document.addEventListener('mousedown', function(e) {
      const menu = document.getElementById("attributeDropdownMenu");
      const subMenu = document.getElementById("attributeSubMenu");
      if (menu && menu.contains(e.target)) {
        e.preventDefault();
        searchInput.focus();
      }
      if (subMenu && subMenu.contains(e.target)) {
        e.preventDefault();
      }
    });

    // Afficher le menu au clic droit
    searchInput.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      setTimeout(function() {
        showMenuForCurrentMode(searchInput);
      }, 50);
    });

    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', function(e) {
      const menu = document.getElementById("attributeDropdownMenu");
      const subMenu = document.getElementById("attributeSubMenu");
      if (menu && !menu.contains(e.target) &&
          subMenu && !subMenu.contains(e.target) &&
          e.target !== searchInput) {
        hideAttributeMenu();
      }
    });

    // Écouter les changements
    searchInput.addEventListener("input", function () {
      // Appliquer le filtre seulement en mode liste
      if (searchMode === "list") {
        applySearchFilter(this.value);
        sessionStorage.setItem("searchTermFilter", this.value);
        const btn = document.querySelector('#listMode');
        btn.title = "Filter : " + this.value
      } else {
        sessionStorage.setItem("searchFilter", this.value);
      }
    });

    // Gestion des touches clavier
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        hideAttributeMenu();
        if (searchMode === "where") {
          const newWhere = this.value;
          sessionStorage.setItem("searchTerm", this.value);
          sessionStorage.setItem("searchMode", "where");
          // reset filter
          this.value = ""
          sessionStorage.setItem("searchTermFilter", "");
          const btn = document.querySelector('#listMode');
          btn.title = "Filter mode : ";
          // execute query
          syscall("editor.invokeCommand", "TaskExplorer: ExecuteQuery", [
            "maj",
            newWhere,
          ]);
        } else if (searchMode === "list") {
          // En mode liste, Entrée applique simplement le filtre
          sessionStorage.setItem("searchTermFilter", this.value);
          const btn = document.querySelector('#listMode');
          btn.title = "Filter mode : " + this.value;
          applySearchFilter(this.value);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        const menu = document.getElementById("attributeDropdownMenu");
        if (menu && menu.style.display !== "none") {
          hideAttributeMenu();
        } else {
          searchInput.blur();
        }
      }
    });

    // Gestion du Coller
    searchInput.addEventListener("paste", function () {
      // Appliquer le filtre seulement en mode liste
      if (searchMode === "list") {
        applySearchFilter(this.value);
        sessionStorage.setItem("searchTermFilter", this.value);
        const btn = document.querySelector('#listMode');
        btn.title = "Filter : " + this.value
      } else {
        sessionStorage.setItem("searchFilter", this.value);
      }
    });

    // Evènements supplémentaires pour détecter les changements programmatiques
    searchInput.addEventListener("change", function () {
      // Appliquer le filtre seulement en mode liste
      if (searchMode === "list") {
        applySearchFilter(this.value);
        sessionStorage.setItem("searchTermFilter", this.value);
        const btn = document.querySelector('#listMode');
        btn.title = "Filter : " + this.value
      } else {
        sessionStorage.setItem("searchFilter", this.value);
      }
    });
  }

  // !!!============================================
  // INITIALISATION
  // ============================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      restoreScrollPosition();
    });
  } else {
    setTimeout(function () {
      restoreScrollPosition();
    }, 50);
  }
  // Variable globale
  const searchInput = document.getElementById("tileSearch");
  if (!searchInput) return;

  // Installation des menus et des évènements
  initializeSearchMenu(searchInput);

  // Réglage visuel de la zone de recherche
  const inputSearch = document.querySelector('#tileSearch');
  document.querySelectorAll('.mode-switcher div').forEach(el => el.classList.remove('active'));
  searchModeEnCours = sessionStorage.getItem("searchMode");
    if (searchModeEnCours === "list") {
      const btn = document.querySelector('#listMode');
      btn.classList.add('active');
      inputSearch.placeholder = "\u00A0\u00A0\u00A0\u00A0...\u00A0\u00A0 real-time filter (Esc to exit)";
      searchInput.style.backgroundColor = "white";
    } else if (searchModeEnCours === "where") {
      const btn = document.querySelector('#whereMode');
      btn.classList.add('active');
      inputSearch.placeholder = "\u00A0\u00A0\u00A0\u00A0...\u00A0\u00A0 clause where (query with Enter or Esc to exit)";
      searchInput.style.backgroundColor = "#F2F7FF";
    }
})();

  // 2) ---------------- Opening task with UnifiedAdvancedPanelControl ----------------
   window.openWithUnifiedPanel = async function(internalPath) {
          try {
              // Set the suppression flag so the new window doesn't spawn an explorer2
              await syscall('clientStore.set', 'explorer2.suppressOnce', 'true');

              // Extract the file name with the @position suffix
              const fileName = internalPath.split('/').pop();
              //.replace(/@\d+$/, '');

              // Build the Lua command to show the unified panel
              const luaCmd = `js.import("/.fs/Library/Mr-xRed/UnifiedAdvancedPanelControl.js").show("${internalPath}", "${fileName}")`;

              // Execute the Lua command
              await syscall('lua.evalExpression', luaCmd);
          } catch (error) {
              console.error('Error opening with unified panel:', error);
              // Fallback to standard navigation if something goes wrong
              await syscall('editor.navigate', internalPath, false, false);
          }
      };

// 3) ---------------- Load Styles Once ----------------
    function ensureElement(id, tag, attributes, content) {
        if (document.getElementById(id)) return document.getElementById(id);
        const el = document.createElement(tag);
        el.id = id;
        for (let key in attributes) el.setAttribute(key, attributes[key]);
        if (content) el.innerHTML = content;
        document.head.appendChild(el);
        return el;
    }

ensureElement("silverbullet-main-css", "link", { rel: "stylesheet", href: "/.client/main.css"});
ensureElement("explorer-style-css", "link", { rel: "stylesheet", href: "/.fs/Library/Mr-xRed/docex_styles.css" });

    if (!document.getElementById("explorer-custom-styles-once")) {
        const parentStyles = parent.document.getElementById("custom-styles")?.innerHTML || "";
        const cleanStyles = parentStyles.replace(/<\/?style>/g, "");
        const styleEl = document.createElement("style");
        styleEl.id = "explorer-custom-styles-once";
        styleEl.innerHTML = cleanStyles;
        document.head.appendChild(styleEl);
    }

})();
]]
    -- ----------------- DISPLAY -----------------
    editor.showPanel(PANEL_ID, currentWidth, finalHtml, script)
    PANEL_VISIBLE = true
    clientStore.set("explorer2.open", "true")
end

-- ----------------- COMMANDS ------------------

command.define {
    name = "TaskExplorer: Change View Mode",
    hide = true,
    run = function(args)
        if args.mode ~= "grid" then
            clientStore.set(VIEW2_MODE_KEY, args.mode)
            local clauseWhereInSession = ""
            clauseWhereInSession = js.window.sessionStorage.getItem("searchTerm")
            drawPanel("maj", clauseWhereInSession)
        else
            editor.flashNotification("mode inconnu !")
        end
    end
}

command.define {
    name = "TaskExplorer: Toggle Opening Mode",
    hide = true,
    run = function()
        local current = clientStore.get("explorer2.disableFilter")
        if current == "true" then
            clientStore.set("explorer2.disableFilter", "false")
        else
            clientStore.set("explorer2.disableFilter", "true")
        end
        drawPanel("maj")
    end
}

command.define {
    name = "Navigate: Task Explorer",
    hide = true,
    run = function()
        if PANEL_VISIBLE then
            editor.hidePanel(PANEL_ID)
            PANEL_VISIBLE = false
            clientStore.set("explorer2.open", "false")
        else
            --Réinitialisation
            js.window.sessionStorage.setItem("searchMode", "list")
            js.window.sessionStorage.setItem("searchInit", "true")
            js.window.sessionStorage.setItem("searchTermInit", WHERE_INIT)
            js.window.sessionStorage.setItem("searchTerm", WHERE_INIT)
            js.window.sessionStorage.setItem("searchTermFilter", "")
            -- Exécution
            drawPanel()
        end
    end
}

command.define {
    name = "Navigate: Toggle Task Explorer",
    key = "Ctrl-Alt-v",
    run = function()
        if PANEL_VISIBLE then
            editor.hidePanel(PANEL_ID)
            PANEL_VISIBLE = false
        else
            local lastMode = clientStore.get("explorer2.currentDisplayMode") or "panel"
            if lastMode == "window" then
                editor.invokeCommand("Navigate: Task Explorer Window")
            else
                editor.invokeCommand("Navigate: Task Explorer")
            end
        end
    end
}

command.define {
    name = "Navigate: Task Explorer Window",
    hide = true,
    run = function()
        local selector = "#sb-main .sb-panel." .. PANEL_ID
        if not PANEL_VISIBLE then
            --Réinitialisation
            js.window.sessionStorage.setItem("searchMode", "list")
            js.window.sessionStorage.setItem("searchInit", "true")
            js.window.sessionStorage.setItem("searchTermInit", WHERE_INIT)
            js.window.sessionStorage.setItem("searchTerm", WHERE_INIT)
            js.window.sessionStorage.setItem("searchTermFilter", "")
            -- Exécution
            drawPanel()
        end
        clientStore.set("explorer2.open", "true")
        js.import("/.fs/Library/Mr-xRed/UnifiedAdvancedPanelControl.js").enableWindow(selector)
    end
}

command.define {
    name = "Open: Instructions",
    hide = false,
    run = function()
        js.import("/.fs/Library/Mr-xRed/UnifiedAdvancedPanelControl.js").show(
            "Library/baudogit/Instructions_for_Task_Explorer")
    end
}

command.define {
    name = "Task: Toggle_Done",
    hide = true,
    run = function(args)
        local param1 = args[1]
        local param2 = args[2]
        local param3 = args[3]
        local param4 = args[4]
        toggleTaskRemote(param1, param2, param3, param4)
    end
}

command.define {
    name = "TaskExplorer: ExecuteQuery",
    hide = true,
    run = function(args)
        local param1 = args[1]
        local param2 = args[2]
        drawPanel(param1, param2)
    end
}


```


```space-lua
-- ::: space-lua 2 :::

-- ---------- BUILD QUERY ---------

function queryWithParam (clauseWhere)

  -- LIMIT clause (example):
  -- local limitCount = 5  
  -- local queryTxt = {  
  --  where = lua.parseExpression("_.done == true"),
  --  limit = limitCount
  --}  

  -- WHERE clause blocks (examples):
  -- | "_.done == true" 
  -- | "_.done == false" 
  -- | "_.done == not true or _.done == true"
  -- | "_.name== 'TODO'"
  -- | "not _.name:find('TODO')"
  -- | "_.name:startsWith('TODO')" 
  -- | "_.name.match('^TECH')" 
  -- | "_.attrib2 == '2025-12-27'" 
  -- | "(_.page.match('^DOCS') or _.page.match('^Library'))" 
  -- | "_.text.endsWith(']')"
  -- | "some(_.state) ~= nil"
  -- | "not some(_.completed)"
  -- | "some(_.completed) ~= nil and string.sub(_.completed,1,10) == os.date('%Y-%m-%d')"
  -- | "some(_.completed) ~= nil and getDayWeek(string.sub(_.completed,1,10)) == 'Tuesday'"
  -- | "some(_.attrib1) and string.sub(_.attrib1,1,10) <= '2026-01-01'"
  -- | "table.includes(_.itags, 'test')""
  -- | "type(_.itags[2]) == \'nil\'"
  -- | "rawget(_.itags, 2) ~= nil"
  -- | "select(\"#\", table.unpack(_.itags)) > 1"
  -- | "(function() local c=0 for _ in pairs(_.itags) do c=c+1 end return c end)() == 1"
  -- | "rawget(_.itags, 2) == nil and rawget(_.itags, 1) ~= nil"
  -- | "(toPos - pos) > 100"

  -- To VARY a VALUE in the WHERE clause (example)
  -- local queryTxt = { where = lua.parseExpression("_.done == optionValue") }
  -- local results = index.queryLuaObjects(tagName, queryTxt, { optionValue = true } )
  
  -- !! Does not work: os.time inutilisable !!
  --clauseWhere = some(_.completed) ~= nil and string.sub(_.completed,1,10) >= (os.date('%Y-%m-%d', os.time() - (5 * 24 * 60 * 60)))
    --clauseWhere = some(_.completed) ~= nil and (string.sub(_.completed,1,10) >= os.date('%Y-%m-%d',  os.time({ year = 2025, month = 12, day = 21 })))

  -- To test: modify and uncomment below. This squizzle the mode where.
  -- clauseWhere = "_.done == not true or _.done == true"

  -- Check the validity of the where clause
  local statusWhere, validWhere = pcall(function() 
        return lua.parseExpression(clauseWhere) 
  end)
  if not statusWhere then
    editor.flashNotification("Invalid where clause !")  
    return {}  
  end

  local tagName = "task"  
  local queryTxt = {  
    where = validWhere,
    orderBy = {
        {
          expr = lua.parseExpression("page"),
          desc = false
          },
        {
          expr = lua.parseExpression("pos"),
          desc = false
          }
      }
  }  
  --local results = index.queryLuaObjects(tagName, queryTxt)  
  local status, results = pcall(function() 
        return index.queryLuaObjects(tagName, queryTxt)  
  end)
  if status then  
    return js.tolua(results)  
  else   
    editor.flashNotification("The query returns an error !")  
    return {}  
  end
end

-- ---------- BUILD HTML ---------

function tasksByPage(allTasks, viewMode, clauseWhere)
  local queryTasks = {}
  
  -- Wait for asynchronous indexing to complete
  mq.awaitEmptyQueue("indexQueue")
  
  -- Extracting tasks
  if allTasks then  
    -- BASE: queryTasks = query[[from index.tag 'task' order by page, pos]]
    queryTasks = queryWithParam(clauseWhere)
  else
    if clauseWhere == "" or clauseWhere == nil then
      clauseWhere = " _.done == not true"
    else
      clauseWhere = clauseWhere .. " and _.done == not true"
    end
    -- BASE: queryTasks = query[[from index.tag 'task' where not done order by page, pos]]
    queryTasks = queryWithParam(clauseWhere)
  end

   -- Break down tasks by page
  local pageTasks = {}
  local countTasks = 0
  for task in queryTasks do
    if not pageTasks[task.page] then
      pageTasks[task.page] = {}
    end
    table.insert(pageTasks[task.page], task)
    countTasks = countTasks + 1
  end

  -- Build html with templates
  local html = ""
  if viewMode == "list" then
    for pageName, tasks in pairs(pageTasks) do
      html = html .. pageTasksTemplate({
        tasks = tasks
      })
    end
  else    
    for pageName, tasks in pairs(pageTasks) do
      html = html .. pageTasksPerPageTemplate({
        pageName = pageName,
        tasks = tasks
      })
    end
  end

  return {html, countTasks}
end

-- ---------- TEMPLATES ---------

-- Template with page name and task
local lib = " task "
-- (#tasks > 1 and " tasks " or " task ") 
local pageTasksPerPageTemplate = template.new[==[
${formatPage(pageName .. "<br><small>" .. #tasks .. " ".. "extracted</small>")}
${template.each(tasks, templates.taskItem3)}
]==]

-- Template with task only
local pageTasksTemplate = template.new[==[
${template.each(tasks, templates.taskItem3)}
]==]

-- Template for a task (format)
templates.taskItem3 = template.new([==[ ${ formatTask(ref .. "###" .. tostring(done) .. "###" .. state .. "###" .. tostring(itags) .. "###" .. text)} ]==])

```


```space-lua
-- ::: space-lua 3 :::

-- ---------- FORMAT PAGE ---------

function formatPage(pageString)

  -- Div with a specific class for the page name
  local ps = '<div class= "sb-TaskExplorer-div-page">'
    ps = ps .. '<span class= "sb-TaskExplorer-span-page">' .. pageString .. '</span>'
    ps = ps .. '</div >'
  return ps
end

-- ---------- FORMAT TASK ---------

function formatTask(taskString)
    if not taskString or taskString == "" then
        return ""
    end
  
  local ICONS = {
    square    = '<svg class="icon-svg" style="width: 1em; height: 1em; vertical-align: middle;"><use href="/.fs/Library/baudogit/lucide-icons.svg#icon-square"></use></svg>',
    squarecheck = '<svg class="icon-svg" style="width: 1em; height: 1em; vertical-align: middle;"><use href="/.fs/Library/baudogit/lucide-icons.svg#icon-square-check"></use></svg>'
  }
  
    local reference = ""
    local done = "false"
    local doneReal = ""
    local status = ""
    local stateExist = ""
    local itags = ""
    local tempString = taskString
    local tempStringInit = taskString
    local sepPos = taskString:find("###", 1, true)
    local positionStart = ""
    local namePage = ""
    local listArgs = {}
    local nameIcon = ""

    -- ---------- Analyse STRING ---------
  
    if sepPos then
        reference = taskString:sub(1, sepPos - 1)
        local remaining = taskString:sub(sepPos + 3)

        -- Find the second separator ###
        local sepPos2 = remaining:find("###", 1, true)
        if sepPos2 then
            done = remaining:sub(1, sepPos2 - 1)
            local remaining2 = remaining:sub(sepPos2 + 3)
            
            -- Find the third separator ###
            local sepPos3 = remaining2:find("###", 1, true)
            if sepPos3 then
                status = remaining2:sub(1, sepPos3 - 1)
                local remaining3 = remaining2:sub(sepPos3 + 3)
                
                -- Find the fourth separator ###
                local sepPos4 = remaining3:find("###", 1, true)
                if sepPos4 then
                    itags = remaining3:sub(1, sepPos4 - 1)
                    tempString = remaining3:sub(sepPos4 + 3)
                else
                    tempString = remaining3
                end
            else
                tempString = remaining2
            end
        else
            tempString = remaining
        end
    else
        reference = taskString:match("^([^%s]+)") or ""
        tempString = taskString:gsub("^[^%s]+%s+", "")
    end
    tempStringInit = tempString .. "\nITAGS: " .. itags

    -- Extracting the name to display (after the last /)
    local displayName = reference
    if reference:find("/", 1, true) then
        displayName = reference:match("([^/]+@%d+)") or reference
    end

    -- Extracting the label (everything not in brackets)
    local label = ""
    -- Extract all parts outside the brackets
    local parts = {}
    local j = 1
    local currentPart = ""
    local inBracket = false
    
    while j <= #tempString do
        local char = tempString:sub(j, j)

        if char == "[" and not inBracket then
            -- Start of an attribute
            if currentPart ~= "" then
                -- Normalize multiple spaces into one
                local normalized = currentPart:gsub("%s+", " ")
                normalized = normalized:match("^%s*(.-)%s*$") or normalized
                if normalized ~= "" then
                    table.insert(parts, normalized)
                end
                currentPart = ""
            end
            inBracket = true
        elseif char == "]" and inBracket then
            -- End of an attribute
            inBracket = false
        elseif not inBracket then
            -- Add character to label
            currentPart = currentPart .. char
        end
        j = j + 1
    end
    -- Add the last part if it exists
    if currentPart ~= "" then
        local normalized = currentPart:gsub("%s+", " ")
        normalized = normalized:match("^%s*(.-)%s*$") or normalized
        if normalized ~= "" then
            table.insert(parts, normalized)
        end
    end
    -- Join parts with " | "
    if #parts > 0 then
        label = table.concat(parts, " | ")
    end
    -- Add "status" if custom
    if status ~= " " and status ~= "x" and status ~= "X" then  
      label = "[" .. status .. "] ".. label
      stateExist = status
    end

    -- Function to escape HTML special characters
    local function escapeHtml(text)
        local replacements = {
            ["&"] = "&amp;",
            ["<"] = "&lt;",
            [">"] = "&gt;",
            ['"'] = "&quot;",
            ["'"] = "&#39;",
            ["/"] = "&#47;"
        }
        return (text:gsub("[&<>\"'/]", replacements))
    end

    label = escapeHtml(label)

    -- Extracting attributes [key:value]
    local attributes = {}
    local i = 1

    while i <= #taskString do
        local startBracket = taskString:find("%[", i)
        if not startBracket then
            break
        end

        local endBracket = taskString:find("%]", startBracket)
        if not endBracket then
            -- Hook not closed, we ignore the rest
            break
        end
        local attr = taskString:sub(startBracket + 1, endBracket - 1)
        local key, value = attr:match("^%s*([^:]+):%s*(.*)%s*$")

        if key and value then
            -- Clean spaces
            local cleanKey = key:match("^%s*(.-)%s*$")
            local cleanValue = value:match("^%s*(.-)%s*$")
            key = cleanKey or key
            value = cleanValue or value
            table.insert(attributes, { key = key, value = value })
        end

        i = endBracket + 1
    end

    -- ----------- Building HTML -------------

    -- Enclosing DIV
    local divClass = 'sb-TaskExplorer-div-task'
    if done == "true" then
        divClass = divClass .. ' cm-task-checked'
    end
  
    -- Construct the unique task ID
    local taskId = ""
    if reference:find("@", 1, true) then
        -- Extract namePage and position from reference
        local pageNameFromRef = reference:match("(.-)@")
        local posFromRef = reference:match("@(%d+)")
        if pageNameFromRef and posFromRef then
            local adjustedPos = tostring(tonumber(posFromRef))
            taskId = pageNameFromRef .. '@' .. adjustedPos
        end
    end

    -- Add data-task-id to div
    local html = '<div class="' .. divClass .. '" data-task-id="' .. taskId .. '">'

    -- Enclosing SPAN
    html = html .. '<span class="sb-TaskExplorer-span-task sb-list sb-task">'
  
    -- If the reference contains an @, provides
    -- full path (with position+ 2), position+2 and page name
    local nextRef = reference
    if reference:find("@", 1, true) then
        nextRef = reference:gsub("@(%d+)", function(num)
            return "@" .. tostring(tonumber(num) + 2)
        end)
        positionStart = reference:match("@(%d+)")
        positionStart = tostring(tonumber(positionStart) + 2)
      namePage = reference:match("(.-)@")
    end
  
    -- Toggle status task (clic on icon)
    if done == "true" then
      nameIcon = ICONS.squarecheck
      doneReal = "X"
    else
      nameIcon = ICONS.square
      doneReal = " "
    end  
    -- html (onclick) > js (script) > syscall (invokeCommand) > space-lua (function)
    html = html .. '<span style="cursor: pointer;" onclick="toggleTask(\'' ..   
    string.gsub(namePage or "", "'", "\\'") .. '\',' ..   
    (positionStart or "0") .. ',\'' ..   
    string.gsub(doneReal or "", "'", "\\'") .. '\',\'' ..  
    string.gsub(stateExist or "", "'", "\\'") .. '\')">'
    html = html .. nameIcon .. '</span> '

    -- Enclosing DIV  
    -- Link to open the task page 
    if reference:find("@", 1, true) then
      local optionView = clientStore.get("explorer2.disableFilter")
      html = html .. '<div id="divTaskchild" title="' .. escapeHtml(tempStringInit) .. '" onclick='
      if optionView == "true" then
        -- Open in iframe
        html = html .. '"openWithUnifiedPanel(\'' .. reference .. '\')" >' .. label .. '<br />'
      else
        -- Open in editor windows
        html = html .. '"syscall(\'editor.navigate\', \'' .. nextRef .. '\', false, false)" >' .. label .. '<br /> ' 
      end
    else
        -- No link
        html = html .. escapeHtml(displayName) .. ' ' .. '<br /> '
    end

    -- Attributes
    for _, attr in ipairs(attributes) do
        html = html .. '<span class="sb-list sb-task"> </span>'
        html = html .. '<span class="sb-attribute" data-' .. attr.key .. '="' .. escapeHtml(attr.value) .. '">'
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">[</span>'
        html = html .. '<span class="sb-list sb-frontmatter sb-atom">' .. escapeHtml(attr.key) .. '</span>'
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">: </span>'
        html = html .. '<span class="sb-list sb-frontmatter">' .. escapeHtml(attr.value) .. '</span>'
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">]</span>'
        html = html .. '</span>'
    end

    html = html .. "</div></div>"

    return html
end

```
