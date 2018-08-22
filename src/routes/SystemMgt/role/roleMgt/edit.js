/*
 * @Author: yuwei 
 * @Date: 2018-08-22 14:39:17 
* @Last Modified time: 2018-08-22 14:39:17 
 */
/**
 * @file 系统管理--角色管理--角色-新增
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Button, Table } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
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
    baseInfo:{},//回显信息
    selectRowKeys:[],
  }

   //提交表单
   onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      console.log(values)
      if(!err){
        console.log(values)
        console.log(this.state.selectRowKeys[0]);//获取角色权限对应的key

      }
    })  
  }

  componentDidMount (){
    console.log(this.props.location.state)
    if(this.props.location.state){
      this.setState({
        baseInfo:this.props.location.state,
        selectRowKeys:this.props.location.state.selectRowKeys,
      })
    }
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const { baseInfo  , selectRowKeys } = this.state;
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'userNo',
      },
      {
        title: '路径',
        dataIndex: 'remark',
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
                      getFieldDecorator(`userName`,{
                        initialValue:baseInfo?baseInfo.userName:''
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
          <Table 
           selectRowKeys={selectRowKeys}
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
          />   
        </div>
      </div>
    )
  }
}
export default Form.create()(AddRoleMgt);