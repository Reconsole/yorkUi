<template>
  <div id="app">
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">
      提交
    </button>
  </div>
</template>

<script>
import iForm from '../packages/form/src/form'
import iFormItem from '../packages/form/src/form-item'
import iInput from '../packages/input/src/index'
export default {
  name: 'App',
  components: {
    iForm,
    iInput,
    iFormItem
  },
  data () {
    return {
      formValidate: {},
      ruleValidate: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        mail: [
          { required: true, message: '邮箱格式不能为空', trigger: 'blur' },
          { required: 'email', message: '邮箱格式不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        console.log(2333)
      }).then(res => {
        console.log(res)
      })
    }
  },
}
</script>

<style lang="scss"></style>
