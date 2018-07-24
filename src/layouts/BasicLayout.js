import React, { PureComponent } from 'react';
import { Route, Switch } from 'dva/router';
import { Layout,Icon } from 'antd';
import { connect } from 'dva';
import SiderMenu from '../components/SiderMenu';
import styles from './style.css';
const { Header, Content, Sider } = Layout;
class BasicLayout extends PureComponent {
  state = {
    collapsed: false,
    title: {}
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
    const { getRouteData } = this.props;
    const { title } = this.state;
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{
            backgroundColor: '#fff'
          }}
        >
          <SiderMenu 
            history={this.props.history}
            cb={(title)=> this.setState({ title })}
          />
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
            /> {title.mainTitle} </Header>
          <Header className={`${styles.subHeader}`}>
            {title.subTitle}
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