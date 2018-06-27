import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
class DropdownList extends React.Component {
  selectHandler = (link) => {
    /* const uri = location.hash.substring(2, location.hash.length);
    if(uri !== link) {
      if (link === 'login') {
        fetchData(login.USER_LOGOUT,{},(data)=>{
          if(data.status){
            hashHistory.push(link);
            window.location.reload();
          }
        })
      }else{
        hashHistory.push(link);
      }
    } */
  }
  menus = () => {
    return (
      <Menu style={this.props.style}>
        {
          this.props.list.map( (item, index) => {
            return (
              <Menu.Item key={index}>
                <a onClick={this.selectHandler.bind(this, item.link)}>{item.text}</a>
              </Menu.Item>
            )
          })
        }
      </Menu>
    )
  }
  render() {
    return (
      <Dropdown overlay={this.menus()} trigger={['click']} style={this.props.style}>
          <a>
            {this.props.text || 'down'} <Icon type="down" />
          </a>
      </Dropdown>
    )
  }
}

export default DropdownList;