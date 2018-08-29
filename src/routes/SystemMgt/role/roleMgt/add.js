/*
 * @Author: yuwei 
 * @Date: 2018-08-22 14:39:17 
* @Last Modified time: 2018-08-22 14:39:17 
 */
/**
 * @file 系统管理--角色管理--角色-新增
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Affix ,Button, Card , message} from 'antd';
import { connect } from 'dva';
import { formItemLayout } from '../../../../utils/commonStyles';
import { menuFormat } from '../../../../utils/utils';
import { systemMgt } from '../../../../api/systemMgt';
import RemoteTable from '../../../../components/TableGrid';
const FormItem = Form.Item;

class AddRoleMgt extends PureComponent{

  state = {
    loading: false,
    query:{}
  }

   //提交表单
   onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        console.log(values)
        if(this.state.selectRowKeys&& this.state.selectRowKeys.length){
          console.log(this.state.selectRowKeys[0]);//获取上级菜单的key值
          const menuIds = this.state.selectRowKeys;
          this.props.dispatch({
            type: 'systemRole/RoleSave',
            payload: { menuIds,...values},
            callback: (data) => {
              console.log(data,'RoleSave')
              message.success('保存成功！')
              this.props.history.push('/sys/role/roleMgt')
            }
          })
        }else{
          message.warn('请至少选择一个角色权限！')
        }
      }
    })  
  }

  //取消 - 提交表单
  goBack = () => {
    const { history } = this.props;
    history.push({pathname:'/sys/role/roleMgt'})
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const { query } = this.state;
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
      },
      {
        title: '路径',
        dataIndex: 'href',
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
          <RemoteTable 
            ref='table'
            query={query}
            method='GET'
            style={{marginTop: 20}}
            columns={columns}
            scroll={{ x: '100%' }}
            url={systemMgt.MenuList}
            rowSelection={{
              onChange:(selectRowKeys, selectedRows)=>{
                this.setState({selectRowKeys})
              }
            }}
            rowKey='id'
            cb={(dataList,data)=>{
              menuFormat(data)
            }}
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