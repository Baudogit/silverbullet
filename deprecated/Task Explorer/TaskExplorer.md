---

---

# 🗂️ Task Explorer 

${widgets.button("Toggle Task Explorer", function() editor.invokeCommand("Navigate: Toggle Task Explorer", tasksByPage()) end)}

> **warning** WORK IN PROGRESS

## Context
Task Explorer is based on Mr.Red's great work.
Prerequisites: install **Document Explorer** (use Library Manager).
Following components are used by Task Explorer:

-      UnifiedAdvancedPanelControl.js
-      docex_styles.css
-      lucide-icons.svg

## Installation
1- Install **Document Explorer**
2- Dowload two files available here: https://github.com/Baudogit/silverbullet/tree/44a391bcbd6f00d03663edab328a03f1579932d5/Task%20Explorer

-     TaskExplorer.md (this file)
-      lucide-icons.svg (additional icons)

3- Drop the files here: “.\Library\ **baudogit** \“ (without spaces in the folder name)

## Discussion

- Document Manager: https://community.silverbullet.md/t/document-explorer-for-silverbullet/3647/159
- Task Manager: https://community.silverbullet.md/t/task-explorer/3747/2

## Integration
The code is distributed into three space-lua, in cascade. Structure:

> **note** Note
>  Main space-lua is based on great work from Mr.Red

- ::: ==space-lua 1== (main) ::: CONFIG | REFRESH LOGIC | DRAW PANEL | COMMANDS
Details for DRAW PANEL:
TOOLBAR | BREADCRUMB | CSS TOGGLE | HTML INJECTION | SCRIPT JS | PANEL DISPLAY

- ::: ==space-lua 2== ::: BUILD HTML | TEMPLATES

- ::: ==space-lua 3== ::: FORMAT PAGE | FORMAT TASK

```space-lua
-- priority: -1
-- ::: space-lua 1 :::

-- ---------- CONFIG ----------

-- Init
config.define("explorer2", {
    type = "object",
    properties = {
        position = schema.string(),
        tileSize = schema.string(),
        listHeight = schema.string()
    }
})

-- Icons
local ICONS = {
    grid           = '<svg class="icon-svg"><use href="/.fs/Library/Mr-xRed/lucide-icons.svg#icon-grid"></use></svg>',
    list           = '<svg class="icon-svg"><use href="/.fs/Library/Mr-xRed/lucide-icons.svg#icon-list"></use></svg>',
    tree           = '<svg class="icon-svg"><use href="/.fs/Library/Mr-xRed/lucide-icons.svg#icon-tree"></use></svg>',
    folderCollapse =
    '<svg class="icon-svg"><use href="/.fs/Library/Mr-xRed/lucide-icons.svg#icon-folderCollapse"></use></svg>',
    folderExpand   =
    '<svg class="icon-svg"><use href="/.fs/Library/Mr-xRed/lucide-icons.svg#icon-folderExpand"></use></svg>',
    refresh        = '<svg class="icon-svg"><use href="/.fs/Library/Mr-xRed/lucide-icons.svg#icon-refresh"></use></svg>',
    close          = '<svg class="icon-svg"><use href="/.fs/Library/Mr-xRed/lucide-icons.svg#icon-close"></use></svg>',
    arrowup      = '<svg class="icon-svg" style="width: 1em; height: 1em; vertical-align: middle;"><use href="/.fs/Library/baudogit/lucide-icons.svg#green-icon"></use></svg>',
    arrowleft     = '<svg class="icon-svg" style="width: 1em; height: 1em; vertical-align: middle;"><use href="/.fs/Library/baudogit/lucide-icons.svg#blue-icon"></use></svg>'  
  }

-- Load config
local cfg = config.get("explorer2") or {}
local PANEL_ID = cfg.position or "lhs"
local tileSize = cfg.tileSize or "80px"
local listHeight = cfg.listHeight or "25.2px"

-- Others variables / constants
local PANEL_VISIBLE = false
local PATH_KEY = "gridExplorer2.cwd"
local VIEW_MODE_KEY = "gridExplorer2.viewMode"

-- ---------- REFRESH LOGIC ----------

-- last update
function triggerHighlightUpdate()
    clientStore.set("explorer2.lastUpdate", os.time() .. math.random())
end

-- refresh tasks list
function refreshExplorer2Button()
    drawPanel()
    triggerHighlightUpdate()
    editor.flashNotification("Tasks list refreshed.")
end

-- toggle query and refresh tasks list
function toggleQueryButton()
    local current = clientStore.get("explorer2.queryAll")
    if current == "true" then
      clientStore.set("explorer2.queryAll", "false")
    else
      clientStore.set("explorer2.queryAll", "true")
    end
    drawPanel()
    triggerHighlightUpdate()
end

-- ---------- DRAW PANEL ----------
local function drawPanel()
  
    local currentWidth = clientStore.get("explorer2.panelWidth") or config.get("explorer2.panelWidth") or 0.8
    local viewMode = clientStore.get(VIEW_MODE_KEY) or config.get("explorer2.viewMode") or "grid"
    local filterEnabled = clientStore.get("explorer2.disableFilter") ~= "true"
    local allTasks = clientStore.get("explorer2.queryAll") == "true"  
    --------------------------------------------------------------------<<<
  local breadcrumbHtml = "<div class='explorer-breadcrumbs2'>" ..
        "<span class='titleTasks'>Tasks list per page < work in progress ></span>" .. "</div>"
    --------------------------------------------------------------------<<<
    local h = {}

    table.insert(h, [[<div class="explorer-panel mode-]])
    table.insert(h, viewMode)
    
    -- TOOLBAR
    table.insert(h, [[">
            <div class="explorer-header">
              <div class="explorer-toolbar">
  
                <div class="input-wrapper">
                  <input type="text" title="e.g.: user man pdf" id="tileSearch" placeholder="Filter..." oninput="filterTiles()">
                  <div id="clearSearch" class="clear-btn" onmousedown="clearFilter(event)">✕</div>
                </div>
  
                <div class="view-switcher">
                  <div title="Grid View" class="]])
    table.insert(h, (viewMode == "grid" and "active" or ""))
    table.insert(h, [[" onclick="syscall('editor.invokeCommand','TaskExplorer: Change View Mode',{mode:'grid'})">]])
    table.insert(h, ICONS.grid)
    table.insert(h, [[</div>
                  <div title="List View" class="]])
    table.insert(h, (viewMode == "list" and "active" or ""))
    table.insert(h, [[" onclick="syscall('editor.invokeCommand','TaskExplorer: Change View Mode',{mode:'list'})">]])
    table.insert(h, ICONS.list)
    table.insert(h, [[</div>
                  <div title="Tree View" class="]])
    table.insert(h, (viewMode == "tree" and "active" or ""))
    table.insert(h, [[" onclick="syscall('editor.invokeCommand','TaskExplorer: Change View Mode',{mode:'tree'})">]])
    table.insert(h, ICONS.tree)
  
    -- Toolbar: button ToggleQuery
    table.insert(h, [[</div>
      </div>
             <div class="explorer-button-group">
                  <div title="Show/Hide Completed Tasks"
                       class="explorer-action-btn" id="tree-toggle-btn"
                       style="display: ]])
    -- css rules hide button if viewMode is not equal to "list"
    table.insert(h, (viewMode == "list"))  --"tree" and "flex" or "none"))
    table.insert(h, [["
                       onclick="syscall('lua.evalExpression', 'toggleQueryButton()')">
                    <span id="tree-toggle-icon">]])
    if allTasks then
      table.insert(h, ICONS.folderCollapse)
    else
      table.insert(h, ICONS.folderExpand)
    end

    --  Toolbar: button Refresh
    table.insert(h, [[</span></div>
                  <div title="Refresh View"
                       class="explorer-action-btn"
                       id="refresh-btn"
                       onclick="syscall('lua.evalExpression', 'refreshExplorer2Button()')">]])
    table.insert(h, ICONS.refresh)
    local filterDisabled = clientStore.get("explorer2.disableFilter") == "true"
    local activeClass = filterDisabled and " active" or ""

    --  Toolbar: button Opening Mode
    table.insert(h, [[</div>
                        <div title="Toggle Task Opening Mode"
                              class="explorer-action-btn]] .. activeClass .. [[" id="openingMode-btn"
                              onclick="syscall('editor.invokeCommand','TaskExplorer: Toggle Opening Mode')">]])
    table.insert(h, (filterDisabled and ICONS.arrowup or ICONS.arrowleft))
  
  --  Toolbar: empty space + button Close
    table.insert(h, [[</div></div>
                 <div class="action-buttons" style="display: flex; gap: 4px;">
                  <div class="explorer-close-btn" title="Close Explorer" onclick="syscall('editor.invokeCommand', 'Navigate: Task Explorer')">]])
    table.insert(h, ICONS.close)  
    table.insert(h, [[</div>
              </div>
              </div>]])
    -- BREADCRUMB
    table.insert(h, breadcrumbHtml)
    table.insert(h, [[</div>]])

    -- CSS TOGGLE : container setup
    -- --------------------------------------------------------------------<<<
    local gridClass = "document-explorer document-explorer2"
    -- --------------------------------------------------------------------<<<
    table.insert(h, [[<div class="]] .. gridClass .. [[" id="explorerGrid" "]])
    table.insert(h, [[">]])

  -- HTML INJECTION for Tasks list per page
  -- 1) switch content of h into h2
    local h2 = {}
    for i = 1, #h do
        h2[i] = h[i]
    end  
    -- 2) html provided by tasksByPage()
    local addHtml = tasksByPage(allTasks, viewMode)
    table.insert(h2, addHtml)
    table.insert(h2, "</div>")

    -- SCRIPT JS
    local script = [[
(function() {

  // 1) ---------------- Opening each task with UnifiedAdvancedPanelControl ----------------
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

// 2) ---------------- Load Styles Once ----------------
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

    const dynamicVars = `:root {
              --tile-size: ]] .. tileSize .. [[;
              --list-tile-height: ]] .. listHeight .. [[;
              --icon-size-grid: calc(var(--tile-size) * 0.6);
    }`;
    const varEl = ensureElement("explorer-dynamic-vars", "style", {});
    varEl.innerHTML = dynamicVars;

})();
]]
    -- PANEL DISPLAY
    local finalHtml = table.concat(h2)
    editor.showPanel(PANEL_ID, currentWidth, finalHtml, script)
    PANEL_VISIBLE = true
    clientStore.set("explorer2.open", "true")
end

-- ----------------- COMMANDS ------------------

command.define {
    name = "TaskExplorer: Change View Mode",
    hide = true,
    run = function(args)
        clientStore.set(VIEW_MODE_KEY, args.mode)
        drawPanel()
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
          drawPanel()
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
            drawPanel()
        end
        clientStore.set("explorer2.open", "true")
        js.import("/.fs/Library/Mr-xRed/UnifiedAdvancedPanelControl.js").enableWindow(selector)
    end
}

```

```space-lua
-- ::: space-lua 2 :::

-- ---------- BUILD HTML ---------

-- Task list html
function tasksByPage(allTasks, viewMode)
  -- Extracting tasks (all or not done)
  local queryTasks = {}  
  if allTasks then
    queryTasks = query[[from index.tag 'task' order by page, pos]]
  else
    queryTasks = query[[from index.tag 'task' where not done order by page, pos]]
  end

   -- tasks with page break
  local pageTasks = {}  
  for task in queryTasks do
    if not pageTasks[task.page] then
      pageTasks[task.page] = {}
    end
    table.insert(pageTasks[task.page], task)
  end

  -- Build html via templates
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

  return html
end

-- ---------- TEMPLATES ---------

-- Global templates
local pageTasksPerPageTemplate = template.new[==[
${formatPage(pageName .. " (" .. #tasks .. ")")}
${template.each(tasks, templates.taskItem3)}
]==]

local pageTasksTemplate = template.new[==[
${template.each(tasks, templates.taskItem3)}
]==]

-- Task template
templates.taskItem3 = template.new([==[ ${ formatTask(ref .. "###" .. tostring(done) .. "###" .. text)} ]==])

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

  local ICONS = {
    arrowup = '<svg class="icon-svg" style="width: 1em; height: 1em; vertical-align: middle;"><use href="/.fs/Library/baudogit/lucide-icons.svg#green-icon"></use></svg>',
    arrowleft = '<svg class="icon-svg" style="width: 1em; height: 1em; vertical-align: middle;"><use href="/.fs/Library/baudogit/lucide-icons.svg#blue-icon"></use></svg>'  
  }
    -- Checking that the string is not empty or null
    if not taskString or taskString == "" then
        return ""
    end

    -- Extracting the reference with separator ###
    local reference = ""
    local done = "false"
    local tempString = taskString
    local sepPos = taskString:find("###", 1, true)


    if sepPos then
        reference = taskString:sub(1, sepPos - 1)
        local remaining = taskString:sub(sepPos + 3)

        -- Find the second separator ###
        local sepPos2 = remaining:find("###", 1, true)
        if sepPos2 then
            done = remaining:sub(1, sepPos2 - 1)
            tempString = remaining:sub(sepPos2 + 3)
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

    -- Building HTML
    local divClass = 'sb-TaskExplorer-div-task'
    if done == "true" then
        divClass = divClass .. ' cm-task-checked'
    end
    local html = '<div class="' .. divClass .. '">'

    -- Label with clickable link
    local nextRef = reference
    if reference:find("@", 1, true) then
        nextRef = reference:gsub("@(%d+)", function(num)
            return "@" .. tostring(tonumber(num) + 2)
        end)
    end

    html = html .. '<span class="sb-list sb-task">'

    -- Only add the link if the reference contains an @
    -- (this must always be the case)
    if reference:find("@", 1, true) then      
      
      -- depending on the option chosen to open the task page
      local optionView = clientStore.get("explorer2.disableFilter")
      if optionView == "true" then
        html = html .. '<span onclick="openWithUnifiedPanel(\'' .. reference .. '\')" style="cursor: pointer">' .. ICONS.arrowup .. '</span> '
      else
          html = html .. '<span onclick="syscall(\'editor.navigate\', \'' .. nextRef .. '\', false, false)" style="cursor: pointer">' .. ICONS.arrowleft .. '</span> '
      end
    else
        html = html .. escapeHtml(displayName) .. ' '
    end

    html = html .. label
    html = html .. '</span><br />'

    -- Attributes
    for _, attr in ipairs(attributes) do
        --js.log("Ajout attribut sans \\n")
        html = html .. '<span class="sb-list sb-task"> </span>'
        html = html .. '<span class="sb-attribute" data-' .. attr.key .. '="' .. escapeHtml(attr.value) .. '">'
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">[</span>'
        html = html .. '<span class="sb-list sb-frontmatter sb-atom">' .. escapeHtml(attr.key) .. '</span>'
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">: </span>'
        html = html .. '<span class="sb-list sb-frontmatter">' .. escapeHtml(attr.value) .. '</span>'
        html = html .. '<span class="sb-list sb-frontmatter sb-meta">]</span>'
        html = html .. '</span>'
    end

    html = html .. "</div>"

    return html
end

```
