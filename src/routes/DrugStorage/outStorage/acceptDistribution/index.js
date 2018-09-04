/*
 * @Author: yuwei  配货 /picking
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Icon, Select , Input , DatePicker} from 'antd';
import { Link } from 'react-router-dom'
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid';
import { outStorage } from '../../../../api/drugStorage/outStorage';
import { connect } from 'dva';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
  {
    title: '申领号',
    dataIndex: 'applyCode',
    width:180,
    render:(text,record)=>
    <span>
      <Link to={{pathname: `/drugStorage/outStorage/acceptDistribution/details/${record.applyCode}/${record.applyStatus}`}}>{text}</Link>
    </span>  
  },
  {
   title: '申领部门',
   dataIndex: 'applyDeptName',
   width:120,
  },
  {
    title: '状态',
    dataIndex: 'applyStatusName',
    width:120,
  },
  {
    title: '类型',
    dataIndex: 'applyType',
    width:150,
    render: (text, record, index) => {
      return text === '1' ? '申领': text === '2' ? '调拨': '' 
    }
  },
  {
    title: '发起人',
    dataIndex: 'createUserName',
    width:120,
  },
  {
    title: '发起时间',
    dataIndex: 'createDate',
    width:150,
  },
  {
    title: '配货人',
    dataIndex: 'distributeUserName',
    width:120,
  },
  {
    title: '配货时间',
    dataIndex: 'distributeDate',
    width:120,
  }
];
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
  state = {
    display: 'none',
    deptOption: [], // 申领部门
    apply_type_options: [], //配货类别
    common_distribute_status: [] // 配货状态
  }
  componentWillMount = () =>{
    const { dispatch } = this.props;
    // 查询已经申领过的部门
    dispatch({
      type: 'outStorage/genDeptList',
      payload: { },
      callback: (data) =>{
        this.setState({ deptOption: data });
      }
    });

    // 配货类别
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type : 'apply_type' },
      callback: (data) =>{
        this.setState({ apply_type_options: data })
      }
    });
    // 配货状态
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type : 'common_distribute_status' },
      callback: (data) =>{
        this.setState({ common_distribute_status: data })
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
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const Time = values.Time === undefined || values.Time === null ? "" : values.Time;
        if(Time.length > 0) {
          values.startTime = values.Time[0].format('YYYY-MM-DD');
          values.endTime = values.Time[1].format('YYYY-MM-DD');
        }
        delete values.Time;
        values.queryType = '2';
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({ queryType: '2' });
  }
 
  render() {
    const { display, deptOption, apply_type_options, common_distribute_status } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={`申领部门`} {...formItemLayout}>
              {getFieldDecorator('applyDeptCode', {})(
               <Select 
                 showSearch
                 placeholder={'请选择'}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                 >
                  <Option key="" value="">全部</Option>
                  {
                    deptOption.map((item,index)=> <Option key={index} value={item.id} depttype={item.deptType}>{ item.deptName }</Option>)
                  }
               </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={`状态`} {...formItemLayout}>
              {getFieldDecorator('applyStatus', {
                initialValue: ''
              })(
               <Select 
                 showSearch
                 placeholder={'请选择'}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                 >
                {
                  common_distribute_status.map((item,index)=> <Option key={index} value={item.value}>{ item.label }</Option>)
                }
               </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`类型`} {...formItemLayout}>
              {getFieldDecorator('applyType',{
                initialValue: ''
              })(
               <Select 
                 showSearch
                 placeholder={'请选择'}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                 >
                 {
                   apply_type_options.map((item,index)=> <Option key={index} value={item.value}>{ item.label }</Option>)
                 }
               </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`单据号`} {...formItemLayout}>
              {getFieldDecorator('applyCode',{
                initialValue: ''
              })(
               <Input placeholder='申领单'/>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`发起时间`} {...formItemLayout}>
              {getFieldDecorator('Time')(
               <RangePicker format={'YYYY-MM-DD'}/>
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
class Picking extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      query:{
        queryType: '2'
      },
    }
  }

  queryHandler = (query) => {
    this.setState({ query:query });
    this.refs.table.fetch(query);
  }

  render(){
    const { query } = this.state;
    return (
      <div className='ysynet-main-content'>
        <SearchForm 
          query={this.queryHandler}
          dispatch={this.props.dispatch} 
        />
        <RemoteTable
          bordered
          ref='table'
          query={query}
          url={outStorage.FINDDISTRIBUTE_LIST}
          scroll={{x: '130%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        />
      </div>
    )
  }
}
export default connect(state => state)(Picking);

