import * as subSystemService from '../services/subSystem';
import { message } from 'antd';

export default{
  namespace: "subSystem",
  state: {
    dataSource: [],
    menuData: []
  },
  reducers: {
    fetchSubsystem(state,action){
      return {
        menuData: action.payload
      }
    }
  },
  effects: {
    /* 
      获取子系统列表
    */
    *fetchSubsystemList({ payload },{ put,call }){
      const data = yield call(subSystemService.searchSubSystemTrees);
      if(data.status){
        yield put({ type: 'fetchSubsystem',payload: data.result })
      }else{
        message.error(data.msg||'请求错误')
      }
      console.log(data,'data')
    },
    /* 
      添加子系统
    */
    *addSubSystem({ payload },{ put, call }){
      console.log(payload,'payload')
      const data = yield call(subSystemService.addSubSystem,payload);
      if(data.status){
        message.success('添加成功');
        /* 
          添加成功刷新列表
        */
        yield put({ type: 'fetchSubsystemList' });
      }else{
        message.error(data.msg||'添加子系统失败')
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/app/subSystem') {
          //监听路由变化 触发 effect 
          console.log('subSystem')
        }
      });
    },
  }
}