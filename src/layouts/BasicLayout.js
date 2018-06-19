import React, { PureComponent } from 'react';
import { Route, Switch } from 'dva/router';
import { Layout } from 'antd';
import { connect } from 'dva';
const { Header, Content } = Layout;
class BasicLayout extends PureComponent {
  render() {
    const { getRouteData } = this.props;
    console.log(getRouteData('BasicLayout'))
    return (
      <Layout>
        <Header>
          这里是头
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
export default connect()(BasicLayout);