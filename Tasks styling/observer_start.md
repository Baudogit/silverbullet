
```lua

-- priority: -1

-- Importer le script
local observer = js.import("/.fs/Library/observer.js")

-- Définir les attributs
local attributes =  js.tojs({
  { name = "date" },
  { name = "statut" },
  { name = "attrib1" },
  { name = "attrib2" }
})

-- Définir les styles
local styles = [[
  .sb-frontmatter[data-attr-colored="date"] { color: cyan !important; }
  .sb-frontmatter[data-attr-colored="statut"] { color: red !important; }
  .sb-frontmatter[data-attr-colored="attrib1"] { color: green !important; }
  .sb-frontmatter[data-attr-colored="attrib2"] { color: orange !important; border: thick solid #8ebf42;}

  .sb-atom[data-attr-name="date"] { color: blue; }
  .sb-atom[data-attr-name="statut"] { color: darkred; font-weight: bold; }
  .sb-atom[data-attr-name="attrib1"] { color: #E52B50; background: none;}
  .sb-atom[data-attr-name="attrib2"] { color: #720B98; background: #B2D2FF;}

  .sb-frontmatter[data-attr-colored="statut"][data-attr-value="hors délai"] {
      background-color: red !important;
      color: white !important;
      padding: 2px 6px !important;
      border-radius: 3px !important;
  }

  .sb-frontmatter[data-attr-colored="statut"][data-attr-value="en cours"] {
      background-color: orange !important;
      color: white !important;
      padding: 2px 6px !important;
      border-radius: 3px !important;
  }

  .sb-frontmatter[data-attr-colored="statut"][data-attr-value="en attente"] {
      background-color: #00C4B0 !important;
      color: white !important;
      padding: 2px 6px !important;
      border-radius: 3px !important;
  }
]]

-- Appeler la fonction avec les paramètres
observer.initObserver (styles, attributes)

````
