<template>
    <div class="wrapper">
        <div class="header">
            <h3>{{ symbol }}</h3>
        </div>
        <div class="content">
            <div class="table">
                <h3>Bids</h3>
                <v-table
                    fixed-header
                    height="600px"
                >
                <thead>
                    <tr>
                        <th class="text-left">Price</th>
                        <th class="text-left">Amount</th>
                        <th class="text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in this.bids" :key="index">
                        <td>{{ item[0] }}</td>
                        <td>{{ item[1] }}</td>
                        <td>{{ item[0] * item[1] }}</td>
                    </tr>
                </tbody>
                </v-table>
            </div>

            <div class="table">
                <h3>Asks</h3>
                <v-table
                    fixed-header
                    height="600px"
                >
                <thead>
                    <tr>
                        <th class="text-left">Price</th>
                        <th class="text-left">Amount</th>
                        <th class="text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in this.asks" :key="index">
                        <td>{{ item[0] }}</td>
                        <td>{{ item[1] }}</td>
                        <td>{{ item[0] * item[1] }}</td>
                    </tr>
                </tbody>
                </v-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            symbol: this.$store.state.symbol,
            bids: null,
            asks: null,
            ws: null
        }
    },

    async created() {
        await this.createSnapsot();
        this.startConnection();
    },

    methods: {
        startConnection() {
            this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/${this.symbol.toLowerCase()}@depth`);
            this.ws.onmessage = async e => {
                let data = JSON.parse(e.data);
                let [asksCreated, bidsCreated] = [
                    data.a.filter(item => item[1] != 0),
                    data.b.filter(item => item[1] != 0)
                ];
                this.asks.splice(this.asks.length - asksCreated.length, asksCreated.length);
                this.bids.splice(this.bids.length - bidsCreated.length, bidsCreated.length);
                this.asks = [...asksCreated, ...this.asks, ];
                this.bids = [...bidsCreated, ...this.bids, ];
            }
        },

        async createSnapsot() {
            const axios = require('axios');
            let snapshot = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${this.symbol}&limit=500`);
            this.bids = snapshot.data.bids.reverse();
            this.asks = snapshot.data.asks.reverse();
        }
    }
}
</script>

<style lang="scss">
h3 {
    margin-left: 16px;
}
.content {
    display: flex;
    flex-direction: row;
    max-width: 1000px;

    margin-top: 50px;

    .v-table--fixed-height .v-table__wrapper {
        overflow-y: hidden;
        min-width: 500px;

        &:hover {
            overflow-y: auto;
        }

        &:first-child {
            margin-right: 50px;
        }
    }
}

@media screen and (max-width: 1100px){
    .content{
        .v-table--fixed-height .v-table__wrapper {
            overflow-y: hidden;
            max-width: 300px;
            max-height: 500px;

            &:hover {
                overflow-y: auto;
            }
        }
    }
}

@media screen and (max-width: 1024px){
    .content{
        .v-table--fixed-height .v-table__wrapper {
            overflow-y: auto;
            max-width: 300px;
            max-height: 500px;
        }
    }
}

@media screen and (max-width: 820px){
    .content{
        flex-direction: column;

        .v-table--fixed-height .v-table__wrapper {
            overflow-y: auto;
            max-width: 300px;
            max-height: 400px;

            &:first-child {
                margin-bottom: 90px;
            }
        }
    }
}

@media screen and (max-width: 525px){
    .content{
        flex-direction: column;

        .v-table--fixed-height .v-table__wrapper {
            overflow-y: auto;
            width: 150px;
            max-height: 400px;

            &:first-child {
                margin-bottom: 90px;
            }
        }
    }
}
</style>