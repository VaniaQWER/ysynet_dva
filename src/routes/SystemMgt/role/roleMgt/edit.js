/*
 * @Author: yuwei 
 * @Date: 2018-08-22 14:39:17 
* @Last Modified time: 2018-08-22 14:39:17 
 */
/**
 * @file 系统管理--角色管理--角色-新增
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Button, Table, message} from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { menuFormat } from '../../../../utils/utils';
import _ from 'lodash';
import { connect } from 'dva';
const FormItem = Form.Item;

class EditRoleMgt extends PureComponent{

  state = {
    loading: false,
    baseInfo:{},//回显信息
    selectRowKeys:[],
    dataSource: [],
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
            this.props.history.push('/sys/role/roleMgt')
          }
        })

      }
    })  
  }

  componentDidMount (){
    this.setState({loading: true});
    this.props.dispatch({
      type: 'systemRole/RoleDetail',
      payload: this.props.match.params,//{id:[]}
      callback: (data) => {
        this.setState({
          baseInfo:data.data,
          selectRowKeys:data.data.menuIds.split(','),
        })
      }
    });
    this.props.dispatch({
      type: 'systemRole/allMenuList',
      callback: (data) => {
        let dataSource = menuFormat(data, true);
        this.setState({
          dataSource,
          loading: false
        });
      }
    })
  }
  getIds = (record) => {
    let ids = []
    ids.push(record.id);
    if(record.children) {
      idsTree(record.children)
    }
    function idsTree(tree) {
      tree.map(item => {
        ids.push(item.id);
        if(item.children) {
          idsTree(item.children)
        };
        return item;
      })
    };
    return ids;
  }
  //选中
  setSelectRowKeys = (record, selected, selectedRows) => {
    let {selectRowKeys} = this.state;
    let ids = this.getIds(record);
    if(selected) {  //选中push
      selectRowKeys = [...new Set([...selectRowKeys, ...ids])];
    }else {       //反选去除
      selectRowKeys = _.difference(selectRowKeys, ids);
    }
    this.setState({selectRowKeys: selectRowKeys})
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const {baseInfo, selectRowKeys, dataSource, loading} = this.state;
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
    console.log(dataSource);
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
          <Table
            bordered
            loading={loading}
            dataSource={dataSource}
            style={{marginTop: 20}}
            columns={columns}
            scroll={{ x: '100%' }}
            rowSelection={{
              selectedRowKeys:selectRowKeys,
              onSelect: this.setSelectRowKeys,
              onSelectAll: (selected, selectedRows, changeRows) => {
                let ids = selectedRows.map(item => item.id);
                this.setState({selectRowKeys: ids});
              },
            }}
            rowKey='id'
          />
        </div>
      </div>
    )
  }
}
export default connect( state=>state )( Form.create()(EditRoleMgt) );