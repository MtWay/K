<template>
    <div class="wrap">
        <div id="myChart"></div>
        <!-- <div id="chart-panel"></div> -->
        <!-- <el-table :data="list" border>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column
                v-for="item in tableList"
                :key="item.label"
                :prop="item.label"
                :label="item.label"
            ></el-table-column> 
        </el-table>-->
         <el-table :data="options" border>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column
                v-for="item in optionsHead"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
            ></el-table-column> 
        </el-table>
        <div class="section">
            <h3>区间震荡策略</h3>
            <p>1买入点为区间底部</p>
            <p>2卖出点为区间顶部</p>
            <p>3 开仓后超出区间50%止损</p>
            <p>4开仓后走势符合则在区间另一边平仓且反手</p>
            <p>5最近10个数计算区间高低点</p>
        </div>
        <div class="section">
            <h3>回撤买入（顺大势逆小势）</h3>
            <p></p>
        </div>
        <div class="section">
            <h3>突破买入</h3>
            <p></p>
        </div>
    </div>
</template>
  
  <script>
// import { option } from "./btcData.js";
import { opt, initData } from "./btcData.js";
export default {
    data() {
        return {
            opt,
            optionsHead:[
            {
                    label: "时间",
                    prop: "idx",
                },
                {
                    label: "价格",
                    prop: "kcjg",
                },
                {
                    label: "操作",
                    prop: "bz",
                },
                {
                    label: "收益",
                    prop: "sy",
                },
            ],
            tableList: [
                {
                    label: "start",
                },
                {
                    label: "end",
                },
                {
                    label: "percent",
                },
                {
                    label: "diff",
                },
            ],
            list: [
                {
                    start: 1,
                    end: 2,
                    percent: 1,
                    diff: 1,
                },
                {
                    start: 1,
                    end: 2,
                    percent: 1,
                    diff: 1,
                },
                {
                    start: 1,
                    end: 2,
                    percent: 1,
                    diff: 1,
                },
            ],
            options:[]
        };
    },
    mounted() {
        // initOpt()
        let list = initData();
        console.log(list);
        //   this.list = list
       this.options =  this.calc1(list);
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        let arr = [];
        // 绘制图表
        (opt.series.data = list.map(function (item, idx) {
            arr.push({
                start: 1,
                end: 2,
                percent: 1,
                diff: 1,
            });
            return item[1];
        })),
            myChart.setOption(opt);
    },
    methods: {
        gsh() {},
        calc1(list) {
            let qj = 10;
            let buy = 10; //距离区间不足的这个数值时会允许开仓
            let arr = [];
            let status = 0; //0空仓 1买进持有  2卖出持有
            let kcjg = 0; //开仓价格
            list.map((n, i) => {
                if (i >= qj - 1) {
                    //计算区间
                    let ck = list.slice(i - qj - 1, i + 1);
                    console.log(ck);
                    let max = list[i][1];
                    let min = list[i][1];
                    let now = n[1];
                    ck.map((son, sidx) => {
                        let t = son[1];
                        if (t > max) max = t;
                        if (t < min) min = t;
                    });
                    console.log(min,max)
                    let sy = 0;
                    if(kcjg!=0 && status==1){
                        sy = now-kcjg
                    }
                    if(kcjg!=0 && status==2){
                        sy = kcjg-now
                    }
                    //开多
                    if (status == 0 && now < min + buy) {
                        kcjg = now;
                        status = 1;
                        arr.push({
                            kcjg,
                            idx: n[0],
                            status,sy,
                            bz: "开多",
                        });
                    }
                    //开空
                    if (status == 0 && now > min - buy) {
                        kcjg = now;
                        status = 2;
                        arr.push({
                            kcjg,
                            idx: n[0],
                            status,sy,
                            bz: "开空",
                        });
                    }
                    //平空并开多
                    if (status == 2 && now < min + buy) {
                        kcjg = now;
                        status = 0;
                        arr.push({
                            kcjg,
                            idx: n[0],
                            status,sy,
                            bz: "平空",
                        });
                        status = 1;
                        arr.push({
                            kcjg,
                            idx: n[0],
                            status,sy,
                            bz: "开多",
                        });
                    }
                    //平多并开空
                    if (status == 1 && now > min - buy) {
                        kcjg = now;
                        status = 0;
                        arr.push({
                            kcjg,
                            idx: n[0],
                            status,sy,
                            bz: "平多",
                        });
                        status = 2;
                        arr.push({
                            kcjg,
                            idx: n[0],
                            status,sy,
                            bz: "开空",
                        });
                    }

                    let zsfd = (max - min) * 0.5;
                    //止损多单
                    if (status == 1 && now < kcjg - zsfd) {
                        status = 0;
                        arr.push({
                            kcjg,
                            idx: n[0],
                            status,sy,
                            bz: "止损多单",
                        });
                    }
                    //止损空单
                    if (status == 2 && now > kcjg + zsfd) {
                        status = 0;
                        arr.push({
                            kcjg,
                            idx: n[0],
                            status,sy,
                            bz: "止损空单",
                        });
                    }
                }
            });
            console.log(arr);
            return arr
        },
    },
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
.el-table {
    height: 500px;
}
</style>