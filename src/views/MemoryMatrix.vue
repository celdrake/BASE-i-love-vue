<template>
  <div class="memory-matrix">
    <game-info />
    <game-box />
  </div>
</template>

<script>
// @ is an alias to /src
import GameInfo from '@/components/GameInfo.vue'
import GameBox from '@/components/GameBox.vue'

export default {
  name: 'home',
  components: {
    GameInfo,
    GameBox,
  }
}
</script>

<style lang="scss">
  .memory-matrix {

  }
</style>
