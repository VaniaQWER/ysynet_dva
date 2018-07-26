import querystring from 'querystring';
import {_local} from '../api/local';
export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/**
 * @desc get static data
 * @param { string } type 
 * @param { function } callback 
 * @author vania
 * @returns data
 */
export const CommonData = (type, cb, params={}, url) => {
  if(localStorage.getItem(type)) {
    cb(JSON.parse(localStorage.getItem(type)));
  } else {
    fetch(url || `${_local}/staticData/commonData?type=` + type, {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify(params)
    })
    .then((res) => res.json())
    .then((json) => {
      cb(json.result)
      localStorage.setItem(type, JSON.stringify(json.result));
    })
    .catch((err) => cb(err))
  }
}
/**
 * json obj 比较
 * @param {*} obj1 
 * @param {*} obj2 
 * @param {*} except 不比较项
 */
export const objCompare = (obj1, obj2) => {
  if (typeof obj1 !== 'object' || obj1 === null) {
    return false;
  }
  if (typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }
  // get all key
  var aProps = Object.getOwnPropertyNames(obj1);  
  var bProps = Object.getOwnPropertyNames(obj2);
  if (aProps.length !== bProps.length) {  
    return false;  
  }  
  for (let i = 0; i < aProps.length; i++) {  
    let propName = aProps[i];  
    if ((obj1[propName] !== obj2[propName])) {  
      return false;  
    }  
  }  
  return true;
}

export const getMenuData  = (key, menuList) => {
  try {
    return menuList.filter(item => item.path === `/${key}`)[0].subMenus
  } catch (error) {
    return [];
  }
}