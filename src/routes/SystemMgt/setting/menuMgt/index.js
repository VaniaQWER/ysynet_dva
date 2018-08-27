/*
 * @Author: yuwei 
 * @Date: 2018-08-22 10:24:25 
* @Last Modified time: 2018-08-22 10:24:25 
 */
 /**
 * @file 系统管理--系统设置--菜单管理
 */
import React, { PureComponent } from 'react';
import { Row, Input, Button, Table } from 'antd';
import { Link } from 'dva/router';
let dataSource = [];
for( let i = 0; i<20; i++ ){
  dataSource.push({
    id: (i+1),
    sort: `${i+1}`,
    userNo: `菜单名称${i}`,
    name: `sd_admin/${i}`,
    deptName: '武大科室',
    department: '财务科',
    deptType: `部门类型${i}`,
    remark: '苏努悟空',
    status: '可见',
    children:[
      {
        id: (i+1)*10+2,
        sort: `${(i+1)*10}`,
        userNo: `菜单名称${(i+1)*10}`,
        name: `sd_admin/${(i+1)*10}`,
        deptName: '武大科室',
        department: '财务科',
        deptType: `部门类型${(i+1)*10}`,
        remark: '苏努悟空',
        status: '可见'
      }
    ]  
  })
}

class MenuMgt extends PureComponent{

  state = {
    loading: false,
    dataSource:dataSource,
  }

  // 添加菜单
  add = () =>{
    //跳转至添加菜单页面
    const {history} = this.props;
    history.push('/system/setting/menuMgt/add');
  }

  //改变单行排序
  changeRow = (record,index,e)=>{
    console.log(record)
    console.log(index)
    console.log(e.target.value)
    let ds = this.state.dataSource.slice() ; 
    ds[index].sort=e.target.value;
    this.setState({dataSource:ds})
  }

  render(){
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'userNo',
      },
      {
        title: '链接',
        dataIndex: 'name',
      },
      {
        title: '排序',
        dataIndex: 'sort',
        render:(text,record,index)=>{
          return(
            <Input type='number' value={record.sort} onChange={this.changeRow.bind(this,record,index)} placeholder='请输入'/>
          )
        }
      },
      {
        title: '可见',
        dataIndex: 'status',
      },
      {
        title: '部门类型',
        dataIndex: 'deptType',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text,record,index)=>{
          return <span>
            <Link className='button-gap' to={{pathname:'/system/setting/menuMgt/add',state:record}}>编辑</Link>
            <Link className='button-gap' to={{pathname:'/system/setting/menuMgt/add',state:record}}>添加下级菜单</Link>
          </span>
        }
      },
    ]
    return (
      <div className='ysynet-main-content'>
        <Row>
          <Button type='primary' icon='plus' onClick={this.add}>添加菜单</Button>
        </Row>
        <Table 
          columns={columns}
          bordered
          loading={this.state.loading}
          scroll={{x: '100%'}}
          rowKey={'id'}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
          style={{marginTop: 20}}
          dataSource={dataSource}
        />
      
      </div>

    )
  }
}
export default MenuMgt;