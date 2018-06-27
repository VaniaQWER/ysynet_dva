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
      }
    ]
  }
];
