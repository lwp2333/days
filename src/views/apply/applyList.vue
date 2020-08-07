<template>
  <div class="container">
    <div class="banner">
      <van-image width="100vw" fit="contain" :src="banner" />
      <div class="mark">
        <span>正在申请查看 - <span class="entName"> 杭州钟鼓科技有限公司</span> 信息</span>
      </div>
    </div>
    <div>
      <span class="tip">
        请选取需要查看的信息
      </span>
    </div>
    <div class="content">
      <van-collapse v-model="activeName" :border="false">
        <van-collapse-item name="1">
          <template #title>
            <span class="fileLabel">企业金融档案</span>
          </template>
          <template #right-icon>
            <span class="collapseActive">{{ activeName.includes('1') ? '收起' : '展开' }}</span>
          </template>
          <template>
            <van-checkbox-group v-model="finance.checked" ref="finance">
              <van-row>
                <van-col span="8">
                  <div class="check-item">
                    <div class="notActive" :class="{ active: finance.checkedAll }" @click="checkAll('finance')">全部</div>
                  </div>
                </van-col>
                <van-col span="8" v-for="(item, index) in financeOptions" :key="index">
                  <van-checkbox class="check-item" :name="item">
                    <template #icon="props">
                      <div class="notActive" :class="{ active: props.checked }">{{ item }}</div>
                    </template>
                  </van-checkbox>
                </van-col>
              </van-row>
            </van-checkbox-group>
          </template>
        </van-collapse-item>
        <van-collapse-item name="2">
          <template #title>
            <span class="fileLabel">企业亩均档案</span>
          </template>
          <template #right-icon>
            <span class="collapseActive">{{ activeName.includes('2') ? '收起' : '展开' }}</span>
          </template>
          <template>
            <van-checkbox-group v-model="mujun.checked" ref="mujun">
              <van-row>
                <van-col span="8">
                  <div class="check-item">
                    <div class="notActive" :class="{ active: mujun.checkedAll }" @click="checkAll('mujun')">全部</div>
                  </div>
                </van-col>
                <van-col span="8" v-for="(item, index) in mujunOptions" :key="index">
                  <van-checkbox class="check-item" :name="item">
                    <template #icon="props">
                      <div class="notActive" :class="{ active: props.checked }">{{ item }}</div>
                    </template>
                  </van-checkbox>
                </van-col>
              </van-row>
            </van-checkbox-group>
          </template>
        </van-collapse-item>
        <van-collapse-item name="3">
          <template #title>
            <span class="fileLabel">企业证照档案</span>
          </template>
          <template #right-icon>
            <span class="collapseActive">{{ activeName.includes('3') ? '收起' : '展开' }}</span>
          </template>
          <template>
            <van-checkbox-group v-model="licence.checked" ref="licence">
              <van-row>
                <van-col span="8">
                  <div class="check-item">
                    <div class="notActive" :class="{ active: licence.checkedAll }" @click="checkAll('licence')">全部</div>
                  </div>
                </van-col>
                <van-col span="8" v-for="(item, index) in licenceOptions" :key="index">
                  <van-checkbox class="check-item" :name="item">
                    <template #icon="props">
                      <div class="notActive" :class="{ active: props.checked }">{{ item }}</div>
                    </template>
                  </van-checkbox>
                </van-col>
              </van-row>
            </van-checkbox-group>
          </template>
        </van-collapse-item>
      </van-collapse>
      <van-notice-bar color="#FA5741" background="#FFF0EF" left-icon="info-o">
        所选的查看信息仅本次扫描有效
      </van-notice-bar>
    </div>
    <div class="action">
      <van-button block type="info">确认</van-button>
    </div>
  </div>
</template>

<script>
import banner from '../../../static/img/banner.png'
export default {
  name: 'ApplyList',
  components: {},
  data: function() {
    return {
      banner,
      activeName: [],
      financeOptions: ['股东信息', '税务信息', '基本信息', '其他信息'],
      finance: {
        checkedAll: false,
        checked: []
      },
      mujunOptions: ['亩均档案'],
      mujun: {
        checkedAll: false,
        checked: []
      },
      licenceOptions: ['营业执照', '税务登记证'],
      licence: {
        checkedAll: false,
        checked: []
      }
    }
  },
  created: function() {},
  watch: {
    'finance.checked': function(val) {
      if (val.length === this.financeOptions.length) {
        this.finance.checkedAll = true
      } else {
        this.finance.checkedAll = false
      }
    },
    'mujun.checked': function(val) {
      if (val.length === this.mujunOptions.length) {
        this.mujun.checkedAll = true
      } else {
        this.mujun.checkedAll = false
      }
    },
    'licence.checked': function(val) {
      if (val.length === this.licenceOptions.length) {
        this.licence.checkedAll = true
      } else {
        this.licence.checkedAll = false
      }
    }
  },
  computed: {},
  methods: {
    checkAll(item) {
      const isCheckedAll = this[item].checkedAll
      const arr = []
      if (isCheckedAll) {
        this.$refs[item].toggleAll(false)
      } else {
        this.$refs[item].toggleAll(true)
      }
    },
    hashCode(str) {
      let hash = 0
      let i
      let chr
      if (str.length === 0) return hash
      for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
      }
      return hash
    }
  }
}
</script>
<style lang="scss" scoped>
.banner {
  position: relative;
  .mark {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      font-size: 16px;
      .entName {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
}
.tip {
  margin-left: 20px;
  line-height: 40px;
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  font-size: 16px;
}
.content {
  padding: 2%;
}
.action {
  padding: 12%;
}
/deep/.van-cell__value {
  margin-right: 12px;
}
.van-collapse-item {
  border: 1px solid #ebedf0;
  margin-bottom: 12px;
}
.check-item {
  width: 100px;
  height: 32px;
  display: inline-flex;
  border-radius: 4px;
  background-color: rgba(246, 246, 246, 1);
  /deep/.van-checkbox__icon {
    height: auto !important;
  }
}
.notActive {
  box-sizing: border-box;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
}
.active {
  background-image: linear-gradient(#ffd76f, #ffe484, #ffe4ab);
  box-shadow: 0px 5px 10px 0px rgba(255, 218, 143, 0.5);
  border: 1px solid rgba(255, 228, 155, 1);
  color: rgba(0, 0, 0, 1) !important;
}
/deep/.van-col {
  text-align: center;
  margin-bottom: 12px;
}
.fileLabel {
  color: rgba(0, 0, 0, 1);
  font-weight: 600;
  font-size: 16px;
}
.collapseActive {
  font-size: 12px;
  color: #1989fa;
}
</style>
