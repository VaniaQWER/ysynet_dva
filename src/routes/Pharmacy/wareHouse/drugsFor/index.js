/*
 * @Author: yuwei  药品申领  /drugsFor
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import {Form, Input , Row, Col, Button, Icon, Select, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid/index';
import {wareHouse} from '../../../../api/pharmacy/wareHouse';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
class DrugsFor extends PureComponent{

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
    this.refs.tab.fetch(query);
  }


  render(){
    const columns = [
      {
      title: '申领单',
      width:150,
      dataIndex: 'applyCode',
      render:(text, record)=>(<Link to={{pathname: `/pharmacy/wareHouse/drugsFor/details/${record.applyCode}`}}>{text}</Link>)
      },
      {
        title: '申领部门',
        width:100,
        dataIndex: 'applyDeptName',
        render: (text, record, index) => '药房'
      },
      {
        title: '配货部门',
        width:100,
        dataIndex: 'distributeDeptName',
        render: (text, record, index) => '药房'
      },
      {
        title: '状态',
        width:100,
        dataIndex: 'applyStatusName',
        render: (text, record, index) => text === '00' ? '已申领' : '未申领'
      },
      {
        title: '发起人',
        width:100,
        dataIndex: 'createUserName',
        render: (text, record, index) => '未申领'
      },
      {
        title: '发起时间',
        width:150,
        dataIndex: 'createDate',
        render: (text, record, index) => '2018-7-25 21:49'
      },
      {
        title: '配货人',
        width:100,
        dataIndex: 'distributeUserName',
        render: (text, record, index) => '已申领'
      },
      {
        title: '配货时间',
        width:150,
        dataIndex: 'distributeDate',
        render: (text, record, index) => '2018-7-25 21:49'
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <Row>
          <Button type='primary' className='button-gap'>
            <Link to={{pathname:`/addDrugsFor`}}>新建申领</Link>
          </Button>
        </Row>
        <RemoteTable
          ref="tab"
          url={wareHouse.APPLYLIST}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 24}}
        />
      </div>
    )
  }
}
export default DrugsFor;

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
    if(values.time) {
      values.startTime = values.time[0].format('YYYY-MM-DD');
      values.endTime = values.time[1].format('YYYY-MM-DD');
    }else {
      values.startTime = '';
      values.endTime = '';
    }
    delete values.time;
    this.props.query(values);
  });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields()
 }

 render() {
   const { display } = this.state;
   const { getFieldDecorator } = this.props.form;
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`申领单`} {...formItemLayout}>
             {getFieldDecorator('applyCode', {})(
              <Input placeholder="请输入"/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`状态`} {...formItemLayout}>
             {getFieldDecorator('applyStatus', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
                    <Option key="0" value="0">草稿</Option>
                    <Option key="1" value="1">待审核</Option>
              </Select>
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
         <Col span={8} style={{ float:'right',textAlign: 'right', marginTop: 4}} >
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