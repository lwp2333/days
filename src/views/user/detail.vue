<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <!-- <van-cell title="头像：" center required>
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
      </van-cell> -->
      <van-field label="头像" :rules="[{ required: true, message: '请上传头像' }]">
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
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请输入昵称' }]"
      />
      <van-field
        v-model="form.age"
        required
        type="digit"
        label="年龄："
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
        maxlength="40"
        show-word-limit
        :rules="[{ required: true, message: '请输入描述' }]"
      />
      <div style="margin: 16px;">
        <van-button round block color="linear-gradient(to right, #667eea, #764ba2)" native-type="submit">
          {{ type === 'Add' ? '新增' : '更新' }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { upload, createUser, getUserDetail, updateUser } from '@/api/user'
import { tagsOptions } from '@/common/options/tags'
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
        res &&
          (this.form = {
            avatar: [],
            ...res
          })
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
      data.append('file', file.file)
      const res = await upload(data).catch(() => {
        file.status = 'failed'
        file.message = '上传失败'
      })
      file.status = 'success'
      file.message = '上传成功'
      this.form.avatar = [res]
    },
    onSubmit: function() {
      let Action = createUser
      if (this.type === 'Edit') {
        Action = updateUser
      }
      Action(this.form).then(() => {
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
  min-height: 80vh;
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
</style>
