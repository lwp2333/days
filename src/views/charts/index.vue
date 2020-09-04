<template>
  <div class="chartsContainer">
    <van-dropdown-menu>
      <van-dropdown-item v-model="chartsSelect" :options="chartsOptions" />
    </van-dropdown-menu>
    <canvas id="myChart" class="canvas"></canvas>
  </div>
</template>

<script>
import F2 from '@antv/f2'
import _ from 'lodash'
import DataSet from '@antv/data-set'
import ciYunData from '@/common/options/dataSet'
export default {
  name: 'ChartsContainer',
  components: {},
  data: function() {
    return {
      chartsOptions: [
        { text: '默认', value: 'default' },
        { text: '饼图', value: 'chart2' },
        { text: '折线图', value: 'chart3' },
        { text: '雷达图', value: 'chart4' },
        { text: '词云图', value: 'chart5' }
      ],
      chartsSelect: 'default',
      chart: null
    }
  },
  created: function() {},
  mounted: function() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  watch: {
    chartsSelect: function(value) {
      switch (value) {
        case 'default':
          this.chart.clear()
          this.initChart()
          break
        case 'chart2':
          this.chart.clear()
          this.initChart2()
          break
        case 'chart3':
          this.chart.clear()
          this.initChart3()
          break
        case 'chart4':
          this.chart.clear()
          this.initChart4()
          break
        case 'chart5':
          this.chart.clear()
          this.initChart5()
          break
        default:
          break
      }
    }
  },
  methods: {
    initChart: function() {
      // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      const data = [
        { genre: '衣', sold: 600 },
        { genre: '食', sold: 1200 },
        { genre: '住', sold: 1200 },
        { genre: '行', sold: 500 },
        { genre: '其他', sold: 600 }
      ]
      // Step 1: 创建 Chart 对象
      this.chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      })
      // Step 2: 载入数据源
      this.chart.source(data)
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      this.chart
        .interval()
        .position('genre*sold')
        .color('genre')
      // Step 4: 渲染图表
      this.chart.render()
    },
    initChart2: function() {
      const map = {
        毕生: '28%',
        她曾活过啊: '18%',
        不煽情: '16%',
        吹梦到西洲: '16%',
        九万字: '14%',
        这一生关于你的风景: '8%'
      }
      const data = [
        {
          name: '毕生',
          percent: 0.28,
          a: '1'
        },
        {
          name: '她曾活过啊',
          percent: 0.18,
          a: '1'
        },
        {
          name: '不煽情',
          percent: 0.16,
          a: '1'
        },
        {
          name: '吹梦到西洲',
          percent: 0.16,
          a: '1'
        },
        {
          name: '九万字',
          percent: 0.08,
          a: '1'
        },
        {
          name: '这一生关于你的风景',
          percent: 0.02,
          a: '1'
        }
      ]
      this.chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio
      })
      this.chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            return val * 100 + '%'
          }
        }
      })
      this.chart.legend({
        position: 'right',
        itemFormatter: function itemFormatter(val) {
          return val + '  ' + map[val]
        }
      })
      this.chart.tooltip(false)
      this.chart.coord('polar', {
        transposed: true,
        radius: 0.85
      })
      this.chart.axis(false)
      this.chart
        .interval()
        .position('a*percent')
        .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        })

      this.chart.render()
    },
    initChart3: function() {
      const data = [
        {
          date: '2017-06-05',
          value: 116
        },
        {
          date: '2017-06-06',
          value: 129
        },
        {
          date: '2017-06-07',
          value: 135
        },
        {
          date: '2017-06-08',
          value: 86
        },
        {
          date: '2017-06-09',
          value: 73
        },
        {
          date: '2017-06-10',
          value: 85
        },
        {
          date: '2017-06-11',
          value: 73
        },
        {
          date: '2017-06-12',
          value: 68
        },
        {
          date: '2017-06-13',
          value: 92
        },
        {
          date: '2017-06-14',
          value: 130
        },
        {
          date: '2017-06-15',
          value: 245
        },
        {
          date: '2017-06-16',
          value: 139
        },
        {
          date: '2017-06-17',
          value: 115
        },
        {
          date: '2017-06-18',
          value: 111
        },
        {
          date: '2017-06-19',
          value: 309
        },
        {
          date: '2017-06-20',
          value: 206
        },
        {
          date: '2017-06-21',
          value: 137
        },
        {
          date: '2017-06-22',
          value: 128
        },
        {
          date: '2017-06-23',
          value: 85
        },
        {
          date: '2017-06-24',
          value: 94
        },
        {
          date: '2017-06-25',
          value: 71
        },
        {
          date: '2017-06-26',
          value: 106
        },
        {
          date: '2017-06-27',
          value: 84
        },
        {
          date: '2017-06-28',
          value: 93
        },
        {
          date: '2017-06-29',
          value: 85
        },
        {
          date: '2017-06-30',
          value: 73
        },
        {
          date: '2017-07-01',
          value: 83
        },
        {
          date: '2017-07-02',
          value: 125
        },
        {
          date: '2017-07-03',
          value: 107
        },
        {
          date: '2017-07-04',
          value: 82
        },
        {
          date: '2017-07-05',
          value: 44
        },
        {
          date: '2017-07-06',
          value: 72
        },
        {
          date: '2017-07-07',
          value: 106
        },
        {
          date: '2017-07-08',
          value: 107
        },
        {
          date: '2017-07-09',
          value: 66
        },
        {
          date: '2017-07-10',
          value: 91
        },
        {
          date: '2017-07-11',
          value: 92
        },
        {
          date: '2017-07-12',
          value: 113
        },
        {
          date: '2017-07-13',
          value: 107
        },
        {
          date: '2017-07-14',
          value: 131
        },
        {
          date: '2017-07-15',
          value: 111
        },
        {
          date: '2017-07-16',
          value: 64
        },
        {
          date: '2017-07-17',
          value: 69
        },
        {
          date: '2017-07-18',
          value: 88
        },
        {
          date: '2017-07-19',
          value: 77
        },
        {
          date: '2017-07-20',
          value: 83
        },
        {
          date: '2017-07-21',
          value: 111
        },
        {
          date: '2017-07-22',
          value: 57
        },
        {
          date: '2017-07-23',
          value: 55
        },
        {
          date: '2017-07-24',
          value: 60
        }
      ]

      this.chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio
      })

      this.chart.source(data, {
        value: {
          tickCount: 5,
          min: 0
        },
        date: {
          type: 'timeCat',
          range: [0, 1],
          tickCount: 3
        }
      })
      this.chart.tooltip({
        custom: true,
        showXTip: true,
        showYTip: true,
        snap: true,
        crosshairsType: 'xy',
        crosshairsStyle: {
          lineDash: [2]
        }
      })
      this.chart.axis('date', {
        label: function label(text, index, total) {
          const textCfg = {}
          if (index === 0) {
            textCfg.textAlign = 'left'
          } else if (index === total - 1) {
            textCfg.textAlign = 'right'
          }
          return textCfg
        }
      })
      this.chart.line().position('date*value')
      this.chart.render()
    },
    initChart4: function() {
      const data = [
        {
          item: 'Design',
          user: '用户 A',
          score: 70
        },
        {
          item: 'Design',
          user: '用户 B',
          score: 30
        },
        {
          item: 'Development',
          user: '用户 A',
          score: 60
        },
        {
          item: 'Development',
          user: '用户 B',
          score: 70
        },
        {
          item: 'Marketing',
          user: '用户 A',
          score: 50
        },
        {
          item: 'Marketing',
          user: '用户 B',
          score: 60
        },
        {
          item: 'Users',
          user: '用户 A',
          score: 40
        },
        {
          item: 'Users',
          user: '用户 B',
          score: 50
        },
        {
          item: 'Test',
          user: '用户 A',
          score: 60
        },
        {
          item: 'Test',
          user: '用户 B',
          score: 70
        },
        {
          item: 'Language',
          user: '用户 A',
          score: 70
        },
        {
          item: 'Language',
          user: '用户 B',
          score: 50
        },
        {
          item: 'Technology',
          user: '用户 A',
          score: 70
        },
        {
          item: 'Technology',
          user: '用户 B',
          score: 40
        },
        {
          item: 'Support',
          user: '用户 A',
          score: 60
        },
        {
          item: 'Support',
          user: '用户 B',
          score: 40
        }
      ]
      this.chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio
      })

      this.chart.coord('polar')
      this.chart.source(data, {
        score: {
          min: 0,
          max: 120,
          nice: false,
          tickCount: 4
        }
      })
      const that = this
      this.chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          const legend = that.chart.get('legendController').legends.top[0]
          const tooltipItems = obj.items
          const legendItems = legend.items
          const map = {}
          legendItems.forEach(function(item) {
            map[item.name] = _.clone(item)
          })
          tooltipItems.forEach(function(item) {
            const name = item.name
            const value = item.value
            if (map[name]) {
              map[name].value = value
            }
          })
          legend.setItems(_.values(map))
        },
        onHide: function onHide() {
          const legend = that.chart.get('legendController').legends.top[0]
          legend.setItems(that.chart.getLegendItems().country)
        }
      })
      this.chart.axis('score', {
        label: function label(text, index, total) {
          if (index === total - 1) {
            return null
          }
          return {
            top: true
          }
        },
        grid: {
          lineDash: null,
          type: 'arc' // 弧线网格
        }
      })
      this.chart.axis('item', {
        grid: {
          lineDash: null
        }
      })
      this.chart
        .line()
        .position('item*score')
        .color('user')
      this.chart
        .point()
        .position('item*score')
        .color('user')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      this.chart.render()
    },
    initChart5: function() {
      const Util = F2.Util
      // 获取 text 文本的图形属性
      function getTextAttrs(cfg) {
        return Util.mix(
          {},
          {
            fillOpacity: cfg.opacity,
            fontSize: cfg.origin._origin.size,
            rotate: (cfg.origin._origin.rotate * Math.PI) / 180,
            text: cfg.origin._origin.text,
            textAlign: 'center',
            fontFamily: cfg.origin._origin.font,
            fill: cfg.color,
            textBaseline: 'Alphabetic'
          },
          cfg.style
        )
      }

      // 给point注册一个词云的shape
      F2.Shape.registerShape('point', 'cloud', {
        draw: function draw(cfg, container) {
          const attrs = getTextAttrs(cfg)
          const x = cfg.x
          const y = this._coord.y.start - cfg.y
          return container.addShape('text', {
            attrs: Util.mix(attrs, {
              x,
              y
            })
          })
        }
      })
      const dv = new DataSet.View().source(ciYunData)
      const range = dv.range('value')
      const min = range[0]
      const max = range[1]
      const MAX_FONTSIZE = 36 // 最大的字体
      const MIN_FONTSIZE = 12 // 最小的字体
      // 生成词云的布局
      dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'value'],
        size: [375, 260], // 同 canvas 画布保持一致
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate: function rotate() {
          let random = ~~(Math.random() * 4) % 4
          if (random === 2) {
            random = 0
          }
          return random * 90 // 0, 90, 270
        },
        fontSize: function fontSize(d) {
          if (d.value) {
            return ((d.value - min) / (max - min)) * (MAX_FONTSIZE - MIN_FONTSIZE) + MIN_FONTSIZE
          }
          return 0
        }
      })

      const chart = new F2.Chart({
        id: 'myChart',
        padding: 0,
        pixelRatio: window.devicePixelRatio
      })
      chart.source(dv.rows, {
        x: {
          nice: false
        },
        y: {
          nice: false
        }
      })
      chart.legend(false)
      chart.axis(false)
      chart.tooltip(false)

      chart
        .point()
        .position('x*y')
        .color('category')
        .shape('cloud')
      chart.render()
    }
  }
}
</script>
<style lang="scss" scoped>
.chartsContainer {
  width: 100%;
  .canvas {
    margin-top: 12vh;
    width: 100vw;
    height: 50vh;
    background-color: #fff;
  }
}
</style>
