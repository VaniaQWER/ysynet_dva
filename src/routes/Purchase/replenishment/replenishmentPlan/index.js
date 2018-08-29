/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-06 23:17:40
 */

/**
 * @file 采购计划 - 补货管理--补货计划
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, DatePicker, Select, Icon, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import RemoteTable from '../../../../components/TableGrid';
import { replenishmentPlan } from '../../../../api/replenishment/replenishmentPlan';
import { connect } from 'dva';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  },
};

class SearchForm extends PureComponent{
  state = {
    display: 'none'
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
        const createDate = values.createDate === undefined ? '' : values.createDate;
        if (createDate.length > 0) {
          values.startTime = createDate[0].format('YYYY-MM-DD');
          values.endTime = createDate[1].format('YYYY-MM-DD');
        }
        console.log('搜索条件：', values);
        this.props.query(values);
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { display, expand } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`计划单号`}>
              {
                getFieldDecorator(`planCode`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`auditStatus`,{
                  initialValue: ''
                })(
                  <Select className={'ysynet-formItem-width'}>
                    <Option value=''>全部</Option>
                    <Option value={1}>草稿</Option>
                    <Option value={2}>待审核</Option>
                    <Option value={3}>驳回</Option>
                    <Option value={4}>完成</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`发起时间`}>
              {
                getFieldDecorator(`createDate`,{
                  initialValue: [moment().subtract(30, 'days'), moment(new Date())]
                })(
                  <RangePicker className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          {/* <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`类型`}>
              {
                getFieldDecorator('type',{
                  initialValue: ''
                })(
                  <Select className={'ysynet-formItem-width'}>
                    <Option key={-1} value=''>全部</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col> */}
          <Col span={expand ? 24: 8} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
             {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
           </a>
         </Col>
        </Row>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);

class ReplenishmentPlan extends PureComponent {
  state = {
    loading: false,
    query: {},
    selectedRowKeys: [],
    selectedRows: []
  }
  queryHandle = query => {
    this.refs.table.fetch(query);
    this.setState({ query });
  }
  delete = () => {
    if (this.state.selectedRows.length > 0) {
      if (this.state.selectedRowKeys) {
        this.props.dispatch({
          type:'replenish/ReplenishDelete',
          payload: {list: this.state.selectedRowKeys, opType: '1'},
          callback:(data)=>{
            console.log(data);
            this.refs.table.fetch();
          }
        })
      }
    } else {
      message.warn("请至少添加一条数据！");
    }
  }
  render() {
    const columns = [
      {
        title: '计划单号',
        dataIndex: 'planCode',
        width: 200,
        render: (text, record) => {
          return <span>
            <Link to={{ pathname: `/purchase/replenishment/replenishmentPlan/detail` }}>{text}</Link>
          </span>
        }
      }, {
        title: '状态',
        dataIndex: 'statusName'
      }, {
        title: '类型',
        dataIndex: 'planTypeName'
      }, {
        title: '发起人',
        dataIndex: 'createUserName'
      }, {
        title: '发起时间',
        dataIndex: 'createDate',
        width: 200
      }, {
        title: '收货地址',
        dataIndex: 'receiveAddress',
        width: 270,
        className: 'ellipsis',
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      }, {
        title: '驳回原因',
        dataIndex: 'remarks'
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <WrapperForm query={this.queryHandle} />
        <div className='ant-row-bottom'>
          <Button type='primary' onClick={() => this.props.history.push({ pathname: `/createReplenishment` })}>新建补货计划</Button>
          <Button type='default' onClick={this.delete} style={{ marginLeft: 8 }}>删除</Button>
        </div>
        <RemoteTable
          query={this.state.query}
          columns={columns}
          scroll={{ x: '100%' }}
          style={{marginTop: 20}}
          ref='table'
          rowKey={'id'}
          url={replenishmentPlan.PLANLIST}
          rowSelection={{
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              console.log('selectCheck：', selectedRowKeys, selectedRows);
              this.setState({ selectedRowKeys, selectedRows })
            }
          }}
        />
      </div>
    )
  }
}
export default connect(state => state)(Form.create()(ReplenishmentPlan));