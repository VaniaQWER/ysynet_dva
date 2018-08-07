/*
 * @Author: yuwei  发药出库 /output
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Table , Form, Row, Col, Button, Icon, Input ,Select , DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const { Option } = Select;
const columns = [
  {
   title: '出库单',
   dataIndex: 'medicinalCode',
   width:150,
   render:(text)=>(
    <Link to={{pathname: `/pharmacy/outStorage/output/details`}}>{text}</Link>
   )
  },
  {
    title: '发药确认单',
    dataIndex: 'medicinalCode123',
    width:150,
    render:(text,record)=>`${record.medicinalCode}`
   },
  {
    title: '药房',
    width:150,
    dataIndex: 'productName',
    render:(text)=>'中心药房'
  },
  {
    title: '出库分类',
    width:100,
    dataIndex: 'fmodal2',
    render:(text)=>'发药出库'
  },
  {
   title: '发药时间',
   width:100,
   dataIndex: 'useDept',
   render: (text, record, index) => '2018-7-25 21:53'
  }
];

class Output extends PureComponent{

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
      <div  className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
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
export default Output;
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
           <FormItem label={`单据`} {...formItemLayout}>
             {getFieldDecorator('assetCode', {})(
              <Input placeholder="出库单/发药确认单"/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`发药时间`} {...formItemLayout}>
             {getFieldDecorator('assetName', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col> 
         <Col span={8} style={{display: display}}>
           <FormItem label={`出库分类`} {...formItemLayout}>
             {getFieldDecorator('assetName', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
                    <Option key="01" value="01">发药出库</Option>
              </Select>
             )}
           </FormItem>
         </Col> 
         <Col span={8} style={{float:'right', textAlign: 'right', marginTop: 4}} >
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