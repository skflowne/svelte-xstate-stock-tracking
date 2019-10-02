<script>
  import { setContext } from "svelte";
  import { useMachine } from "svelte-xstate";
  import searchMachine from "./machines/searchSymbol";
  import stockMachine from "./machines/stockTracking";
  import Search from "./components/Search/Search.svelte";
  import StocksContainer from "./components/Tracking/StocksContainer.svelte";

  let [stocksState, sendToStocks] = useMachine(stockMachine);
  let [searchState, sendToSearch] = useMachine(searchMachine);
  setContext("machines", {
    stocks: [stocksState, sendToStocks],
    search: [searchState, sendToSearch]
  });
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<main class="ui container">
	<Search on:selected={e => { sendToStocks('add', { symbol: e.detail.value }) } } />
  <StocksContainer />
</main>