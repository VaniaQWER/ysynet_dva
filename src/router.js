import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';

import Login from './routes/Login';
import SubSystem from './routes/System';
import NewAdd from './routes/Purchase/replenishment/replenishmentPlan/add';
import CatalogAdd from './routes/Purchase/replenishment/outCatalogPurchase/add';
import AddDrugsFor from './routes/Pharmacy/wareHouse/drugsFor/add';
import AddNewAcceptance from './routes/Pharmacy/wareHouse/acceptance/add';
import AddOutput from './routes/DrugStorage/outStorage/outReceiptMgt/add';
import AddNewBackStorage from './routes/DrugStorage/outStorage/backStorage/add' // 药库退货
import AddNewBackStoragePlan from './routes/Pharmacy/outStorage/refund/add' // 药房退库
import PharmacyAddNewOutput from './routes/Pharmacy/outStorage/newOut/add';
import PslistAdd from './routes/DrugStorage/wareHouse/psListCheck/add';
import NewAddGoodsAdjust  from './routes/DrugStorage/goodsAdjust/adjust/add';
import PharmacyAddGoodsAdjust from './routes/Pharmacy/goodsAdjust/adjust/add';
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
          <Route path="/subSystem" component={SubSystem}/>
          <Route path="/createReplenishment" component={NewAdd}/>
          <Route path="/editReplenishment/:planCode" component={NewAdd}/>
          <Route path="/createOutCatalogPurcahsePlan" component={CatalogAdd}/>
          <Route path="/addDrugsFor" component={AddDrugsFor}/>
          <Route path="/addNewAcceptance" component={AddNewAcceptance}/>
          <Route path="/addNewOutput" component={AddOutput}/>
          <Route path="/addNewBackStorage" component={AddNewBackStorage}/>
          <Route path="/editBackStoragePlan/:backNo" component={AddNewBackStorage}/>
          <Route path="/AddNewBackStoragePlan" component={AddNewBackStoragePlan}/>
          <Route path="/editPharmacyBackStoragePlan/:backNo" component={AddNewBackStoragePlan}/>
          <Route path="/pharmacyAddNewOutput" component={PharmacyAddNewOutput}/>
          <Route path="/AddNewCheck" component={PslistAdd}/>
          <Route path="/addGoodsAdjust" component={NewAddGoodsAdjust}/>
          <Route path="/pharmacyAddGoodsAdjust" component={PharmacyAddGoodsAdjust}/>
          {/* <Route path="/home" component={Home}/> */}
          {/* <Route path="/app" render={props => <WorkplaceLayout {...props} {...passProps} />} /> */}
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
