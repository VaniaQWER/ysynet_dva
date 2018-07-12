import React, { PureComponent } from 'react';
import { Route, Switch } from 'dva/router';
import { Layout,Icon } from 'antd';
import { connect } from 'dva';
import SiderMenu from '../components/SiderMenu';
import styles from './style.css';
const { Header, Content, Sider } = Layout;
class BasicLayout extends PureComponent {
  state = {
    collapsed: false
  }
  componentWillMount = () =>{
    this.props.dispatch({
      type:'users/getUserM',
      payload: {}
    })
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { getRouteData, users } = this.props;
    const { menuList } = users;
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          // className={`${styles.sider}`}
        >
          <SiderMenu 
            history={this.props.history}
            menuList={menuList}/>
        </Sider>
        <Content>
          <Header className={`${styles.header}`} style={{ marginBottom: 3,padding: 0 }}>
            <Icon 
              onClick={() => {
                const { collapsed } = this.state;
                this.setState({
                  collapsed: !collapsed
                })
              }}
              className='ysyenert-header-icon ysynet-collapsed'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
            /> 这是一级菜单 </Header>
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
export default connect(state => state)(BasicLayout);