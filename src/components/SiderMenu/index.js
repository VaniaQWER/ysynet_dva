import React, { PureComponent } from 'react';
import { Menu, Icon, message, Spin } from 'antd';
import { connect } from 'dva';
import menu from '../../common/menu';
const SubMenu = Menu.SubMenu;

// 使用递归创建菜单
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
    firstTime: true,
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
    if( this.state.firstTime && nextProps.users.menuList !== this.props.users.menuList){
      this.setSubTitle(nextProps.users.menuList);
      this.setState({ firstTime: false })
    }
  }
  render(){
    const { history } = this.props;
    // const { menuList } = this.props.users;
    const { selectedKeys, openKeys } = this.state;
    return (
    <div>
      <div className='logoWrapper'>
        <img src={require('../../assets/logo.png')} alt='logo' className='logo'/>
        <h1 className='logoDesc'>P H X L</h1>
      </div>
      {
        menu && menu.length ? //menuList && menuList.length ?
        <Menu 
          theme="dark" 
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
            }else{
              message.info('您正位于该页面')
            }
          }}
        >
          {
            createMenu(menu)
            // createMenu(menuList)
          }
          </Menu> :
          <Spin tip="数据加载中" style={{width: '100%', height: 200, marginTop: 200}}/>
        } 
    </div>
    )
  }
}
export default connect(state => state)(SiderMenu)