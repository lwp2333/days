<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <van-field v-model="form.name" label="用户名：" :rules="[{ required: true, message: '请输入用户名' }]" />
      <van-field v-model.number="form.age" type="digit" label="年龄：" :rules="[{ required: true, message: '请输入年龄' }]" />
      <van-field label="性别：" :rules="[{ required: true, message: '请选择性别' }]">
        <template #input>
          <van-radio-group v-model="form.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="标签：" :rules="[{ required: true, message: '请选择标签' }]">
        <template #input>
          <van-checkbox-group v-model="form.tags" direction="horizontal">
            <van-checkbox shape="square" v-for="(item, index) in tagsOptions" :name="item" :key="index">
              <van-tag mark :type="tagType[index % 3]" :key="index">{{ item }}</van-tag>
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <van-field
        v-model="form.description"
        rows="2"
        autosize
        label="描述："
        type="textarea"
        :rules="[{ required: true, message: '请输入描述' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { createUser } from '@/api/user'
import { tagsOptions } from '@/common/options/tags'
export default {
  name: 'UserDetail',
  components: {},
  data: function() {
    return {
      form: {
        name: '',
        age: '',
        description: '',
        sex: ''
      },
      tagType: ['primary', 'success', 'warning'],
      tagsOptions
    }
  },
  created: function() {},
  computed: {},
  methods: {
    onSubmit: function() {
      createUser(this.form)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  min-height: 80vh;
  position: relative;
}
/deep/.van-checkbox--horizontal {
  width: 32vw;
  margin-right: 0;
  margin-bottom: 12px !important;
}
</style>
