let list = [
    [0,3000],
    [1,4000],
    [2,3000],
    [3,4000],
]
//  list = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],]

function initData(){
    let arr = [];
    let num = 30000;
    for(let i = 0;i<100;i++){
        let r = Math.random()*10;//变化值
        let r1 = Math.random();//正负
        if(r1>0.5){
            num = num+Math.floor(r*100);
        }else{
            num = num-Math.floor(r*100);
        }
        arr.push([i,num])
    }
    return arr;
}

list =  initData()
const option = {
    title: {
        text: 'Beijing AQI'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        data: list.map(function (item) {
            return item[0];
        })
    },
    yAxis: {
        splitLine: {
            show: false
        }
    },
    toolbox: {
        left: 'center',
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    series: {
        name: 'Beijing AQI',
        type: 'line',
        data: list.map(function (item) {
            return item[1];
        }),
        
    }
}
export const opt = option
export default {option ,initData};
