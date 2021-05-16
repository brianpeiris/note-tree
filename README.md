# note-tree [![tests](https://github.com/brianpeiris/note-tree/actions/workflows/tests.yml/badge.svg)](https://github.com/brianpeiris/note-tree/actions/workflows/tests.yml)

https://brianpeiris.github.io/note-tree/

A simple app for notes and tasks in a nested tree. Inspired by vim, emacs org mode, and workflowy.

note-tree is modal like vim, with a "normal" mode for tree and cursor manipulation and an "insert" mode for text insertion.

## keyboard bindings

|binding|action|
|-:|-|
|`i`|enter insert mode|
|`ctrl-[`|return to normal mode|
|`j`|move to next item|
|`k`|move to previous item|
|`J`|move item down|
|`K`|move item up|
|`o`|add item below|
|`O`|add item above|
|`>>`|make item a child of previous item|
|`dd`|delete item|
|`f`|focus sub-tree|
|`u`|focus parent tree|
|`gg`|move to first item|
|`I`|enter insert mode at first word of text|
|`a`|enter insert mode after character|
|`A`|enter insert mode at end of text|
|`0`|move cursor to beginning of text|
|`^`|move cursor to beginning of first word|
|`$`|move cursor to end of text|
|`b`|move cursor back one word|
|`w`|move cursor forward one word|
|`e`|move cursor to end of word|
|`h`|move cursor to left|
|`l`|move cursor to right|
|`x`|delete character|
|`s`|delete character and enter insert mode|
|`D`|delete to end of text|
|`C`|delete to end of text and enter insert mode|
