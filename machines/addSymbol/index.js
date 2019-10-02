import { Machine } from "xstate";
import * as events from "./events";
import * as states from "./states";
import * as actions from "./actions";

const machine = Machine(
  {
    id: "add_symbol",
    initial: states.IDLE,
    states: {
      [states.IDLE]: {
        initial: states.IDLE,
        states: {
          [states.IDLE]: {
            on: {
              [events.INPUT]: [
                {
                  target: states.SEARCHING,
                  guards: "search_is_long_enough"
                },
                {
                  target: states.IDLE
                }
              ]
            }
          },
          [states.SEARCHING]: {},
          [states.SUCCESS]: {},
          [states.ERROR]: {}
        }
      }
    }
  },
  {
    guards: {
      search_is_long_enough: (ctx, e) => ctx.search.length > 1
    }
  }
);
