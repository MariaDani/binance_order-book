<template>
    <div class="wrapper">
        <h3>Choose the currency</h3>
        <div class="content">
            <v-select
                label="Select"
                v-model="selected"
                :items="items"
                @update:modelValue="changeCurrency"
            ></v-select>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: '',
            items: [
                'BTCUSDT',
                'BNBBTC',
                'ETHBTC'
            ]
        }
    },

    methods: {
        changeCurrency() {
            this.$store.commit('changeCurrency', this.selected);
        },
    }
    
}
</script>

<style lang="scss" scoped>
    .content {
        max-width: 500px;

        .v-select {
            margin-left: 16px;
        }
    }

    @media screen and (max-width: 520px){
        .v-select {
            max-width: 300px;
        }
    }
</style>