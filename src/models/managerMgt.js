import * as managerService from '../services/managerMgt';
import { message } from 'antd';

export default {
  namespace: 'managerMgt',
  state: {
    dataSource: [],
    tableLoading: false,
  },
  reducers: {
    searchAdmin(state,action){
      return {
        ...state,
        dataSource: action.payload
      }
    },
    updateUser(state,action){
      const { dataSource } = state;
      let index = dataSource.findIndex((value,index,arr)=> value.userId === action.payload.userId);
      dataSource[index] = { ...action.payload };
      return {
        ...state,
        dataSource: [...dataSource]
      }
    },
    updateUserEdit(state,action){
      const { dataSource } = state;
      let index = dataSource.findIndex((value,index,arr)=> value.userId === action.payload.userId);
      dataSource[index].editable = !dataSource[index].editable;
      return {
        ...state,
        dataSource: [...dataSource]
      }
    },
    loading(state,action){
      return {
        ...state,
        tableLoading: !state.tableLoading
      }
    }
  },
  effects: {
    *searchAdminList({ payload },{ put, call }){
      yield put({ type: 'loading' });
      const data = yield call (managerService.searchAdminList,{ ...payload });
      yield put({ type: 'loading' });
      if(data.status){
        yield put({ type: 'searchAdmin',payload: data.result });
      }else{
        message.error(data.msg||'获取管理员列表失败');
      }
    },
    *resetPwd({ payload },{ put, call }){
      const data = yield call(managerService.modifyAdminInfo,{ ...payload });
      if(data.status){
        message.success('重置密码成功');
        yield put({ type: 'searchAdminList' });
      }else{
        message.error(data.msg||'重置密码失败')
      }
    },
    //update 个人信息
    *update({ payload },{ put }){
      yield put({ type: 'updateUser', payload })
    },
    //输入框编辑
    *updateEdit({ payload },{ call, put }) {
      yield put({ type: 'updateUserEdit', payload })
    },
    // 输入框禁用
    *updateEditFalse({ payload },{ put, call }) {
      let values = {};
      values.userId = payload.userId;
      values.userName = payload.userName;
      values.mobilePhone = payload.mobilePhone;
      values.tfRemark = payload.tfRemark;
      const data = yield call(managerService.modifyAdminInfo,values);
      if(data.status){
        yield put({ type: 'updateUserEdit', payload });
        message.success('修改成功！')
      }else{
        message.error(data.msg);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/managerMgt') {
          //监听路由变化 触发 effect 
          console.log('managerMgt')
        }
      });
    },
  }
}