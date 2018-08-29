/*
 * @Author: wwb 
 * @Date: 2018-08-21 17:46:47 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-28 22:06:19
 */
 /**
 * @file 系统管理--组织机构--用户管理--添加
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Radio, Input, Button, Table, Affix, Modal } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { DeptSelect } from '../../../../common/dic';
import { connect } from 'dva';
// const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Search } = Input;
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
const modalColumns = [{
  title: '账号',
  dataIndex: 'userNo'
},{
  title: '姓名',
  dataIndex: 'ctcpName'
},{
  title: '所属科室',
  dataIndex: 'ctcpDeptCode'
}];
const modalDataSource = [
  {
    "ctcpDeptCode": '科室1',
    'ctcpCode': '1',
    'id': '1',
    'ctcpName': '姓名1',
  },
  {
    "ctcpDeptCode": '科室2',
    'ctcpCode': '2',
    'id': '2',
    'ctcpName': '姓名2',
  }
]
class AddUser extends PureComponent{
  state = {
    userType: '0',
    visible: false,
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
    this.setState({ userLoading: true, deptLoading: true });
    let { dispatch } = this.props;
    // 所属部门
    dispatch({
      type: 'Organization/getAllDepts',
      payload: {},
      callback: (data) =>{
        this.setState({ deptDataSource: data,deptLoading: false });
      }
    });
    // 角色列表
    dispatch({
      type: 'Organization/getRoleInfo',
      payload: {},
      callback: (data) =>{
        this.setState({ userDataSource: data, userLoading: false });
      }
    });
  }
  onSearch = () =>{
    this.props.dispatch({
      type: 'Organization/getFilterCareProv',
      payload: {},
      callback: (data) =>{
        this.setState({ modalDataSource: data, visible: true })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { userType, visible, deptDataSource, userDataSource, userLoading, deptLoading } = this.state;
    return (
      <div>
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <div style={{ display:'flex',justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: 'bold' }}>用户信息</h3>
          </div>
          <hr className='hr' />
          <Form>
            <Row>
              <Col span={6}>
                <FormItem colon={false} label={''} wrapperCol={{ span: 20 }}>
                  {
                    getFieldDecorator(`userType`,{
                      initialValue: userType
                    })(
                      <RadioGroup onChange={e=> this.setState({ userType: e.target.value })}>
                        <Radio value={'0'}>已有医院用户</Radio>
                        <Radio value={'1'}>无医院用户</Radio>
                      </RadioGroup>
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    {
                      userType === '0'?
                      <FormItem {...formItemLayout} label={`账号`}>
                        {
                          getFieldDecorator(`loginName`,{
                            initialValue: '',
                            rules: [{ required: true, message: '请选择账号' }]
                          })(
                            <Search
                               
                              placeholder='请选择'
                              onSearch={this.onSearch}
                            />
                          )
                        }
                      </FormItem>
                      :
                      <FormItem {...formItemLayout} label={`账号`}>
                        {
                          getFieldDecorator(`loginName`,{
                            initialValue: '',
                            rules: [{ required: true, message: '请选择账号' }]
                          })(
                            <Input placeholder='请输入'/>
                          )
                        }
                      </FormItem>
                    }
                  </Col>
                  <Col span={6} push={2}>
                    <FormItem {...formItemLayout} label={`姓名`}>
                      {
                        getFieldDecorator(`name`,{
                          initialValue: '',
                          rules: [{ required: true, message: '请选择姓名' }]
                        })(
                          <Input disabled={userType === '0'? true: false }/>
                        )
                      }
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label={`手机号`}>
                  {
                    getFieldDecorator(`phone`)(
                      <Input placeholder='请输入'/>
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </Form>
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
      <Modal 
        title={'用户信息'}
        visible={visible}
        onCancel={()=>this.setState({ visible: false })}
        footer={[
          <Button key="submit" type='primary' onClick={this.newAdd}>
              确认
          </Button>,
          <Button key="back"  type='default' onClick={()=>this.setState({ visible: false })}>取消</Button>
        ]}
      >
        <Row style={{ marginBottom: 16 }}>
          <Col span={16}>
            <Input style={{ width: 120 }} placeholder='姓名关键字'/>
            <Input style={{ width: 120,marginLeft: 8 }} placeholder='科室关键字'/>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type='primary'>查询</Button>
            <Button type='primary' style={{ marginLeft: 8 }}>重置</Button>
          </Col>
        </Row>
        <Table 
          columns={modalColumns}
          size='small'
          pagination={false}
          dataSource={modalDataSource}
          rowKey={'id'}
          scroll={{ x: '100%' }}
          onRow={(record)=>{
            return {
              onClick: () =>{
                console.log(record,'record')
              }
            }
          }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: this.state.modalSelected,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({modalSelected: selectedRowKeys, modalSelectedRows: selectedRows})
              }
          }}
        />
      </Modal>
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
export default connect()(Form.create()(AddUser));