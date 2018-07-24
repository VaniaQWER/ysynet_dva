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
    "parentId": "m302",
    "subMenus":[
      {
        "path": "/drugStorage/drugStorageManage/drugDirectory",
        "level": 2,
        "fsort": 30102,
        "name": "药品目录",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/drugDirectory",
        "parentId": "m303"
      }
    ]
  },{
    "path": "/drugStorage/checkDecrease",
    "level": 1,
    "fsort": 30103,
    "name": "盘点损益",
    "id": "30103",
    "key": "/drugStorage/checkDecrease",
    "parentId": "m303",
    "subMenus":[
      {
        "path": "/drugStorage/checkDecrease/newInventory",
        "level": 2,
        "fsort": 30103,
        "name": "新建盘点",
        "id": "30103",
        "key": "/drugStorage/checkDecrease/newInventory",
        "parentId": "m304"
      },
      {
        "path": "/drugStorage/checkDecrease/inventoryAudit",
        "level": 2,
        "fsort": 30103,
        "name": "盘点审核",
        "id": "30103",
        "key": "/drugStorage/checkDecrease/inventoryAudit",
        "parentId": "m305"
      },
      {
        "path": "/drugStorage/checkDecrease/afterAdjustment",
        "level": 2,
        "fsort": 30103,
        "name": "盘后调整",
        "id": "30103",
        "key": "/drugStorage/checkDecrease/afterAdjustment",
        "parentId": "m306"
      },
      {
        "path": "/drugStorage/checkDecrease/profiLossRecord",
        "level": 2,
        "fsort": 30103,
        "name": "损益记录",
        "id": "30103",
        "key": "/drugStorage/checkDecrease/profiLossRecord",
        "parentId": "m307"
      },
    ]
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