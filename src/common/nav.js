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
        name: '子系统菜单',
        icon: 'book',
        path: 'system',
        component: dynamicWrapper(app, [], () => import('../routes/System'))
      },
      {
        name: "工作台",
        icon: 'workplace',
        path: 'home',
        component: dynamicWrapper(app, [], () => import('../routes/Workplace'))
      },
      {
        name: "人员",
        icon: 'add',
        path: 'user',
        component: dynamicWrapper(app, ['add'], () => import('../routes/User'))
      },
      {
        name: "菜单管理",
        icon: 'add',
        path: 'ysy/menu',
        component: dynamicWrapper(app, ['menu'], () => import('../routes/YSY/menu'))
      },
      {
        name: "子系统管理",
        icon: 'add',
        path: 'ysy/subSystem',
        component: dynamicWrapper(app, ['subSystem'], () => import('../routes/YSY/subSystem'))
      },
      {
        name: "部署管理",
        icon: 'add',
        path: 'ysy/arrange',
        component: dynamicWrapper(app, ['arrange'], () => import('../routes/YSY/arrange'))
      },
      {
        name: "授权管理",
        icon: 'add',
        path: 'ysy/accredit',
        component: dynamicWrapper(app, ['accredit'], () => import('../routes/YSY/accredit'))
      },
      {
        name: "管理员管理",
        icon: 'add',
        path: 'ysy/managerMgt',
        component: dynamicWrapper(app, ['managerMgt'], () => import('../routes/YSY/managerMgt'))
      }
    ]
  }
];
