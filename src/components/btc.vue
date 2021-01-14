<template>
  <div class="wrap">
    <div id="myChart"></div>
    <!-- <div id="chart-panel"></div> -->
    <el-table 
    :data="list"
    border
    >
    <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column v-for="item in tableList" :key="item.label" :prop="item.label" :label="item.label"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { option } from "./btcData.js";
import { opt,initData } from "./btcData.js";
export default {
  data() {
    return {
      opt,
      tableList:[
          {
              label:'start',
          },
          {
              label:'end',
          },
          {
              label:'percent',
          },
          {
              label:'diff',
          },

      ],
      list:[
          {
             start:1,
          end:2,
          percent:1,
          diff:1, 
          },
          {
             start:1,
          end:2,
          percent:1,
          diff:1, 
          },{
             start:1,
          end:2,
          percent:1,
          diff:1, 
          }
          
      ]
    };
  },
  mounted() {
    // initOpt()
    console.log(initData)
    let list = initData();
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    let arr = []
    // 绘制图表
    opt.series.data = list.map(function (item,idx) {
            arr.push({
                start:1,
                end:2,
                percent:1,
                diff:1, 
            })
            return item[1];
        }),
        
    myChart.setOption(opt);
  },
  methods:{
      gsh(){

      }
  }
};
</script>
<style lang="less" scoped>
#myChart {
  width: 100%;
//   height: 100%;
  background: #ccc;
  flex: 1;
}
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.chart-panel {
  position: absolute;
  width: 100%;
  height: 100%;
}
.el-table{
    height: 500px;
}
</style>