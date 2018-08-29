import * as replenishment from '../../services/replenishment/replenish';
import { message } from 'antd';

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

    /* 目录外采购 */
    // 状态
    *typelist({ payload,callback },{ call }){
      const data = yield call(replenishment.typelist, payload);
      if(data.code !== 200){
        return message.error(data.msg||'获取状态失败')
      }
      if(callback) callback(data.data)
    },

    subscriptions: {
      
    }
  }
}