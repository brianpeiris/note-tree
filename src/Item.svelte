<svelte:options accessors={true} />

<script>
  import { onMount, afterUpdate } from "svelte";
  import { modes } from "./constants.js";

  export let item = null;
  export let mode = null;
  export let focusedId = null;
  export let noteEls = null;
  export let textarea = null;

  function changeNote(val) {
    item.content = val;
  }

  onMount(() => {});
  afterUpdate(() => {
    if (focusedId === item.id) textarea.focus();
    if ("selectionStart" in item) {
      textarea.selectionStart = textarea.selectionEnd = item.selectionStart;
      delete item.selectionStart;
    }
  });
</script>

<div id={item.id}>
  <input
    class:focused={item.id === focusedId}
    class:normal={mode === modes.normal}
    class:insert={mode === modes.insert}
    value={item.content}
    bind:this={textarea}
    on:input={(e) => changeNote(e.target.value)}
  />
  <div class="children">
    {#each item.children as child}
      <svelte:self
        {mode}
        {focusedId}
        bind:this={noteEls[child.id]}
        item={child}
        {noteEls}
      />
    {/each}
  </div>
</div>

<style>
  .children {
    margin-left: 20px;
  }
  input {
    display: block;
    width: 100%;
  }
  input.focused.normal {
    color: #0000d5;
  }
  input.focused.insert {
    color: darkgreen;
  }
</style>
