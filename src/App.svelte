<script>
    import { setContext } from "svelte"
    import { useMachine } from "svelte-xstate"
    import searchMachine from "./machines/searchSymbol"
    import stockMachine from "./machines/stockTracking"
    import Search from "./components/Search/Search.svelte"
    import StocksContainer from "./components/Tracking/StocksContainer.svelte"

    let [stocksState, sendToStocks] = useMachine(stockMachine)
    let [searchState, sendToSearch] = useMachine(searchMachine)
    setContext("machines", {
        stocks: [stocksState, sendToStocks],
        search: [searchState, sendToSearch],
    })
</script>

<main class="ui container">
    <Search
        on:selected={(e) => {
            console.log("add", e.detail)
            sendToStocks("add", e.detail.value)
        }}
    />
    <StocksContainer />
</main>

<style>
    main {
        font-family: sans-serif;
        text-align: center;
    }
</style>
