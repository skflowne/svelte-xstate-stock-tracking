<script>
    export let stock = {
        symbol: "MSFT",
        company: "Microsoft",
        value: 250,
        volume: 50000,
    }

    $: console.log("stock", stock)
</script>

<div class="ui card">
    <div class="content">
        <div class="header">
            {stock.symbol}
        </div>
        <div class="meta">{stock.company}</div>
    </div>
    <div class="content">
        <div class="column">
            <div class="ui statistic">
                <div class="label">Price</div>
                <div class="value">{stock.value}</div>
            </div>
            <div class="ui statistic">
                <div class="label">Volume</div>
                <div class="value">{stock.volume}</div>
            </div>
        </div>
        <div class="ui divider"></div>
        <div class="">
            <p></p>
            <p></p>
        </div>
    </div>
</div>
