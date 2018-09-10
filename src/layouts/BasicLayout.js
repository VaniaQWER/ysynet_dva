import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Layout, Icon, Row, Col, Tooltip, Menu, Dropdown, Spin } from 'antd';
import { connect } from 'dva';
import Profile from '../components/profile'
import SiderMenu from '../components/SiderMenu';
import { menuFormat } from '../utils/utils';
import styles from './style.css';
const { Header, Content, Sider } = Layout;
class BasicLayout extends PureComponent {
  state = {
    collapsed: false,
    title: '',
    hasDept: true
  }
  componentWillMount = () =>{
    let { dispatch, users } = this.props;
    let { userInfo } = users;
    if(!userInfo.id && !userInfo.loginName){
      this.setState({hasDept: false});
      dispatch({
        type: 'users/userLogin',
        payload: { refresh: true },
        callback: (data) =>{
          if(data.deptInfo && data.deptInfo.length){
            let deptInfo = data.deptInfo;
            let { menuList } = deptInfo[0];
            let tree = menuFormat(menuList,true,1);
            let id = window.sessionStorage.getItem('key');
            let deptName = window.sessionStorage.getItem('deptName');
            if(id && deptName) {
              console.log('刷新');
              dispatch({
                type: 'users/setCurrentDept',
                payload: { id, deptName },
                callback: () => {
                  this.setState({
                    hasDept: true
                  });
                  let currMenuList = deptInfo.filter(item => item.deptId === id)[0].menuList;
                  let tree = menuFormat(currMenuList, true, 1 );
                  let menu = tree[0].children[0];
                  dispatch({
                    type: 'users/setCurrentMenu',
                    payload: { menu : menu }
                  });
                }
              })
            }else {
              console.log('登录');
              dispatch({
                type: 'users/setCurrentMenu',
                payload: { menu : tree[0].children[0] },
              })
              this.setState({
                hasDept: true
              });
            };
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
    let currMenuList = deptInfo.filter(item => item.deptId === e.key)[0].menuList;
    let tree = menuFormat(currMenuList, true, 1 );
    let menu = tree[0].children[0];
    if(menu.children[0].children[0].href === this.props.location.pathname) {      //如果切换时路由相同，必须重新渲染
      this.setState({
        hasDept: false
      });
    }
    window.sessionStorage.setItem('key', e.key);
    window.sessionStorage.setItem('deptName', e.item.props.children);
    dispatch({
      type: 'users/setCurrentDept',
      payload: { id: e.key, deptName: e.item.props.children },
      callback: () =>{
        dispatch({
          type: 'users/setCurrentMenu',
          payload: { menu : menu }
        });
        if(menu.children[0].children[0].href !== this.props.location.pathname) {
          history.push({ pathname: menu.children[0].children[0].href });
        }else {
          this.setState({
            hasDept: true
          });
        }
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
    const { title, hasDept } = this.state;
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
          {hasDept ? (
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
          ) : <Spin><div className={styles.content} style={{background: '#fff'}}></div></Spin>}
        </Content>
      </Layout>  
    )
  }
}
export default connect(state => state)(BasicLayout);