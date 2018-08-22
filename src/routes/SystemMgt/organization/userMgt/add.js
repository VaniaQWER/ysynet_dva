/*
 * @Author: wwb 
 * @Date: 2018-08-21 17:46:47 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-21 20:13:17
 */
 /**
 * @file 系统管理--组织机构--用户管理--添加
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Radio, Input, Button, Table, Affix, Modal } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
// const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Search } = Input;
const deptColumns = [{
  title: '部门类别',
  dataIndex: 'deptType'
},{
  title: '部门名称',
  dataIndex: 'deptName'
}];
const deptDataSource = [{
  deptGuid: '1',
  deptType: '药库',
  deptName: '药库1'
},{
  deptGuid: '2',
  deptType: '药库',
  deptName: '药库2'
},{
  deptGuid: '3',
  deptType: '系统管理',
  deptName: '系统管理'
},{
  deptGuid: '4',
  deptType: '采购结算',
  deptName: '采购结算'
}]
const distributUser = [{
  title: '角色名称',
  dataIndex: 'userName'
},{
  title: '备注',
  dataIndex: 'tfRemark'
}];
const userDataSource = [
  {
    userName: '药库管理员',
    tfRemark: '',
    userId: '1',
  },{
    userName: '药库普通用户',
    tfRemark: '',
    userId: '2',
  },{
    userName: '系统管理',
    tfRemark: '',
    userId: '3',
  },{
    userName: '基数药管理员',
    tfRemark: '',
    userId: '4',
  }
];
const modalColumns = [{
  title: '账号',
  dataIndex: 'userNo'
},{
  title: '姓名',
  dataIndex: 'name'
},{
  title: '所属科室',
  dataIndex: 'deptName'
}];
let modalDataSource = [];
for(let i=0;i<5; i++){
  modalDataSource.push({
    userNo: `zhangsan${i+1}`,
    name: `张志之${i+1}`,
    deptName: `科室${i+1}`
  })
}
class AddUser extends PureComponent{
  state = {
    source: '00',
    visible: false,
    selected: [], // 所属部门
    selectedRows: [],
    userSelected: [], // 角色分配
    UserselectedRows: [],
    modalSelected: [], // 人员选择
    modalSelectedRows: []
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { source,visible } = this.state;
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
                    getFieldDecorator(`source`,{
                      initialValue: source
                    })(
                      <RadioGroup onChange={e=> this.setState({ source: e.target.value })}>
                        <Radio value={'00'}>已有医院用户</Radio>
                        <Radio value={'01'}>无医院用户</Radio>
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
                      source === '00'?
                      <FormItem {...formItemLayout} label={`账号`}>
                        {
                          getFieldDecorator(`userNo`,{
                            initialValue: '',
                            rules: [{ required: true, message: '请选择账号' }]
                          })(
                            <Search
                               
                              placeholder='请选择'
                              onSearch={()=>this.setState({ visible: true })}
                            />
                          )
                        }
                      </FormItem>
                      :
                      <FormItem {...formItemLayout} label={`账号`}>
                        {
                          getFieldDecorator(`userNo`,{
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
                          <Input disabled={source === '00'? true: false }/>
                        )
                      }
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label={`手机号`}>
                  {
                    getFieldDecorator(`mobile`)(
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
            rowKey={'deptGuid'}
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
            rowKey={'userId'}
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
        titel={'用户信息'}
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
          rowKey={'userNo'}
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
export default Form.create()(AddUser) ;