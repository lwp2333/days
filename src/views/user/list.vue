<template>
  <div class="container">
    <van-sticky>
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">共有{{ recordInfo.totalRecord }}条成员信息 </van-notice-bar>
    </van-sticky>
    <van-list
      class="list"
      v-model="loading"
      :offset="20"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell v-for="(item, index) in list" :key="index">
        <van-cell center size="large" is-link :to="{ path: '/user/detail', query: { id: item._id } }">
          <template #title>
            <span class="userName">{{ item.name }}</span>
          </template>
          <template>
            <van-image round width="12vw" height="12vw" :src="item.avatar" />
          </template>
          <template #label>
            <van-tag v-for="(item, index) in item.tags" mark :type="tagType[index % 3]" :key="index">{{ item }}</van-tag>
            <div class="des van-ellipsis">
              {{ item.description }}
            </div>
          </template>
        </van-cell>
        <template #right>
          <van-button square text="删除" type="danger" @click="delAction(item)" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-empty v-if="!list.length > 0" description="暂无数据" />
    </van-list>
    <div class="action">
      <van-button icon="plus" round color="linear-gradient(to right, #667eea, #764ba2)" to="/user/detail"> 新增成员</van-button>
    </div>
  </div>
</template>

<script>
import { getUserListByPage, createUser, delUser } from '@/api/user'
export default {
  name: 'UserList',
  components: {},
  data: function() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5
      },
      recordInfo: {
        totalPage: 0,
        totalRecord: 0
      },
      loading: false,
      finished: false,
      list: [],
      tagType: ['primary', 'success', 'warning']
    }
  },
  created: function() {
    this.onLoad()
  },
  methods: {
    onLoad: async function() {
      this.loading = true
      const res = await getUserListByPage(this.pageInfo).catch(() => {
        this.loading = false
      })
      this.loading = false
      if (res) {
        const { pageNum, pageSize, list, totalPage, totalRecord } = res
        this.list.push(...list)
        this.recordInfo = {
          totalPage,
          totalRecord
        }
        // 判断是否到底，否则页码++
        if (totalPage > pageNum) {
          this.pageInfo.pageNum++
        } else {
          // 到底
          this.finished = true
        }
      }
    },
    refreshData: function() {
      // 刷新当前数据， 页码，记录信息都重置初始值
      this.pageInfo.pageNum = 1
      this.recordInfo = {
        totalPage: 0,
        totalRecord: 0
      }
      this.finished = false
      this.list = []
      this.onLoad()
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
        this.refreshData()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  position: relative;
  .list {
    max-height: calc(80vh - 32px);
    overflow: auto;
  }
  .action {
    position: fixed;
    width: 100vw;
    text-align: center;
    bottom: 16vw;
  }
}
.userName {
  font-size: 22px;
  line-height: 12vw;
  font-weight: 500;
}
.des {
  width: 64vw;
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
