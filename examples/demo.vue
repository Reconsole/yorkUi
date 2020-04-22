<template>
  <div>
    <button @click="patch">
      dispatch
    </button>
  </div>
</template>

<script>
import Emitter from '../src/mixins/emitter'
export default {
  name: 'ComponentB',
  mixins: [Emitter],
  created () {
    this.$on('on-message', this.showMessage)
  },
  methods: {
    showMessage (text) {
      console.log(text)
    },
    patch () {
      this.dispatch('ComponentA', 'on-close', 'hello world')
    }
  }
}
</script>

<style lang="sass" scoped></style>
