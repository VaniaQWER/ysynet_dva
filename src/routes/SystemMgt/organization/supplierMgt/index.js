/*
 * @Author: yuwei 
 * @Date: 2018-08-22 09:34:45 
* @Last Modified time: 2018-08-22 09:34:45 
 */
 /**
 * @file 系统管理--组织机构--供应商管理
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Button, Modal, DatePicker } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { connect } from 'dva';
import { systemMgt } from '../../../../api/systemMgt';
import RemoteTable from '../../../../components/TableGrid';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const singleFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
}

class SearchForm extends PureComponent{
  handleSearch = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        const createDate = values.createDate === undefined ? "" : values.createDate;
        if(createDate.length > 0){
            values.startTime = createDate[0].format('YYYY-MM-DD');
            values.endTime = createDate[1].format('YYYY-MM-DD');
        }
        console.log(values,'查询数据');
        this.props.query(values);
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`供应商名称`}>
              {
                getFieldDecorator(`ctmaSupplierName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`创建时间`}>
              {
                getFieldDecorator(`createDate`,{
                  initialValue: ''
                })(
                  <RangePicker format={'YYYY-MM-DD'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'right', marginTop: 4}}>
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
         </Col>
        </Row>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);

class UserMgt extends PureComponent{
  state = {
    loading: false,
    visible: false,
    isEdit:true,
    editTitle:'',
    query: {},
    record:{},//当前编辑的数据
  }
  queryHandle = (query) =>{
    this.setState({ query });
    this.refs.table.fetch(query);
  }
  // 新增
  add = () =>{
    this.props.form.resetFields()
    this.setState({ visible: true , isEdit: false , editTitle:'新增' ,record:{} });
  }
  // 修改
  modify = (record,index) =>{
    console.log(record,index,'modify');
    // let Fields = {
    //   deptName:'供应商名称',
    // };
    // this.props.form.setFieldsValue(Fields);
    this.setState({ visible: true , isEdit: true , editTitle:'编辑' , record });
  }
  save = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        const { record } = this.state;
        if (this.state.isEdit) {
          values.id = record.id;
        }
        console.log(values,'values')
        console.log(record,'record')
        this.setState({ loading: true });
        this.props.dispatch({
          type:'Organization/SupplierSave',
          payload: values,
          callback:(data)=>{
            console.log(data);
            this.setState({ loading: false, visible: false });
            this.refs.table.fetch();
          }
        })
      }
    })
  }
  render(){
    const { visible , isEdit , editTitle , record} = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '供应商名称',
        dataIndex: 'ctmaSupplierName',
      },
      {
        title: '内部编码',
        dataIndex: 'ctmaSupplierCode',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
      },
      {
        title: '编辑人',
        dataIndex: 'editMan',
      },
      {
        title: '编辑时间',
        dataIndex: 'updateDate',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text,record,index)=>{
          return <span>
            <a onClick={this.modify.bind(null,record,index)} style={{ marginLeft: 8 }}>编辑</a>
          </span>
        }
      },
    ]
    return (
      <div className='ysynet-main-content'>
        <WrapperForm query={this.queryHandle}/>
        <div>
          <Button type='primary' icon='plus' onClick={this.add}>新增</Button>
        </div>
        <RemoteTable
          query={this.state.query}
          ref='table'
          bordered
          style={{marginTop: 20}}
          columns={columns}
          showHeader={true}
          scroll={{ x: '100%' }}
          url={systemMgt.SupplierList}
          // rowSelection={{
          //   onChange:(selectRowKeys, selectedRows)=>{
          //     this.setState({selectRowKeys})
          //   }
          // }}
          rowKey='id'
        />
        <Modal
          title={editTitle}
          width={488}
          visible={visible}
          onCancel={()=>this.setState({ visible: false })}
          footer={[
            <Button key="submit" htmlType='submit' type='primary' onClick={this.save} loading={this.state.loading}>确认</Button>,
            <Button key="back"  type='default' onClick={()=>{ this.setState({ visible: false }); this.props.form.resetFields(); }}>取消</Button>
          ]}
        >
          <Form onSubmit={this.onSubmit}>
            <FormItem {...singleFormItemLayout} label={`供应商名称`}>
              {
                getFieldDecorator(`ctmaSupplierName`,{
                  initialValue: isEdit ? record.ctmaSupplierName : '', 
                  rules: [{ required: true,message: '请填写供应商名称' }]
                })(
                  <Input />
                )
              }
            </FormItem>
            {
              isEdit ? 
              <div className="ant-row ant-form-item">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                  内部编码 :&nbsp;
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
                  <div className="ant-form-item-control">
                    <span className="ant-form-item-children">
                      {record.ctmaSupplierCode}
                    </span>
                  </div>
                </div>
              </div>
              :null
            }
          </Form>
        </Modal>
      </div>
    )
  }
}
export default connect(state=>state)(Form.create()(UserMgt));