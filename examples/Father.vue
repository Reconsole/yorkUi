<template>
  <div>
    <button @click="handleClick">
      触发事件
    </button>
    <Demo />
  </div>
</template>
<script>
import Emitter from '../src/mixins/emitter'
import Demo from './demo'
export default {
  name: 'ComponentA',
  components: {
    Demo
  },
  mixins: [Emitter],
  created () {
    this.$on('on-close', () => {console.log('hello world')})
  },
  methods: {
    handleClick () {
      this.broadcast('ComponentB', 'on-message', 'Hello Vue.js')
    }
  }
}
</script>
