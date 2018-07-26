import * as dictionaryService from '../../services/dictionary/dictionary';
import { message } from 'antd';

export default {
  namespace: 'dictionary',
  state: {
    treeData: [],
    selectDatas: []
  },
  reducers: {
    showTreeData(state,action){
      return {
        treeData: action.payload
      }
    },
    orgInfo(state,action){
      return {
        ...state,
        selectDatas: action.payload
      }
    }
  },
  effects: {
    *searchTree({ payload,callback },{ put, call }){
      const data = yield call(dictionaryService.searchStaticByOrgId, payload);
      if(data.status){
        yield put({ type: 'showTreeData', payload: data.result });
        let defaultExpandedKeys = data.result[0].staticId;
        let defaultSelectedKeys = data.result[0].children[0] === undefined ? data.result[0].staticId:  data.result[0].children[0].staticId;
        if (callback) callback(defaultExpandedKeys,defaultSelectedKeys);
      }else{
        message.error(data.msg|| '获取字典树菜单失败')
      }
    },
    // 编辑菜单
    *updateStaticData({ payload,callback },{ call }){
      const data = yield call(dictionaryService.updateStaticData, payload);
      if(data.status){
        message.success('编辑菜单成功');
        if (callback) callback();
      }else{
        message.error(data.msg||'编辑菜单失败')
      }
    },
    *insertData({ payload,callback },{ call }){
      const data = yield call(dictionaryService.insertData, payload);
      if(data.status){
        message.success('新增菜单成功');
        if (callback) callback();
      }else{
        message.error(data.msg||'新增菜单失败')
      }
    },
    // 分类管理 查询机构信息
    *orgStaticInfo({ payload },{ put, call }){
      const data = yield call(dictionaryService.orgStaticInfo, payload);
      if(data.status){
        yield put({ type: 'orgInfo',payload: data.result });
      }
    },
    // 新增数据字典
    *insertStaticInfo({ payload,callback },{ call, put }){
      const data = yield call(dictionaryService.insertStaticInfo, payload);
      if(data.status){
        message.success('添加成功');
        if (callback) callback();
      }else{
        message.error(data.msg||'新增数据字典失败')
      }
    },
    // 编辑数据字典
    *updateStaticInfo({ payload,callback },{ call, put }){
      const data = yield call(dictionaryService.updateStaticInfo, payload);
      if(data.status){
        message.success('编辑成功');
        if (callback) callback();
      }else{
        message.error(data.msg||'编辑数据字典失败')
      }
    },
    //克隆数据字典
    *copyStaticInfo({ payload, callback },{ call }){
      const data = yield call(dictionaryService.copyStaticInfo,payload);
      if(data.status){
        message.success('克隆成功');
        if (callback) callback();
      }else{
        message.error(data.msg||'克隆数据字典失败')
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/dictionary/dictionaryMgt') {
          //监听路由变化 触发 effect 
          console.log('字典管理')
        }
      });
    },
  }
}