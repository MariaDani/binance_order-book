<template>
  <div class="app">
    <TabHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import TabHeader from './components/TabHeader.vue';

export default {
  components: { TabHeader },
  data() {
    return {
    
    }
  }
}
</script>