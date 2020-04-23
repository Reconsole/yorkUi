<template>
  <div>
    <input 
      type="text"
      :value="currentValue"
      @input="handleInput"
      @blur="handleBlur"
    >
  </div>
</template>

<script>
import Emitter from '../../../src/mixins/emitter'
export default {
  name: 'IInput',
  mixins: [ Emitter ],
  inject: ['form'],
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (nv) {
      this.currentValue = nv
    }
  },
  methods: {
    handleInput (evt) {
      const value = evt.target.value
      this.currentValue = value
      this.$emit('input', value)
    },
    handleBlur (evt) {
      this.dispatch('iFormItem', 'on-form-blur', this.currentValue)
    }
  }
}
</script>

<style lang="sass" scoped></style>
