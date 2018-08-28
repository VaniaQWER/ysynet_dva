/*
 * @Author: wwb 
 * @Date: 2018-08-21 17:46:47 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-28 21:06:36
 */
 /**
 * @file 系统管理--组织机构--用户管理--编辑
 */
import React, { PureComponent } from 'react';
import { Row, Col, Button, Table, Affix } from 'antd';
import { DeptSelect } from '../../../../common/dic';
import { connect } from 'dva';

const deptColumns = [{
  title: '部门类别',
  dataIndex: 'deptType',
  render: (text,record)=>{
    return DeptSelect.filter(item => item.value === Number(text))[0].text
  }
},{
  title: '部门名称',
  dataIndex: 'deptName'
}];
const distributUser = [{
  title: '角色名称',
  dataIndex: 'roleName'
},{
  title: '备注',
  dataIndex: 'remarks'
}];
class AddUser extends PureComponent{
  state = {
    userDataSource: [],// 角色列表
    userLoading: false,
    deptDataSource: [],
    deptLoading: false,
    selected: [], // 所属部门
    selectedRows: [],
    userSelected: [], // 角色分配
    UserselectedRows: [],
    modalSelected: [], // 人员选择
    modalSelectedRows: []
  }
  componentWillMount = () =>{
    const { loginName } = this.props.match.params;
    this.props.dispatch({
      type: 'Organization/findUserInfo',
      payload: { loginName },
      callback: (data) =>{
        this.setState({ baseData: data })
      }
    })
    
  }
  render(){
    const { deptDataSource, userDataSource, userLoading, deptLoading } = this.state;
    return (
      <div>
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <div style={{ display:'flex',justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: 'bold' }}>用户信息</h3>
          </div>
          <hr className='hr' />
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>账号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{  }</div>
              </div>
            </Col>
          </Row>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
              <label>手机号</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
              <div className='ant-form-item-control'>

              </div>
            </div>
          </Col>
        </div>
        <div className='detailCard'>
          <h3>所属部门</h3>
          <hr className='hr'/>
          <Table 
            columns={deptColumns}
            bordered
            rowKey={'id'}
            loading={deptLoading}
            dataSource={deptDataSource}
            pagination={false}
            size={'small'}
            scroll={{ x: '100%' }}
            rowSelection={{
              selectedRowKeys: this.state.selected,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
              }
            }}
          />
        </div>
        <div className='detailCard'>
          <h3>分配角色</h3>
          <hr className='hr'/>
          <Table 
            columns={distributUser}
            bordered
            rowKey={'id'}
            loading={userLoading}
            dataSource={userDataSource}
            pagination={false}
            size={'small'}
            scroll={{ x: '100%' }}
            rowSelection={{
              selectedRowKeys: this.state.userSelected,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({userSelected: selectedRowKeys, UserselectedRows: selectedRows})
              }
            }}
          />
        </div>
      </div>
      <Affix offsetBottom={0}>
        <Row>
          <Col style={{ textAlign:'right', padding: '20px 10px', }}>
            <Button type='primary'>保存</Button>
            <Button type='danger' style={{ marginLeft: 8 }} ghost onClick={()=> window.history.go(-1)} >取消</Button>
          </Col>
        </Row>
      </Affix>
      </div>
    )
  }
}
export default connect()(AddUser);