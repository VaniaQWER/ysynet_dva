import * as arrangeService from '../services/arrange';
import { message } from 'antd';

export default {
  namespace: 'arrange',
  state: {
    dataSource: [],
    orgList: [],
    targetKeys: [],
    addVisible: false,
    arrangeVisible: false,
    loading: false,
    rightTableLoading: false,
    leftTableLoading: false
  },
  reducers: {
    fetchList(state,action){
      return {
        ...state,
        dataSource: action.payload
      }
    },
    // 已添加机构/未添加机构
    orgList(state,action){
      let data = action.payload;
      return {
        ...state,
        orgList: data
      }
    },
    rightTarget(state,action){
      return {
        ...state,
        targetKeys: action.payload
      }
    },
    //部署 添加
    transferData(state,action){
      return {
        ...state,
        orgList: action.payload.orgList,
        targetKeys: action.payload.targetKeys,
      }
    },
    clearTables(state,action){
      return {
        ...state,
        orgList: [],
        targetKeys: []
      }
    },
    // visible
    visibleChange(state,action){
      let key = action.payload.key;
      if(key){
        return {
          ...state,
          arrangeVisible: !state.arrangeVisible
        }
      }else{
        return {
          ...state,
          addVisible: !state.addVisible
        }
      }
    },

    //loading
    loadChange(state,action){
      return {
        ...state,
        loading: !state.loading
      }
    },
    tableLoading(state,action){
      if(action.payload.key === 'right'){
        return {
          ...state,
          rightTableLoading: !state.rightTableLoading
        }
      }else{
        return {
          ...state,
          leftTableLoading: !state.leftTableLoading
        }
      }
    }
  },
  effects: {
    // 获取table
    *fetchTable({ payload },{ put, call }){
      const data = yield call(arrangeService.searchDeployList,{ ...payload.query });
      if(data.status){
        yield put({ type: 'fetchList',payload: data.result })
      }else{
        message.error(data.msg||'获取列表失败')
      }
    },
    //新建部署/编辑部署
    *saveArrange({ payload },{ put, call }){
      yield put({ type: 'loadChange' });
      const data = yield call(arrangeService.saveDeploy,{ ...payload });
      yield put({ type: 'loadChange' });
      if(data.status){
        message.success('操作成功');
        yield put({ type: 'changeVisible' })
        yield put({ type: 'fetchTable',payload:{ query: {} } })
      }else{
        message.error(data.msg||'操作失败')
      }
    },
    // 模态框表格搜索
    *search({payload},{ put, call }){
      if(payload.flag === '00'){
        // 右边搜索框搜索
        yield put({ type: 'tableLoading',payload: { key: 'right' } });
        const rightData = yield call(arrangeService.finRightOrgList,{ ...payload });
        yield put({ type: 'tableLoading',payload: { key: 'right' } });
        if(rightData.status){
          yield put({ type: 'rightTarget',payload: rightData.result });
        }else{
          message.error(rightData.msg||'搜索失败');
        }
      }else{
        yield put({ type: 'tableLoading',payload: { key: 'left' } });
        const data = yield call(arrangeService.findDeployOrgList,{ ...payload });
        yield put({ type: 'tableLoading',payload: { key: 'left' } });
        if(data.status){
          yield put({ type: 'orgList',payload: data.result })
        }else{
          message.error(data.msg||'获取机构失败')
        }
      }
    },
    // 模态框部署机构 添加移除  同步方法
    *transfer({ payload },{ put, select }){
      let transferData = payload.data;
      const stateData = yield select(state => state.arrange);
      let { orgList, targetKeys } = stateData;
      let data = payload.key === 'add'? targetKeys: orgList;
      let newTarget = [];
      data.map(item => {
        let flag = true;
        transferData.map((list,idx)=>{
          if(item.orgId === list.orgId){
            flag = false;
          }
          return null;
        });
        if(flag){
          newTarget.push(item)
        }
        return null;
      })
      if(payload.key === 'add'){
        yield put({ type: 'transferData',payload: { orgList: [...orgList,...transferData], targetKeys: [...newTarget]} })
      }else{
        yield put({ type: 'transferData',payload: { orgList: [...newTarget], targetKeys: []} })
      }
    },

    *modifyOrg({ payload },{ put, call }){
      yield put({ type: 'loadChange' });
      const data = yield call(arrangeService.deployModifyOrg, {...payload });
      yield put({ type: 'loadchange' });
      if(data.status){
        message.success('编辑成功');
        yield put({ type: 'changeVisible',payload:{ key: 'arrange' } });
      }else{
        message.error(data.msg||'操作失败')
      }
    },
    *clearTable({ payload },{ put }){
      yield put({ type: 'clearTables' })
    },
    *changeVisible({ payload },{ put }){
      yield put({ type: 'visibleChange',payload })
    },

    /* 
      获取所有机构列表
    */
   /* *fetchOrgList({ payload },{ put, call }){
     const data = yield call(arrangeService.findOrgs, {...payload} );
     if(data.status){
       yield put({ type: 'orgList',payload: data.result })
     }else{
       message.error(data.msg||'获取机构失败')
     }
   } */
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/arrange') {
          //监听路由变化 触发 effect 
          console.log('arrange')
        }
      });
    },
  }
}