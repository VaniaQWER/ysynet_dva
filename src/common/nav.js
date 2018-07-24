import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}`)),
  component,
});

// nav data
export const getNavData = app => [
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
        name: "菜单管理",
        icon: 'add',
        path: 'ysy/menu',
        component: dynamicWrapper(app, ['ysy/menu'], () => import('../routes/YSY/menu'))
      },
      {
        name: "子系统管理",
        icon: 'add',
        path: 'ysy/subSystem',
        component: dynamicWrapper(app, ['ysy/subSystem'], () => import('../routes/YSY/subSystem'))
      },
      {
        name: "部署管理",
        icon: 'add',
        path: 'ysy/arrange',
        component: dynamicWrapper(app, ['ysy/arrange'], () => import('../routes/YSY/arrange'))
      },
      {
        name: "授权管理",
        icon: 'add',
        path: 'ysy/accredit',
        component: dynamicWrapper(app, ['ysy/accredit'], () => import('../routes/YSY/accredit'))
      },
      {
        name: "管理员管理",
        icon: 'add',
        path: 'ysy/managerMgt',
        component: dynamicWrapper(app, ['ysy/managerMgt'], () => import('../routes/YSY/managerMgt'))
      },
      {
        name: "子系统配置",
        icon: 'setting',
        path: 'configure/subSystemConfigure',
        component: dynamicWrapper(app, ['config/subSystemConfig'], () => import('../routes/Configure/subSystemConfig'))
      },
      {
        name: "数据字典",
        icon: 'setting',
        path: 'dictionary/dictionaryMgt',
        component: dynamicWrapper(app, ['dictionary/dictionary'], () => import('../routes/Dictionary/dictionary'))
      },
      {
        name: "分类管理",
        icon: 'setting',
        path: 'dictionary/classifyMgt',
        component: dynamicWrapper(app, ['dictionary/classifyMgt'], () => import('../routes/Dictionary/classify'))
      },
      {
        name: "子系统管理",
        icon: 'setting',
        path: 'jxh/subSystemMgt',
        component: dynamicWrapper(app, ['manager/subSystemMgt'], () => import('../routes/Manager/subSystemMgt'))
      },
      {
        name: "子系统管理员",
        icon: 'setting',
        path: 'jxh/subSystemMgter',
        component: dynamicWrapper(app, ['manager/subSystemManager'], () => import('../routes/Manager/subSystemManager'))
      },
      {
        name: "科室管理",
        icon: 'setting',
        path: 'jxh/dpetMgt',
        component: dynamicWrapper(app, ['manager/deptMgt'], () => import('../routes/Manager/deptMgt'))
      },
      {
        name: "配置管理",
        icon: 'setting',
        path: 'flcksSubSystem/configMgt',
        component: dynamicWrapper(app, ['manager/deptMgt'], () => import('../routes/NonClinicalDeptSystem'))
      },
      {
        name: "配置管理",
        icon: 'setting',
        path: 'lcksSubSystem/configMgt',
        component: dynamicWrapper(app, ['manager/deptMgt'], () => import('../routes/ClinicalDeptSystem'))
      }
    ]
  },
];
