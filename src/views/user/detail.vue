<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <van-field label="头像" required :rules="[{ required: true, message: '请上传头像' }]">
        <template #input>
          <van-uploader
            v-model="form.avatar"
            multiple
            upload-text="上传头像"
            result-type="file"
            :max-size="500 * 1024"
            :max-count="1"
            @oversize="onOversize"
            :after-read="afterRead"
          />
        </template>
      </van-field>
      <van-field
        v-model="form.name"
        required
        label="昵称："
        maxlength="6"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请输入昵称' }]"
      />
      <van-field
        v-model="form.age"
        required
        type="digit"
        label="年龄："
        maxlength="2"
        placeholder="请输入年龄"
        :rules="[{ required: true, message: '请输入年龄' }]"
      />
      <van-field label="性别：" required :rules="[{ required: true, message: '请选择性别' }]">
        <template #input>
          <van-radio-group v-model="form.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="标签：" required :rules="[{ required: true, message: '请选择标签' }]">
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
        required
        label="描述："
        placeholder="请输入描述"
        type="textarea"
        maxlength="20"
        show-word-limit
        :rules="[{ required: true, message: '请输入描述' }]"
      />
      <div class="action">
        <van-button round block color="linear-gradient(to right, #667eea, #764ba2)" native-type="submit">
          {{ type === 'Add' ? '新增' : '更新' }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { createUser, getUserDetail, updateUser } from '@/api/user'
import { uploadFile } from '@/api/common'

import { tagsOptions } from '@/common/constant/tags'
export default {
  name: 'UserDetail',
  components: {},
  data: function() {
    return {
      id: '',
      type: 'Add',
      form: {
        name: '',
        age: '',
        description: '',
        sex: '',
        avatar: []
      },
      tagType: ['primary', 'success', 'warning'],
      tagsOptions
    }
  },
  created: function() {
    this.initData()
  },
  computed: {},
  methods: {
    initData: async function() {
      const { id } = this.$route.query
      if (id) {
        // 当传入参数后，为更新
        this.id = id
        this.type = 'Edit'
        const res = await getUserDetail({ _id: this.id }).catch(() => {})
        if (res) {
          const { avatar, ...other } = res
          this.form = {
            ...other,
            avatar: [
              {
                url: avatar
              }
            ]
          }
        }
      }
    },
    onOversize(file) {
      this.$notify({
        type: 'warning',
        message: '文件大小不能超过 500kb'
      })
    },
    afterRead: async function(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const data = new FormData()
      data.append('files', file.file)
      const res = await uploadFile(data).catch(() => {
        file.status = 'failed'
        file.message = '上传失败'
      })
      file.status = 'success'
      file.message = '上传成功'
      const { ossUrl: url } = res
      this.form.avatar = [{ url }]
    },
    onSubmit: function() {
      let Action = createUser
      if (this.type === 'Edit') {
        Action = updateUser
      }
      const { avatar, ...other } = this.form
      const data = {
        ...other,
        avatar: avatar[0].url
      }
      Action(data).then(() => {
        this.$notify({
          type: 'success',
          message: '保存成功！'
        })
        this.$router.go(-1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  position: relative;
}
/deep/.van-checkbox--horizontal {
  width: 32vw;
  margin-right: 0;
  margin-bottom: 12px !important;
}
/deep/.van-uploader__preview-image {
  border-radius: 50%;
}
.action {
  padding: 6vw;
}
</style>
