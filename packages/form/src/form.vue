<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Form',
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: [Object],
      default: () => {
        return {}
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    rules: [Object], 
  },
  data () {
    return {
      fields: []
    }
  },
  created () {
    this.$on('on-form-item-add', field => {
      this.fields.push(field)
    })
    this.$on('on-form-item-remove', field => {
      this.fields.splice(this.fields.indexOf(field), 1)
    })
  },
  methods: {
    resetFields () {
      this.fields.forEach(filed => {
        filed.resetField()
      })
    },
    validate (callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
