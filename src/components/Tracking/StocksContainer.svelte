<script>
    import { getContext } from "svelte"
    import StockTracker from "./StockTracker.svelte"

    let [state] = getContext("machines").stocks

    $: matchState = (parent) => (child) => {
        return parent ? $state.matches({ [parent]: child }) : $state.matches(child)
    }

    //$: console.log("stocks", $state.context)

    $: symbols = $state.context.trackedSymbols
    $: stocks = $state.context.stocks
    //const stocks = []
    //const symbols = []

    $: console.log(state)
</script>

<div class="ui cards grid column fluid container segment padded">
    {#if matchState("tracking")}
        <div class="ui message">
            <div class="header">Tracked symbols</div>
            <ul>
                {#each symbols as symbol}
                    <li>{symbol}</li>
                {/each}
            </ul>
        </div>
        {#each stocks as stock}
            <StockTracker {stock} />
        {/each}
    {/if}

    {#if matchState("nostocks")}
        <p class="ui message">No stocks tracked, use the search above to add one</p>
    {/if}
</div>
