<template>
  <input 
    v-model="currentValue"
    type="text"
    @blur="handleBlur"
  >
</template>

<script>
import Emitter from '../../../src/mixins/emitter'
export default {
  mixins: [ Emitter ],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        this.$emit('input', nv)
        this.dispatch('FormItem', 'on-form-change', nv)
      }
    }
  },
  methods: {
    handleBlur (evt) {
      this.dispatch('FormItem', 'on-form-blur', evt.target.value)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>