import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}`)),
  component,
});

// nav data
export const getNavData2 = app => [
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
      ]},{
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
];



export const getNavData = app => [
  {
  component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout')),
  layout: 'BasicLayout',
  path: '/',
  name: '工作台',
  children: [
    /*药库 */
    /* {
      name: '药库',
      icon: 'table',
      path: '/drugStorage',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/configMgt'))
    }, */
    /* {
      name: "配置管理",//药库-配置管理
      icon: 'setting',
      path: '/drugStorage/configMgt',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/configMgt/drugConfigMgt'))
    },
    {
      name: "药库维护",//药库-配置管理
      icon: 'setting',
      path: '/drugStorage/drugStroageMaintain',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/configMgt/drugStroageMaintain'))
    }, */
    /*   
        补货管理  开始
    */
    {
      name: '补货计划',
      iocn: 'setting',
      path: '/drugStorage/replenishment/replenishmentPlan',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/replenishmentPlan')),
    },
    {
      name: '补货计划添加',
      iocn: 'setting',
      path: '/drugStorage/replenishment/replenishmentPlan/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/replenishmentPlan/add')),
    },
    {
      name: '补货计划详情',
      iocn: 'setting',
      path: '/drugStorage/replenishment/replenishmentPlan/detail',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/replenishmentPlan/detail')),
    },
    {
      name: '采购计划',
      iocn: 'setting',
      path: '/drugStorage/replenishment/purchasePlan',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/purchasePlan')),
    },
    {
      name: '采购计划--添加',
      iocn: 'setting',
      path: '/drugStorage/replenishment/purchasePlan/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/purchasePlan/add')),
    },
    {
      name: '采购计划--详情',
      iocn: 'setting',
      path: '/drugStorage/replenishment/purchasePlan/detail',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/purchasePlan/detail')),
    },
    {
      name: '确认计划',
      iocn: 'setting',
      path: '/drugStorage/replenishment/confirmPlan',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/confirmPlan')),
    },
    {
      name: '确认计划--详情',
      iocn: 'setting',
      path: '/drugStorage/replenishment/confirmPlan/detail',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/confirmPlan/detail')),
    },
    {
      name: '配送单验收',
      iocn: 'setting',
      path: '/drugStorage/replenishment/psListCheck',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/psListCheck')),
    },
    {
      name: '配送单验收--新建',
      iocn: 'setting',
      path: '/drugStorage/replenishment/psListCheck/add',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/psListCheck/add')),
    },
    {
      name: '配送单验收--详情',
      iocn: 'setting',
      path: '/drugStorage/replenishment/psListCheck/detail',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/replenishment/psListCheck/detail')),
    },
    /*   补货管理  结束    */
    {
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
      path: '/drugStorage/checkDecrease/newInventory/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/checkDecrease/newInventory/details')),
    },
    // 药库 - 盘点损益 - 新建盘点 - 详情(已确认)
    {
      name: "新建盘点-详情(已确认)",
      icon: 'setting',
      path: '/drugStorage/checkDecrease/newInventory/detailsConfirm',
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
    {
      name: '结算管理',
      icon: 'setting',
      path: '/drugStorage/settlementMgt/',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/settlementMgt'))
    },
    //药库 - 结算管理 - 详情
    {
      name: '详情',
      icon: 'setting',
      path: '/drugStorage/settlementMgt/details',
      component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/settlementMgt/details'))
    },

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
    /*药房 --药房管理 -- 开始*/
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
    }
     /*药房 --药房管理 -- 结束*/





    
  ]
}]



