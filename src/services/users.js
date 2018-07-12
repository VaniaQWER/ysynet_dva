import request from '../utils/request';

export function fetchUser(options){
  return request('/api/users',options)
}
export function login(options){
  return request('/login/userLogin',{
    methods: 'POST',
    data: options
  })
}

export function fetch() {
  return request(`/login/getUserInfo`,{
    methods: 'POST',
    data: {}
  })
}

export function updateUser(options){
  return request('/user/updateUser',{
    methods: 'POST',
    data: options
  })
}
export function getUserM(options){
  return request('/user/getUserM',{
    methods: 'POST',
    data: options
  })
}