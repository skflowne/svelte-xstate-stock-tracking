import { Machine, assign } from "xstate"
import * as events from "./events"
import * as states from "./states"
import * as actions from "./actions"
import axios from "axios"

const source = axios.CancelToken.source()

const machine = Machine(
    {
        id: "search",
        initial: states.RESULTS,
        context: {
            results: {},
            search: "",
            error: null,
        },
        states: {
            [states.RESULTS]: {
                on: {
                    [events.INPUT]: {
                        target: `${states.RESULTS}.${states.SEARCH}`,
                        actions: "updateSearch",
                    },
                },
                initial: states.IDLE,
                states: {
                    [states.IDLE]: {},
                    [states.SEARCH]: {
                        on: {
                            "": [
                                { target: states.SUCCESS, cond: "searchResultsExist" },
                                { target: states.SEARCHING, cond: "searchIsValid" },
                                { target: states.IDLE },
                            ],
                        },
                    },
                    [states.SEARCHING]: {
                        invoke: {
                            id: "searchSymbol",
                            src: (ctx, e) => {
                                if (ctx.runningCall) {
                                    source.cancel("Canceled search symbol promise")
                                }
                                return actions.searchSymbols(ctx.search, {
                                    cancelToken: source.token,
                                })
                            },
                            onDone: {
                                target: states.SUCCESS,
                                actions: assign((ctx, e) => {
                                    return {
                                        results: {
                                            ...ctx.results,
                                            [ctx.search]: e.data,
                                        },
                                    }
                                }),
                            },
                            onError: {
                                target: states.ERROR,
                                actions: assign((ctx, e) => {
                                    return {
                                        error: e.data,
                                    }
                                }),
                            },
                        },
                    },
                    [states.SUCCESS]: {},
                    [states.ERROR]: {},
                },
            },
        },
    },
    {
        actions: {
            updateSearch: assign((ctx, e) => {
                console.log("update search", e.value)
                return {
                    search: e.value,
                }
            }),
        },
        guards: {
            searchIsValid: (ctx, e) => {
                return ctx.search.trim().length > 1
            },
            searchResultsExist: (ctx, e) => {
                return ctx.results[ctx.search]
            },
        },
    }
)

export default machine
