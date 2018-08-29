import * as replenishment from '../../services/replenishment/replenish';
import { message } from 'antd';

console.log('211212112');

export default {
  namespace: 'replenish',
  state: {},
  reducers: {},
  effects: {
    // 补货计划 - 删除
    *ReplenishDelete({ payload, callback },{ put, call }){
      const data = yield call(replenishment.ReplenishDelete, payload);
      console.log(data,'删除');
      if (data.code === 200) {
        message.success('删除成功！');
      } else {
        message.error(data.msg);
      }
      if (callback) {
        callback();
      }
    },
    subscriptions: {
      setup({ dispatch, history }) {
        return history.listen(({ pathname, query }) => {
            if (pathname === '/replenishment/replenish') {
              //监听路由变化 触发 effect 
              console.log('补货计划');
            }
        });
      },
    }
  }
}