const menu = [
  {
  "path": "/drugStorage",
  "subMenus": [
    /* {
    "path": "/drugStorage/configMgt",
    "level": 1,
    "fsort": 30101,
    "name": "配置管理",
    "id": "30101",
    "key": "/drugStorage/configMgt",
    "parentId": "m301",
    "subMenus": [
      {
        "path": "/drugStorage/configMgt/drugStorageConfig",
        "level": 2,
        "fsort": 3010101,
        "name": "药库配置",
        "id": "3010101",
        "key": "/drugStorage/configMgt/drugStorageConfig",
        "parentId": "m303"
      },
      {
        "path": "/drugStorage/configMgt/drugStorageMaintain",
        "level": 2,
        "fsort": 3010101,
        "name": "药库维护",
        "id": "3010102",
        "key": "/drugStorage/configMgt/drugStorageMaintain",
        "parentId": "m303"
      }
    ]
  }, */
  {
    "path": "/drugStorage/replenishment",
    "level": 1,
    "fsort": 30102,
    "name": "补货管理",
    "id": "30102",
    "key": "/drugStorage/replenishment",
    "parentId": "m301",
    "icon": "calendar",
    "subMenus": [
      {
        "path": "/drugStorage/replenishment/replenishmentPlan",
        "level": 2,
        "fsort": 30102,
        "name": "补货计划",
        "id": "30102",
        "key": "/drugStorage/replenishment/replenishmentPlan",
        "parentId": "m301"
      },
      {
        "path": "/drugStorage/replenishment/purchasePlan",
        "level": 2,
        "fsort": 30102,
        "name": "采购计划",
        "id": "30102",
        "key": "/drugStorage/replenishment/purchasePlan",
        "parentId": "m301"
      },
      {
        "path": "/drugStorage/replenishment/confirmPlan",
        "level": 2,
        "fsort": 30102,
        "name": "确认计划",
        "id": "30102",
        "key": "/drugStorage/replenishment/confirmPlan",
        "parentId": "m301"
      },
     /*  {
        "path": "/drugStorage/replenishment/planOrder",
        "level": 2,
        "fsort": 30102,
        "name": "计划订单",
        "id": "30102",
        "key": "/drugStorage/replenishment/planOrder",
        "parentId": "m301"
      }, */
      {
        "path": "/drugStorage/replenishment/psListCheck",
        "level": 2,
        "fsort": 30102,
        "name": "配送单验收",
        "id": "30102",
        "key": "/drugStorage/replenishment/psListCheck",
        "parentId": "m301"
      }
    ]
  },
  {
    "path": "/drugStorage/drugStorageManage",
    "level": 1,
    "fsort": 30102,
    "name": "药库管理",
    "id": "30102",
    "key": "/drugStorage/drugStorageManage",
    "parentId": "m302",
    "icon": "medicine-box",
    "subMenus":[
      {
        "path": "/drugStorage/drugStorageManage/drugDirectory",
        "level": 2,
        "fsort": 30102,
        "name": "药品目录",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/drugDirectory",
        "parentId": "m303"
      },
      {
        "path": "/drugStorage/drugStorageManage/applyAccept",
        "level": 2,
        "fsort": 30102,
        "name": "申请受理",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/applyAccept",
        "parentId": "m303"
      },
      {
        "path": "/drugStorage/drugStorageManage/picking",
        "level": 2,
        "fsort": 30102,
        "name": "配货",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/picking",
        "parentId": "m303"
      },
      {
        "path": "/drugStorage/drugStorageManage/pickSoldOut",
        "level": 2,
        "fsort": 30102,
        "name": "拣货下架",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/pickSoldOut",
        "parentId": "m303"
      },
      {
        "path": "/drugStorage/drugStorageManage/output",
        "level": 2,
        "fsort": 30102,
        "name": "出库管理",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/output",
        "parentId": "m303"
      },
      {
        "path": "/drugStorage/drugStorageManage/refund",
        "level": 2,
        "fsort": 30102,
        "name": "退货",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/refund",
        "parentId": "m303"
      },
      {
        "path": "/drugStorage/drugStorageManage/putaway",
        "level": 2,
        "fsort": 30102,
        "name": "上架",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/putaway",
        "parentId": "m303"
      },
      {
        "path": "/drugStorage/drugStorageManage/newLibrary",
        "level": 2,
        "fsort": 30102,
        "name": "新建入库",
        "id": "30102",
        "key": "/drugStorage/drugStorageManage/newLibrary",
        "parentId": "m303"
      },
    ]
  },{
    "path": "/drugStorage/checkDecrease",
    "level": 1,
    "fsort": 30103,
    "name": "盘点损益",
    "id": "30103",
    "key": "/drugStorage/checkDecrease",
    "parentId": "m303",
    "icon": "hourglass",
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
  },
  {
    "path": "/drugStorage/stockInquiry",
    "level": 1,
    "fsort": 30104,
    "name": "库存查询",
    "id": "30104",
    "key": "/drugStorage/stockInquiry",
    "parentId": "m304",
    "icon": "search",
    "subMenus": [
      {
        "path": "/drugStorage/stockInquiry",
        "level": 2,
        "fsort": 30104,
        "name": "库存查询",
        "id": "30104",
        "key": "/drugStorage/stockInquiry",
        "parentId": "m304"
      }
    ]
  }, {
    "path": "/drugStorage/settlementMgt",
    "level": 1,
    "fsort": 30105,
    "name": "结算管理",
    "id": "30105",
    "key": "/drugStorage/settlementMgt",
    "parentId": "m305",
    "icon": "wallet",
    "subMenus": [
      {
        "path": "/drugStorage/settlementMgt",
        "level": 2,
        "fsort": 30105,
        "name": "结算汇总",
        "id": "30106",
        "key": "/drugStorage/settlementMgt",
        "parentId": "m305"
      }
    ]
  }
],
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
  "subMenus": [
    {
      "path": "/pharmacy/configMgt",
      "level": 1,
      "fsort": 30101,
      "name": "配置管理",
      "id": "30101",
      "key": "/pharmacy/configMgt",
      "parentId": "m301",
      "icon": "setting",
    },
    {
      "path": "/pharmacy/checkDecrease",
      "level": 1,
      "fsort": 30103,
      "name": "盘点损益",
      "id": "30103",
      "key": "/pharmacy/checkDecrease",
      "parentId": "m303",
      "icon": "hourglass",
      "subMenus":[
        {
          "path": "/pharmacy/checkDecrease/newInventory",
          "level": 2,
          "fsort": 30103,
          "name": "新建盘点",
          "id": "30103",
          "key": "/pharmacy/checkDecrease/newInventory",
          "parentId": "m304"
        },
        {
          "path": "/pharmacy/checkDecrease/inventoryAudit",
          "level": 2,
          "fsort": 30103,
          "name": "盘点审核",
          "id": "30103",
          "key": "/pharmacy/checkDecrease/inventoryAudit",
          "parentId": "m305"
        },
        {
          "path": "/pharmacy/checkDecrease/afterAdjustment",
          "level": 2,
          "fsort": 30103,
          "name": "盘后调整",
          "id": "30103",
          "key": "/pharmacy/checkDecrease/afterAdjustment",
          "parentId": "m306"
        },
        {
          "path": "/pharmacy/checkDecrease/profiLossRecord",
          "level": 2,
          "fsort": 30103,
          "name": "损益记录",
          "id": "30103",
          "key": "/pharmacy/checkDecrease/profiLossRecord",
          "parentId": "m307"
        }
      ]
      },
      {
        "path": "/pharmacy/stockInquiry",
        "level": 1,
        "fsort": 30104,
        "name": "库存查询",
        "id": "30104",
        "key": "/pharmacy/stockInquiry",
        "parentId": "m304",
        "icon": "search",
        "subMenus": [
          {
            "path": "/pharmacy/stockInquiry",
            "level": 2,
            "fsort": 30104,
            "name": "库存查询",
            "id": "30104",
            "key": "/pharmacy/stockInquiry",
            "parentId": "m304"
          }
        ]
      }, {
        "path": "/pharmacy/settlementMgt",
        "level": 1,
        "fsort": 30105,
        "name": "结算管理",
        "id": "30105",
        "key": "/pharmacy/settlementMgt",
        "parentId": "m305",
        "icon": "wallet",
        "subMenus": [
          {
            "path": "/pharmacy/settlementMgt/dayStatements",
            "level": 2,
            "fsort": 30105,
            "name": "日对账单",
            "id": "30106",
            "key": "/pharmacy/settlementMgt/dayStatements",
            "parentId": "m305"
          },
          {
            "path": "/pharmacy/settlementMgt/statements",
            "level": 2,
            "fsort": 30105,
            "name": "结算单",
            "id": "30106",
            "key": "/pharmacy/settlementMgt/statements",
            "parentId": "m305"
          }
        ]
      },
      {
        "path": "/pharmacy/manage",
        "level": 2,
        "fsort": 30105,
        "name": "药房管理",
        "id": "30106",
        "key": "/pharmacy/manage",
        "parentId": "m305",
        "icon": "medicine-box",
        "subMenus":[
          {
            "path": "/pharmacy/manage/drugDirectory",
            "level": 2,
            "fsort": 30105,
            "name": "药房目录",
            "id": "30106",
            "key": "/pharmacy/manage/drugDirectory",
            "parentId": "m305"
          },
          {
            "path": "/pharmacy/manage/drugsFor",
            "level": 2,
            "fsort": 30105,
            "name": "药品申领",
            "id": "30106",
            "key": "/pharmacy/manage/drugsFor",
            "parentId": "m305"
          },
          {
            "path": "/pharmacy/manage/acceptance",
            "level": 2,
            "fsort": 30105,
            "name": "验收",
            "id": "30106",
            "key": "/pharmacy/manage/acceptance",
            "parentId": "m305"
          },
          {
            "path": "/pharmacy/manage/putaway",
            "level": 2,
            "fsort": 30105,
            "name": "上架",
            "id": "30106",
            "key": "/pharmacy/manage/putaway",
            "parentId": "m305"
          },
          {
            "path": "/pharmacy/manage/newLibrary",
            "level": 2,
            "fsort": 30105,
            "name": "新建入库",
            "id": "30106",
            "key": "/pharmacy/manage/newLibrary",
            "parentId": "m305"
          },
          {
            "path": "/pharmacy/manage/output",
            "level": 2,
            "fsort": 30105,
            "name": "发药出库",
            "id": "30106",
            "key": "/pharmacy/manage/output",
            "parentId": "m305"
          },
          {
            "path": "/pharmacy/manage/refund",
            "level": 2,
            "fsort": 30105,
            "name": "退库",
            "id": "30106",
            "key": "/pharmacy/manage/refund",
            "parentId": "m305"
          },
        ]
      },
  ],
  "level": 0,
  "fsort": 301,
  "name": "药房",
  "icon": "table",
  "id": "m301",
  "key": "/pharmacy",
  "parentId": "m3"
}
]



export default menu; 