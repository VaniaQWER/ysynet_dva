import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';

import Login from './routes/Login';
// import Home from './routes/Home';

import { getNavData } from './common/nav';
import { getPlainNode } from './utils/utils';



dynamic.setDefaultLoadingComponent(() => (
  <div className='loding-wapper'>
    <Spin size="large"/>
  </div>
))

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}


function RouterConfig({ history, app }) {
  const navData = getNavData(app);
  //const WorkplaceLayout = getLayout(navData, 'WorkplaceLayout').component;
  const BasicLayout = getLayout(navData, 'BasicLayout').component;
  
  const passProps = {
    app,
    navData,
    getRouteData: (path) => {
      return getRouteData(navData, path);
    },
  };
  
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          {/* <Route path="/home" component={Home}/> */}
          {/* <Route path="/app" render={props => <WorkplaceLayout {...props} {...passProps} />} /> */}
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
