<template>
  <div class="container">
    <div class="list">
      <div class="list-item">
        <van-cell center size="large" is-link v-for="item in list" :key="item._id">
          <template #title>
            <span class="userName">{{ item.name }}</span>
          </template>
          <template>
            <van-image round width="12vw" height="12vw" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </template>
          <template #label>
            <div class="des">{{ item.description }}</div>
            <van-tag v-for="(item, index) in item.tags" mark :type="tagType[index % 3]" :key="index">{{ item }}</van-tag>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="action">
      <van-button icon="plus" round color="linear-gradient(to right, #667eea, #764ba2)" :to="{ path: '/user/detail' }">
        添加成员</van-button
      >
    </div>
  </div>
</template>

<script>
import { getUserList, createUser } from '@/api/user'
export default {
  name: 'UserList',
  components: {},
  data: function() {
    return {
      list: [],
      tagType: ['primary', 'success', 'warning']
    }
  },
  created: function() {
    this.initData()
  },
  computed: {},
  methods: {
    initData: async function() {
      const res = await getUserList()
      this.list = res || []
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  .list {
    max-height: 88vh;
    overflow: auto;
  }
  .action {
    position: fixed;
    width: 100vw;
    text-align: center;
    height: 6vh;
    bottom: 9vh;
  }
}
.userName {
  font-size: 22px;
  line-height: 12vw;
  font-weight: 500;
}
.des {
  line-height: 18px;
}
/deep/.van-tag {
  &:not(:last-child) {
    margin-right: 2vw;
  }
}
/deep/.van-cell__title {
  flex: 5 !important;
}
</style>
