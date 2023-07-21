import HelloWorld from '@/components/HelloWorld'
import line from '@/components/line'
import btc from '@/components/btc'
import test from '@/components/test'
import table from '@/components/table'
import strategy1 from '@/components/strategy1'
import strategy2 from '@/components/strategy2'
import rou from '@/components/rou'
const arr = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/line',
        name: '折线图',
        component: line
    },
    {
        path: '/line2',
        name: '折线图2',
        component: btc
    },
    {
        path: '/test',
        name: 'vue测试',
        component: test
    },
    {
        path: '/table',
        name: '波动区间',
        component: table
    },
    {
        path: '/strategy1',
        name: '模拟买卖',
        component: strategy1
    },
    {
        path: '/strategy2',
        name: '策略回测',
        component: strategy2
    },
    {
        path: '/rou/:id',
        name: '路由测试',
        component: rou
    }
]
export default arr
