---
name: "Library/baudogit/TaskExplorer"
tags: meta/library
files:
- TaskExplorer.md
- Instructions_for_Task_Explorer.md
- ConfigStyles_for_TaskExplorer.md
- taskex_styles.css
- lucide-icons.svg
- where-examples.txt
- where-history.txt
pageDecoration.prefix: "📋 "
share.uri: "github:Baudogit/silverbullet/tree/main/TaskExplorer"
maj: 2026-02-10 08-00
---

# 📋Task Explorer

Task Explorer **display your task list** with your css rules.
The content of task is fully visualized **in styled mode** and **in raw mode**.
You can **extract** a list with custom queries and **filter** it according to many criteria.

The status of a task can be directly **modified** in the list or after **navigating** to its original page. 
You can **update the attributes** of the tasks in the list with **batch processing** (add, delete and rename).

![TE|400px](https://raw.githubusercontent.com/Baudogit/silverbullet/refs/heads/main/screenshots/TE.png)
Input actions:
![actions|500px](https://raw.githubusercontent.com/Baudogit/silverbullet/refs/heads/main/screenshots/actions.png)
Run `System: Reload` command then **open Task Explorer** with ${widgets.button("Toggle Task Explorer", function() editor.invokeCommand("Navigate: Toggle Task Explorer", tasksByPage()) end)} Ctrl+Alt+v or
the icon “list” button added to your SilverBullet toolbar by this space-lua:

````space-lua
-- If you don't want the button in your toolbar, rename this space-lua in lua
actionButton.define {
  icon = "list",
  description = "Task Explorer",
  priority = 1,
  run = function()
    editor.invokeCommand("Navigate: Toggle Task Explorer")
  end
}
````


> **warning** Opening Task Explorer
>  It may be necessary to click the button twice. It depends on how the panel was previously closed by another plugin or by Task Explorer. With Task Explorer, **close** the plugin with toggle command, toggle button or with the X of Task Explorer (but not with the X of multi-windowing system).

---

# Features

## List view 

- Each task is displayed on several lines and a tooltip:
    - On the first lines: ==text== of the task, without the attributes. Split text, broken down between attributes, is concatenated with "|" separator.
    - On the following lines, as many as necessary: ==attributes==
    - On a **tooltip**: ==raw text== (without CSS rules), ==reference== and ==itags==
- Each task is formatted according to the **CSS rules** applied in markdown pages.
- Navigate to the **original task page** with a click on a line.
- Open the original page depending on the option selected with a button on the toolbar:
    - in the main editor window
    - or in a separate window, if you have installed multi-windowing system

## Manipulations

- ==Page break== can be added or removed via a button in the toolbar
- ==Completed tasks== can be added or removed via a button in the toolbar
- List can be ==resetted== via a button in the toolbar

> **success** Starting and Resetting
>   You can define a startup query and run it (or not), again, during a reset (cf below “Configuration”)

## Task update

- ==Change the status== of a task directly in the list or, if you prefer, on the original page after navigating.
  
> **warning** Custom statuses
>   They are displayed but cannot be updated via Task Explorer. To do this, you must navigate to the original page and update it manually.

- ==Batch processing== to add, delete or rename an attribute on all the tasks in the list.

> **danger** Danger
>   This feature is experimental. It is recommended to use it on a copy of your document space.

Activating this mode (button Update) and executing order is the same as querying (see below). The syntax is simple: a `verb` (add, delete, replace) + “`:`“ + `name of attribute` (value can be provided when adding) and “`->`“ to replace. Spaces are not meaningful. Please refer to the placeholder of the input.

The list can be extracted with custom where clause and filtered, **before** applying the treatment.
  
## Filter and query
  
To activate these features, click in the input box, then choose the button in the menu.

The input box is used to define:
- in filter mode: the **filter**
- in query mode: the **custom where clause**

Menus provide input **assistance** to complete the input area:
- for both modes: list of ==attributes== collected in the current list
- for query mode only:
    - list of ==standard properties==
    - library of ==where clauses history==
    - library of ==where clauses examples==
When you select one of these items, its formatted content is transferred in the input area.
      
The input area accepts direct keyboard entry, copy-paste operation and paste from the menu.     
To hide the drop-down menus, press **Esc** or click out of the input. To show the menus again **right click** on the input.

> **note** Application
>      Filter mode: immediate application (live)
>      Query mode : press **Enter** to execute the query

Please, refer to ==Instructions_for_Task_Explorer.md== (via a button on the toolbar) for detailled **rules** for filtering and designing custom where clauses.

---

# Environment

## Multi-windowing

These functionalities are developed and diffused [by Mr.Red](https://community.silverbullet.md/t/advanced-panel-controls-e-g-resizing-side-panels-lhs-rhs-bhs-using-your-mouse/3728/33)
via his library `UnifiedAdvancedPanelControl.js`.

The concept uses two types of iframe:
- **resizable floating** panels which extend the functionalities of the three fixed panels incorporated into SilverBullet, designated by their position: left= ==lhs== | right= ==rhs== | bottom= ==bhs==).
- **synthetic** panels, in unlimited numbers, designed on the fly

> **note**  Sessions
>  - Document Explorer and Task Explorer are pieces of html+js+css injected into one of the three panels. They don’t generate a new SilverBullet session.
>  - conversely, when a markdown page is opened in a synthetic panel, a new SilverBullet **session** is created. Each new synthetic panel opened with an md page creates a new session. A synthetic panel is equivalent to a **new tab**. 

> **warning** Limit
>   The bhs panel is only partially supported by Mr.Red's library

**Default panel for Task Explorer** is ==rhs==. You can modify it with `config.set` command, like this :
```lua
-- change lua block to space-lua or copy this line in your config.md
config.set("explorer2", { position = "bhs" })
```

> **note** lhs, rhs, bhs
>  Each panel resizable is unique. If multiple tools use the same panel, the last activated replaces the previous one in the panel. This generally poses no problem but requires double calling to open it with toogle command (via keyboard shortcut or button).

## Styling

> **warning** Dark mode
>      Currently, Task Explorer is not entirely compatible with dark mode

- The **panel style** is managed by `taskex_styles.css`.
   The last section: `11. MAIN UI (Colors)` can be customized in a `space-style` within your space.

A colored gauge is used when Task Explorer execute a query or an update with batch processing:
```space-style
/* You can modifie it here or by copying this line into your config style and then suppr this one */
html[data-theme="light"] {
  --progress-mon-type-color: #00E439;   /* light green */
}
```
  
- The **style of tasks** can be finely customized since SilverBullet’s version 2.40. You can apply rules to one or all attributes and/or to all or certain values.
  
  Several examples are available here:
    - https://community.silverbullet.md/t/decorate-attributes-with-emojis/3823/12
    - https://community.silverbullet.md/t/task-dynamic-styling/3708/14

The edge version published 2026-02-04 modify the spans’s classes of the name and the value of an attribute, i.e. respectively:
- `sb-attribute-name` for the attribute name. This classe replaces `sb-atom`.
- `sb-attribute-value` for the attribute value. Previously, this span had no class.

Certain of the examples above might be adapted if you uses a version past to 2026-02-04. Task Explorer detect the version in execution and adapt the list after edge version of 2026-02-06 (not 04).
  
Styles defined for tasks apply to ==**both** the original task and its copy in Task Explorer==.

---

# Implementation

## Installation

1) First, install **Document Explorer** and/or **AdvancedPanelControl** by Mr.Red with Library Manager via his repository:
      https://github.com/Mr-xRed/silverbullet-libraries/blob/main/Repository/Mr-xRed.md
    `UnifiedAdvancedPanelControl.js` is copied in the folder `Library/Mr-xRed/`.

> **note** Note
>   You can use Task Explorer without `UnifiedAdvancedPanelControl` but, in this case, you will not have access to multi-window functionalities.

3) Then, install **Task Explorer**. Download these files from [my Github](https://github.com/Baudogit/silverbullet/tree/main/Task%20Explorer):

           TaskExplorer.md (this file)
           Instructions_for_Task_Explorer.md (filtering and querying rules)
           ConfigStyles_for_TaskExplorer.md
           taskex_styles.css
           lucide-icons.svg (icons)
           where-history.txt (custom clauses where history)
           where-examples.txt (custom where clauses examples)

     and put them in your SilverBullet space here: “Library/**baudogit**/“

## Configuration

Copy the code below into your space-lua configuration (all items are **optional**):
````lua
config.set("explorer2", {
  -- panel to use
  position = "rhs",
  -- query executed when opening Task Explorer
  where = "not done and some(_.attrib1) ~= nil and string.sub(_.attrib1,1,10) <= '2026-01-01'",
  -- if this request must be re-executed during a reset
  whereAlways = "true",
  -- maximum number of lines in history
  maxWhereHistory = 25
})
````

## Discussion

- Task Explorer: https://community.silverbullet.md/t/task-explorer-revisited/3805
- Document Manager https://community.silverbullet.md/t/document-explorer-for-silverbullet/3647/159
See also :
- Task Manager by Mr.Red: https://community.silverbullet.md/t/todo-task-manager-global-interactive-table-sorter-filtering/3767

**Upcoming developments:**
- Interface: adapt style to dark theme
- List: add sort option
- Filter: add un “-” operator ; when a filter is applied and page break active, count the number of tasks displayed per page
- Queries: add submenus to select itags, tags and/or parents ; modify list of attributes (all in the index rather than in the list) ; display custom where clause active in a tooltip ;
- Update: add a replace option for value ; calculate the value according to a formula
- Issues: ...

---

::: ==space-lua 1== (main) ::: CONFIG | REFRESH | UPDATE | **DRAW PANEL** | COMMANDS

    Details for DRAW PANEL:
TOOLBAR | BREADCRUMB | HTML | **JS SCRIPT** | DISPLAY

    Details for JS SCRIPT:
TASK UPDATE | BUILD MENUS | SEARCH FILTER | CUSTOM CLAUSE WHERE | **BUILD TASKS LIST** | STYLES |

    Functions used by BUILD TASKS LIST:

::: ==space-lua 2== ::: BUILD QUERY | BUILD HTML | TEMPLATES
::: ==space-lua 3== ::: FORMAT PAGE | FORMAT TASK

---

```space-lua
-- priority: -1
-- ::: space-lua 1 :::

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
local PANEL_ID = cfg.position or "rhs"
local WHERE_INIT = cfg.where or ""
local WHERE_ALWAYS = cfg.whereAlways or "false"
local maxEntries = cfg.maxWhereHistory or 25

-- SilverBullet's version
local version = system.getVersion()
local date = string.match(version, "(%d%d%d%d%-%d%d%-%d%d)")
if date == nil then date = "2000-01-01" end
js.window.sessionStorage.setItem("dateVersion", date)

-- Others variables and constants
local PANEL_VISIBLE = false
local VIEW2_MODE_KEY = "list"

js.window.sessionStorage.setItem("searchMode", "list")
js.window.sessionStorage.setItem("searchInit", "true")
js.window.sessionStorage.setItem("searchTerm", WHERE_INIT)
js.window.sessionStorage.setItem("searchTermFilter", "")

------------------------- HELPER TO UPDATE ATTRIBUTE -----------------------
-- Pending resolvers and global single listener
pendingModals = {}
event.listen {
  name = "updateConfirmResult",
  run = function(e)
    local id = e.data.id
    local value = e.data.value
    local resolve = pendingModals[id]
    if resolve then
      resolve(value)
      pendingModals[id] = nil
    end
  end
}

-- ---------- REFRESH LOGIC ----------

-- Last update
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

-- ---------- UPDATE TASK ----------

-- 1) TOGGLE STATUS
local function toggleTaskRemote(pageName, pos, currentState, statePerso)
  local content = space.readPage(pageName)
  if not content then return end

  -- Return if custom status
  if statePerso ~= "" then
    editor.flashNotification("Custom status. No modification!")
    return
  end

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

  js.window.setTimeout(function()
    drawPanel("yes")
    triggerHighlightUpdate()
    editor.showProgress()
  end, 100)   -- an awaitEmptyQueue will be applied just before querying the tasks
end

-- 2) UPDATE ATTRIBUTE

-- 2.1) Modify task line
local function modifyTaskLine(content, pos, action, attrName, newValue)
  local lineEnd = content:find("\n", pos + 1) or (#content + 1)
  local originalLine = content:sub(pos + 1, lineEnd - 1)
  local newLine = originalLine
  local modified = false

  if action == "add" then
    local pattern = "%[" .. attrName .. ":%s*[^%]]*%]"
    if originalLine:match(pattern) then
      modified = false
    else
      local value = newValue
      if value == "" then
        value = ".."
      end
      newLine = originalLine .. " [" .. attrName .. ": " .. value .. "]"
      modified = true
    end
  elseif action == "delete" then
    newLine = originalLine:gsub("%s*%[" .. attrName .. ":%s*[^%]]+%]", "")
    modified = (newLine ~= originalLine)
  elseif action == "rename" then
    newLine = originalLine:gsub("%[" .. attrName .. ":", "[" .. newValue .. ":")
    modified = (newLine ~= originalLine)
  end

  if not modified then
    return nil, false
  end

  local prefix = content:sub(1, pos)
  local suffix = content:sub(lineEnd)
  return prefix .. newLine .. suffix, true
end

-- 2.2) Batch processing
local function updateTaskAttributes(taskIds, action, attributeName, newValue)
  editor.showProgress(0, "Analyzing...")

  -- Group by page
  local pageGroups = {}
  for _, taskId in ipairs(taskIds) do
    local pageName, posStr = taskId:match("(.+)@(%d+)")
    if pageName and posStr then
      local pos = tonumber(posStr)
      if not pageGroups[pageName] then
        pageGroups[pageName] = {}
      end
      table.insert(pageGroups[pageName], pos)
    end
  end

  -- BLANK LOOP to count the modifications to be made
  local modifCount = 0
  local modifPerPage = 0
  local logPos = ""
  local logAction = ""
  local logPages = ""

  -- LOG
  logAction = "************ TO UPDATE *************\n"
  logAction = logAction .. "Action: " .. action .. " | Attribute: " .. attributeName .. " | String: " .. newValue
  js.log(logAction)

  for pageName, positions in pairs(pageGroups) do
    table.sort(positions, function(a, b) return a > b end)
    modifPerPage = 0
    logPos = "\nTasks position: "

    for _, pos in ipairs(positions) do
      local content = space.readPage(pageName)
      if content then
        local _, wasModified = modifyTaskLine(content, pos, action, attributeName, newValue)
        if wasModified then
          modifCount = modifCount + 1
          modifPerPage = modifPerPage + 1
          logPos = logPos .. pos .. "-"
        end
      end
    end
    
    -- Feedback
    if modifPerPage == 0 then
      js.log("Page: " .. pageName .. " :: no task to update")
      logPages = logPages .. "\nPage: " .. pageName .. " :: no task to update"
    else
      js.log("Page: " .. pageName .. " :: " .. modifPerPage .. " tasks to update" .. logPos)
      logPages = logPages .. "\nPage: " .. pageName .. " :: " .. modifPerPage .. " tasks to update" .. logPos
    end
  end
  if modifCount == 0 then
    editor.flashNotification("No tasks to update")
    editor.showProgress()
    return
  end

  -- REQUEST FOR CONFIRMATION
  local actionText = action == "add" and "Adding" or (action == "delete" and "Deleting" or "Renaming")
  local attrText = action == "rename" and (attributeName .. " -> " .. newValue) or attributeName
  local confirmMessage = actionText .. " attribute [" .. attrText .. "] on " .. modifCount .. " task(s). Continue?"
  local displayLog = logAction .. logPages

  local callId = tostring(os.time()) -- UUID not available
  local result = nil

  -- Registers the resolver for this call
  pendingModals[callId] = function(value)
    if value ~= "yes" then
      editor.flashNotification("Update cancelled !!")
      editor.showProgress()
      return
    end

    -- REAL TREATMENT
    editor.showProgress(0, "Updating attributes...")

    for pageName, positions in pairs(pageGroups) do
      table.sort(positions, function(a, b) return a > b end)

      local posStr = ""
      local content = space.readPage(pageName)
      if content then
        local workingContent = content
        for _, pos in ipairs(positions) do
          local newContent, wasModified = modifyTaskLine(workingContent, pos, action, attributeName, newValue)
          if wasModified then
            workingContent = newContent -- Accumulate
          end
        end
        -- Write ONLY ONCE after all changes to the page
        if workingContent ~= content then
          space.writePage(pageName, workingContent)
        end
      end
    end

    js.window.setTimeout(function()
      -- Preserve custom query, if one exists
      local savedSearchTerm = js.window.sessionStorage.getItem("searchTerm");
      if savedSearchTerm ~= nil and savedSearchTerm ~= "" then
        whereClause = savedSearchTerm
      end
      drawPanel("maj", whereClause)
      triggerHighlightUpdate()
      editor.showProgress()
      editor.flashNotification(modifCount .. " task(s) updated")
    end, 100) -- an awaitEmptyQueue will be applied just before querying the tasks
  end

  -- Call the modal
  js.window.showUpdateConfirmationModal(displayLog, confirmMessage, callId)
end

-- ---------- HISTORY FILE OF WHERE CLAUSES ----------

-- Write query
local function writeToHistory(whereClause)
  if not whereClause or whereClause == "" then return end
  local historyFile = "Library/baudogit/where-history.txt"
  local contentBinary = space.readFile(historyFile) or ""
  local content = encoding.utf8Decode(contentBinary);

  -- Format: "NN | whereClause"
  local lines = {}

  for line in content:gmatch("[^\r\n]+") do
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

  editor.showProgress(20, "DRAW...")
  local h = {}

  table.insert(h, [[<div data-panel="myPanel" class="explorer-panel mode-]])
  table.insert(h, viewMode)

  -- ---------- EN-TÊTE -----------
  js.window.sessionStorage.setItem("searchTermFilter", "")
  searchTermCh = js.window.sessionStorage.getItem("searchTerm")
  table.insert(h, [[">
            <div class="explorer-header">
              <div class="explorer-toolbar">
                <div class="input-wrapper">
                  <input id="tileSearch" title="Filter / Query / Update" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;Please choose Filter, Query or Update" </input>
                </div> 
                <div class="mode-switcher">   
                    <div id= "searchInfo" title="Instructions for use"]])
  table.insert(h, [[" onclick="syscall('editor.invokeCommand','Open: Instructions')">Instructions]])
  --table.insert(h, ICONS.info)
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

  -- ---------- HTML ----------
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
    js.window.sessionStorage.setItem("searchTerm", WHERE_INIT)
  else
    clauseWhere = clauseWhere or ""
    --js.window.sessionStorage.setItem("searchTerm", clauseWhere)
  end
  local listVar = tasksByPage(allTasks, viewMode, clauseWhere)
  if some(listVar) == nil then return end

  -- 3) -- Write query to history file (except at startup)
  if stadeInit == "true" then
    stadeInit = "false"
  else
    if clauseWhere ~= "" then writeToHistory(clauseWhere) end
  end

  -- 4) feedback
  local addHtml = listVar[1]
  table.insert(h2, addHtml)
  table.insert(h2, "</div>")
  local nbTasks = listVar[2]
  local lib = " "   -- (nbTasks > 1 and " tasks " or " task ")
  local finalHtml = table.concat(h2)
  finalHtml = finalHtml:gsub("<span id='temp%-message3'></span>",
    "<span id='temp-message3'> " .. nbTasks .. lib .. "displayed of " .. nbTasks .. lib .. "extracted</span>")

  -- ---------- JS SCRIPT ----------
  local script = [[

    (function() {
      // ----------- 1- Hide panel while waiting for styles to fully load (Promise) ------------
      const panel = parent.document.querySelector('.sb-panel.]] .. PANEL_ID .. [[');
      if (panel) panel.style.visibility = 'hidden';
    })();

    (function() {
    // ------------- 2- Show a message when Draw() is finished -------------
    ]]
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
    // ---------------- 3- Load Styles Once then reveal panel ----------------

    function ensureElement(id, tag, attributes, content) {
        if (document.getElementById(id)) return document.getElementById(id);
        const el = document.createElement(tag);
        el.id = id;
        for (let key in attributes) el.setAttribute(key, attributes[key]);
        if (content) el.innerHTML = content;
        document.head.appendChild(el);
        return el;
    }

    const mainCss = ensureElement("silverbullet-main-css", "link", { rel: "stylesheet", href: "/.client/main.css"});
    const explorerCss = ensureElement("explorer-style-css",    "link", { rel: "stylesheet", href: "/.fs/Library/baudogit/taskex_styles.css" });

    if (!document.getElementById("explorer-custom-styles-once")) {
        const parentStyles = parent.document.getElementById("custom-styles")?.innerHTML || "";
        const cleanStyles = parentStyles.replace(/<\/?style>/g, "");
        const styleEl = document.createElement("style");
        styleEl.id = "explorer-custom-styles-once";
        styleEl.innerHTML = cleanStyles;
        document.head.appendChild(styleEl);
    }

    // Utilisation du pattern SilverBullet avec Promise.withResolvers
    function onStyleLoaded(el, timeoutMs = 5000) {
        const { promise, resolve, reject } = Promise.withResolvers();

        // Vérification immédiate
        if (el.sheet) {
            resolve();
            return promise;
        }

        // Timeout pour éviter les blocages
        const timeout = setTimeout(() => {
            reject(new Error(`CSS loading timeout: ${el.href}`));
        }, timeoutMs);

        const cleanup = () => clearTimeout(timeout);

        el.addEventListener('load', () => {
            cleanup();
            resolve();
        }, { once: true });

        el.addEventListener('error', (e) => {
            cleanup();
            reject(e);
        }, { once: true });

        return promise;
    }

    // Pattern avec gestion d'erreurs et communication SilverBullet
    Promise.allSettled([
        onStyleLoaded(mainCss),
        onStyleLoaded(explorerCss)
    ]).then(results => {
        const failures = results.filter(r => r.status === 'rejected');
        if (failures.length > 0) {
            console.warn('Some CSS failed to load:', failures);
        }

        // Utiliser requestAnimationFrame pour les changements de style
        requestAnimationFrame(() => {
            document.documentElement.style.visibility = '';

        // Révéler aussi le panneau parent
        const panel = parent.document.querySelector('.sb-panel.]] .. PANEL_ID .. [[');
        if (panel) panel.style.visibility = '';
        });
    }).catch(error => {
        console.error('Critical error loading styles:', error);
        // Fallback : révéler quand même
        document.documentElement.style.visibility = '';
    });

  })();

(function () {
  // --------------------- 4- Miscellaneous -----------------

  // ============================================
  // VARIABLES AND CONSTANTS
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
  // UPDATE THE STATUS OF A TASK
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

  // La ligne mise à jour est positionnée en haut de la liste
  // (fonction activée lors de l'initialisation de Draw, lui-même
  // lancé par toggleTaskRemote via "Task: Toggle_Done")
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
  // MULTI-CHAIN FILTERING
  // ============================================
  function applySearchFilter(searchTermFilter) {
    searchTermFilter = searchTermFilter.trim();
    const allTasks = document.querySelectorAll(".sb-TaskExplorer-div-task");

    // Parse search terms with support for brackets, quotes and + operator
    const orGroups = parseSearchTerms(searchTermFilter);

    // Filter tasks
    let nbTasks = 0;
    allTasks.forEach(function (task) {
      const labelDiv = task.querySelector("#divTaskchild");

      if (labelDiv) {
        const labelText = labelDiv.textContent;

        // If no search term, show all
        if (orGroups.length === 0) {
          task.style.display = "";
        } else {
          // Check that at least one group (OU) is satisfied
          const anyGroupMatches = orGroups.some(function (andGroup) {
            // For a group to be satisfied, all its terms (AND) must be found
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
    // Hide page titles without visible stains
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
  // PARSING SEARCH TERMS
  // ============================================
  function parseSearchTerms(searchTermFilter) {
    // First, separate by spaces to identify AND groups (connected by +)
    const orGroups = [];
    let currentGroup = [];
    let i = 0;

    while (i < searchTermFilter.length) {
      const char = searchTermFilter[i];

      // Iignore spaces at the beginning
      if (char === ' ') {
        // If we have a group in progress, we end it (OR operator)
        if (currentGroup.length > 0) {
          orGroups.push(currentGroup);
          currentGroup = [];
        }
        i++;
        continue;
      }

      // Operator +: continues the current group (AND operator)
      if (char === '+') {
        i++;
        continue;
      }

      // Parse a term
      const term = parseSingleTerm(searchTermFilter, i);
      if (term) {
        // Add only valid (non-null) terms
        if (term.term !== null) {
          currentGroup.push(term.term);
        }
        i = term.nextIndex;
      } else {
        i++;
      }
    }

    // Add the last group if it exists
    if (currentGroup.length > 0) {
      orGroups.push(currentGroup);
    }

    return orGroups;
  }

  // ============================================
  // PARSING A SINGLE TERM
  // ============================================
  function parseSingleTerm(searchTermFilter, startIndex) {
    let i = startIndex;
    const char = searchTermFilter[i];

    // Block in square brackets [...]
    if (char === '[') {
      const closingIndex = searchTermFilter.indexOf(']', i);
      if (closingIndex !== -1) {
        const content = searchTermFilter.substring(i + 1, closingIndex);
        return {
          term: { type: 'bracket', value: content },
          nextIndex: closingIndex + 1
        };
      } else {
        // No closing bracket found, we don't know
        return { term: null, nextIndex: i + 1 };
      }
    }

    // Block in double quotes "..."
    if (char === '"') {
      const closingIndex = searchTermFilter.indexOf('"', i + 1);
      if (closingIndex !== -1) {
        const content = searchTermFilter.substring(i + 1, closingIndex);
        return {
          term: { type: 'quoted', value: content },
          nextIndex: closingIndex + 1
        };
      } else {
        // No closing quote found, we ignore
        return { term: null, nextIndex: i + 1 };
      }
    }

    // Block in single quotes '...'
    if (char === "'") {
      const closingIndex = searchTermFilter.indexOf("'", i + 1);
      if (closingIndex !== -1) {
        const content = searchTermFilter.substring(i + 1, closingIndex);
        return {
          term: { type: 'quoted', value: content },
          nextIndex: closingIndex + 1
        };
      } else {
        // No closing quote found, we ignore
        return { term: null, nextIndex: i + 1 };
      }
    }

    // Normal word (without special delimiter)
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
  // CORRESPONDENCE OF TERMS
  // ============================================
  function matchTerm(term, text) {
    if (term.type === 'bracket') {
      // For brackets: look for the string that starts just after a [
      // Additional characters can follow, but not precede
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
      // Check that the block STARTS with the desired pattern
      return bracketBlocks.some(function(block) {
        return block.toLowerCase().startsWith(searchValue);
      });
    }
    else if (term.type === 'quoted') {
      // For quotes: search for the exact string (case insensitive)
      return text.toLowerCase().includes(term.value.toLowerCase());
    }
    else {
      // For normal words: search in case-insensitive mode
      return text.toLowerCase().includes(term.value.toLowerCase());
    }
  }

  // !!!============================================
  // RECOVERY OF ATTRIBUTES
  // ============================================
  function getUniqueAttributes() {

    // Depending on SilverBullet release date
    const dateVersion = sessionStorage.getItem("dateVersion")
    if (dateVersion >= "2026-02-06") {
      const attributeSpans = document.querySelectorAll(
      ".sb-list.sb-frontmatter.sb-attribute-name",
      );
    } else {
      const attributeSpans = document.querySelectorAll(
        ".sb-list.sb-frontmatter.sb-atom",
      );
    }

    const attributeSpans = document.querySelectorAll(
      ".sb-list.sb-frontmatter.sb-attribute-name",
    );
    const attributeSet = new Set();

    attributeSpans.forEach(function (span) {
      const attributeName = span.textContent.trim();
      // Remove ":" if present
      const cleanName = attributeName.replace(/:$/, "");
      if (cleanName) {
        attributeSet.add(cleanName);
      }
    });

    // Convert to array and sort alphabetically
    return Array.from(attributeSet).sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  }

  // !!!============================================
  // CONTEXTUAL MENU
  // ============================================

  function createAttributeMenu() {
    // Delete existing menu if there is one
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

    // Clear submenu
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
          // For properties, add the prefix "_."
          let prefix = "";
          if (currentValue) {
            prefix = " and _.";
          } else {
            prefix = "_.";
          }
          searchInput.value = currentValue + prefix + item + "==' '";
        } else if (type === "example") {
          // For examples, paste minus the first 5 characters
          searchInput.value = currentValue + item.substring(5);
        } else if (type === "history") {
          // For history, paste minus the first 5 characters
          searchInput.value = currentValue + item.substring(5);
        } else if (type === "attribute") {
          // For attributes
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
        } else if (type === "attribute_update") {
          // For update mode, just insert the attribute name
          searchInput.value = item;
        }

        // Keep the menu open and return the focus
        searchInput.focus();

        // Close submenu only
        hideSubMenu();
      });

      subMenu.appendChild(itemDiv);
    });

    // Position the submenu to the right of the parent item
    const rect = parentItem.getBoundingClientRect();
    subMenu.style.left = rect.right + 5 + "px";
    subMenu.style.top = rect.top + "px";
    subMenu.style.display = "block";
  }

  // !!!============================================
  // FILTER MODE MENU
  // ============================================

  function showListeModeMenu(searchInput) {
    const menu =
      document.getElementById("attributeDropdownMenu") || createAttributeMenu();
    const attributes = getUniqueAttributes();

    // Clear menu
    menu.innerHTML = "";

 // Title with 3 mode buttons
    const modeTitle = document.createElement("div");
    modeTitle.style.cssText = `
      padding: 6px 8px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
      display: flex;
      gap: 6px;
    `;
    
    // Filter button (active)
    const filterBtn = document.createElement("button");
    filterBtn.id = "listMode";
    filterBtn.textContent = "Filter";
    filterBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #28a745;
      background-color: #28a745;
      color: white;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    `;
    filterBtn.class='.mode-switcher div';
    filterBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("list", searchInput);
    };
    
    // Query button (inactive)
    const queryBtn = document.createElement("button");
    queryBtn.id = "whereMode";
    queryBtn.textContent = "Query";
    queryBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #ccc;
      background-color: white;
      color: #333;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    `;
    queryBtn.class='.mode-switcher div';
    queryBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("where", searchInput);
    };
    
    // Update button (inactive)
    const updateBtn = document.createElement("button");
    updateBtn.id = "updateMode";
    updateBtn.textContent = "Update";
    updateBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #ccc;
      background-color: white;
      color: #333;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    `;
    updateBtn.class='.mode-switcher div';
    updateBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("update", searchInput);
    };
    
    modeTitle.appendChild(filterBtn);
    modeTitle.appendChild(queryBtn);
    modeTitle.appendChild(updateBtn);
    menu.appendChild(modeTitle);

    // Item Attributes with submenu
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

    // Position the menu below the search field
    const rect = searchInput.getBoundingClientRect();
    menu.style.left = rect.left + "px";
    menu.style.top = rect.bottom + 2 + "px";
    menu.style.width = rect.width / 2 + "px";
    menu.style.display = "block";
  }

  // !!!============================================
  // QUERY MENU (= WHERE MODE)
  // ============================================

  function showWhereModeMenu(searchInput) {
    const menu =
      document.getElementById("attributeDropdownMenu") || createAttributeMenu();
    const attributes = getUniqueAttributes();

    // Clear menu
    menu.innerHTML = "";

    // Title with 3 mode buttons
    const modeTitle = document.createElement("div");
    modeTitle.style.cssText = `
      padding: 6px 8px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
      display: flex;
      gap: 6px;
    `;
    
    // Filter button (inactive)
    const filterBtn = document.createElement("button");
    filterBtn.id = "listMode";
    filterBtn.textContent = "Filter";
    filterBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #ccc;
      background-color: white;
      color: #333;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    `;
    filterBtn.class='.mode-switcher div';
    filterBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("list", searchInput);
    };
    
    // Query button (active)
    const queryBtn = document.createElement("button");
    queryBtn.id = "whereMode";
    queryBtn.textContent = "Query";
    queryBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #17a2b8;
      background-color: #17a2b8;
      color: white;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    `;
    queryBtn.class='.mode-switcher div';
    queryBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("where", searchInput);
    };
    
    // Update button (inactive)
    const updateBtn = document.createElement("button");
    updateBtn.id = "updateMode";
    updateBtn.textContent = "Update";
    updateBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #ccc;
      background-color: white;
      color: #333;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    `;
    updateBtn.class='.mode-switcher div';
    updateBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("update", searchInput);
    };
    
    modeTitle.appendChild(filterBtn);
    modeTitle.appendChild(queryBtn);
    modeTitle.appendChild(updateBtn);
    menu.appendChild(modeTitle);

    // Item Attributes
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

    // Item Properties
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

    // Separator
    const separator = document.createElement("div");
    separator.style.cssText = `
      height: 1px;
      background-color: #ccc;
      margin: 4px 0;
    `;
    menu.appendChild(separator);  
  
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

      // Item Examples
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

    // Position the menu below the search field
    const rect = searchInput.getBoundingClientRect();
    menu.style.left = rect.left + "px";
    menu.style.top = rect.bottom + 2 + "px";
    menu.style.width = rect.width / 2 + "px";
    menu.style.display = "block";
  }

  // !!!============================================
  // UPDATE MENU
  // ============================================

  function showUpdateModeMenu(searchInput) {
    const menu =
      document.getElementById("attributeDropdownMenu") || createAttributeMenu();
    const attributes = getUniqueAttributes();

    // Clear menu
    menu.innerHTML = "";

    // Title with 3 mode buttons
    const modeTitle = document.createElement("div");
    modeTitle.style.cssText = `
      padding: 6px 8px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
      display: flex;
      gap: 6px;
    `;
    
    // Filter button (inactive)
    const filterBtn = document.createElement("button");
    filterBtn.id = "listMode";
    filterBtn.textContent = "Filter";
    filterBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #ccc;
      background-color: white;
      color: #333;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    `;
    filterBtn.class='.mode-switcher div';
    filterBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("list", searchInput);
    };
    
    // Query button (inactive)
    const queryBtn = document.createElement("button");
    queryBtn.id = "whereMode";
    queryBtn.textContent = "Query";
    queryBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #ccc;
      background-color: white;
      color: #333;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    `;
    queryBtn.class='.mode-switcher div';
    queryBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("where", searchInput);
    };
    
    // Update button (active)
    const updateBtn = document.createElement("button");
    updateBtn.id = "updateMode";
    updateBtn.textContent = "Update";
    updateBtn.style.cssText = `
      padding: 4px 12px;
      border: 1px solid #ffc107;
      background-color: #ffc107;
      color: #000;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    `;
    updateBtn.class='.mode-switcher div';
    updateBtn.onclick = function(e) {
      e.stopPropagation();
      window.switchSearchMode("update", searchInput);
    };
    
    modeTitle.appendChild(filterBtn);
    modeTitle.appendChild(queryBtn);
    modeTitle.appendChild(updateBtn);
    menu.appendChild(modeTitle);

    // Item Attributes with submenu
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
      showSubMenu(this, attributes, "attribute_update", searchInput);
    });

    attributesItem.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    menu.appendChild(attributesItem);

    // Position and display the menu
    const rect = searchInput.getBoundingClientRect();
    menu.style.left = rect.left + "px";
    menu.style.top = rect.bottom + 2 + "px";
    menu.style.width = rect.width / 2 + "px";
    menu.style.display = "block";
  }

  // !!!============================================
  // GENERIC FUNCTION TO DISPLAY THE CORRECT MENU
  // ==============================================

  function showMenuForCurrentMode(searchInput) {
    if (searchMode === "list") {
      showListeModeMenu(searchInput);
    } else if (searchMode === "where") {
      showWhereModeMenu(searchInput);
    } else if (searchMode === "update") {
      showUpdateModeMenu(searchInput);
    }
  }

  // !!!============================================
  // FUNCTION CALLED BY THE OPTION BUTTON
  // ============================================

  /**
   * This function is called from the HTML interface
   * when user changes mode
   *
   * @param {string} mode - "list" ou "where"
   * @param {HTMLElement} searchInput - the search input element
   */

  window.switchSearchMode = function(mode, searchInput) {
    hideSubMenu();
    searchMode = mode;
    // Visual
    const inputSearchZone = document.querySelector('#tileSearch');
    document.querySelectorAll('.mode-switcher div').forEach(el => el.classList.remove('active'));
    if (mode === "list") {
      searchInput.value = "";
      sessionStorage.setItem("searchMode", "list");
      const btn = document.querySelector('#listMode');
      btn.classList.add('active');
      btn.title = "Filter mode : ";
      inputSearchZone.placeholder = "\u00A0\u00A0\u00A0\u00A0...\u00A0\u00A0 real-time execution (Esc to exit)";
      searchInput.style.backgroundColor = "white";
      applySearchFilter("");
    } else if (mode === "where") {
      searchInput.value = "";
      sessionStorage.setItem("searchMode", "where");
      const btn = document.querySelector('#whereMode');
      btn.classList.add('active');
      btn.title = "Where : " + sessionStorage.getItem("searchTerm");
      inputSearchZone.placeholder = "\u00A0\u00A0\u00A0\u00A0...\u00A0\u00A0 custom clause where (Enter to execute)";
      searchInput.style.backgroundColor = "#F2F7FF";
    } else if (mode === "update") {
      searchInput.value = "";
      sessionStorage.setItem("searchMode", "update");
      const btn = document.querySelector('#updateMode');
      btn.classList.add('active');
      btn.title = "Update attributes";
      inputSearchZone.placeholder = "\u00A0\u00A0\u00A0\u00A0...\u00A0\u00A0 add:name[=value] | delete:name | rename:old->new (Enter to execute)";
      searchInput.style.backgroundColor = "#FFF8E1";
    }

    // Give focus to the search field
    searchInput.focus();
    // Show corresponding menu
    showMenuForCurrentMode(searchInput);
  }

  // !!!============================================
  // EVENT MANAGEMENT
  // ============================================

  function initializeSearchMenu(searchInput) {

    // Show menu when focused
    searchInput.addEventListener('focus', function(e) {
      setTimeout(function() {
        showMenuForCurrentMode(searchInput);
      }, 50);
    });

    // Managing loss of focus
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

    // Prevent closing on menu clicks
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

    // Show right-click menu
    searchInput.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      setTimeout(function() {
        showMenuForCurrentMode(searchInput);
      }, 50);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      const menu = document.getElementById("attributeDropdownMenu");
      const subMenu = document.getElementById("attributeSubMenu");
      if (menu && !menu.contains(e.target) &&
          subMenu && !subMenu.contains(e.target) &&
          e.target !== searchInput) {
        hideAttributeMenu();
      }
    });

    // Listen for changes
    searchInput.addEventListener("input", function () {
      // Apply filter only in list mode
      if (searchMode === "list") {
        applySearchFilter(this.value);
        sessionStorage.setItem("searchTermFilter", this.value);
        const btn = document.querySelector('#listMode');
        btn.title = "Filter : " + this.value
      } else {
        sessionStorage.setItem("searchFilter", this.value);
      }
    });

    // Keyboard key management
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
          // In list view, Enter simply applies the filter
          sessionStorage.setItem("searchTermFilter", this.value);
          const btn = document.querySelector('#listMode');
          btn.title = "Filter mode : " + this.value;
          applySearchFilter(this.value);
        } else if (searchMode === "update") {
          // In update mode, execute the command
          const command = this.value.trim();
          if (command) {
            executeAttributeUpdate(command);
          }
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

    // Paste Management
    searchInput.addEventListener("paste", function () {
      // Apply filter only in list mode
      if (searchMode === "list") {
        applySearchFilter(this.value);
        sessionStorage.setItem("searchTermFilter", this.value);
        const btn = document.querySelector('#listMode');
        btn.title = "Filter : " + this.value
      } else {
        sessionStorage.setItem("searchFilter", this.value);
      }
    });

    // Additional events to detect programmatic changes
    searchInput.addEventListener("change", function () {
      // Apply filter only in filter mode
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
  // TASKS COLLECT FOR UPDATE MODE
  // ============================================

  function getVisibleTaskIds() {
    const taskDivs = document.querySelectorAll('.sb-TaskExplorer-div-task');
    const taskIds = [];
    taskDivs.forEach(function(div) {
      if (window.getComputedStyle(div).display !== 'none') {
        const taskId = div.getAttribute('data-task-id');
        if (taskId) {
          taskIds.push(taskId);
        }
      }
    });
    return taskIds;
  }

  async function executeAttributeUpdate(command) {
    // Parser: "add:priority=high" or "delete:tag" or "rename:old->new"
    const colonIndex = command.indexOf(':');
    if (colonIndex === -1) {
      await syscall('editor.flashNotification', 'Invalid syntax. Use: add:name[=value] | delete:name | rename:old->new');
      return;
    }

    const action = command.substring(0, colonIndex).trim();
    const details = command.substring(colonIndex + 1).trim();

    if (!['add', 'delete', 'rename'].includes(action)) {
      await syscall('editor.flashNotification', 'Invalid action. Use: add, delete, or rename');
      return;
    }

    const taskIds = getVisibleTaskIds();
    if (taskIds.length === 0) {
      await syscall('editor.flashNotification', 'No tasks visible');
      return;
    }

    let attrName = '';
    let newValue = '';

    if (action === 'add') {
      const equalIndex = details.indexOf('=');
      if (equalIndex === -1) {
        attrName = details;
        newValue = '';
      } else {
        attrName = details.substring(0, equalIndex).trim();
        newValue = details.substring(equalIndex + 1).trim();
      }
    } else if (action === 'rename') {
      const arrowIndex = details.indexOf('->');
      if (arrowIndex === -1) {
        await syscall('editor.flashNotification', 'Invalid rename syntax. Use: rename:old->new');
        return;
      }
      attrName = details.substring(0, arrowIndex).trim();
      newValue = details.substring(arrowIndex + 2).trim();
    } else {
      attrName = details;
    }

    if (!attrName) {
      await syscall('editor.flashNotification', 'Attribute name required');
      return;
    }

    // Run Lua command
    const taskIdsJson = JSON.stringify(taskIds);
    await syscall("editor.invokeCommand", "TaskExplorer: UpdateAttributes", [
        taskIds,
        action,
        attrName,
        newValue
    ]);
  }

  // !!!============================================
  // CONFIRMATION MODAL WITH LOG
  // ============================================
  parent.window.showUpdateConfirmationModal = function(logText, confirmationMessage, callId) {

      // Create the HTML of the modal
      const modalHTML = `
        <div id="updateConfirmModal" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        ">
          <div style="
            background: white;
            border-radius: 8px;
            padding: 20px;
            max-width: 600px;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          ">
            <h3 style="margin: 0 0 15px 0; color: #333;">Update Confirmation</h3>

            <pre style="
              background: #f5f5f5;
              padding: 15px;
              border-radius: 4px;
              overflow-y: auto;
              max-height: 50vh;
              margin: 0 0 15px 0;
              font-family: monospace;
              font-size: 13px;
              line-height: 1.4;
            ">${logText}</pre>

            <div style="
              /*font-weight: bold;*/
              margin-bottom: 20px;
              color: #d97706;
            ">${confirmationMessage}</div>

            <div style="
              display: flex;
              gap: 10px;
              justify-content: flex-end;
            ">
              <button autofocus type="button" id="modalCancel" style="
                padding: 8px 20px;
                border: 1px solid #ccc;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
              ">Cancel</button>
              <button type="button" id="modalContinue" style="
                padding: 8px 20px;
                border: none;
                background: #2563eb;
                color: white;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
              ">Continue</button>
            </div>
          </div>
        </div>
      `;

      // Inject in the DOM
      const parentDoc = parent.document;
      parentDoc.body.insertAdjacentHTML('beforeend', modalHTML);
      const modal = parentDoc.getElementById('updateConfirmModal');
      const btnCancel = parentDoc.getElementById('modalCancel');
      const btnContinue = parentDoc.getElementById('modalContinue');

      // Extract the focus from the input of the iframe.
      // However, he is immediately captured by the editor.
      // (attention: if Enter: adds a line to the page!)
      btnCancel.focus();
      setTimeout(() => {
        parentDoc.getElementById('modalCancel')?.focus();
       }, 0);

      // Attach events to parent DOM elements
      btnContinue.onclick = () => {
        globalThis.syscall("event.dispatch", "updateConfirmResult", {
          id: callId,
          value: "yes"
        });
        modal.remove(); // optionnel : nettoyer le modal
        };
      btnCancel.onclick = () => {
        globalThis.syscall("event.dispatch", "updateConfirmResult", {
          id: callId,
          value: "no"
        });
        modal.remove(); // optionnel : nettoyer le modal
      };
  };

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
  // Global variable
  const searchInput = document.getElementById("tileSearch");
  if (!searchInput) return;

  // Installation of menus and events
  initializeSearchMenu(searchInput);

  // Visual adjustment of the search area
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
    } else if (searchModeEnCours === "update") {
      const btn = document.querySelector('#updateMode');
      btn.classList.add('active');
      inputSearch.placeholder = "\u00A0\u00A0\u00A0\u00A0...\u00A0\u00A0 add:name[=value] | delete:name | rename:old->new (Enter to execute)";
      searchInput.style.backgroundColor = "#FFF8E1";
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
]]

  -- ----------------- DISPLAY -----------------
  editor.showProgress(90, "PANEL ...")
  js.window.setTimeout(function()
    editor.showPanel(PANEL_ID, currentWidth, finalHtml, script)
  end, 100)
  editor.showProgress()
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
      -- Reset
      js.window.sessionStorage.setItem("searchMode", "list")
      js.window.sessionStorage.setItem("searchInit", "true")
      js.window.sessionStorage.setItem("searchTermInit", WHERE_INIT)
      js.window.sessionStorage.setItem("searchTerm", WHERE_INIT)
      js.window.sessionStorage.setItem("searchTermFilter", "")
      -- Execution
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
      --Reset
      js.window.sessionStorage.setItem("searchMode", "list")
      js.window.sessionStorage.setItem("searchInit", "true")
      js.window.sessionStorage.setItem("searchTermInit", WHERE_INIT)
      js.window.sessionStorage.setItem("searchTerm", WHERE_INIT)
      js.window.sessionStorage.setItem("searchTermFilter", "")
      -- Execution
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

command.define {
  name = "TaskExplorer: UpdateAttributes",
  hide = true,
  run = function(args)
    js.log(args)
    local taskIds = args[1]
    local action = args[2]
    local attributeName = args[3]
    local newValue = args[4] or ""
    updateTaskAttributes(taskIds, action, attributeName, newValue)
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
  
  -- !! This does not work (os.time) !!
  --clauseWhere = some(_.completed) ~= nil and string.sub(_.completed,1,10) >= (os.date('%Y-%m-%d', os.time() - (5 * 24 * 60 * 60)))
    --clauseWhere = some(_.completed) ~= nil and (string.sub(_.completed,1,10) >= os.date('%Y-%m-%d',  os.time({ year = 2025, month = 12, day = 21 })))

  -- To test: modify and uncomment below. This squizzle all the parameters.
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

  js.log(queryTasks)

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
    local nb = 1
    local nbT = #queryTasks
    for pageName, tasks in pairs(pageTasks) do
      html = html .. pageTasksTemplate({
        tasks = tasks
      })
      nb = nb + #tasks
      editor.showProgress(math.floor((nb/nbT)*100), "mon-type")
    end
  else
    local nb = 0
    local nbT = #queryTasks
    for pageName, tasks in pairs(pageTasks) do
      html = html .. pageTasksPerPageTemplate({
        pageName = pageName,
        tasks = tasks
      })
      nb = nb + #tasks
      editor.showProgress(math.floor((nb/nbT)*100), "mon-type")
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
    square = '<svg class="icon-svg" style="width: 1em; height: 1em; vertical-align: middle;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>',
    squarecheck ='<svg class="icon-svg" style="width: 1em; height: 1em; vertical-align: middle;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
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

      tempStringInit = tempString .. "\n" .. taskId .. "       ITAGS: " .. itags

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
    -- schema : html (onclick) > js (script) > syscall (invokeCommand) > space-lua (function)
    html = html .. '<span style="cursor: pointer;" onclick="toggleTask(\'' ..   
    string.gsub(namePage or "", "'", "\\'") .. '\',' ..   
    (positionStart or "0") .. ',\'' ..   
    string.gsub(doneReal or "", "'", "\\'") .. '\',\'' ..  
    string.gsub(stateExist or "", "'", "\\'") .. '\')">'
    html = html .. nameIcon .. '</span> '

    -- Enclosing DIV  
    -- 1st line: label with link to open the task page 
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

    -- 2nd line: attributes. Original structure is preserved with sb-task = " "
    -- between each attribute but task text is compiled on the 1st ligne (label)
    for _, attr in ipairs(attributes) do
        html = html .. '<span class="sb-list sb-task"> </span>'
        html = html .. '<span class="sb-attribute" data-' .. attr.key .. '="' .. escapeHtml(attr.value) .. '">'
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">[</span>'
        -- depending to SilverBullet version date
        local dateVersion = js.window.sessionStorage.getItem("dateVersion")
        if dateVersion >= "2026-02-06" then
          html = html .. '<span class="sb-list sb-frontmatter sb-attribute-name">' .. escapeHtml(attr.key) .. '</span>'
        else
          html = html .. '<span class="sb-list sb-frontmatter sb-atom">' .. escapeHtml(attr.key) .. '</span>'
        end
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">: </span>'
        html = html .. '<span class="sb-list sb-frontmatter sb-attribute-value">' .. escapeHtml(attr.value) .. '</span>'
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">]</span>'
        html = html .. '</span>'
    end

    html = html .. "</div></div>"

    return html
end

```
