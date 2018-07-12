import * as menuService from '../services/menu';
import { message } from 'antd';

export default {
  namespace: 'menu',
  state: {
    dataSource: [],
    tableLoading: false
  },
  reducers: {
    menuList(state,action){
      return {
        ...state,
        dataSource: action.payload
      }
    },
    updateMenu(state,action){
      const { dataSource } = state;
      let index = dataSource.findIndex((value,index,arr)=> value.menuId === action.payload.menuId);
      dataSource[index] = { ...action.payload };
      return {
        ...state,
        dataSource: [...dataSource]
      }
    },
    updateMenuEdit(state,action){
      const { dataSource } = state;
      let index = dataSource.findIndex((value,index,arr)=> value.menuId === action.payload.menuId);
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
    *queryMenuList({ payload },{ put,call }){
      yield put({ type: 'loading' });
      const data = yield call(menuService.queryMenuList,{ ...payload });
      yield put({ type: 'loading' });
      if(data.status){
        yield put({ type: 'menuList',payload: data.result });
      }else{
        message.error(data.msg);
      }
    },

    // 更改编辑状态
    *update({ payload },{ put }){
      yield put({ type: 'updateMenuEdit', payload })
    },

    // 同步 更改具体value  
    *updateMenuInfo({ payload },{ put }){
      yield put({ type: 'updateMenu',payload })
    },

    // 与后台交互改菜单信息
    *modifyMenu({ payload },{ put,call }){
      let values = {};
      values.menuId = payload.menuId;
      values.tfRemark = payload.tfRemark;
      yield put({ type: 'loading' });
      console.log(values,'values')
      const data = yield call(menuService.modifyMenu,values);
      yield put({ type: 'loading' });
      if(data.status){
        message.success('修改成功');
        yield put({ type: 'queryMenuList' });
      }else{
        message.error(data.msg|| '修改失败');
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/ysy/menu') {
          //监听路由变化 触发 effect 
          console.log('菜单管理')
        }
      });
    },
  }
}