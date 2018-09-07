/*
 * @Author: yuwei  上架 /putaway
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import {Form, Input , Icon , DatePicker , Row, Col, Button, Select , message  , Popconfirm } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { Link } from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid/index';
import {wareHouse} from '../../../../api/pharmacy/wareHouse';
import {connect} from 'dva';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class Putaway extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{},
    }
  }

  queryHandler = (query) => {
    this.setState({query: query});
  }

  //单行确认 
  confirmOk = () => {
    message.success('操作成功')
  }

  render(){
    let {query} = this.state;
    const columns = [
      {
        title: '验收单',
        dataIndex: 'acceptanceCode',
        width:150,
        render:(text, record)=>(<Link to={{pathname: `/pharmacy/wareHouse/putaway/details/code=${text}&status=${record.acceptanceStatus}`}}>{text}</Link>)
       },
      {
        title: '状态',
        width:100,
        dataIndex: 'acceptanceStatusName',
      },
      {
        title: '类型',
        width:100,
        dataIndex: 'acceptanceTypeName',
      },
      {
        title: '验收时间',
        width:150,
        dataIndex: 'receptionTime'
      },
      {
        title: '上架时间',
        width:150,
        dataIndex: 'upUserDate'
      },
      {
        title: '操作',
        width:150,
        dataIndex: 'RN',
        render: (text, record) => 
          <span>
            <Popconfirm title="确定打印吗？" okText="是" cancelText="否"  onConfirm={()=>this.confirmOk(record)}><a>打印</a></Popconfirm>
          </span>  
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchForm dispatch={this.props.dispatch} query={this.queryHandler} />
        <RemoteTable
          url={wareHouse.ROOMACCEPTANCE}
          query={query}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'acceptanceCode'}
          style={{marginTop: 24}}
        />
      </div>
    )
  }
}
export default connect(state=>state)(Putaway);

/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
 state = {
   display: 'none',
   status: [],
   type: []
 }
 componentDidMount() {
   this.props.dispatch({
     type: 'base/orderStatusOrorderType',
     payload: {
       type: 'acceptance_status'
     },
     callback: (data) => {
       this.setState({status: data});
     }
   });
   this.props.dispatch({
     type: 'base/orderStatusOrorderType',
     payload: {
       type: 'acceptance_type'
     },
     callback: (data) => {
       this.setState({type: data});
     }
   });
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
      let {time} = values;
      if(time && time.length > 0) {
        values.receptionStartTime = time[0].format('YYYY-MM-DD');
        values.receptionEndTime = time[1].format('YYYY-MM-DD');
      }else {
        values.receptionStartTime = '';
        values.receptionEndTime = '';
      };
      delete values.time;
      this.props.query(values);
    });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 renderList = (list) => {
   return list.map(item => {
     return <Option key={item.value} value={item.value}>{item.label}</Option>
   })
 }

 render() {
   let {display, type, status} = this.state;
   type = this.renderList(type);
   status = this.renderList(status);

   const { getFieldDecorator } = this.props.form;
   return (
    <Form onSubmit={this.handleSearch}>
      <Row gutter={30}>
        <Col span={8}>
          <FormItem label={`单据号`} {...formItemLayout}>
            {getFieldDecorator('acceptanceCode', {})(
            <Input placeholder='验收单'/>
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
              {status}
            </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem label={`类型`} {...formItemLayout}>
            {getFieldDecorator('acceptanceType')(
            <Select 
              showSearch
              placeholder={'请选择'}
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
              >
              {type}
            </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8} style={{display: display}}>
          <FormItem label={`验收时间`} {...formItemLayout}>
            {getFieldDecorator('time', {})(
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
const SearchForm = Form.create()(SearchFormWrapper);