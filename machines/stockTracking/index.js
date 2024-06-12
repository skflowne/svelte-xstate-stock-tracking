import { Machine, assign } from "xstate";

const tracking = Machine(
  {
    id: "stocks",
    initial: "idle",
    context: {
      trackedSymbols: [],
      stocks: []
    },
    states: {
      idle: {
        on: {
          add: [
            {
              actions: "addStock",
              target: "tracking"
            }
          ]
        }
      },
      tracking: {
        on: {
          remove: [
            {
              actions: "removeStock"
            },
            {
              target: "idle",
              cond: "noStocks"
            }
          ]
        }
      }
    }
  },
  {
    actions: {
      addSymbol: assign((ctx, e) => {
        const trackedSymbols = [...ctx.trackedSymbols, e.symbol];
        return {
          trackedSymbols
        };
      }),
      removeSymbol: assign((ctx, e) => {
        const trackedSymbols = ctx.trackedSymbols.filter(s => s !== e.symbol);
        return {
          trackedSymbols
        };
      })
    },
    guards: {
      noStocks: (ctx, e) => {
        return ctx.stocks.length === 0;
      },
      hasStocks: (ctx, e) => {
        return ctx.stock.length > 0;
      }
    }
  }
);

export default tracking;
