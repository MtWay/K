<template>
<div class="wrap">
    <div id="myChart">
        </div>
            <div id="chart-panel"></div>
</div>
        
</template>

<script>
import {opt,initOpt} from './data.js'
export default {
    data(){
        return{
            opt
        }
    },
    mounted(){
        initOpt()
         let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(opt)
    }
} 
</script>
<style lang="less" scoped>
#myChart{
    width :100%;
    height :100%;
    background :#ccc;
    flex: 1;
}
.wrap{
    width :100%;
    height :100%;
    display: flex;
    flex-direction: column;
    position: relative;
}
.chart-panel{
    position: absolute;
    width :100%;
    height :100%;
}
</style>