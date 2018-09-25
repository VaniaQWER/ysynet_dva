/*
 * @Author: gaofengjiao  货位调整 
 * @Date: 2018-08-06 16:18:15 
* @Last Modified time: 16:18:15 
 */
import React, { PureComponent } from 'react';
import {DatePicker, Form, Input, Row, Col, Button, message } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid/index';
import { Link } from 'react-router-dom';
import goodsAdjust from '../../../../api/drugStorage/goodsAdjust';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
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
    const columns = [
      {
        title: '移库单号',
        dataIndex: 'locAdjustNo',
        width: 280,
        render: (text,record) =>{
          return <span>
            <Link to={{pathname: `/drugStorage/goodsAdjust/adjust/detail/${text}`}}>{text}</Link>
          </span>
          }
        },
      {
        title: '状态',
        dataIndex: 'statusName',
        width: 112,
      },
      {
        title: '部门',
        dataIndex: 'deptName',
        width: 168,
      },
      {
        title: '移库人',
        dataIndex: 'createName',
        width: 112,
      },
      {
        title: '移库时间',
        dataIndex: 'createDate',
        width: 224,
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <div className='ant-row-bottom'>
          <Button type='primary' onClick={()=>this.props.history.push({ pathname: `/addGoodsAdjust` })}>新建调整</Button>
        </div>
        <RemoteTable
          query={this.state.query}
          url={goodsAdjust.goodsList}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'locAdjustNo'}
          style={{marginTop: 24}}
        />
      </div>
    )
  }
}
export default Putaway;

/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {

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
      this.props.query(values);
    });
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={`移库单号`} {...formItemLayout}>
              {getFieldDecorator('locAdjustNo')(
                <Input placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
        
          <Col span={8}>
            <FormItem label={`移库时间`} {...formItemLayout}>
              {getFieldDecorator('time')(
                <RangePicker/>
              )}
            </FormItem>
          </Col>
          
          <Col span={8} style={{ float:'right',textAlign: 'right', marginTop: 4}} >
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    )
 }
}
const SearchForm = Form.create()(SearchFormWrapper); 