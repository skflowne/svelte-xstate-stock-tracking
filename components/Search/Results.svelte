<script>
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();

  export let hidden = false;
  export let results;
</script>

<div class="results ui container fluid">
  {#if results.length}
    <div class="ui middle aligned selection list segment">
        {#each results as match}
        <div class="button item" on:click={e => dispatch("selected", { value: match }) }>
          <span class="symbol ui horizontal label">{match.symbol}</span>
          <span class="name">{match.name}</span>
        </div>
      {/each}
    </div>
  {:else}
  
    <div class="ui icon message">
      <i class="times circle icon"></i>
      <div class="content left">
        <div class="header">
          Oops
        </div>
        <p>Nothing was found</p>
      </div>
    </div>
   
  {/if}
</div>

 