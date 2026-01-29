---
library: Library/baudogit/TaskExplorer
type: documentation
subject: how to set up filters and custom where clauses
maj : 2026-01-29
files:
- Instructions_for_Task_Explorer.md
- 12.png
- 13.png
---

---

![[Library/baudogit/12.png]]
The **input box** allows you to define a ==filter== or a ==where clause== depending on the position of the **Filter/Query toggle button**. 

When the toggle button is activated or after a click in the input area, a ==menu== offers a ==selection of items== to assist you in editing `the filter` or `where clause`.

![[Library/baudogit/13.png]]
These menus can be hidden by clicking **Esc**.
To make them appear again without leaving the input area, **right-click**.
The methods for editing and executing the filter and the where clause are presented below.

---

# ⏬Filter the list

## 🎯Purpose
  ➤ ==Filter the lines of the current list.==

## 📖 Procedure
- the filter is active from the first character entered
- the filter is **updated as characters are entered**
- the filter remains active until:
  - the input area is emptied of its content
  - or by clicking the toggle button (Filter) again
  - or by executing a query
  - or by doing a reset
- the filter applies to the content of each line
- the target content is the **raw text** of the task, before applying css rules
- thus, even if the attributes are stripped of their structure ([, ] and :), or if the name of the attribute is not displayed on the line, it can still be searched
- the raw text of the task is displayed in the **tooltip** of each line
    
   ➤ The active filter is displayed **in the tooltip** of the toggle button (Filter).

## 💡Syntaxe
The syntax is simple but powerful :
- **no difference** between upper and lower case
- groups of letters separated by one or more spaces are **connected by OR**
- groups of letters separated by + or adjoining are **connected by AND**
- strings included **in double or single quotes** are searched as is
- strings included **in square brackets** like attributs are searched according to a particular model:
  - the desired pattern must start **just after** the [
  - the pattern searched after the [ must match exactly but it **may be incomplete**. So:
    
        [date:2] will find [date:2026-01-27]
        but [date:2   ] or [   date:2] will NOT find it

- the **list of all attributes** found in the lines is offered in the filter menu, as an aid to entry. When you click on an attribute item, it is pasted into the pre-formatted input box for searching.
  Example : if you select "attrib1", the pasted string will be:
  
        [attrib1: ]

> **note** Attribute-specific search pattern
>  To be applied, it is necessary that the search string and the target string are between two square brackets. The attribute name is always followed by a ":" followed by a space.

## 📌Extract then refine and filter
The filter applies to the rows present in the list, whatever their origin: default query when starting the panel, query via a custom `where clause` or refined query with a toolbar button (button “with or without completed tasks” and “button “with or without page break”).

So, you can **extract a list** with custom `where clause` (see below), then **refine and filter it**.

---

# 🔀Query the index

## 🎯Purpose
  ➤ ==Generate a new list with a custom query.==

## 🪄 Technical concepts
Rather than using the usual syntax to execute a query, it’s possible to **directly call** the `index.queryLuaObjects` function associated with `lua.parseExpression`. This will allow you to **program the where clause** and, if necessary, pass **variables** as parameters. The result can then be processed with `js.tolua`.

The syntax for queryLuaObjects function is:

    function queryLuaObjects(
      tag: string,
      query: LuaCollectionQuery,
      scopedVariables?: Record<string, any>,
      ttlSecs?: number,
    )

> **note** `scopedVariables`: variables to inject into the Lua environment
>   Variables injected via `scopeVariables` are available throughout the LIQ expression. This approach works for any collection, not just the index. Variables can be of any supported JavaScript/Lua type

The structure of a `LuaCollectionQuery` is:

      LuaCollectionQuery = {
        objectVariable?: string;      // Variable name for each element (default is: _)
        where?: LuaExpression;    // Filter condition
        orderBy?: LuaOrderBy[];   // Sorting criteria (array of LuaOrderBy objects)
        select?: LuaExpression;    // Projection of results
        limit?: number;                   // Maximum number of results
        offset?: number;                // Offset for paging
        distinct?: boolean;            // Eliminate duplicates
      };

These fields accept `LuaExpression` which can be created with `lua.parseExpression`. The function parses a character string containing a Lua expression and returns its AST (Abstract Syntax Tree).

> **note** The `LuaExpression` type can represent any valid Lua expression
>  Expressions have access to injected variables via `scopedVariables` (see: queryLuaObjects()).

> **note** Complete example:
          >   local results = index.queryLuaObjects("page", {
            objectVariable = "p",
            where = lua.parseExpression("p.lastModified > minDate and string.contains(p.name, searchTerm)"),
            orderBy = {
              { expr = lua.parseExpression("p.lastModified"), desc = true },
              { expr = lua.parseExpression("p.name"), desc = false }
            },
            select = lua.parseExpression("{ name = p.name, modified = p.lastModified }"),
            limit = 10,
            distinct = true
          }, {
            minDate = "2025-01-01",
            searchTerm = "project"
          })

`js.tolua` converts a JavaScript value to its Lua equivalent (the same as with query).

`scopedVariables` are not used in Task Explorer. On the other hand, **custom queries** use the above concepts/tools. Assistance in editing wheres clauses is offered, via **lists of items** (==properties==, ==attributes==) and pre-designed where clauses (==examples== and ==history==).

## 📖 Procedure

- the edit box allows you to write the custom `where clause`
- **do not add** the keyword "where". It will be added when the query is executed.
- objectVariable are designated by their **default name**, i.e. '_'
- character strings are entered in **single quotes**
- the logical operators are: **not, and, or**. The relational operators are: **==, <, >, <=, >=, ~=**
- assistance in writing `where clauses` is provided via several menu lists :
  
  ① the ==**list of all attributes**== found in the lines already displayed (so, if necessary, run a broad scope query first or enter manually). When the item is copied into the input zone, its formatting is adapted:
 
        _.attrib1==' '

  ② the ==**list of default task properties**== in the index. Attributes (custom objects) are not there.
    When the item is copied into the input zone, its formatting is adapted and the word “and” is added.

        _.completed==' ' and _.itags==' '

  ③ the ==**list of example where clauses**== taken from the `where-examples.txt` file. This file is freely editable to add your favorites, if necessary. It currently has 20 examples.
 
> **note** Editing `where-examples.txt`. 
>  Please respect the syntax : 5 characters before the start of the clause; all surrounded by double quotation marks and ended with a comma. Example: "01 | _.done == true",

  ④ the ==**list of history where clauses**== taken from the `where-history.txt` file. After execution, each query is logged in this file, without duplicates, and within the limit of the maximum number of lines indicated in your configuration file or 20 (default). This file is freely editable, subject to respecting the syntax identical to that of the file `where-examples.txt`.

> **note** Execute the query
>    When editing the where clause is completed, **clic on Enter** to execute the query.

- The last `where clause` used is displayed **in the tooltip** of the toggle button (Query).

## 🧩 Examples

The 20 lines are extracted of the `where-examples.txt` file (as of 2026-01-27):

````yaml

01 | _.done == true, 
02 | _.done == false, 
03 | _.done == not true or _.done == true,
04 | _.name== 'TODO', 
05 | _.name:startsWith('TODO'), 
06 | _.page.match('^TECH'), 
07 | _.attrib2 == '2025-12-27', 
08 | (_.page.match('^DOCS') or _.page.match('^Library')), 
09 | _.text.endsWith(']'),
10 | some(_.state) ~= nil,
11 | some(_.completed) ~= nil and string.sub(_.completed,1,10) == os.date('%Y-%m-%d'),
12 | some(_.completed) ~= nil and getDayWeek(string.sub(_.completed,1,10)) == 'Tuesday',
13 | some(_.attrib1) ~= nil and string.sub(_.attrib1,1,10) <= '2026-01-01',
14 | table.includes(_.itags, 'test'),
15 | type(_.itags[2]) == 'nil',
16 | rawget(_.itags, 2) ~= nil,
17 | select(#, table.unpack(_.itags)) > 1,
18 | (function() local c=0 for _ in pairs(_.itags) do c=c+1 end return c end)() == 1,
19 | rawget(_.itags, 2) == nil and rawget(_.itags, 1) ~= nil,
20 | (toPos - pos) > 100,

````

Commentary on some examples:

| N° | Comment |
|----------|----------|
| 03 | For the fun: all the tasks ! |
| 05 | Use a **method** |
| 06 - 08 - 09 | Use a **function** silverbullet |
| 10 - 11 - 12 - 13 | Use of “**some()~= nil**” to exclude values not specified. Otherwise, the ...|
| 10 - 11 - 12 - 13 | ... following test (after the “and”) fails and crashes the query. |
| 11 - 12 - 13 | When using string.sub(): if a limit is not included in a value, the query crashes ! |
| 11 | **os.date** () to compare the value of an attribute formatted in date. Unfortunately, ... |
| 11 | ... os.time cannot be used. You have to use an external function |
| 12 | getDayWeek() is an **external function**, defined in another space-lua  |
| 14 - 15 - 16 - 17 | Multiple ways to refer to a subscripted value in a table or collection |
| 14 | **table.includes**() to search for a channel in a table or a collection  |
| 16 |**rawget**() accesses a table index without invoking metamethods (ex: itags). |
| 17 | **select**(#, table.unpack( ... applies the function to each value, before checking the test |
| 18 | frankly, a **function in the where**! |

## 📌Default query

A ==**default query**== can be defined to limit the query scope when Task Explorer is launched. If one exists (in the configuration file), it will be systematically executed during a **new SilverBullet session**. It is possible to indicate that this request will also be systematically executed at each reset **via the Reset button**.

This query will be **logged during its execution**, so that it is easy to recall it during the session (within the number of lines in the history).

If **no default query** is set, Task Explorer runs a query equivalent to:

      query[[from index.tag 'task' order by page, pos]]

