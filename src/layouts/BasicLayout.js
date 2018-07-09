import React, { PureComponent } from 'react';
import { Route, Switch } from 'dva/router';
import { Layout } from 'antd';
import { connect } from 'dva';
import styles from './style.css';
const { Header, Content, Sider } = Layout;
class BasicLayout extends PureComponent {
  render() {
    const { getRouteData } = this.props;
    return (
      <Layout>
        <Sider className={`${styles.sider}`}>

        </Sider>
        <Content>
          <Header className={`${styles.header}`}>
            这里有个头
          </Header>
          <Content className={`${styles.content}`}>
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
        </Content>
      </Layout>  
    )
  }
}
export default connect()(BasicLayout);