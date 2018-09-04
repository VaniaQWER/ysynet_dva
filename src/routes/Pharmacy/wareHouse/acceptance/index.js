/*
 * @Author: yuwei  验收 /acceptance
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import {Form, Row, Col, Button, Icon, Select , Input , DatePicker } from 'antd';
import RemoteTable from '../../../../components/TableGrid/index';
import {wareHouse} from '../../../../api/pharmacy/wareHouse';
import { Link } from 'react-router-dom';
import {connect} from 'dva';
import { formItemLayout } from '../../../../utils/commonStyles';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
  {
   title: '出库单',
   dataIndex: 'acceptanceCode',
   width:150,
   render:(text, record)=>(<Link to={{pathname: `/pharmacy/wareHouse/acceptance/details/id=${record.acceptanceCode}&state=${record.acceptanceStatus}`}}>{text}</Link>)
  },
  {
    title: '申领单',
    width:150,
    dataIndex: 'applyCode',
  },
  {
    title: '配货部门',
    width:100,
    dataIndex: 'department'
  },
  {
    title: '状态',
    width:150,
    dataIndex: 'acceptanceStatusName',
  },
  {
    title: '发起人',
    width:100,
    dataIndex: 'sponsorName'
  },
  {
    title: '发起时间',
    dataIndex: 'createDate',
    width:120
  },
  {
   title: '验收时间',
   width:120,
   dataIndex: 'receptionTime'
  }
];

class Acceptance extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      query:{},
    }
  }
  queryHandler = (query) => {
    for (const key in query) {
      query[key] = query[key] === undefined? '' : query[key]
    };
    this.refs.tab.fetch(query);
  }
  render(){
    let {query} = this.state;
    
    return (
      <div  className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <Row>
          <Button type='primary' className='button-gap'>
            <Link to={{pathname:`/addNewAcceptance`}}>新建验收</Link>
          </Button>
        </Row>
        <RemoteTable
          query={query}
          ref="tab"
          url={wareHouse.ROOMCHECK}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        /> 
      </div>
    )
  }
}
export default connect(state=>state)(Acceptance);
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
 state = {
   display: 'none',
   statusList: []
 }
 componentDidMount() {
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'acceptance_check'
      },
      callback: (data) => {
        this.setState({statusList: data});
      }
    })
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
    let {initTime, checkTime} = values;
    if(initTime && initTime.length !== 0){
      values.startCreateTime = initTime[0].format('YYYY-MM-DD');
      values.endCreateTime = initTime[1].format('YYYY-MM-DD');
    }else {
      values.startCreateTime = '';
      values.endCreateTime = '';
    };
    if(checkTime && checkTime.length !== 0){
      values.receptionStartTime = checkTime[0].format('YYYY-MM-DD');
      values.receptionEndTime = checkTime[1].format('YYYY-MM-DD');
    }else {
      values.receptionStartTime = '';
      values.receptionEndTime = '';
    };
    delete values.initTime;
    delete values.checkTime;
     this.props.query(values);
   });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 render() {
   let {display, statusList} = this.state;
   const { getFieldDecorator } = this.props.form;
   statusList = statusList.map(item=>{
      return <Option key={item.value} value={item.value}>{item.label}</Option>
    })
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`单据`} {...formItemLayout}>
             {getFieldDecorator('acceptanceCode', {})(
              <Input placeholder='入库单/配送单/订单号'/>
             )}
           </FormItem>
         </Col>
         <Col span={8} >
           <FormItem label={`状态`} {...formItemLayout}>
             {getFieldDecorator('acceptanceStatus')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                {statusList}
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`发起时间`} {...formItemLayout}>
             {getFieldDecorator('initTime', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`验收时间`} {...formItemLayout}>
             {getFieldDecorator('checkTime', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{ textAlign: 'right', marginTop: 4,float:'right'}} >
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
const SearchForm = connect(state=>state)(Form.create()(SearchFormWrapper));