/*
 * @Author: yuwei  退货 /refund
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Table , Form, Row, Col, Button, Icon, Select , Input ,DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
  {
    title: '退库单',
    width:150,
    dataIndex: 'applyNo',
    render:(text)=>(
      <Link to={{pathname:`/pharmacy/outStorage/refund/details`}}>{text}</Link>
    )
  },
  {
   title: '部门',
   dataIndex: 'medicinalCode',
   width:100,
   render:(text)=>'静配中心'
  },
  {
    title: '配货部门',
    dataIndex: 'medicinalCode2',
    width:100,
    render:(text)=>'药库'
   },
  {
    title: '出库分类',
    width:100,
    dataIndex: 'fmodal2',
    render:(text)=>'退货出库'
  },
  {
    title: '退货原因',
    width:100,
    dataIndex: 'reson',
    render:(text)=>'破损'
  },
  {
    title: '状态',
    width:100,
    dataIndex: 'spec21',
    render:(text)=>'待下架'
  },
  {
    title: '退货人',
    width:100,
    dataIndex: 'bDept',
    render: (text, record, index) => '王文斌'
  },
  {
   title: '退货时间',
   width:130,
   dataIndex: 'useDept',
   render: (text, record, index) => '2018-7-25 21:57'
  },
 {
  title: '复核人',
  width:100,
  dataIndex: 'useDept1',
  render: (text, record, index) => '花花'
 },
 {
  title: '复核时间',
  width:130,
  dataIndex: 'useDept123',
  render: (text, record, index) => '2018-7-25 21:58'
 }
];

class Refund extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      query:{},
    }
  }
  queryHandler = (query) => {
    this.setState({ query:query })
  }
  render(){
    return (
      <div  className='ysynet-main-content' >
        <SearchForm query={this.queryHandler} />
        <Row>
          <Button type='primary'>
            <Link to={{pathname:`/pharmacy/outStorage/refund/add`}}>新建退库</Link>
          </Button>
        </Row>
        <Table
          dataSource={createData()}
          bordered
          loading={ this.state.loading}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
        /> 
      </div>
    )
  }
}
export default Refund;
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
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`退货单号`} {...formItemLayout}>
             {getFieldDecorator('assetCode', {})(
              <Input/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`退货原因`} {...formItemLayout}>
             {getFieldDecorator('assetCode132', {})(
              <Input/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
            <FormItem label={`状态`} {...formItemLayout}>
              {getFieldDecorator('useDeptGuid')(
                <Select 
                  showSearch
                  placeholder={'请选择'}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                  >
                  <Option key="" value="">全部</Option>
                  <Option key="01" value="01">待复核</Option>
                  <Option key="02" value="02">待下架</Option>
                </Select>
              )}
            </FormItem>
          </Col>
         <Col span={8}  style={{display: display}}>
           <FormItem label={`退货时间`} {...formItemLayout}>
             {getFieldDecorator('assetName23', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`供应商`} {...formItemLayout}>
             {getFieldDecorator('assetCode123', {})(
              <Input/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
             {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
           </a>
         </Col>
       </Row>
     </Form>
   )
 }
}
const SearchForm = Form.create()(SearchFormWrapper);