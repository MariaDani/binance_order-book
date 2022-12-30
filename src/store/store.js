import { createStore } from "vuex";

export default createStore({
    state: {
        symbol: 'BTCUSDT'
    },

    mutations: {
        changeCurrency(state, sym) {
            state.symbol = sym;
        }
    }
})