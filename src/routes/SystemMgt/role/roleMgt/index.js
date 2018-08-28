/*
 * @Author: yuwei 
 * @Date: 2018-08-22 14:12:02 
* @Last Modified time: 2018-08-22 14:12:02 
 */
 /**
 * @file 系统管理--角色管理--角色
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Button, message} from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { systemMgt } from '../../../../api/systemMgt';
import RemoteTable from '../../../../components/TableGrid';
import { Link } from 'dva/router';
import { connect } from 'dva';
const FormItem = Form.Item;

class SearchForm extends PureComponent{
 
  handleSearch = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        console.log(values,'查询数据');
        this.props.query(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`角色名称`}>
              {
                getFieldDecorator(`userName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{float:'right', textAlign: 'right', marginTop: 4}}>
           <Button type="primary" className='button-gap'  htmlType="submit">查询</Button>
           <Button type='default' className='button-gap' onClick={this.handleReset}>重置</Button>
         </Col>
        </Row>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);
let dataSource = [];
for( let i = 0; i<20; i++ ){
  dataSource.push({
    id: i,
    userNo: `sd_admin${i}`,
    name: `sd_admin${i}`,
    deptName: '武大科室',
    department: '财务科',
    userName: `唐僧${i}`,
    editMan: '苏努悟空',
    editTime: '2018-08-21-17:00'
    
  })
}


class RoleMgt extends PureComponent{

  state = {
    loading: false,
    query: {},
  }

  //新增角色
  add = ()=> {
    const { history } =this.props;
    history.push({pathname:'/system/role/roleMgt/add'})

  }
  //删除角色
  delete = () => {


    this.props.dispatch({
      type: 'systemRole/RoleQuery',
      payload: { id:[123,2,3]},
      callback: (data) => {
        console.log(data,'RoleQuery')
      }
    })
    
    const { selectRowKeys } = this.state;
    if(selectRowKeys && selectRowKeys.length!==0){
      //发出删除请求
      console.log(this.state.selectRowKeys)
      this.props.dispatch({
        type: 'systemRole/RoleDelete',
        payload: { id:[123,2,3]},
        callback: (data) => {
          console.log(data,'RoleDelete')
        }
      })
    }else{
      message.warn('请最少选择一个角色进行操作！')
    }
  }

  render(){
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'userNo',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '编辑人',
        dataIndex: 'editMan',
      },
      {
        title: '编辑时间',
        dataIndex: 'editTime',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text,record,index)=>{
          return <span>
            <Link to={{pathname:'/system/role/roleMgt/edit',state:record}}>编辑</Link>
          </span>
        }
      },
    ]
    return (
      <div className='ysynet-main-content'>
        <WrapperForm query={this.queryHandle}/>
        <div>
          <Button type='primary' icon='plus' className='button-gap' onClick={this.add}>新增</Button>
          <Button type='primary' icon='minus' onClick={this.delete}>删除</Button>
          
        </div>
        {/* <Table 
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
          rowSelection={{
            onChange:(selectRowKeys, selectedRows)=>{
              this.setState({selectRowKeys})
            }
          }}
          style={{marginTop: 20}}
          dataSource={dataSource}
        /> */}

        <RemoteTable 
          ref='table'
          method='GET'
          bordered
          style={{marginTop: 20}}
          columns={columns}
          showHeader={true}
          scroll={{ x: '100%' }}
          url={systemMgt.RoleList}
          rowSelection={{
            onChange:(selectRowKeys, selectedRows)=>{
              this.setState({selectRowKeys})
            }
          }}
          rowKey='staticDataGuid'
        />

      </div>
    )
  }
}
export default connect( state => state)(RoleMgt);