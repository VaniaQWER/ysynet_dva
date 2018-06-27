import * as usersService from '../services/users';
import { message } from 'antd';
//import { routerRedux } from 'dva/router';

//const delay = timeout => new Promise(resolve =>setTimeout(resolve,timeout))

export default {
  namespace: 'users',
  state: {
    dataSource: []
  },
  reducers: { //处理数据
    fetchUser(state,action){
      return {
        dataSource: [...state.dataSource,{...action.payload}]
      }
    },
    addUser(state, action){
      return {
        dataSource: [...state.dataSource, ...action.payload ]
      }
    },
    deleteUser(state,action){
      const { dataSource } = state;
      let index = dataSource.findIndex((value,index,arr)=> value.userId === action.payload.userId);
      dataSource.splice(index,1)
      return {
        dataSource: [...dataSource]
      }
    },
    updateUserEdit(state,action){
      const { dataSource } = state;
      let index = dataSource.findIndex((value,index,arr)=> value.userId === action.payload.userId);
      dataSource[index].editable = true;
      
      return {
        dataSource: [...dataSource]
      }
    },
    updateUserEditFalse(state,action){
      const { dataSource } = state;
      let index = dataSource.findIndex((value,index,arr)=> value.userId === action.payload.userId);
      dataSource[index] = { ...action.payload };
      dataSource[index].editable = false;
      return {
        dataSource: dataSource
      }
    },
    updateUser(state,action){
      const { dataSource } = state;
      let index = dataSource.findIndex((value,index,arr)=> value.userId === action.payload.userId);
      dataSource[index] = { ...action.payload };
      return {
        dataSource: [...dataSource]
      }
    },
    // 搜索
    searchUser(state,action){
      let value = action.payload.value;
      const { dataSource } = state;
      console.log(dataSource,'dataSource')
      if(value){
        let newData = dataSource.filter(item => item.username.includes(value) || item.age.includes(value)||item.gender.includes(value) )
        console.log(newData,'newData');
        return {
          dataSource: [...newData]
        }
      }else{
        return {
          dataSource: [...state.dataSource]
        }
      }
      
    }
  },
  effects: { //接收数据
    //*fetch({ payload: { page },{ call, put, select, take } })
    /* 
      call : 调用函数
      put : 发起action
      select : 从state 中获取数据
      take : 获取发送的数据
    
    */
    *fetch({ payload }, { call, put }) {
      const data = yield call(usersService.fetch)
      console.log(data,'data');
      yield put({ type :'fetchUser',payload: data.result })
    },

    //添加
    *add({ payload },{ call, put } ) {
      yield put({ type: 'addUser',payload: [{...payload.values}] });
      //yield call(delay,1000) // 延迟执行
      message.success('添加成功！')
      //yield put(routerRedux.push('/home')) //跳转
    },

    //删除
    *delete({ payload },{ call,put }) {
      console.log(payload,'delete--PayLoad');
      yield put({ type: 'deleteUser',payload  })
    },

    //输入框编辑
    *updateEdit({ payload },{ call, put }) {
      yield put({ type: 'updateUserEdit', payload })
    },
    // 输入框禁用
    *updateEditFalse({ payload },{ put, call }) {
      const data = yield call(usersService.updateUser,payload);
      if(data.status){
        yield put({ type: 'updateUserEditFalse', payload });
        message.success('修改成功！')
      }else{
        message.error(data.msg);
      }
    },
    //update 个人信息
    *update({ payload },{ put }){
      yield put({ type: 'updateUser', payload })
    },

    //搜索
    *search({ payload },{ put }){
      yield put({ type: 'searchUser',payload })
    }
    

  },
  subscriptions: { //监听数据
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user') {
          //监听路由变化 触发 effect 
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};