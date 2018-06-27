import React, { PureComponent } from 'react';
import { Route, Switch } from 'dva/router';
import { Layout } from 'antd';
import { connect } from 'dva';
import HeaderTop from '../routes/Header';
const { Header, Content } = Layout;
class BasicLayout extends PureComponent {
  render() {
    const { getRouteData } = this.props;
    return (
      <Layout>
        <Header style={{ background:'#fff',borderBottom:'solid 1px #eaebed',boxShadow:'0px 1px 0px #eaebed'}}>
          <HeaderTop />
        </Header>
        <Content>
          <Switch>
            {
              getRouteData('BasicLayout').map(item =>
                (
                  <Route
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                )
              )
            }
          </Switch>
        </Content>
      </Layout>  
    )
  }
}
export default connect(state => state)(BasicLayout);