---
Maj: 05/01/2026
Objet: presentation of the script observer.js
---

Attributes allow you to qualify the status of a task, define its priority, assign it to a category, set a deadline, etc. Customizing their display with CSS styling rules makes it easier to read information when browsing pages.

# Tasks styling

## Current limitations

The CSS classes associated with task attributes do not currently allow fine-tuning of the display, for two reasons:
- the generic class "sb-frontmatter" is common to all attributes (task, list and page attributes, including attributes defined in the frontmatter)
- the attribute value, stored in a dedicated <`span`>, is not associated with a specific class
  
![[TECH/PROJETS/01/classes.png]] 
An issue was recently opened by @Zeff Hemel [https://github.com/silverbulletmd/silverbullet/issues/1740](https://github.com/silverbulletmd/silverbullet/issues/1740) to extend customization possibilities via data tags ("data-*") associated with the attribute value.

**This JS script is an interim solution, consistent with the envisioned evolution.**

## Constraint

The "real-time" injection of CSS classes into the DOM faces a difficulty: SilverBullet reconstructs the HTML code of the page at high frequency. A click on the page, gaining or losing focus, data entry, evaluating a Lua expression, etc., are all occasions for page realignment and, therefore, erasure of injected elements.

Reminder of SilverBullet's basic principle: "**the truth is in the markdown**".

# Design

To resolve this constraint, the **observer.js** script, created with Claude AI (several days of work and 30 versions), is a compromise between efficiency, simplicity, ease of configuration for the user, and minimal resource consumption.

The script is stable under tested conditions. However, it is advisable to **test carefully** with large quantities of pages or in case of intensive input. A version with debug, logs and measurements is available.

## Principle

JS tool used: the **MutationObserver**() interface.
Environment: the script runs locally, in the current client session.
Warning: if you have multiple frames open via Document Explorer, you may observe display failures, as each frame has its own session.

**CSS rules** can be applied separately to attribute names and their values. They are incorporated into the `space-lua` (NOT `space-style`) that launches the JS script.

The `space-lua` is pre-filled, as an example, with 4 attributes (date, status, attrib1, attrib2) and 3 possible values for "status". A 2nd variable lists the names of styled attributes. You can add/remove attributes, change their names, modify styled values and, of course, modify the associated styles.

CSS rules and the list of attribute names are passed as parameters to the script when it is launched. Default values (corresponding to the test page configuration) are incorporated into the JS script.
  
## Main functions

### `setupAttributeObserver()`
Traverses all tasks on the current page, marks target attributes with `data-attr-name` and `data-attr-colored`, then installs a "sentinel" observer on the first element found. The sentinel only monitors its own `data-attr-colored` attribute and triggers a global repair each time a change is detected.

### `repairAllAttributes()`
Repairs all attributes on the page in a single pass. Uses the `isFixingGlobal` flag to avoid infinite loops. Adds `data-attr-value` to allow conditional CSS styling. Automatically excludes checked tasks (`.cm-task-checked`).

### `initScript()`
Initializes the system: calls `setupAttributeObserver()`, installs a global observer to detect new DOM elements, and registers a listener on the `focus` event to reapply protection during user interactions.

![[TECH/PROJETS/01/script.png]]

# Implementation

### Repository

Both files (JS and MD) are published in a [Github](https://github.com/Baudogit/silverbullet/tree/main/Tasks%20styling) repository (no standardized procedure with Library Manager 🙁):

- **observer.js** (minimal JS of 132 lines, non-minified)
- **observer_start.md** including the `space-lua` for launching the script and CSS rules

The repository contains ==other useful files==:

- **observer_tests.md** to test your rules. The page contains 22 tasks with approximately 4 attributes each, or nearly 90 attributes, of which nearly 80 are potentially "repaired" by the observer (reminder: only 1 attribute plays the role of "sentinel")

Two previous versions of the JS script, with measurements, log and debug:
- **observer_old_avec_debug.js** old version, managing only basic rules, without arguments
- **observer_new_avec_log.js** recent version, without arguments

Documentation:
- **observer_doc.md** documentation generated with Claude AI for the previous version, without arguments
- **observer_README_EN.md** the present file

### Installation

1- retrieve `observer.js` and place it in Library (or elsewhere but, in that case, modify the path in the `space-lua` import block)
2- retrieve `observer_start.md` and integrate it into your SilverBullet space. Rename the "==lua==" block to "==space-lua==" OR copy its content into one of your `space-lua`.
3- adapt the `CSS rules` defined in the `space-lua` to your context as well as the names of the attributes to process.
4- System Reload (or Ctrl+Alt+r)

### Tips

**Input**: it is sometimes tricky to modify the content of an attribute after applying custom styles, especially when the `space-style` below (optional) is activated, and even more if structural elements are hidden. With a little practice, it works out easily. In case of difficulty, deactivate the `space-style` and/or the JS script, modify and restart.
It is recommended to add a character after the last attribute to avoid untimely (non-blocking) `lua` errors.

**Display**: in certain (very rare) circumstances, the script appears inactive. If this occurs after a startup, you need to reload the page (SilverBullet did not start the script - see console). Otherwise, click on one of the tasks and exit it to refresh the display.

**Issue**: please report your feedback in the community discourse (not github, which I don't know how to use well).

# Supplement

### Space-style

As a complement to **observer.js**, or independently of it, the `space-style` (NOT `space-lua`) below modifies the display of certain descriptive elements of tasks. The rules can be activated separately. The style block:

- hides structural elements (brackets) while keeping the colons
- removes the default background
- when the task is checked:
  - removes the "strikethrough" format
  - changes all fonts to medium gray
  - changes all backgrounds to light gray
- shows the schema to use to adapt rules per page (integration of a page subclass name defined in the frontmatter)

### Usage

Copy the block below into one of your pages.
Replace the block name (`space` with `space-style`).

````space

/* *******  CUSTOMIZE TASK ATTRIBUTES ******* */

/* *******  Structural elements ******* */

/* Hide all structural elements
, .sb-line-task .sb-frontmatter.sb-atom*/
.sb-line-task .sb-frontmatter.sb-meta {
    display: none;
}

/* *******  Display the ":" (sb-meta containing ": ") ******* */
.sb-line-task .sb-frontmatter.sb-meta:is(:has(+ .sb-frontmatter:not(.sb-meta):not(.sb-atom))) {
    display: inline;
}

/* *******  Neutralize line-through on checked values ******* */
#sb-main .cm-editor .cm-task-checked {
    text-decoration: none !important;
    font-weight: normal;
}

.cm-task-checked .sb-frontmatter{
      background: #F0F0F0; /*none;*/
      font-weight: normal;  /*bold;*/
      color:grey;
}

.cm-task-checked span.sb-task:nth-of-type(1) {
      color: grey ;
      font-weight: normal;  /*bold;*/
      background: #F0F0F0;
}

/* *******  Values ******* */

/* All values visible, without background */
.sb-line-task .sb-frontmatter:not(.sb-meta):not(.sb-atom) {
    display: inline;
    background: none; 
}

/* Personalization per page with
cssClasses created in frontmatter
(cf https://silverbullet.md/Page%20Decorations)
Example: .css-persoTask */
.css-persoTask .sb-line-task .sb-frontmatter:not(.sb-meta):not(.sb-atom){
    color: white;
    background: grey;
}

````

# Result
Example:
![[TECH/PROJETS/01/observer_tests.png]]
