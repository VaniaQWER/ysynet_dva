import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}`)),
  component,
});

// nav data
/* export const getNavData2 = app => [
  {
    component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    path: '/',
    name: '工作台',
    children: [
      {
        name: "工作台",
        icon: 'workplace',
        path: 'home',
        component: dynamicWrapper(app, [], () => import('../routes/Workplace'))
      },
      {
        name: "医商云",
        icon: 'add',
        path: 'ysy',
        children: [{
          name: '菜单管理',
          icon: 'add',
          path: '/menu',
          component: dynamicWrapper(app, ['ysy/menu'], () => import('../routes/YSY/menu')),
        },{
          name: "子系统管理",
          icon: 'add',
          path: '/subSystem',
          component: dynamicWrapper(app, ['ysy/subSystem'], () => import('../routes/YSY/subSystem'))
        },{
          name: "部署管理",
          icon: 'add',
          path: '/arrange',
          component: dynamicWrapper(app, ['ysy/arrange'], () => import('../routes/YSY/arrange'))
        },{
          name: "授权管理",
          icon: 'add',
          path: '/accredit',
          component: dynamicWrapper(app, ['ysy/accredit'], () => import('../routes/YSY/accredit'))
        },{
          name: "管理员管理",
          icon: 'add',
          path: '/managerMgt',
          component: dynamicWrapper(app, ['ysy/managerMgt'], () => import('../routes/YSY/managerMgt'))
        }]
      },
      {
        name: "子系统配置",
        icon: 'setting',
        path: '/configure',
        children: [{
          name: "子系统配置",
          icon: 'add',
          path: '/subSystemConfigure',
          component: dynamicWrapper(app, ['config/subSystemConfig'], () => import('../routes/Configure/subSystemConfig'))
        },{
          
        }],
      },
      {
        name: "数据字典",
        icon: 'setting',
        path: 'dictionary',
        children: [{
          name: "数据字典",
          icon: 'setting',
          path: '/dictionaryMgt',
          component: dynamicWrapper(app, ['dictionary/dictionary'], () => import('../routes/Dictionary/dictionary'))
        },{
          name: "分类管理",
          icon: 'setting',
          path: '/classifyMgt',
          component: dynamicWrapper(app, ['dictionary/classifyMgt'], () => import('../routes/Dictionary/classify'))
        }]
      },
      {
        name: '精细化',
        icon: 'setting',
        path: 'jxh',
        children: [
          {
            name: '管理员',
            icon: 'user',
            path: '/manager',
            children: [{
              name: '子系统管理',
              icon: 'setting',
              path: '/subSystemMgt',
              component: dynamicWrapper(app, ['manager/subSystemMgt'], () => import('../routes/Manager/subSystemMgt'))
            },{
              name: "子系统管理员",
              icon: 'setting',
              path: '/subSystemMgter',
              component: dynamicWrapper(app, ['manager/subSystemManager'], () => import('../routes/Manager/subSystemManager'))
            },{
              name: "科室管理",
              icon: 'setting',
              path: '/dpetMgt',
              component: dynamicWrapper(app, ['manager/deptMgt'], () => import('../routes/Manager/deptMgt'))
            }]
          },{
            name: '非临床科室子系统',
            icon: 'table',
            path: '/flcksSubSystem',
            children: [{
              name: "配置管理",
              icon: 'setting',
              path: '/configMgt',
              component: dynamicWrapper(app, ['manager/deptMgt'], () => import('../routes/NonClinicalDeptSystem'))
            }]
        },{
            name: '临床科室子系统',
            icon: 'table',
            path: '/lcksSubSystem',
            children: [{
              name: "配置管理",
              icon: 'setting',
              path: '/configMgt',
              component: dynamicWrapper(app, ['manager/deptMgt'], () => import('../routes/ClinicalDeptSystem'))
            }]
        },]
      },
      {
        name: '药库',
        icon: 'table',
        path: '/drugStorage',
        children: [{
          name: "配置管理",
          icon: 'setting',
          path: '/configMgt',
          component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/configMgt/drugConfigMgt'))
        },
        {
          name: "药库管理",
          icon: 'setting',
          path: '/drugStorageManage',
          component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/drugDirectory')),
          children: [
            {
              name: "药品目录",
              icon: 'setting',
              path: '/drugDirectory',
              component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/drugDirectory')),
              children:[
                {
                  name: "药品目录-编辑",
                  icon: 'setting',
                  path: '/edit',
                  component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/drugDirectory/edit'))
                }
              ]
            },
           
          ]
        },
        {
          name: "入库",
          icon: 'setting',
          path: '/warehouse',
          component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/psListCheck/index')),
        },
      ]},
      {
        name: '药房',
        icon: 'table',
        path: '/pharmacy',
        children: [{
          name: '配置管理',
          icon: 'setting',
          path: '/configMgt',
          component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/configMgt'))
        }]
      }
    ]
  },
]; */



export const getNavData = app => [
  {
  component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout')),
  layout: 'BasicLayout',
  path: '/',
  name: '工作台',
  children: [
    /* *****************    配置管理   ************************* */
    {
      name: "配置管理",//药库-配置管理
      icon: 'setting',
      path: '/drugStorage/configMgt/drugDirectory',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/configMgt/drugDirectory'))
    },
    {
      name: "配置管理--编辑",//药库-配置管理
      icon: 'setting',
      path: '/drugStorage/configMgt/drugDirectory/edit',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/configMgt/drugDirectory/edit'))
    },
    /* {
      name: "药库管理",//药库-药库管理
      icon: 'setting',
      path: '/drugStorage/drugStorageManage',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/drugDirectory')),
    },
    {
      name: "药品目录",//药库-药库管理-药品目录
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/drugDirectory',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/drugDirectory')),
    },
    {
      name: "药品目录-编辑",//药库-药库管理-药品目录-编辑
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/drugDirectory/edit',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/drugDirectory/edit'))
    },
    {
      name: "申请受理",//药库-药库管理-申请受理
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/applyAccept',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/applyAccept')),
    },
    {
      name: "申请受理详情",//药库-药库管理-申请受理
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/applyAccept/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/applyAccept/details')),
    },
    {
      name: "配货",//药库-药库管理-配货
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/picking',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/picking')),
    },
    {
      name: "配货详情",//药库-药库管理-配货详情
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/picking/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/picking/details')),
    },
    {
      name: "拣货下架",//药库-药库管理-拣货下架
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/pickSoldOut',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/pickSoldOut')),
    },
    {
      name: "拣货下架详情",//药库-药库管理-拣货下架详情
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/pickSoldOut/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/pickSoldOut/details')),
    },
    {
      name: "出库管理",//药库-药库管理-出库管理
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/output',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/output')),
    },
    {
      name: "出库管理-新增",//药库-药库管理-出库管理-新增
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/output/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/output/add')),
    },
    {
      name: "出库管理-详情",//药库-药库管理-出库管理-详情
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/output/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/output/details')),
    },
    {
      name: "退货",//药库-药库管理-退货
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/refund',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/refund')),
    },
    {
      name: "退货-新增",//药库-药库管理-退货-新增
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/refund/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/refund/add')),
    },
    {
      name: "退货-详情",//药库-药库管理-退货-详情
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/refund/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/refund/details')),
    },
    {
      name: "上架",//药库-药库管理-上架
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/putaway',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/putaway')),
    },
    {
      name: "新建入库",//药库-药库管理-新建入库
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/newLibrary',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/newLibrary')),
    },
    {
      name: "新建入库-新增",//药库-药库管理-新建入库-新增
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/newLibrary/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/newLibrary/add')),
    },
    {
      name: "新建入库-详情",//药库-药库管理-新建入库-详情
      icon: 'setting',
      path: '/drugStorage/drugStorageManage/newLibrary/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/newLibrary/details')),
    }, */

    /* 
      入库 
    */
    {
      name: "配送单验收",
      icon: 'setting',
      path: '/drugStorage/wareHouse/psListCheck',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/wareHouse/psListCheck')),
    },
    {
      name: '配送单验收--新建',
      iocn: 'setting',
      path: '/drugStorage/wareHouse/psListCheck/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/wareHouse/psListCheck/add')),
    },
    {
      name: '配送单验收--详情',
      iocn: 'setting',
      path: '/drugStorage/wareHouse/psListCheck/detail',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/wareHouse/psListCheck/detail')),
    },
    {
      name: "上架",
      icon: 'setting',
      path: '/drugStorage/wareHouse/grounding',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/wareHouse/grounding')),
    },
    {
      name: "上架",
      icon: 'setting',
      path: '/drugStorage/wareHouse/grounding/detail',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/wareHouse/grounding/detail')),
    },
    {
      name: "入库单管理",
      icon: 'setting',
      path: '/drugStorage/wareHouse/wareHouseReceiptMgt',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/wareHouse/wareHouseReceiptMgt')),
    },
    {
      name: "入库单详情",
      icon: 'setting',
      path: '/drugStorage/wareHouse/wareHouseReceiptMgt/detail',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/wareHouse/wareHouseReceiptMgt/detail')),
    },
    /* ***************  出库  ******************** */
    {
      name: "受理配货",
      icon: 'setting',
      path: '/drugStorage/outStorage/acceptDistribution',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/acceptDistribution')),
    },
    {
      name: "受理配货-详情",
      icon: 'setting',
      path: '/drugStorage/outStorage/acceptDistribution/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/acceptDistribution/details')),
    },
    {
      name: "拣货下架",
      icon: 'setting',
      path: '/drugStorage/outStorage/pickingUnderShelve',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/pickingUnderShelve')),
    },
    {
      name: "拣货下架-详情",
      icon: 'setting',
      path: '/drugStorage/outStorage/pickingUnderShelve/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/pickingUnderShelve/details')),
    },
    {
      name: "出库单管理",
      icon: 'setting',
      path: '/drugStorage/outStorage/outReceiptMgt',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/outReceiptMgt')),
    },
    {
      name: "出库单管理-新增",
      icon: 'setting',
      path: '/drugStorage/outStorage/outReceiptMgt/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/outReceiptMgt/add')),
    },
    {
      name: "出库单管理-详情",
      icon: 'setting',
      path: '/drugStorage/outStorage/outReceiptMgt/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/outReceiptMgt/details')),
    },
    {
      name: "退货",
      icon: 'setting',
      path: '/drugStorage/outStorage/backStorage',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/backStorage')),
    },
    {
      name: "新增退货",
      icon: 'setting',
      path: '/drugStorage/outStorage/backStorage/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/backStorage/add')),
    },
    {
      name: "退货复核",
      icon: 'setting',
      path: '/drugStorage/outStorage/backStorage/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/backStorage/details')),
    },
    {
      name: "召回及锁定",
      icon: 'setting',
      path: '/drugStorage/outStorage/recallAndLocked',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/recallAndLocked')),
    },
    {
      name: "新增召回及锁定",
      icon: 'setting',
      path: '/drugStorage/outStorage/recallAndLocked/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/recallAndLocked/add')),
    },
    {
      name: "召回及锁定详情",
      icon: 'setting',
      path: '/drugStorage/outStorage/recallAndLocked/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/recallAndLocked/details')),
    },
    {
      name: "召回及锁定审核",
      icon: 'setting',
      path: '/drugStorage/outStorage/recallAndLockedCheck',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/recallAndLockedCheck')),
    },
    {
      name: "召回及锁定审核详情",
      icon: 'setting',
      path: '/drugStorage/outStorage/recallAndLockedCheck/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/outStorage/recallAndLockedCheck/details')),
    },
    /* ********************      货位调整      ************************** */
    {
      name: "货位调整",
      icon: 'setting',
      path: '/drugStorage/goodsAdjust/adjust',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/goodsAdjust/adjust')),
    },
    {
      name: "货位调整-新增",
      icon: 'setting',
      path: '/drugStorage/goodsAdjust/adjust/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/goodsAdjust/adjust/add')),
    },
    {
      name: "货位调整-详情",
      icon: 'setting',
      path: '/drugStorage/goodsAdjust/adjust/detail',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/goodsAdjust/adjust/detail')),
    },
    // 药库 - 盘点损益
    {
      name: "盘点损益",
      icon: 'setting',
      path: '/drugStorage/checkDecrease',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/newInventory')),
    },
    // 药库 - 盘点损益 - 新建盘点
    {
      name: "新建盘点",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/newInventory',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/newInventory')),
    },
    // 药库 - 盘点损益 - 新建盘点 - 详情(待确认)
    {
      name: "新建盘点-详情(待确认)",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/newInventory/details/:types',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/newInventory/details')),
    },
    // 药库 - 盘点损益 - 新建盘点 - 详情(已确认)
    {
      name: "新建盘点-详情(已确认)",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/newInventory/detailsConfirm/:types',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/newInventory/detailsConfirm')),
    },
    // 药库 - 盘点损益 - 盘点审核
    {
      name: "盘点审核",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/inventoryAudit',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/inventoryAudit')),
    },
    // 药库 - 盘点损益 - 盘点审核 - 详情(待审核)
    {
      name: "盘点审核-详情(待审核)",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/inventoryAudit/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/inventoryAudit/details')),
    },
    // 药库 - 盘点损益 - 盘点审核 - 详情(已审核)
    {
      name: "盘点审核-详情(已审核)",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/inventoryAudit/detailsConfirm',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/inventoryAudit/detailsConfirm')),
    },
    // 药库 - 盘点损益 - 盘后调整
    {
      name: "盘后调整",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/afterAdjustment',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/afterAdjustment')),
    },
    // 药库 - 盘点损益 - 盘后调整 - 详情
    {
      name: "盘后调整-详情",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/afterAdjustment/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/afterAdjustment/details')),
    },
    // 药库 - 盘点损益 - 损益记录
    {
      name: "损益记录",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/profiLossRecord',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/profiLossRecord')),
    },
    // 药库 - 盘点损益 - 损益记录 - 详情
    {
      name: "损益记录-详情",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/profiLossRecord/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/profiLossRecord/details')),
    },

    //药库 - 库存查询
    {
      name: "库存查询",
      icon: "setting",
      path: '/drugStorage/stockInquiry',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/stockInquiry'))
    },
    //药库 - 库存查询 - 详情
    {
      name: '详情',
      icon: "setting",
      path: '/drugStorage/stockInquiry/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/stockInquiry/details'))
    },
    //药库 - 结算管理
    // {
    //   name: '结算管理',
    //   icon: 'setting',
    //   path: '/drugStorage/settlementMgt/',
    //   component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/settlementMgt'))
    // },
    // //药库 - 结算管理 - 详情
    // {
    //   name: '详情',
    //   icon: 'setting',
    //   path: '/drugStorage/settlementMgt/details',
    //   component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/settlementMgt/details'))
    // },

    /*药房 */
    {
      name: '药房',
      icon: 'table',
      path: '/pharmacy',
      children: []
    },
    {
      name: '配置管理',//药房-配置管理
      icon: 'setting',
      path: '/pharmacy/configMgt',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/configMgt'))
    },
    // 药房 - 盘点损益
    {
      name: "盘点损益",
      icon: 'setting',
      path: '/pharmacy/checkDecrease',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/newInventory')),
    },
    // 药房 - 盘点损益 - 新建盘点
    {
      name: "新建盘点",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/newInventory',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/newInventory')),
    },
    // 药房 - 盘点损益 - 新建盘点 - 详情(待确认)
    {
      name: "新建盘点-详情(待确认)",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/newInventory/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/newInventory/details')),
    },
    // 药房 - 盘点损益 - 新建盘点 - 详情(已确认)
    {
      name: "新建盘点-详情(已确认)",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/newInventory/detailsConfirm',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/newInventory/detailsConfirm')),
    },
    // 药房 - 盘点损益 - 盘点审核
    {
      name: "盘点审核",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/inventoryAudit',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/inventoryAudit')),
    },
    // 药房 - 盘点损益 - 盘点审核 - 详情(待审核)
    {
      name: "盘点审核-详情(待审核)",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/inventoryAudit/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/inventoryAudit/details')),
    },
    // 药房 - 盘点损益 - 盘点审核 - 详情(已审核)
    {
      name: "盘点审核-详情(已审核)",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/inventoryAudit/detailsConfirm',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/inventoryAudit/detailsConfirm')),
    },
    // 药房 - 盘点损益 - 盘后调整
    {
      name: "盘后调整",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/afterAdjustment',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/afterAdjustment')),
    },
    // 药房 - 盘点损益 - 盘后调整 - 详情
    {
      name: "盘后调整-详情",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/afterAdjustment/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/afterAdjustment/details')),
    },
    // 药房 - 盘点损益 - 损益记录
    {
      name: "损益记录",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/profiLossRecord',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/profiLossRecord')),
    },
    // 药房 - 盘点损益 - 损益记录 - 详情
    {
      name: "损益记录-详情",
      icon: 'setting',
      path: '/pharmacy/checkDecrease/profiLossRecord/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/checkDecrease/profiLossRecord/details')),
    },
    /*****************药房 --药房管理 -- 开始***************************/
    {
      name: '药品目录',//药房-药品目录
      icon: 'setting',
      path: '/pharmacy/configMgt/drugDirectory',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/configMgt/drugDirectory'))
    },
    {
      name: '药品目录',//药房-药品目录
      icon: 'setting',
      path: '/pharmacy/configMgt/drugDirectory/edit',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/configMgt/drugDirectory/edit'))
    },
    {
      name: '药房管理',//药房-药房管理
      icon: 'setting',
      path: '/pharmacy/manage',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/drugDirectory'))
    },
    {
      name: "药品目录",//药房-药房管理-药品目录
      icon: 'setting',
      path: '/pharmacy/manage/drugDirectory',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/drugDirectory')),
    },
    {
      name: "药品目录-编辑",//药房-药房管理-药品目录-编辑
      icon: 'setting',
      path: '/pharmacy/manage/drugDirectory/edit',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/drugDirectory/edit')),
    },
    {
      name: "退库",//药库-药房管理-退库
      icon: 'setting',
      path: '/pharmacy/manage/refund',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/refund')),
    },
    {
      name: "退库-新增",//药库-药房管理-退库-新增
      icon: 'setting',
      path: '/pharmacy/manage/refund/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/refund/add')),
    },
    {
      name: "退库-详情",//药库-药房管理-退库-详情
      icon: 'setting',
      path: '/pharmacy/manage/refund/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/refund/details')),
    },
    {
      name: "发药出库",//药库-药房管理-发药出库
      icon: 'setting',
      path: '/pharmacy/manage/output',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/output')),
    },
    {
      name: "发药出库-详情",//药库-药房管理-发药出库-详情
      icon: 'setting',
      path: '/pharmacy/manage/output/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/output/details')),
    },
    {
      name: "新建入库",//药库-药房管理-新建入库
      icon: 'setting',
      path: '/pharmacy/manage/newLibrary',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/newLibrary')),
    },
    {
      name: "新建入库-新增",//药库-药房管理-新建入库-新增
      icon: 'setting',
      path: '/pharmacy/manage/newLibrary/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/newLibrary/add')),
    },
    {
      name: "新建入库-详情",//药库-药房管理-新建入库-详情
      icon: 'setting',
      path: '/pharmacy/manage/newLibrary/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/newLibrary/details')),
    },
    {
      name: "上架",//药库-药房管理-上架
      icon: 'setting',
      path: '/pharmacy/manage/putaway',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/putaway')),
    },
    {
      name: "验收",//药库-药房管理-验收
      icon: 'setting',
      path: '/pharmacy/manage/acceptance',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/acceptance')),
    },
    {
      name: "验收-新增",//药库-药房管理-验收-新增
      icon: 'setting',
      path: '/pharmacy/manage/acceptance/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/acceptance/add')),
    },
    {
      name: "验收-编辑",//药库-药房管理-验收-编辑
      icon: 'setting',
      path: '/pharmacy/manage/acceptance/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/acceptance/details')),
    },
    {
      name: "药品申领 ",//药库-药房管理-药品申领 
      icon: 'setting',
      path: '/pharmacy/manage/drugsFor',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/drugsFor')),
    },
    {
      name: "药品申领 -新增",//药库-药房管理-药品申领 -新增
      icon: 'setting',
      path: '/pharmacy/manage/drugsFor/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/drugsFor/add')),
    },
    {
      name: "药品申领 -编辑",//药库-药房管理-药品申领 -编辑
      icon: 'setting',
      path: '/pharmacy/manage/drugsFor/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/manage/drugsFor/details')),
    },
     /*药房 --药房管理 -- 结束*/

     //药房 - 库存查询
    {
      name: "库存查询",
      icon: 'setting',
      path: '/pharmacy/stockInquiry',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/stockInquiry')),
    },
    //药房 - 库存查询 - 详情
    {
      name: "详情",
      icon: 'setting',
      path: '/pharmacy/stockInquiry/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/stockInquiry/details')),
    }, 
      
    /*------药房------*/
    /*-----药房-申领入库--*/
    {
      name: "药品申领 ",//药库-申领入库-药品申领 
      icon: 'setting',
      path: '/pharmacy/wareHouse/drugsFor',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/drugsFor')),
    },
    {
      name: "药品申领 -新增",//药库-申领入库-药品申领 -新增
      icon: 'setting',
      path: '/pharmacy/wareHouse/drugsFor/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/drugsFor/add')),
    },
    {
      name: "药品申领 -编辑",//药库-申领入库-药品申领 -编辑
      icon: 'setting',
      path: '/pharmacy/wareHouse/drugsFor/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/drugsFor/details')),
    },
    {
      name: "验收",//药库-申领入库-验收
      icon: 'setting',
      path: '/pharmacy/wareHouse/acceptance',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/acceptance')),
    },
    {
      name: "验收-新增",//药库-申领入库-验收-新增
      icon: 'setting',
      path: '/pharmacy/wareHouse/acceptance/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/acceptance/add')),
    },
    {
      name: "验收-编辑",//药库-申领入库-验收-编辑
      icon: 'setting',
      path: '/pharmacy/wareHouse/acceptance/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/acceptance/details')),
    },
    {
      name: "上架",//药库-申领入库-上架
      icon: 'setting',
      path: '/pharmacy/wareHouse/putaway',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/putaway')),
    },
    {
      name: "上架",//药库-申领入库-上架
      icon: 'setting',
      path: '/pharmacy/wareHouse/putaway/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/putaway/details')),
    },
    {
      name: "新建入库",//药库-申领入库-新建入库
      icon: 'setting',
      path: '/pharmacy/wareHouse/newLibrary',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/newLibrary')),
    },
    {
      name: "新建入库-详情",//药库-申领入库-新建入库-详情
      icon: 'setting',
      path: '/pharmacy/wareHouse/newLibrary/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/wareHouse/newLibrary/details')),
    },
     /*-----药房-出库--*/
     {
      name: "发药出库",//药库-出库-发药出库
      icon: 'setting',
      path: '/pharmacy/outStorage/output',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/output')),
    },
    {
      name: "发药出库-详情",//药库-出库-发药出库-详情
      icon: 'setting',
      path: '/pharmacy/outStorage/output/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/output/details')),
    },
    {
      name: "退库",//药库-出库-退库
      icon: 'setting',
      path: '/pharmacy/outStorage/refund',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/refund')),
    },
    {
      name: "退库-新增",//药库-出库-退库-新增
      icon: 'setting',
      path: '/pharmacy/outStorage/refund/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/refund/add')),
    },
    {
      name: "退库-详情",//药库-出库-退库-详情
      icon: 'setting',
      path: '/pharmacy/outStorage/refund/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/refund/details')),
    },
    //药房-出库-受理配货
    {
      name: "受理配货",
      icon: 'setting',
      path: '/pharmacy/outStorage/acceptDistribution',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/acceptDistribution')),
    },
    // 药房-出库-受理配货-详情
    {
      name: "受理配货-详情",
      icon: 'setting',
      path: '/pharmacy/outStorage/acceptDistribution/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/acceptDistribution/details')),
    },
    // 药房-出库-拣货下架
    {
      name: "拣货下架",
      icon: 'setting',
      path: '/pharmacy/outStorage/pickingUnderShelve',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/pickingUnderShelve')),
    },
    // 药房-出库-拣货下架-详情
    {
      name: "拣货下架-详情",
      icon: 'setting',
      path: '/pharmacy/outStorage/pickingUnderShelve/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/pickingUnderShelve/details')),
    },
    {
      name: "新建出库",
      icon: 'setting',
      path: '/pharmacy/outStorage/newOut',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/newOut')),
    },
    // 药房-出库-新建出库
    {
      name: "新建出库",
      icon: 'setting',
      path: '/pharmacy/outStorage/newOut',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/newOut')),
    },
    // 药房-出库-新建出库-新建
    {
      name: "新建出库-新建",
      icon: 'setting',
      path: '/pharmacy/outStorage/newOut/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/newOut/add')),
    },
    // 药房-出库-新建出库-详情
    {
      name: "新建出库-详情",
      icon: 'setting',
      path: '/pharmacy/outStorage/newOut/details',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/outStorage/newOut/details')),
    },
    /* ********************      货位调整      ************************** */
    {
      name: "货位调整",
      icon: 'setting',
      path: '/pharmacy/goodsAdjust/adjust',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/goodsAdjust/adjust')),
    },
    {
      name: "货位调整-新增",
      icon: 'setting',
      path: '/pharmacy/goodsAdjust/adjust/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/goodsAdjust/adjust/add')),
    },
    {
      name: "货位调整-详情",
      icon: 'setting',
      path: '/pharmacy/goodsAdjust/adjust/detail',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/goodsAdjust/adjust/detail')),
    },
    /* ********************      补登单据      ************************** */
    {
      name: "补登单据",
      icon: 'setting',
      path: '/pharmacy/supplementDoc/supplementDocuments',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/supplementDoc/supplementDocuments')),
    },
    {
      name: "补登单据-新增",
      icon: 'setting',
      path: '/pharmacy/supplementDoc/supplementDocuments/add',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/supplementDoc/supplementDocuments/add')),
    },
    {
      name: "补登单据-详情",
      icon: 'setting',
      path: '/pharmacy/supplementDoc/supplementDocuments/detail',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/supplementDoc/supplementDocuments/detail')),
    },
    {
      name: "补登单审核",
      icon: 'setting',
      path: '/pharmacy/supplementDoc/supplementDocCheck',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/supplementDoc/supplementDocCheck')),
    },
    {
      name: "补登单审核-详情",
      icon: 'setting',
      path: '/pharmacy/supplementDoc/supplementDocCheck/detail',
      component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/supplementDoc/supplementDocCheck/detail')),
    },
    /* ***************  系统管理  ******************* */
    {
      name: "系统管理-药品目录",
      icon: 'setting',
      path: '/system/drugDirectory/directory',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/drugDirectory')),
    },
    {
      name: "系统管理-药品目录--编辑",
      icon: 'setting',
      path: '/system/drugDirectory/directory/edit',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/drugDirectory/edit')),
    },
    /* ******************   组织机构     *********************** */
    {
      name: "供应商管理",
      icon: 'setting',
      path: '/system/organization/supplierMgt',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/organization/supplierMgt')),
    },
    // 组织机构 -- 部门管理
    {
      name: "部门管理",
      icon: 'setting',
      path: '/system/organization/departmentMgt',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/organization/departmentMgt')),
    },
    // 组织机构 -- 用户管理
    {
      name: "用门管理",
      icon: 'setting',
      path: '/system/organization/userMgt',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/organization/userMgt')),
    },
    {
      name: "用门管理--添加",
      icon: 'setting',
      path: '/system/organization/userMgt/add',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/organization/userMgt/add')),
    },
    /* *********************** 系统管理  角色管理     ******************** */
    {
      name: "角色管理",
      icon: 'setting',
      path: '/system/role/roleMgt',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/role/roleMgt')),
    },
     /* *********************** 系统管理 系统设置     ******************** */
    {
      name: "菜单管理",
      icon: 'setting',
      path: '/system/setting/menuMgt',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/setting/menuMgt')),
    },
    {
      name: "菜单管理-新增",
      icon: 'setting',
      path: '/system/setting/menuMgt/add',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/setting/menuMgt/add')),
    },
    {
      name: "字典管理",
      icon: 'setting',
      path: '/system/setting/itemsData',
      component: dynamicWrapper(app, [], () => import('../routes/SystemMgt/setting/itemsData')),
    },
     /* ********************   采购结算 子系统    ******************************* */
     {
      name: "采购结算-补货管理--补货计划",
      icon: 'setting',
      path: '/purchase/replenishment/replenishmentPlan',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/replenishment/replenishmentPlan')),
    },
    {
      name: "采购结算-补货管理--补货计划--详情",
      icon: 'setting',
      path: '/purchase/replenishment/replenishmentPlan/detail',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/replenishment/replenishmentPlan/detail')),
    },
    {
      name: "采购结算-补货管理--目录外采购",
      icon: 'setting',
      path: '/purchase/replenishment/outCatalogPurchase',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/replenishment/outCatalogPurchase')),
    },
    {
      name: "采购结算-补货管理--目录外采购--详情",
      icon: 'setting',
      path: '/purchase/replenishment/outCatalogPurchase/detail',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/replenishment/outCatalogPurchase/detail')),
    },
    {
      name: "采购结算-补货管理--计划审核",
      icon: 'setting',
      path: '/purchase/replenishment/planCheck',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/replenishment/planCheck')),
    },
    {
      name: "采购结算-补货管理--计划审核--详情",
      icon: 'setting',
      path: '/purchase/replenishment/planCheck/detail',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/replenishment/planCheck/detail')),
    },
    {
      name: "采购结算-补货管理--计划订单",
      icon: 'setting',
      path: '/purchase/replenishment/planOrder',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/replenishment/planOrder')),
    },
    {
      name: "采购结算-补货管理--计划订单--详情",
      icon: 'setting',
      path: '/purchase/replenishment/planOrder/detail',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/replenishment/planOrder/detail')),
    },
    //采购结算 - 结算管理 - 日对账单
    {
      name: "结算管理",
      icon: 'setting',
      path: '/purchase/settlementMgt/dayStatements',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/settlementMgt/dayStatements')),
    },
    //采购结算 - 结算管理 - 日对账单
    {
      name: "日对账单 - 新建对账",
      icon: 'setting',
      path: '/purchase/settlementMgt/dayStatements/newRecon',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/settlementMgt/dayStatements/newRecon')),
    },
    //采购结算 - 结算管理 - 日对账单 - 详情
    {
      name: "日对账单-详情",
      icon: 'setting',
      path: '/purchase/settlementMgt/dayStatements/details',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/settlementMgt/dayStatements/details')),
    },
    //采购结算 - 结算管理 - 结算单
    {
      name: "结算管理",
      icon: 'setting',
      path: '/purchase/settlementMgt/statements',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/settlementMgt/statements')),
    },
    //采购结算 - 结算管理 - 结算单 - 详情
    {
      name: "结算管理-详情",
      icon: 'setting',
      path: '/purchase/settlementMgt/statements/details',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/settlementMgt/statements/details')),
    },
    //采购结算 - 结算管理 - 结算单 - 新建结算
    {
      name: "新建结算",
      icon: 'setting',
      path: '/purchase/settlementMgt/statements/newSettlement',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/settlementMgt/statements/newSettlement')),
    },
    //采购结算 - 结算管理 - 结余查询
    {
      name: "结余查询",
      icon: "setting",
      path: '/purchase/settlementMgt/balanceQuery',
      component: dynamicWrapper(app, [], () => import('../routes/Purchase/settlementMgt/balanceQuery')),
    },
  ]
}]



