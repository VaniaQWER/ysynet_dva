import React, { PureComponent } from 'react';
import { Menu, Icon, message, Spin } from 'antd';
import { connect } from 'dva';
import menu from '../../common/menu';
import styles from './style.css';
import { getMenuData } from '../../utils/utils'
const SubMenu = Menu.SubMenu;
// 使用递归创建菜单
/* const createMenu = menuList => {
  return (
    Array.isArray(menuList.children) ? menuList.children.map((menu, index) => {
      let key;
      if(menu.children){
        let href = menu.children[0].href;
        if(href){
          let hrefArr = href.split('/');
          key = hrefArr.slice(0,2).join('/');
        }
      }
      return (
        menu.children && menu.name ? (
          <SubMenu
            className='ysy-menu-Item'
            key={key?key: menu.id} 
            title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}
          >
            { createMenu(menu) }
          </SubMenu>
        ) : (
          menu.name ? 
          <Menu.Item name={menu.name} key={menu.href.substring(0,menu.href.length-1)} href={menu.href} className='ysy-subMneu-Item'>
            <Icon type={menu.icon} />
            <span> { menu.name } </span>
          </Menu.Item> : null
        )
      )
    }) : (
      <Menu.Item name={menuList.name} key={menuList.key} href={menuList.href}>
        <Icon type={menuList.icon} />
        <span> { menuList.name } </span>
      </Menu.Item>
    )
  )
} */
const createMenu = menuList => {
  return (
    Array.isArray(menuList) ? menuList.map((menu, index) => {
      return (
        menu.subMenus && menu.name ? (
          <SubMenu
            className='ysy-menu-Item'
            key={menu.key} 
            title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}
          >
            { createMenu(menu.subMenus) }
          </SubMenu>
        ) : (
          menu.name ? 
          <Menu.Item name={menu.name} key={menu.key} className='ysy-subMneu-Item'>
            <Icon type={menu.icon} />
            <span> { menu.name } </span>
          </Menu.Item> : null
        )
      )
    }) : (
      <Menu.Item name={menuList.name} key={menuList.key}>
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
  setSubTitle = (menuList,path) =>{
    let pathname = path ? path : window.location.href.split('#')[1];
    let target = {};
    if(menuList.length){
      menuList.map((item,index)=>{
        let { subMenus } = item;
        subMenus.map((menu,idx)=>{
          if(menu.subMenus&& menu.subMenus.length){
              let childMenu = menu.subMenus;
              childMenu.map(d=>{
                if(d.path === pathname){
                  target.mainTitle = item.name;
                  target.subTitle = d.name
                }
                return null;
              })
          }else{
            if(menu.path === pathname){
              target.mainTitle = item.name;
              target.subTitle = menu.name
            }
          }
          return null;
        });
        return null;
      });
    }
    this.props.cb(target)
  }
  changeActiveKeys = () => {
    const href = window.location.href;
    const pathname = href.split('#')[1];
    const { openKeys } = this.state;
    const keys = pathname.split('/');
    let selectedKeys = '', newOpenKeys = [];
    selectedKeys = pathname;
    newOpenKeys = openKeys.length ? openKeys : [ keys.slice(0, 2).join('/') ];
    this.setState({selectedKeys, openKeys: newOpenKeys});
  }
  componentWillMount = () => {
    this.changeActiveKeys();
    // this.setSubTitle(menu)
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
    this.changeActiveKeys();
    if (nextProps.collapsed) {
      this.setState({ openKeys: [] })
    }
  }
  render(){
    const { history } = this.props;
    // let menu = this.props.users.currentMenuList;
    const { selectedKeys, openKeys } = this.state;
    return (
    <div>
      <div className='logoWrapper'>
        <div className='logo'></div>
      </div>
      {
        // menu.children && menu.children.length ?
        menu && menu.length ?
        <Menu 
          className={styles.fullscreen}
          theme="light" 
          mode="inline"
          selectedKeys={[selectedKeys]}
          onOpenChange={this.onOpenChange}
          openKeys={openKeys}
          onClick={item => {
            const { pathname } = this.props.history.location;
            if (pathname !== item.key){
              // this.setSubTitle(this.props.users.menuList, `${item.key}`)
              this.setSubTitle(menu, `${item.key}`)
              history.push({pathname: `${item.key}`})
            /* }
            let href = item.item.props.href;
            href = href.substring(0,href.length-1)
            if (pathname !== href){
              // this.setSubTitle(this.props.users.menuList, `${item.key}`)
              // this.setSubTitle(menu, `${item.key}`)
              history.push({pathname: href}) */
            }else{
              message.info('您正位于该页面')
            }
          }}
        >
          {
            createMenu(getMenuData(history.location.pathname.split('/')[1], menu))
            // createMenu(menu)
          }
          </Menu> :
          <Spin tip="数据加载中" style={{width: '100%', height: 200, marginTop: 200}}/>
        } 
    </div>
    )
  }
}
export default connect(state => state)(SiderMenu)