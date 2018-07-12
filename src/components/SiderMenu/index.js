import React, { PureComponent } from 'react';
import { Menu, Icon, message, Spin } from 'antd';
import { connect } from 'dva';
const SubMenu = Menu.SubMenu;

// 使用递归创建菜单
const createMenu = menuList => {
  return (
    Array.isArray(menuList) ? menuList.map((menu, index) => {
      return (
        menu.subMenus && menu.name ? (
          <SubMenu
            key={menu.key} 
            title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}
          >
            { createMenu(menu.subMenus) }
          </SubMenu>
        ) : (
          menu.name ? 
          <Menu.Item key={menu.key}>
            <Icon type={menu.icon} />
            <span> { menu.name } </span>
          </Menu.Item> : null
        )
      )
    }) : (
      <Menu.Item key={menuList.key}>
        <Icon type={menuList.icon} />
        <span> { menuList.name } </span>
      </Menu.Item>
    )
  )
}

class SiderMenu extends PureComponent{
  state = {
    selectedKeys: [],
    openKeys: [],
    recordKeys: []//修复官方hover bug
  };
  changeActiveKeys = () => {
    const href = window.location.href;
    const pathname = href.split('#')[1];
    const { openKeys } = this.state;
    const keys = pathname.split('/');
    // console.log(keys,'keys');
    // console.log(openKeys,'openKeys')
    let selectedKeys = '', newOpenKeys = [];
    selectedKeys = pathname;
    // console.log(selectedKeys,'selectedKeys')
    newOpenKeys = openKeys.length ? openKeys : [ keys.slice(0, 2).join('/') ];  
    // console.log(newOpenKeys,'newOpenKeys')
    this.setState({selectedKeys, openKeys: newOpenKeys});
  }
  componentWillMount = () => {
    this.changeActiveKeys();
  }
  onOpenChange = openKeys => {
    let changeKey = openKeys.length ? openKeys[openKeys.length - 1] : [];
    if (changeKey.length) {
      let changeKeyArr = changeKey.split('/');
      if (changeKeyArr.length > 2) {
        if (openKeys.length === 1) {
          changeKey = [];
        } else {
          changeKey = [changeKeyArr.slice(0, 2).join('/'), changeKeyArr.slice(0, 3).join('/') ];
        }
      } else {
        changeKey = [ changeKeyArr.slice(0, 2).join('/') ]
      }
    } else {
      changeKey = [];
    }
    this.setState({
      openKeys: changeKey
    })
  }
  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps,'nextProps')
    this.changeActiveKeys();
    if (nextProps.collapsed) {
      this.setState({ openKeys: [] })
    }
  }
  render(){
    const { menuList, history } = this.props;
    const { selectedKeys, openKeys } = this.state;
    return (
    <div>
      <div className='logoWrapper'>
        <img src={require('../../assets/logo.png')} alt='logo' className='logo'/>
        <h1 className='logoDesc'>P H X L</h1>
      </div>
      {
        menuList && menuList.length ?
        <Menu 
          theme="dark" 
          mode="inline"
          selectedKeys={[selectedKeys]}
          onOpenChange={this.onOpenChange}
          openKeys={openKeys}
          onClick={item => {
            // console.log(item,'item')
            const { pathname } = this.props.history.location; 
            // console.log(pathname,'pathname')
            if (pathname !== item.key){
              history.push({pathname: `${item.key}`})
            }else{
              message.info('您正位于该页面')
            }
          }}
        >
          {
            createMenu(menuList)
          }
          </Menu> :
          <Spin tip="数据加载中" style={{width: '100%', height: 200, marginTop: 200}}/>
        } 
    </div>
    )
  }
}
export default connect(state => state)(SiderMenu)