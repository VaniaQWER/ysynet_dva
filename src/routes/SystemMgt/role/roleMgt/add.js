/*
 * @Author: yuwei 
 * @Date: 2018-08-22 14:39:17 
* @Last Modified time: 2018-08-22 14:39:17 
 */
/**
 * @file 系统管理--角色管理--角色-新增
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Affix ,Button, Card } from 'antd';
import { connect } from 'dva';
import { formItemLayout } from '../../../../utils/commonStyles';
import { systemMgt } from '../../../../api/systemMgt';
import RemoteTable from '../../../../components/TableGrid';
const FormItem = Form.Item;

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

class AddRoleMgt extends PureComponent{

  state = {
    loading: false,
  }

   //提交表单
   onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      console.log(values)
      if(!err){
        console.log(values)
        if(this.state.selectRowKeys&& this.state.selectRowKeys.length){
          console.log(this.state.selectRowKeys[0]);//获取上级菜单的key值

          this.props.dispatch({
            type: 'systemRole/RoleSave',
            payload: { id:[123,2,3],name:'123213'},
            callback: (data) => {
              console.log(data,'RoleSave')
            }
          })
        }
      }
    })  
  }

  //取消 - 提交表单
  goBack = () => {
    const { history } = this.props;
    history.push({pathname:'/system/role/roleMgt'})
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
      },
      {
        title: '路径',
        dataIndex: 'remarks',
      }
    ]
    return (
      <div>
        <Card title='角色信息' style={{marginBottom: 24}}>
          <Form>
              <Row gutter={30}>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`角色名称`}>
                    {
                      getFieldDecorator(`name`,{
                        initialValue: '',
                        rules:[{required:true,message:'请输入角色名称！'}]
                      })(
                        <Input placeholder='请输入' />
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`备注`}>
                    {
                      getFieldDecorator(`remarks`,{
                        initialValue: ''
                      })(
                        <Input placeholder='请输入' />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
          </Form>
        </Card>

        <Card title='角色权限' className='detailCard'>
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
            style={{marginTop: 20,width: '70%'}}
            dataSource={dataSource}
          /> */}
          

          <RemoteTable 
            ref='table'
            bordered
            style={{marginTop: 20}}
            columns={columns}
            showHeader={true}
            scroll={{ x: '100%' }}
            url={systemMgt.MenuList}
            rowSelection={{
              onChange:(selectRowKeys, selectedRows)=>{
                this.setState({selectRowKeys})
              }
            }}
            rowKey='staticDataGuid'
          />
        </Card>

        <Affix offsetBottom={0} className='affix'  style={{textAlign: 'right',marginLeft:'-16px',marginRight:'-16px'}}>
          <Button
            style={{float:'right',padding:20,margin:5}}
            type="primary"
            onClick={() => {this.onSubmit()}}
          >
            确认
          </Button>
          <Button
            style={{float:'right',padding:20,margin:5}}
            onClick={() => {this.goBack()}}
          >
            取消
          </Button>
        </Affix>
      </div>
    )
  }
}
export default connect(state=>state)( Form.create()(AddRoleMgt) );