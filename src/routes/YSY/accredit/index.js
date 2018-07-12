import React, { PureComponent } from 'react';
import { List, Input, Button, Spin, Menu } from 'antd';
import { connect } from 'dva';
const { Search } = Input;
const { SubMenu } = Menu;

const createMenu = menu => {
  return (
      menu.children && menu.orgId ? (
        <SubMenu
          key={menu.orgId} 
          title={<span>{menu.deployName}</span>}
        >
          {
            menu.children.map(item=>(
              <Menu.Item key={item.orgId}>{item.orgName}</Menu.Item>
            ))
          }
        </SubMenu>
      )
      :
      <Menu.Item key={menu.orgId}>
        <span> { menu.deployName } </span>
      </Menu.Item>
    )
}

class Accredit extends PureComponent{
  state = {
    openKeys: [],
  }
  componentWillMount = () =>{
    this.genDeployList();
  }
  genDeployList = (value) =>{
    this.props.dispatch({
      type: 'accredit/deployList',
      payload: { searchLike: value ? value: '' }
    });
  }
  onSearch = (value) =>{
    this.genDeployList(value);
  }
  updateOpenKeys = (openKeys) =>{
    this.props.dispatch({
      type: 'accredit/updateOpenKeys',
      payload: { openKeys: openKeys }
    })
  }
  onOpenChange = (openKeys) => {
    let { rootSubmenuKeys } = this.props.accredit;
    let stateOpenKeys = this.props.accredit.openKeys;
    console.log(rootSubmenuKeys, openKeys)
    const latestOpenKey = openKeys.find(orgId => stateOpenKeys.indexOf(orgId) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.updateOpenKeys(openKeys)
    } else {
      this.updateOpenKeys(latestOpenKey?[latestOpenKey]:[]);
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
  }
  
  render(){
    const { dataSource, loading, openKeys, defaultSelectedKeys } = this.props.accredit;
    console.log(defaultSelectedKeys,'ddf')
    return (
      <div className='ysynet-siderMenu-noborder'>
        <div style={{ background: '#fff',display: 'flex' }}>
          <div style={{ background: '#fff',borderRight: 'dashed 1px #ccc',padding: '0 10px' }}>
            <Search 
              style={{ marginBottom: 16 }}
              placeholder='部署/机构名称'
              onSearch={this.onSearch}
            />
            <Spin spinning={loading}>
              <List
                itemLayout='vertical'
                dataSource={dataSource}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  size: 'small',
                  pageSize: 3,
                }}
                renderItem={item=>(
                    <Menu
                      mode="inline"
                      onClick={this.handleClick}
                      defaultSelectedKeys={[defaultSelectedKeys[0]]}
                      openKeys={openKeys}
                      onOpenChange={this.onOpenChange}
                    >
                      {
                        createMenu(item)
                      }
                    </Menu>
                )
                }
              >

              </List>
            </Spin>
          </div>
          <div style={{ padding: '0 16px' }}>
            content 内容区
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state =>  state)(Accredit);