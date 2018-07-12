import * as usersService from '../services/users';
import { message } from 'antd';

export default {
  namespace: 'users',
  state:{
    menuList: []
  },
  reducers: {
    userMenu(state,action){
      return {
        menuList: action.payload
      }
    }
  },
  effects:{
    *fetch({ payload },{ call, put, select }){
      // 判断state 中是否存有 menu 
      const menu = yield select(state=> state.users);
      if(menu.menuList.length === 0){
        const data = yield call(usersService.getUserM);
        if(data.status){
          yield put({ type: 'userMenu', payload: data.result });
        }else{
          message.error(data.msg|| '获取菜单失败')
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/'|| pathname[0] === '/') {
          //监听路由变化 触发 effect 
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  }
}