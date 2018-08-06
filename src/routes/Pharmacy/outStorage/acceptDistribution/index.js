/*
 * @Author: yuwei  配货 /picking
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Table , Form, Row, Col, Button, Icon, Select , Input , DatePicker} from 'antd';
import { Link } from 'react-router-dom'
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
  {
    title: '申领号',
    dataIndex: 'medicinalCode',
    width:120,
    render:(text)=>
    <span>
      <Link to={{pathname: `/drugStorage/outStorage/acceptDistribution/details`}}>{text}</Link>
    </span>  
  },
  {
   title: '申领部门',
   dataIndex: 'index',
   width:120,
   render: (text, record, index) => '静配中心'
  },
  {
    title: '状态',
    dataIndex: 'fstate',
    width:120,
    render: (text, record, index) => text === '00' ? '已配货' : '待配货'
  },
  {
    title: '类型',
    dataIndex: 'equipmfmodalentStandardName',
    width:150,
    render: (text, record, index) => '类型' + index
  },
  {
    title: '发起人',
    dataIndex: 'spec123',
    width:120,
    render: (text, record, index) => 'cheng' + index
  },
  {
    title: '发起时间',
    dataIndex: 'custodian',
    width:150,
    render: (text, record, index) => '2018-7-25 21:17'
  },
  {
    title: '配货人',
    dataIndex: 'bDept',
    width:120,
    render: (text, record, index) => '王文斌'
  },
  {
    title: '配货时间',
    dataIndex: 'time',
    width:120,
    render: (text, record, index) => '2018-7-25 21:17'
  }
];
class Picking extends PureComponent{
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
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <Table
          dataSource={createData()}
          bordered
          loading={ this.state.loading}
          scroll={{x: '100%'}}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        />
      </div>
    )
  }
}
export default Picking;

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
           <FormItem label={`申领部门`} {...formItemLayout}>
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
           <FormItem label={`状态`} {...formItemLayout}>
             {getFieldDecorator('fstate', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
                    <Option key="01" value="01">待配货</Option>
                    <Option key="02" value="02">已配货</Option> 
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`类型`} {...formItemLayout}>
             {getFieldDecorator('spec')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                <Option key="" value="">全部</Option>
                <Option key="01" value="01">申领</Option>
                <Option key="02" value="02">欠品申领</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`单据号`} {...formItemLayout}>
             {getFieldDecorator('danjuhao')(
              <Input placeholder='申领单'/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`发起时间`} {...formItemLayout}>
             {getFieldDecorator('time')(
              <RangePicker/>
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