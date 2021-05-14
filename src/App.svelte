<script>
  import { onMount } from "svelte";
  import { firstIndexOf, lastIndexOf } from "./strings.js";
  import { randomId } from "./items.js";
  import Item from "./Item.svelte";

  export let items = null;

  const modes = { normal: Symbol.for("normal"), insert: Symbol.for("insert") };
  let mode = modes.normal;

  let focused = items[0];
  let noteEls = {};

  let action = null;

  const motions = {
    moveTo(el, index) {
      el.selectionStart = el.selectionEnd = index;
    },
    start: (el) => {
      motions.moveTo(el, 0);
    },
    firstChar: (el) => {
      const firstCharMatch = el.value.match(/\S/);
      if (firstCharMatch) {
        motions.moveTo(el, firstCharMatch.index);
      }
    },
    forward: (el) => {
      motions.moveTo(el, el.selectionStart + 1);
    },
    forwardWord: (el) => {
      const index = firstIndexOf(el.value, /\s\b/g, el.selectionStart);
      if (index !== null) {
        motions.moveTo(el, index + 1);
      }
    },
    endWord: (el) => {
      const index = firstIndexOf(el.value, /\b\s/g, el.selectionStart + 1);
      if (index !== null) {
        motions.moveTo(el, index - 1);
      } else {
        motions.moveTo(el, el.value.length - 1);
      }
    },
    backWord: (el) => {
      const index = lastIndexOf(el.value, /\s\b/g, el.selectionStart - 1);
      if (index !== null) {
        motions.moveTo(el, index + 1);
      } else {
        motions.moveTo(el, 0);
      }
    },
  };

  function handleKey(e) {
    console.log(e.key);
    if (mode === modes.normal) {
      let handled = true;
      const noteEl = noteEls[focused.id].textarea;
      switch (action || e.key) {
        case "j":
          {
            if (focused.children.length) {
              focused = focused.children[0];
            } else {
              const index = focused.arr.indexOf(focused);
              if (index === focused.arr.length - 1) {
                if (focused.parent) {
                  let curr = focused;
                  let next;
                  do {
                    curr = curr.parent;
                    next = curr.arr[curr.arr.indexOf(curr) + 1];
                  } while (!next);
                  focused = next;
                }
              } else {
                focused = focused.arr[index + 1];
              }
            }
          }
          break;
        case "J":
          {
            const arr = focused.arr;
            const index = arr.indexOf(focused);
            if (index === arr.length - 1) break;
            const temp = focused;
            arr[index] = arr[index + 1];
            arr[index + 1] = temp;
            items = items;
          }
          break;
        case "k":
          {
            const index = focused.arr.indexOf(focused);
            if (index === 0) {
              if (focused.parent) {
                focused = focused.parent;
              }
            } else {
              const prev = focused.arr[index - 1];
              if (prev && prev.children.length) {
                let curr = prev;
                do {
                  curr = curr.children[curr.children.length - 1];
                } while (curr.children.length);
                focused = curr;
              } else {
                focused = prev;
              }
            }
          }
          break;
        case "K":
          {
            const arr = focused.arr;
            const index = arr.indexOf(focused);
            if (index === 0) break;
            const temp = focused;
            arr[index] = arr[index - 1];
            arr[index - 1] = temp;
            items = items;
          }
          break;
        case "O":
          {
            const newItem = {
              id: randomId(),
              content: "",
              arr: focused.arr,
              parent: focused.parent,
              children: [],
            };
            focused.arr.splice(focused.arr.indexOf(focused), 0, newItem);
            focused = newItem;
            mode = modes.insert;
            items = items;
          }
          break;
        case "o":
          {
            const newItem = {
              id: randomId(),
              content: "",
              arr: focused.arr,
              parent: focused.parent,
              children: [],
            };
            focused.arr.splice(focused.arr.indexOf(focused) + 1, 0, newItem);
            focused = newItem;
            mode = modes.insert;
            items = items;
          }
          break;
        case "^":
          motions.firstChar(noteEl);
          break;
        case "0":
          motions.moveTo(noteEl, 0);
          break;
        case "$":
          motions.moveTo(noteEl, noteEl.value.length - 1);
          break;
        case "b":
          motions.backWord(noteEl);
          break;
        case "w":
          motions.forwardWord(noteEl);
          break;
        case "e":
          motions.endWord(noteEl);
          break;
        case "h":
          motions.moveTo(noteEl, noteEl.selectionStart - 1);
          break;
        case "l":
          motions.moveTo(noteEl, noteEl.selectionStart + 1);
          break;
        case "x":
          {
            const el = noteEl;
            const { value, selectionStart } = el;
            focused.content =
              value.substring(0, el.selectionStart) +
              value.substring(el.selectionStart + 1);
            items = items;
            focused.selectionStart = selectionStart;
          }
          break;
        case "s":
          {
            const el = noteEl;
            const { value, selectionStart } = el;
            el.value =
              value.substring(0, el.selectionStart) +
              value.substring(el.selectionStart + 1);
            motions.moveTo(el, selectionStart);
            mode = modes.insert;
          }
          break;
        case "C":
          focused.content = focused.content.substring(0, noteEl.selectionStart);
          mode = modes.insert;
          items = items;
          break;
        case "i":
          mode = modes.insert;
          break;
        case "I":
          motions.firstChar(noteEl);
          mode = modes.insert;
          break;
        case "a":
          motions.forward(noteEl);
          mode = modes.insert;
          break;
        case "A":
          motions.moveTo(noteEl, noteEl.value.length);
          mode = modes.insert;
          break;
        case "g":
          if (!action) {
            action = "g";
            break;
          }
          if (e.key === "g") {
            focused = items[0];
          }
          action = null;
          break;
        case ">":
          if (!action) {
            action = ">";
            break;
          }
          if (e.key === ">") {
            const index = focused.arr.indexOf(focused);
            focused.arr.splice(index, 1);
            const prev = focused.arr[index - 1];
            prev.children.push(focused);
            focused.arr = prev.children;
            focused.parent = prev;
            items = items;
          }
          action = null;
          break;
        case "d":
          if (!action) {
            action = "d";
            break;
          }
          if (e.key === "d") {
            const arr = focused.arr;
            const index = arr.indexOf(focused);
            arr.splice(index, 1);
            if (arr.length) {
              focused = arr[Math.min(arr.length - 1, index)];
            } else {
              focused = focused.parent;
            }
            items = items;
          }
          action = null;
          break;
        case "F5":
          handled = false;
      }
      if (handled) {
        e.preventDefault();
      }
    } else if (mode === modes.insert) {
      switch (e.key) {
        case "[":
          if (e.ctrlKey) {
            e.preventDefault();
            mode = modes.normal;
          }
          break;
      }
    }
  }

  onMount(() => {});
</script>

<main>
  <div
    class="mode"
    class:normal={mode === modes.normal}
    class:insert={mode === modes.insert}
  />
  <div class="items" on:keydown={handleKey}>
    {#each items as item, i}
      <Item
        focusedId={focused.id}
        bind:this={noteEls[item.id]}
        {item}
        {noteEls}
      />
    {/each}
  </div>
</main>

<style>
  :global(body) {
    display: flex;
    justify-content: center;
  }
  main {
    display: grid;
    grid-template-columns: 20px auto;
  }
  .items {
    width: 500px;
  }
  .mode {
    width: 10px;
    margin-right: 10px;
  }
  .mode.normal {
    background: lightblue;
  }
  .mode.insert {
    background: lightgreen;
  }
</style>
