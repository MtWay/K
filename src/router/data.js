import HelloWorld from '@/components/HelloWorld'
import line from '@/components/line'
import btc from '@/components/btc'
import test from '@/components/test'
import rou from '@/components/rou'
const arr=[
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
        path: '/rou/:id',
        name: '路由测试',
        component: rou
      }
]
export default arr
