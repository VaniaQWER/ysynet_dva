/*
 * @Author: yuwei 
 * @Date: 2018-08-22 15:18:53 
* @Last Modified time: 2018-08-22 15:18:53 
 */
 /**
 * @file 系统管理--组织机构--部门管理
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Button, Table,Icon,Modal,Select} from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { Link } from 'dva/router';
const FormItem = Form.Item;
const Option = Select.Option;
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
 
  state = {
    display: 'none'
  }
  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none',
      expand: !expand
    })
  }

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
    const { display, expand } = this.state;
    
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`部门名称`}>
              {
                getFieldDecorator(`deptName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
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
          <Col span={8} style={{display:display}}>
            <FormItem {...formItemLayout} label={`部门类型`}>
              {
                getFieldDecorator(`deptType`,{
                  initialValue: ''
                })(
                  <Input/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{float:'right', textAlign: 'right', marginTop: 4}}>
            <Button type="primary" className='button-gap'  htmlType="submit">查询</Button>
            <Button type='default' className='button-gap' onClick={this.handleReset}>重置</Button>
              <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
                {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
              </a>
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
    editTime: '2018-08-21-17:00',
    code:`code123${i}`
  })
}


class DepartmentMgt extends PureComponent{

  state = {
    loading: false,
    query: {},
    visible:false,
    modalTitle:"新增",
    record:{},//当前要编辑的信息
    subModalVisible:false,//科室弹窗显示状态
    deptKeyword:'',//科室搜索关键字
    hasStyle: null,
    subModalSelectRow:{},//科室点选-获取相关的信息
    subModalSelectRowCache:{},//科室点选-缓存
    
  }

  //新增部门 - 打开弹窗
  add = ()=>{
    this.props.form.resetFields();
    this.setState({visible:true})
  }

  //新增部门 -提交表单
  onSubmitModal = () => {
    this.props.form.validateFields((err,values)=>{
      if(!err){
        console.log(values)
        console.log(this.state.subModalSelectRowCache);//此数据为科室每次确认的最终数据
        this.setState({visible:false})
      }
    })
  }

  //新增部门 -关闭弹窗
  onCancelModal = () => {
    this.props.form.resetFields();
    this.setState({visible:false})
  }

  //新增部门-选择科室 - 打开弹窗
  showDeptModal = () => {
    this.setState({subModalVisible:true})
  }
  //搜索科室弹窗
  searchSubModal = () => {
    console.log(this.state.deptKeyword)
    //在此处发出请求，并且刷新科室弹窗中的table
  }

  //选择科室 - 确定
  onSubmitSubModal = () =>{
    console.log(this.state.subModalSelectRow)
    //当前选择科室后的信息-需要赋值给新增部门的文本框
    const { subModalSelectRow } = this.state;
    //存入缓存
    this.setState({subModalSelectRowCache:JSON.parse(JSON.stringify(subModalSelectRow)),subModalVisible:false  });
    this.props.form.setFieldsValue({dept:subModalSelectRow.deptName})

  }
   //选择科室 - 取消
  onCancelSubModal = () =>{
    const { subModalSelectRowCache } = this.state;
    this.setState({subModalVisible:false });
    this.props.form.setFieldsValue({dept:subModalSelectRowCache.deptName})
  }

  render(){
    const columns = [
      {
        title: '部门名称',
        dataIndex: 'userNo',
      },
      {
        title: '科室名称',
        dataIndex: 'remark',
      },
      {
        title: '部门类型',
        dataIndex: 'editMan',
      },
      {
        title: '地址',
        dataIndex: 'adress',
      },
      {
        title: '编辑人',
        dataIndex: 'editor',
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
            <Link className='button-gap' to={{pathname:'/system/organization/departmentMgt/edit',state:record}}>编辑</Link>
            <Link to={{pathname:'/system/organization/departmentMgt/goodsAllocation',state:record}}>货位 </Link>
          </span>
        }
      },
    ]
    const subModalCol = [
      {
        title: '科室名称',
        dataIndex: 'deptName',
      },
      {
        title: '编码',
        dataIndex: 'code',
      },
    ]
    const { visible , modalTitle ,subModalVisible, hasStyle } = this.state;
    const { getFieldDecorator } = this.props.form;


    return (
      <div className='ysynet-main-content'>
        <WrapperForm query={this.queryHandle}/>
        <div>
          <Button type='primary' icon='plus' className='button-gap' onClick={this.add}>新增</Button>
        </div>
        <Table 

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
        />
        {/* 新增部门 - 弹窗  */}
        <Modal 
          visible={visible}
          title={modalTitle}
          onOk={this.onSubmitModal}
          onCancel={this.onCancelModal}
          >
          <Form onSubmit={this.onSubmit}>
            <FormItem {...singleFormItemLayout} label={`部门类型`}>
              {
                getFieldDecorator(`userName`,{
                  rules: [{ required: true,message: '请输入部门类型' }]
                })(
                  <Select>
                    <Option key='0' value='0'>货位类型</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`部门名称`}>
              {
                getFieldDecorator(`userNo`,{
                  rules: [{ required: true,message: '请输入部门名称' }]
                })(
                  <Input />
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`科室`}>
              {
                getFieldDecorator(`dept`,{
                  rules: [{ required: true,message: '请输入科室' }]
                })(
                  <Input onClick={this.showDeptModal}/>
                )
              }
            </FormItem>
            <FormItem {...singleFormItemLayout} label={`地址`}>
              {
                getFieldDecorator(`adress`)(
                  <Select>
                    <Option key='0' value='0'>地址1</Option>
                  </Select>
                )
              }
            </FormItem>
          </Form>
        </Modal>
        {/* 新增部门 - 科室 - 弹窗  */}
        <Modal
          visible={subModalVisible} 
          title='科室'     
          onOk={this.onSubmitSubModal}
          onCancel={this.onCancelSubModal}
          >
            <Row>
              <Input  className='button-gap' style={{width:200}} value={this.state.deptKeyword} onChange={(e)=>this.setState({deptKeyword:e.target.value})}/>
              <Button className='button-gap' onClick={this.searchSubModal}>查询</Button>
              <Button className='button-gap' onClick={()=>this.setState({deptKeyword:''})}>重置</Button>
            </Row>
            <Table 
              onRow={ (record, index) => {
                return {
                  onClick: () => {
                    this.setState({ hasStyle: index , subModalSelectRow:record })
                  }
                };
              }}
              rowClassName={ (record, index) => index === hasStyle ? 'rowClassBg' : ''}
              columns={subModalCol}
              bordered
              loading={this.state.loading}
              scroll={{x: '100%'}}
              rowKey={'id'}
              pagination={{
                size: "small",
                showQuickJumper: true,
                showSizeChanger: true
              }}
              style={{marginTop: 20}}
              dataSource={dataSource}
            />
        </Modal>
      </div>
    )
  }
}
export default Form.create()(DepartmentMgt);