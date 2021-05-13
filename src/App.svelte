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

  const ll = {
  }


  function handleKey(e) {
    if (mode === modes.normal) {
      let handled = true;
      const noteEl = noteEls[focused.id].textarea;
      switch (e.key) {
        case "j":
        if (focused.children.length) focused = focused.children[0];
        else {
        const arr = focused.parent
        }
          if (!focused.next) break;
          focused = focused.next;
          break;
        case "J":
          {
            const swapa = focused;

            const arr = swapa.parent ? swapa.parent.children : items;
            const index = arr.indexOf(swapa);
            if (index === arr.length - 1) break;

            const swapb = swapa.next;
            const next = swapb.next;

            swapa.next = next;

            swapb.next = swapa;

            const prev = swapa.prev;
            if (prev) {
              swapa.prev = swapb;
              swapb.prev = prev;
              prev.next = swapb;
            }

            next.prev = swapa;

            const temp = arr[index];
            arr[index] = arr[index + 1];
            arr[index + 1] = temp;

            items = items;
          }
          break;
        case "k":
          if (!focused.prev) break;
          focused = focused.prev;
          noteEls[focused.id].textarea.focus();
          break;
        case "K":
          {
            const temp = items[focused];
            items[focused] = items[focused - 1];
            items[focused - 1] = temp;
            focused--;
            noteEl.focus();
          }
          break;
        case "O":
          {
            const temp = focused.prev;
            focused.prev = {id: randomId(), content: "", parent: focused.parent, children: [], prev: temp, next: focused};
            temp.next = focused.prev;
            focused = focused.prev;
            const arr = focused.parent ? focused.parent.children : items;
            arr.splice(arr.indexOf(focused.next), 0, focused);
            items = items;
            mode = modes.insert;
          }
          break;
        case "o":
          {
            const temp = focused.next;
            focused.next = {id: randomId(), content: "", parent: focused.parent, children: [], prev: focused, next: temp};
            if (temp) temp.prev = focused.next;
            focused = focused.next;
            const arr = focused.parent ? focused.parent.children : items;
            arr.splice(arr.indexOf(focused.prev) + 1, 0, focused);
            items = items;
            mode = modes.insert;
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
            items[focused].content =
              value.substring(0, el.selectionStart) +
              value.substring(el.selectionStart + 1);
            // TODO: Shouldn't have to use setTimeout here.
            // selectionStart should probably be managed state
            setTimeout(() => motions.moveTo(el, selectionStart));
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

  onMount(() => {
    console.log(noteEls, items);
  });
</script>

<main>
  <div
    class="mode"
    class:normal={mode === modes.normal}
    class:insert={mode === modes.insert}
  />
  <div on:keydown={handleKey}>
    {#each items as item, i}
      <Item focusedId={focused.id} bind:this={noteEls[item.id]} {item} {noteEls} />
    {/each}
  </div>
</main>

<style>
  .mode {
    height: 10px;
    margin-bottom: 10px;
  }
  .mode.normal {
    background: lightblue;
  }
  .mode.insert {
    background: lightgreen;
  }
</style>
