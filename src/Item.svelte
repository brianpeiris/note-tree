<svelte:options accessors={true} />

<script>
  import { onMount, afterUpdate } from "svelte";

  export let item = null;
  export let focusedId = null;
  export let noteEls = null;
  export let textarea = null;

  function changeNote(val) {
    item.content = val;
  }

  onMount(() => {
    console.log("mount", item.id, item.content);
  });
  afterUpdate(() => {
    if (focusedId === item.id) textarea.focus();
  });
</script>

<main>
  <div id={item.id}>
    <textarea
      class:focused={item.id === focusedId}
      value={item.content}
      bind:this={textarea}
      on:input={(e) => changeNote(e.target.value)}
    />
    <div class="children">
      {#each item.children as child}
        <svelte:self focusedId={focusedId} bind:this={noteEls[child.id]} item={child} {noteEls} />
      {/each}
    </div>
  </div>
</main>

<style>
  .children {
    margin-left: 10px;
  }
  .focused {
    outline: 1px solid red;
  }
  textarea {
    display: block;
    width: 100%;
  }
</style>
