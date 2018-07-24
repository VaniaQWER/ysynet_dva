const menu = [
  {
  "path": "/drugStorage",
  "subMenus": [{
    "path": "/drugStorage/configMgt",
    "level": 1,
    "fsort": 30101,
    "name": "配置管理",
    "id": "30101",
    "key": "/drugStorage/configMgt",
    "parentId": "m301"
  },{
    "path": "/drugStorage/drugStorageManage",
    "level": 1,
    "fsort": 30102,
    "name": "药库管理",
    "id": "30102",
    "key": "/drugStorage/drugStorageManage",
    "parentId": "m302"
  }],
  "level": 0,
  "fsort": 301,
  "name": "药库",
  "icon": "table",
  "id": "m301",
  "key": "/drugStorage",
  "parentId": "m3"
}, 
{
  "path": "/pharmacy",
  "subMenus": [{
    "path": "/pharmacy/configMgt",
    "level": 1,
    "fsort": 30101,
    "name": "配置管理",
    "id": "30101",
    "key": "/pharmacy/configMgt",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "药房",
  "icon": "table",
  "id": "m301",
  "key": "/pharmacy",
  "parentId": "m3"
}]

export default menu ; 