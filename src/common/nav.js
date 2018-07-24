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
        },{
          name: '药库',
          icon: 'table',
          path: '/drugStorage',
          children: [{
            name: "配置管理",
            icon: 'setting',
            path: '/configMgt',
            component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/configMgt'))
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
                component: dynamicWrapper(app, [], () => import('../routes/DrugStorage/manage/drugDirectory'))
              }
            ]
          },
        ]
        },{
          name: '药房',
          icon: 'table',
          path: '/pharmacy',
          children: [{
            name: '配置管理',
            icon: 'setting',
            path: '/configMgt',
            component: dynamicWrapper(app, [], () => import('../routes/Pharmacy/configMgt'))
          }]
        }]
      }
    ]
  },
];
