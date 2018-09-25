/*
 * @Author: yuwei  新建入库 /newLibrary
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import {Form, Row, Col, Button, Icon, Select , Input , DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid/index';
import {formItemLayout} from '../../../../utils/commonStyles';
import {wareHouse} from '../../../../api/pharmacy/wareHouse';
import {connect} from 'dva';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
  {
   title: '入库单',
   dataIndex: 'inStoreCode',
   width: 280,
   render:(text, record)=>(<Link to={{pathname: `/pharmacy/wareHouse/newLibrary/details/rCode=${text}&dCode=${record.dirstrbuteDeptCode}`}}>{text}</Link>)
  },
  {
    title: '出库单',
    width: 280,
    dataIndex: 'orderCode',
  },
  {
    title: '申领单',
    width: 280,
    dataIndex: 'applyCode',
  },
  {
    title: '入库分类',
    width: 112,
    dataIndex: 'inStoreTypeName',
  },
  {
    title: '配货部门',
    dataIndex: 'deptName',
    width: 168,
  },
  {
   title: '入库时间',
   width: 224,
   dataIndex: 'createDate',
  },
  {
    title: '备注',
    width: 280,
    dataIndex: 'remarks',
  }
];

class NewLibrary extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      query:{},
    }
  }
  queryHandler = (query) => {
    this.setState({ query: query })
  }
  render(){
    let {query} = this.state;
    return (
        <div className='ysynet-main-content'>
          <SearchForm dispatch={this.props.dispatch} query={this.queryHandler} />
          <RemoteTable
            isJson
            query={query}
            url={wareHouse.FIND_STORE_PAGE}
            scroll={{x: 1624}}
            columns={columns}
            rowKey={'id'}
            style={{marginTop: 20}}
          /> 
        </div>
    )
  }
}
export default connect(state=>state)(NewLibrary);
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
  state = {
    display: 'none',
    type: []
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
        values.startTime = time[0].format('YYYY-MM-DD');
        values.endTime = time[1].format('YYYY-MM-DD');
      }else {
        values.startTime = '';
        values.endTime = '';
      };
      delete values.time;
      console.log(values);
      
      this.props.query(values);
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'in_store_type'
      },
      callback: (data) => {
        this.setState({type: data});
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }

  render() {
    let {display, type} = this.state;
    const { getFieldDecorator } = this.props.form;
    type = type.map(item=>{
      return <Option key={item.value} value={item.value}>{item.label}</Option>
    })
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={`单号`} {...formItemLayout}>
              {getFieldDecorator('inStoreCode', {})(
                <Input placeholder='入库单/配送单/订单号'/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={`入库时间`} {...formItemLayout}>
              {getFieldDecorator('time', {})(
                <RangePicker/>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`入库分类`} {...formItemLayout}>
              {getFieldDecorator('inStoreType')(
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