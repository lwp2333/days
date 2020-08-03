<template>
  <div class="container">
    <div class="list">
      <van-swipe-cell v-for="item in list" :key="item._id">
        <van-cell center size="large" is-link :to="{ path: '/user/detail', query: { id: item._id } }">
          <template #title>
            <span class="userName">{{ item.name }}</span>
          </template>
          <template>
            <van-image round width="12vw" height="12vw" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </template>
          <template #label>
            <van-tag v-for="(item, index) in item.tags" mark :type="tagType[index % 3]" :key="index">{{ item }}</van-tag>
            <div class="des">{{ item.description }}</div>
          </template>
        </van-cell>
        <template #right>
          <van-button square text="删除" type="danger" @click="delAction(item)" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-empty v-if="!list.length > 0" description="暂无数据" />
    </div>
    <div class="action">
      <van-button icon="plus" round color="linear-gradient(to right, #667eea, #764ba2)" :to="{ path: '/user/detail' }">
        添加成员</van-button
      >
    </div>
  </div>
</template>

<script>
import { getUserList, createUser, delUser } from '@/api/user'
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
    },
    delAction: function(item) {
      this.$dialog
        .confirm({
          title: '提示',
          message: `确认删除成员：${item.name}嘛？`
        })
        .then(() => {
          this.delData(item)
        })
    },
    delData: function({ _id }) {
      delUser({ _id }).then(() => {
        this.initData()
      })
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
  margin-top: 1vw;
  line-height: 18px;
}
/deep/.van-tag {
  margin-bottom: 1vw;
  &:not(:last-child) {
    margin-right: 2vw;
  }
}
/deep/.van-cell__title {
  flex: 5 !important;
}
.delete-button {
  height: 100%;
}
</style>
