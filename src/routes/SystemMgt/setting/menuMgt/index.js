/*
 * @Author: yuwei 
 * @Date: 2018-08-22 10:24:25 
* @Last Modified time: 2018-08-22 10:24:25 
 */
 /**
 * @file 系统管理--系统设置--菜单管理
 */
import React, { PureComponent } from 'react';
import { Row, Button } from 'antd';
import querystring from 'querystring';
import { Link } from 'dva/router';
import { menuFormat } from '../../../../utils/utils';
import { systemMgt } from '../../../../api/systemMgt';
import { DeptFormat } from '../../../../common/dic';
import RemoteTable from '../../../../components/TableGrid';

class MenuMgt extends PureComponent{

  state = {
    loading: false,
    query:{}
  }

  // 添加菜单
  add = () =>{
    //跳转至添加菜单页面
    const {history} = this.props;
    history.push('/sys/menu/add');
  }

  render(){
    const { query } = this.state;
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
      },
      {
        title: '链接',
        dataIndex: 'href',
      },
      {
        title: '排序',
        dataIndex: 'sort',
        width: 80
      },
      {
        title: '可见',
        dataIndex: 'isShow',
        width: 80,
        render:(text,record,index)=>text==="1"?"是":"否",
      },
      {
        title: '部门类型',
        dataIndex: 'depType',
        render:(text,record,index)=>text?DeptFormat[text]:text
      },
      {
        title: '备注',
        dataIndex: 'remarks',
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 170,
        render: (text,record,index)=>{
          return <span>
            <Link className='button-gap' to={{pathname:`/sys/menu/add/${querystring.stringify({id:record.id,parentId:record.parentId})}`}}>编辑</Link>
            <Link className='button-gap' to={{pathname: `/sys/menu/add/${querystring.stringify({parentId:record.id,parentName:record.name})}` ,state:record }}>添加下级菜单</Link>
          </span>
        }
      }
    ]
    return (
      <div className='ysynet-main-content'>
        <Row>
          <Button type='primary' icon='plus' onClick={this.add}>添加菜单</Button>
        </Row>
        <RemoteTable 
          ref='table'
          method='get'
          query={query}
          style={{marginTop: 20}}
          columns={columns}
          scroll={{ x: '100%' }}
          url={systemMgt.MenuList}
          rowSelection={{
            onChange:(selectRowKeys, selectedRows)=>{
              this.setState({selectRowKeys})
            }
          }}
          cb={(dataList,data)=>{
            menuFormat(data)
          }}
          rowKey='id'
        />

      </div>

    )
  }
}
export default MenuMgt;