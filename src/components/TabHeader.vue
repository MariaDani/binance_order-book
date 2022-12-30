<template>
  <v-tabs
      align-tabs = "start"
      bg-color="indigo-darken-2"
      class = "header-tab"
    >
      <v-tab @click="$router.push('/')">
        Order Book
      </v-tab>

      <v-tab @click="$router.push('/currency')">
        Cryptocurrencies
      </v-tab>
   
    </v-tabs>
    
</template>
  
  <script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      
    }
  }
  </script>

  <style lang="scss">
  .header-tab {
    margin-bottom: 50px;
  }
  .v-btn__content {
    padding: 0 16px;
  }
  

  @media screen and (max-width: 420px){
    .v-btn__content {
      font-size: 12px;
      padding: 0 7px;
    }
  }
  </style>