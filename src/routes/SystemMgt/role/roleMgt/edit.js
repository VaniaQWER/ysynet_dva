/*
 * @Author: yuwei 
 * @Date: 2018-08-22 14:39:17 
* @Last Modified time: 2018-08-22 14:39:17 
 */
/**
 * @file 系统管理--角色管理--角色-新增
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Button , message} from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { systemMgt } from '../../../../api/systemMgt';
import RemoteTable from '../../../../components/TableGrid';
import { connect } from 'dva';
const FormItem = Form.Item;

class EditRoleMgt extends PureComponent{

  state = {
    loading: false,
    baseInfo:{},//回显信息
    selectRowKeys:[],
    query:{}
  }

   //提交表单
   onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        const { baseInfo , selectRowKeys } = this.state;
        const postData ={
          id:baseInfo.id,
          menuIds:selectRowKeys,
          name:baseInfo.name,
          ...values
        }
        this.props.dispatch({
          type:'systemRole/RoleSave',
          payload:postData,
          callback: (data) => {
            message.success('修改成功！')
            this.props.history.push('/system/role/roleMgt')
          }
        })

      }
    })  
  }

  componentDidMount (){
    this.props.dispatch({
      type: 'systemRole/RoleDetail',
      payload: this.props.match.params,//{id:[]}
      callback: (data) => {
        this.setState({
          baseInfo:data.data,
          selectRowKeys:data.data.menuIds.split(','),
        })
      }
    })
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const { baseInfo  , selectRowKeys , query} = this.state;
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
      <div className='fullCol'>
        <div className='fullCol-fullChild'>
          <h3>
            基本信息
            <Button type='primary' style={{float:'right'}} onClick={this.onSubmit}>保存</Button>
          </h3>
          <Form>
              <Row gutter={30}>
                <Col span={8}>
                  <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                    角色名称 :&nbsp;
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
                    <div className="ant-form-item-control">
                      <span className="ant-form-item-children">
                        {baseInfo.name}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`备注`}>
                    {
                      getFieldDecorator(`remarks`,{
                        initialValue:baseInfo?baseInfo.remarks:''
                      })(
                        <Input placeholder='请输入' />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
          </Form>
        </div>
        <div className='detailCard'>
          <h3>角色权限</h3>
          <hr className='hr'/>
          <RemoteTable 
            ref='table'
            query={query}
            style={{marginTop: 20}}
            columns={columns}
            scroll={{ x: '100%' }}
            url={systemMgt.MenuList}
            rowSelection={{
              selectedRowKeys:selectRowKeys,
              onChange:(selectRowKeys, selectedRows)=>{
                this.setState({selectRowKeys})
              }
            }}
            rowKey='id'
          />
        </div>
      </div>
    )
  }
}
export default connect( state=>state )( Form.create()(EditRoleMgt) );