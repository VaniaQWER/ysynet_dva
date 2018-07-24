/*
 * @Author: yuwei  新建入库 /newLibrary
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Table , Form, Row, Col, Button, Icon, Select , Modal , message } from 'antd';
import { Link } from 'react-router-dom'
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
  {
   title: '通用名称',
   dataIndex: 'index',
  },
  {
    title: '商品名称',
    dataIndex: 'assetsRecord',
  },
  {
    title: '规格',
    dataIndex: 'useFstate',
  },
  {
    title: '剂型',
    dataIndex: 'equipmentStandardName',
  },
  {
    title: '包装单位',
    dataIndex: 'spec',
  },
  {
    title: '最小单位',
    dataIndex: 'custodian',
  },
  {
    title: '批准文号',
    dataIndex: 'bDept',
  },
  {
   title: '库存上限',
   dataIndex: 'useDept',
  },
 {
  title: '库存下限',
  dataIndex: 'useDept1',
 },
 {
  title: '操作',
  dataIndex: 'RN',
  render: (text, record) => 
    <span>
      <Link to={{pathname: `/deptwork/myProfile/details/${record.assetsRecordGuid}`}}>编辑</Link>
    </span>  
  }
];
const formItemLayout = {
 labelCol: {
   xs: { span: 24 },
   sm: { span: 8 },
 },
 wrapperCol: {
   xs: { span: 24 },
   sm: { span: 16 },
 },
};

class NewLibrary extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{},
      messageError:"",
      selectedRowKeys:[]
    }
  }

  queryHandler = (query) => {
    this.setState({ query:query })
  }

  //批量编辑 - 打开弹窗
  showModal = () =>{
    const { selectedRowKeys } = this.state;
    if(selectedRowKeys.length>0){
      this.setState({visible:true})
    }else{
      message.warn('最少选择一条数据进行编辑！')
    }
  }

  render(){
    const { visible } = this.state;
    return (
      <div>
        <SearchForm query={this.queryHandler} />
        <Row>
          <Button type='primary' onClick={()=>this.showModal()}>批量编辑</Button>
        </Row>
        <Table
          rowSelection={
            {
              onChange:(selectedRowKeys)=>{
                //选中编辑的内容
                this.setState({selectedRowKeys})
              }
            }
          }
          loading={ this.state.loading}
          ref='table'
          query={this.state.query}
          scroll={{x: '100%', y : document.body.clientHeight - 311}}
          columns={columns}
          rowKey={'assetsRecordGuid'}
          style={{marginTop: 20}}
        /> 
        <Modal
         visible={visible}
         title='批量编辑'
         onCancel={()=>this.setState({visible:false})}
         onOk={()=>this.setState({visible:false})}>
          12313123
        </Modal>
      </div>
    )
  }
}
export default NewLibrary;

/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
 state = {
   display: 'none',
 }
 toggle = () => {
   const { display, expand } = this.state;
   this.setState({
     display: display === 'none' ? 'block' : 'none',
     expand: !expand
   })
 }
 handleSearch = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     this.props.query(values);
   });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 render() {
   const { display } = this.state;
   const { getFieldDecorator } = this.props.form;
   return (
     <Form onSubmit={this.handleSearch}>
       <Row>
         <Col span={8}>
           <FormItem label={`名称`} {...formItemLayout}>
             {getFieldDecorator('assetCode', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`剂型`} {...formItemLayout}>
             {getFieldDecorator('assetName', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`规格`} {...formItemLayout}>
             {getFieldDecorator('spec')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                <Option key="" value="">全部</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`状态`} {...formItemLayout}>
             {getFieldDecorator('manageDeptGuid')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
              >
              <Option key="" value="">全部</Option>
            </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`备货选项`} {...formItemLayout}>
             {getFieldDecorator('useDeptGuid')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                <Option key="" value="">全部</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 30, fontSize: 14}} onClick={this.toggle}>
             {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
           </a>
         </Col>
       </Row>
     </Form>
   )
 }
}
const SearchForm = Form.create()(SearchFormWrapper);