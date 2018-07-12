import * as accreditService from '../services/accredit';
import { message } from 'antd';

export default {
  namespace: 'accredit',
  state: {
    dataSource: [],
    rootSubmenuKeys: [],
    openKeys: [],
    defaultSelectedKeys: [],
    loading: false
  },
  reducers: {
    GendeployList(state,action){
      let rootSubmenuKeys = [],openKeys = [], defaultSelectedKeys = [];
      action.payload.map((item,index)=>{
        if(index === 0){
          openKeys.push(item.orgId);
          defaultSelectedKeys.push(item.children[0].orgId)
        }
        rootSubmenuKeys.push(item.orgId)}
      );
      return {
        ...state,
        dataSource: action.payload,
        rootSubmenuKeys,
        openKeys,
        defaultSelectedKeys
      }
    },
    openKeys(state,action){
      return {
        ...state,
        openKeys: [...action.payload.openKeys]
      }
    },
    loading(state,action){
      return {
        ...state,
        loading: !state.loading
      }
    }
  },
  effects: {
    *deployList({ payload },{ put,call }){
      yield put({ type: 'loading' });
      const data = yield call(accreditService.searchDeployList,{ ...payload });
      yield put({ type: 'loading' });
      if(data.status){
        yield put({ type: 'GendeployList',payload: data.result });
      }else{
        message.error(data.msg||'获取部署列表失败')
      }
    },
    *updateOpenKeys({ payload },{ put }){
      yield put({ type: 'openKeys', payload: {openKeys: payload.openKeys} });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/ysy/accredit') {
          //监听路由变化 触发 effect 
          console.log('授权管理')
        }
      });
    },
  }
}