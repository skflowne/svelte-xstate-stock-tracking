<script>
  import { onDestroy, getContext } from "svelte";
  import { Subject } from "rxjs";
  import { debounceTime, map } from "rxjs/operators";
  import * as events from "../../machines/searchSymbol/events";
  import * as states from "../../machines/searchSymbol/states";
  import Results from "./Results";

  let machines = getContext("machines");
  let [state, send] = machines.search;

  let keyUpEvents = new Subject().pipe(
    debounceTime(300),
    map(e => e.target.value)
  );

  keyUpEvents.subscribe(value => send(events.INPUT, { value }));

  onDestroy(() => {
    keyUpEvents.unsubscribe();
  });

  $: search = $state.context.search;
  $: results = $state.context.results[search] || [];
  $: error = $state.context.error;

  $: matchState = parent => state => {
    return !parent ? $state.matches(state) : $state.matches({ [parent]: state });
  };

  $: matchResultsState = name => {
    const match = matchState(states.RESULTS)(name);
    console.log("match", name, match);
    return match;
  };

  const updateSearch = e => {
    keyUpEvents.next(e);
  };

  const resetSearch = e => {
    send(events.INPUT, { value: "" });
  };

  $: console.log("results", results);
  $: console.log("error", error);
</script>

<style>
</style>

<div class="ui fluid form">
  <div class="ui compact info tiny message">
    <div class="header">Current state</div>
    {$state.toStrings()}
  </div>
  <div class="ui field">
    <div class="ui left icon input" class:error={matchResultsState(states.ERROR)} class:loading={matchResultsState(states.SEARCHING)}>
      <i class="search icon"></i>
      <input value={search} placeholder="Symbol or company name..." on:input={updateSearch} />
      {#if !matchResultsState(states.IDLE)}
        <button class="ui icon button" on:click={resetSearch}>
          <i class="times circle icon"></i>
        </button>
      {/if}
      {#if matchResultsState(states.ERROR)}
        <div class="ui pointing red basic label">Error: {error.message}</div>
      {/if}
    </div>
  </div>
  
  {#if matchResultsState(states.SUCCESS)}
    <Results {results} on:selected />
  {/if}
</div>