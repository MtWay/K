<template>
<div>
    <el-table :data="tableData" height="800px">
        <el-table-column label="时间" prop="date"></el-table-column>
        <el-table-column label="开" prop="s"></el-table-column>
        <el-table-column label="收" prop="e"></el-table-column>
        <el-table-column label="最大值" prop="h"></el-table-column>
        <el-table-column label="最小值" prop="l"></el-table-column>
        <el-table-column label="当天价差" prop="cha"></el-table-column>
        <el-table-column label="隔天差" prop="differ"></el-table-column>
        <!-- <el-table-column label="涨" prop="up"></el-table-column> -->
        <!-- <el-table-column label="跌" prop="down"></el-table-column> -->
        <el-table-column label="连续天数" prop="sum">
            <template slot-scope="scope">
                <span class="" :class="[scope.row['arrow']=='涨'?'red':'green']">{{scope.row['arrow']}}{{scope.row['sum']}}天</span>
            </template>
        </el-table-column>
        <el-table-column label="区间数值" prop="section"></el-table-column>
        <!-- <el-table-column label="方向" prop="arrow">
            <template slot-scope="scope">
                <span class="" :class="[scope.row['arrow']=='涨'?'red':'green']">{{scope.row['arrow']}}</span>
            </template>
        </el-table-column> -->
    </el-table>
    <p>最大波段{{maxbd}}点持续了{{maxbdDay}}天</p>
    <p>最大连续趋势{{maxday}}天 波动{{maxdayBd}}点</p>
    <p>平均趋势波段为{{pjqs}} 趋势出现次数{{qss.length}};平均趋势天数{{pjqsDay}}</p>
    <p>最大回撤（小于2天单向为回撤或震荡）{{maxHc}}点</p>
    <p>平均回撤为{{pjhc}} 回撤次数{{hcs.length}}</p>
    <div>
        忽略大于<input type="text" v-model="zs">的回撤（止损）后，
        平均回撤为{{mathHc}} 回撤次数{{mathHcs.length}}
    </div>
</div>
</template>
<script>
import { data } from "../data/a.js";
export default {
  data() {
    return {
      click: "click",
      maxbd: 0,
      maxbdDay: 0,
      maxday: 0,
      maxdayBd: 0,
      maxHc: 0,
      pjhc: 0,
      pjqs:0,
      pjqsDay:0,
      qss: [],
      //   mathHc:0,
      hcs: [],
      //   mathHcs:[],
      zs: 200,
      tableData: [
        {
          h: 10,
          l: 0,
          cha: 10,
          s: 0,
          e: 0,
          date: "20221206",
          up: "0",
          down: "0",
          arrow: "",
          sum: 0
        }
      ]
    };
  },
  computed: {
    mathHcs() {
      return this.hcs.filter(n => n < this.zs);
    },
    mathHc() {
      let sum = 0;
      this.mathHcs.map(n => {
        sum += n;
      });
      console.log(sum);
      return Math.floor(sum / this.mathHcs.length);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let tableData = [];
      let bigarrow = "跌";
      let sum = 0; //连续上涨天数
      let hcs = [];
      let qss = [];
      let hcSum = 0; //回撤总数；
      let qsSum= 0; //趋势总数;
      let qsdaySum= 0; //趋势天数总数;

      data.map((n, i) => {
        let cha = Math.floor(n[4] - n[3]);
        let up = 0;
        let down = 0;
        let arrow = "跌";
        let section = 0;
        let differ = 0;
        if (i > 0) {
          //    up= Math.floor(n[4]-data[i-1][3]);
          //    down= Math.floor(0-n[3]+data[i-1][4]);
          differ = Math.floor(n[2] - data[i - 1][2]);
          //    if(up>down){
          //        arrow='涨'
          //    }
          if (differ > 0) {
            arrow = "涨";
          }
            //  if(Math.abs(differ)>)
          //忽略小于50的波动
        //   if (arrow == bigarrow || Math.abs(differ) < 50) {
               if(arrow==bigarrow){
            arrow = bigarrow;
            sum++;
            if (sum > this.maxday) {
              this.maxday = sum;
              let t = Math.floor(n[2] - data[i - sum][2]);
              this.maxdayBd = t;
            }
          } else {
            let t = Math.floor(Math.abs(n[2] - data[i - sum][2]));
            if (sum < 3) {
              //回撤
              hcSum += t;
              hcs.push(t);
              //   console.log(t)
              if (t > this.maxHc) {
                this.maxHc = t;
              }
            } else {
                qsdaySum+=sum;
              qsSum += t;
              qss.push(t);
            }
            sum = 1;
            bigarrow = arrow;
          }
          section = Math.abs(n[2] - data[i - sum][2]);
          if (section > this.maxbd) {
            this.maxbd = section;
            this.maxbdDay = sum;
          }
        }
        tableData.push({
          date: n[0],
          s: n[1],
          e: n[2],
          l: n[3],
          h: n[4],
          cha,
          up,
          down,
          arrow,
          sum,
          section,
          differ
        });
      });
      this.hcs = hcs;
      this.qss = qss;
      this.pjhc = Math.floor(hcSum / hcs.length);
      this.pjqs = Math.floor(qsSum / qss.length);
      this.pjqsDay = qsdaySum/ qss.length;
      this.tableData = tableData;
    }
  }
};
</script>
<style lang="less">
.red {
  color: firebrick;
}
.green {
  color: greenyellow;
}
</style>
