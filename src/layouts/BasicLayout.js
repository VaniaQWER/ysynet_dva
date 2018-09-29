import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Layout, Icon, Row, Col, Tooltip, Menu, Dropdown, Spin,  } from 'antd';//Affix
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
    hasDept: true,
    pathname: '',
    deptId: [this.props.users.currentDept.deptId]
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.users.currentDept.deptId !== nextProps.users.currentDept.deptId) {
      this.setState({
        deptId: [nextProps.users.currentDept.deptId],
      });
    }
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
            let id = window.localStorage.getItem('key');
            let deptName = window.localStorage.getItem('deptName');
            // let id = this.props.location.pathname.split('/')[2];
            // let deptName;
            // data.deptInfo.map(item => {
            //   if(item.deptId === id) {
            //     deptName = item.deptName;
            //   };
            //   return item;
            // });
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
  componentDidMount = () => {
    this.props.history.listen(({pathname}) => {
      if(!pathname) {
        this.setState({
          pathname
        });
        return;
      };
      const lastPathname = this.state.pathname.split('/');
      const newPathname = pathname.split('/');
      if(lastPathname[2] !== newPathname[2] || lastPathname[3] !== newPathname[3]) {
        // 浏览器前进后退时如果切换了菜单  清除查询条件并重置显示隐藏
        this.props.dispatch({
          type: 'base/clearQueryConditions'
        });
        this.props.dispatch({
          type: 'base/restoreShowHide'
        });
        this.setState({
          pathname
        });
      } 
      // let {users} = this.props;
      // pathname = pathname.split('/');
      // let deptId = pathname[2];
      // if(deptId === undefined) return;
      // if(!users.currentDept.deptId || users.currentDept.deptId === deptId) return;
      // let deptName;
      // console.log(2);
      
      // users.deptList.map(item => {
      //   if(item.deptId === deptId) {
      //     deptName = item.deptName
      //   };
      //   return item;
      // });
      // let e = {
      //   item: {
      //     props: {
      //       children: ""
      //     }
      //   }
      // };
      // e.key = deptId;
      // e.item.props.children = deptName;
      // this.handleClick(e);
    })
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick = (e) =>{
    let { dispatch, users, history } = this.props;
    if(e.key === this.state.deptId[0]) return;
    // 切换子系统  清除查询条件并重置显示隐藏
    this.props.dispatch({
      type: 'base/clearQueryConditions'
    });
    this.props.dispatch({
      type: 'base/restoreShowHide'
    });
    let { deptInfo } = users.userInfo;
    let currMenuList = deptInfo.filter(item => item.deptId === e.key)[0].menuList;
    let tree = menuFormat(currMenuList, true, 1 );
    let menu = tree[0].children[0];

    // menu.children[0].children[0].href = menu.children[0].children[0].href.split('/');
    // menu.children[0].children[0].href.splice(2, 0, e.key);
    // menu.children[0].children[0].href = menu.children[0].children[0].href.join('/');

    if(menu.children[0].children[0].href === this.props.location.pathname) {      //如果切换时路由相同，必须重新渲染
      this.setState({
        hasDept: false
      });
    }
    window.localStorage.setItem('key', e.key);
    window.localStorage.setItem('deptName', e.item.props.children);
    console.log(e);
    
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
  menu = (list) => {
    let {deptId} = this.state;
    return (
      <Menu 
        selectable
        onClick={this.handleClick}
        selectedKeys={deptId}
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
    const { getRouteData, location } = this.props;
    let { userInfo, currentDept, deptList } = this.props.users;
    const { title, hasDept } = this.state;
    let pathname = location.pathname.split('/');
    return (
      <Layout>
        {/* <Affix offsetTop={0}> */}
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
        {/* </Affix> */}
        <Content>
          {/* <Affix offsetTop={0}> */}
            <Header className={`${styles.header}`} style={{ marginBottom: 3,padding: 0 }}>
              <Row>
                <Col span={4} style={{ paddingLeft: 16 }}>
                  {
                    currentDept.deptId &&
                    <Dropdown overlay={this.menu(deptList)} trigger={['click']}>
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
          {/* </Affix> */}
          <Header className={`${styles.subHeader}`}>
            <Tooltip title='返回' placement='bottom'>
              {
                pathname.length > 5 && 
                <a onClick={()=>this.props.history.go(-1)}>
                  <Icon type="arrow-left" theme="outlined" style={{ fontSize: 18, marginRight: 16 }}/>
                </a>
              }
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