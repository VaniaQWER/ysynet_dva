import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Layout, Icon, Row, Col, Tooltip, Menu, Dropdown  } from 'antd';
import { connect } from 'dva';
import Profile from '../components/profile'
import SiderMenu from '../components/SiderMenu';
import styles from './style.css';
const { Header, Content, Sider } = Layout;
class BasicLayout extends PureComponent {
  state = {
    collapsed: false,
    title: {}
  }
  /* componentWillMount = () =>{
    this.props.dispatch({
      type:'users/getUserM',
      payload: {}
    })
  } */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick = (e) =>{
    console.log(e,'e')
  }
  menu = (list,deptId) => (
    <Menu 
      selectable
      onClick={this.handleClick}
      defaultSelectedKeys={[deptId?deptId+"":""]}
    >
      {
        list.map((item,index) =>{
          return <Menu.Item key={item.deptId} name={item.deptName} >{ item.deptName }</Menu.Item>
        })
      }
    </Menu>
  );
  render() {
    const { getRouteData } = this.props;
    let { userInfo, currentDept, deptList } = this.props.users;
    const { title } = this.state;
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          width={232}
          collapsed={this.state.collapsed}
          style={{
            backgroundColor: '#fff'
          }}
        >
          <SiderMenu 
            history={this.props.history}
            cb={(title)=> this.setState({ title })}
          />
          <div className={styles.triggerWrapp} style={{ width: this.state.collapsed ? 80: 232 }}>
            <Icon
              style={{ color: '#fff',fontSize: 18 }}
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              />
          </div>
        </Sider>
        <Content>
          <Header className={`${styles.header}`} style={{ marginBottom: 3,padding: 0 }}>
            <Row>
              <Col span={4} style={{ paddingLeft: 16 }}>
                {
                  currentDept.deptId &&
                  <Dropdown overlay={this.menu(deptList,currentDept.deptId)} trigger={['click']}>
                    <Tooltip title='子系统切换' placement='right'>
                      <span className="ant-dropdown-link">
                        {currentDept.deptName} <Icon type="down" style={{ marginLeft: 8 }}/>
                      </span>
                    </Tooltip>
                  </Dropdown>
                }
              </Col>
              <Col span={20} style={{textAlign: 'right'}}>
                <div className={styles.profile}>
                  <div>
                    <Tooltip title="子系统切换">
                      <Icon type="sync" className={styles.icon} onClick={() => this.props.history.push({
                        pathname: '/subSystem'
                      })}/> 
                    </Tooltip>
                  </div>
                  <Profile userName={userInfo.name}/>
                </div>
              </Col>
            </Row>
          </Header>
          <Header className={`${styles.subHeader}`}>
            <Tooltip title='返回' placement='bottom'>
              <a onClick={()=>this.props.history.go(-1)}>
                <Icon type="arrow-left"  style={{ fontSize: 18, marginRight: 16 }}/>
              </a>
            </Tooltip>
            <span>{title.subTitle}</span>
          </Header>
          <Content className={`${styles.content}`}>
            <Switch>
              <Redirect from="/" to="/login" exact={true}/>
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
              <Route component={() => <div>404</div>} />
            </Switch>
          </Content>
        </Content>
      </Layout>  
    )
  }
}
export default connect(state => state)(BasicLayout);