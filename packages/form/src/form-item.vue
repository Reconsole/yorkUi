<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '../../../src/mixins/emitter'
import AsyncValidator from 'async-validator'
export default {
  name: 'FormItem',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    rules: {
      type: [Array],
      default: () => {}
    }
  },
  data () {
    return {
      isRequired: false,
      validateState: '', //校验状态
      validateMessage: '' //校验不通过时的信息
    }
  },
  computed: {
    fieldValue () {
      return this.form.model[this.prop]
    }
  },
  mounted () {
    // 需要做校验 要缓存不做校验不缓存
    if (this.prop) {
      this.dispatch('Form', 'on-form-item-add', this)
      this.initialValue = this.fieldValue
      this.setRules()
    }
   
  },
  beforeDestroy () {
    this.dispatch('Form', 'on-form-item-remove', this)
  },
  methods: {
    setRules () {
      let rules = this.getRules()
      if (rules.length) {
        rules.every(rule => {this.isRequired = rule.required})
      }
      this.$on('on-form-change', this.onFieldChange)
      this.$on('on-form-blur', this.onFieldBlur)
    },
    getRules () {
      //  从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : this.rules
      return [].concat(formRules || [])
    },
    getFilterRule (trigger) {
      // 仅支持blur change
      let rules = this.getRules()
      return rules.filter(
        rule => !trigger || rule.trigger.indexOf(trigger) !== -1
      )
    },
    validate (trigger, callback) {
      let rules = this.getFilterRule(trigger)
      if (!rules || rules.length === 0) {
        //即不需校验
        return true
      }
      // 状态校验中
      this.validateState = 'validating'
      let descriptor = {}
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      let model = {}
      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        console.log(errors, '2333')
        callback(this.validateMessage)
      })
    },
    resetField () {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
    },
    onFieldChange () {
      this.validate('change')
    },
    onFieldBlur () {
      this.validate('blur', (c) => {
        console.log(c)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.i-form-item-label-required:before {
  content: '*';
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>
