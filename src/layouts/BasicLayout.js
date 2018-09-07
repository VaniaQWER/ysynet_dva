import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Layout, Icon, Row, Col, Tooltip, Menu, Dropdown  } from 'antd';
import { connect } from 'dva';
import Profile from '../components/profile'
import SiderMenu from '../components/SiderMenu';
import { menuFormat } from '../utils/utils';
import styles from './style.css';
const { Header, Content, Sider } = Layout;
class BasicLayout extends PureComponent {
  state = {
    collapsed: false,
    title: ''
  }
  componentWillMount = () =>{
    let { dispatch, users } = this.props;
    let { userInfo } = users;
    if(!userInfo.id && !userInfo.loginName){
      dispatch({
        type: 'users/userLogin',
        payload: { refresh: true },
        callback: (data) =>{
          if(data.deptInfo && data.deptInfo.length){
            let deptInfo = data.deptInfo;
            let { menuList } = deptInfo[0];
            let tree = menuFormat(menuList,true,1) ;
            console.log(tree,'ret')
            this.props.dispatch({
              type: 'users/setCurrentMenu',
              payload: { menu : tree[0].children[0] }
            })
          }
        }
      })
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick = (e) =>{
    let { dispatch, users, history } = this.props;
    let { deptInfo } = users.userInfo;
    dispatch({
      type: 'users/setCurrentDept',
      payload: { id: e.key, deptName: e.item.props.children },
      callback: () =>{
        let currMenuList = deptInfo.filter(item => item.deptId === e.key)[0].menuList;
        console.log(currMenuList,'current')
        let tree = menuFormat(currMenuList, true, 1 );
        let menu = tree[0].children[0];
        console.log(menu,'tree');
        console.log(menu.children[0].children[0].href,'href')
        this.props.dispatch({
          type: 'users/setCurrentMenu',
          payload: { menu : menu }
        });
        history.push({ pathname: menu.children[0].children[0].href })
      }
    })
  }
  menu = (list,deptId) => {
    return (
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
    )
  }
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
            collapsed={this.state.collapsed}
            title={this.state.title}
            cb={(title)=> this.setState({ title })}
          />
          <div 
            onClick={this.toggle} 
            className={styles.triggerWrapp}
            style={{ width: this.state.collapsed ? 80: 232 }}
          >
            <Icon
              style={{ color: '#fff',fontSize: 18 }}
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
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
                  {/* <div>
                    <Tooltip title="子系统切换">
                      <Icon type="sync" className={styles.icon} onClick={() => this.props.history.push({
                        pathname: '/subSystem'
                      })}/> 
                    </Tooltip>
                  </div> */}
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
            <span>{title}</span>
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