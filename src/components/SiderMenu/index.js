import React, { PureComponent } from 'react';
import { Menu, Icon, message, Spin } from 'antd';
import { connect } from 'dva';
// import menu from '../../common/menu';
import styles from './style.css';
// import { getMenuData } from '../../utils/utils'
const SubMenu = Menu.SubMenu;
// 使用递归创建菜单
// 正式数据
const createMenu = menuList => {
  return (
    Array.isArray(menuList.children) ? menuList.children.map((menu, index) => {
      let key;
      if(menu.children){
        let href = menu.children[0].href;
        if(href){
          let hrefArr = href.split('/');
          let len = hrefArr.length === 3 ? 2: 3;
          key = hrefArr.slice(0,len).join('/');
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
          <Menu.Item name={menu.name} key={menu.href && menu.href[menu.href.length-1] === '/' ? menu.href.substring(0,menu.href.length-1): menu.href && menu.href[menu.href.length-1] !== '/'? menu.href :menu.id } href={menu.href} id={menu.id} className='ysy-subMneu-Item'>
            <Icon type={menu.icon} />
            <span> { menu.name } </span>
          </Menu.Item> : null
        )
      )
    }) : (
      <Menu.Item name={menuList.name} key={menuList.key} href={menuList.href} id={menuList.id}>
        <Icon type={menuList.icon} />
        <span> { menuList.name } </span>
      </Menu.Item>
    )
  )
}
/* const createMenu = menuList => {
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
 */
class SiderMenu extends PureComponent{
  state = {
    selectedKeys: [],
    openKeys: [],
    name: null,
    recordKeys: []//修复官方hover bug
  };
  setSubTitle = () =>{
    const href = window.location.href;
    const pathname = href.split('#')[1];
    let { currentDept, userInfo } = this.props.users;
    let currentDeptId = currentDept.deptId;
    if(userInfo.deptInfo && userInfo.deptInfo.length){
      let target = userInfo.deptInfo.filter(item => item.deptId === currentDeptId)[0].menuList;
      let targetItem = target.filter(item => {
        let href = item.href ? item.href: '';
        if(href){
          href = href[href.length -1] === '/'? href.substring(0,href.length-1): href;
        }
        return href === pathname;
      });
      if(targetItem.length){
        let name = targetItem[0].name;
        this.setState({ name })
        this.props.cb(name);
      }
    }
  }
  /* changeActiveKeys = () => {
    const href = window.location.href;
    const pathname = href.split('#')[1];
    const { openKeys } = this.state;
    const keys = pathname.split('/');
    let selectedKeys = '', newOpenKeys = [];
    selectedKeys = pathname;
    newOpenKeys = openKeys.length ? openKeys : [ keys.slice(0, 3).join('/') ];
    this.setState({selectedKeys, openKeys: newOpenKeys});
  } */
  // 正式数据
  changeActiveKeys = () => {
    const href = window.location.href;
    const pathname = href.split('#')[1];
    const { openKeys } = this.state;
    const keys = pathname.split('/');
    // console.log(keys,keys.length,'keys')
    let len = keys.length === 3 ? 2 : 3;
    let selectedKeys = '', newOpenKeys = [];
    selectedKeys = len === 3 ? keys.slice(0,len+1).join('/'): pathname
    // console.log(selectedKeys,'selectedKeys')
    let indexString = selectedKeys.split('/').slice(0,len).join('/');
    newOpenKeys = openKeys.length && openKeys[0] === indexString ? openKeys : [ keys.slice(0, len).join('/') ];
    this.setState({selectedKeys, openKeys: newOpenKeys});
  }
  componentWillMount = () => {
    this.changeActiveKeys();
    this.setSubTitle()
  }
  onOpenChange = openKeys => {
    let changeKey = openKeys.length ? openKeys[openKeys.length - 1] : [];
    if (changeKey.length) {
      let changeKeyArr = changeKey.split('/');
      // console.log(changeKeyArr,'changeKeyArr')
      if (changeKeyArr.length > 2) {
        // if (openKeys.length === 1) {
        //   changeKey = [];
        // } else {
        //   changeKey = [changeKeyArr.slice(0, 2).join('/'), changeKeyArr.slice(0, 3).join('/') ];
        // }
        changeKey = [changeKeyArr.slice(0, 2).join('/'), changeKeyArr.slice(0, 3).join('/') ];
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
    if(!this.props.title){
      this.setSubTitle()
    }
    if (nextProps.collapsed) {
      this.setState({ openKeys: [] })
    }
    
  }
  render(){
    const { history } = this.props;
    let menu = this.props.users.currentMenuList; // 正式数据
    const { selectedKeys, openKeys } = this.state;
    // console.log(menu,'menu')
    // console.log(selectedKeys,'selectedKeys',openKeys,'openKeys')
    return (
    <div>
      <div className='logoWrapper'>
        <div className='logo'></div>
      </div>
      {
        menu.children && menu.children.length ? // 正式数据
        // menu && menu.length ?
        <Menu 
          className={styles.fullscreen}
          theme="light" 
          mode="inline"
          selectedKeys={[selectedKeys]}
          onOpenChange={this.onOpenChange}
          inlineCollapsed={this.props.collapsed}
          defaultOpenKeys={openKeys}
          openKeys={openKeys}
          onClick={item => {
            const { pathname } = this.props.history.location;
           /* if (pathname !== item.key){
               // this.setSubTitle(this.props.users.menuList, `${item.key}`)
              // this.setSubTitle(menu, `${item.key}`)
              history.push({pathname: `${item.key}`})
            } */
            let { name, href} = item.item.props;
            href = href[href.length-1] === '/'? href.substring(0,href.length-1): href;
            if (pathname !== href){
              this.props.cb(name);
              history.push({pathname: href})
            }
            else{
              message.info('您正位于该页面')
            }
          }}
        >
          {
            // createMenu(getMenuData(history.location.pathname.split('/')[1], menu))
            createMenu(menu) // 正式数据
          }
          </Menu> :
          <Spin tip="数据加载中" style={{width: '100%', height: 200, marginTop: 200}}/>
        } 
    </div>
    )
  }
}
export default connect(state => state)(SiderMenu)