/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-06 23:17:40
 */

/**
 * @file 采购计划 - 统计分析--损益分析
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, DatePicker, Icon, Select } from 'antd';
import { Link } from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid';
import { connect } from 'dva';
import {statisticAnalysis} from '../../../../api/purchase/purchase';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const {Option} = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  },
};


class SearchForm extends PureComponent{
  toggle = () => {
    this.props.formProps.dispatch({
      type:'base/setShowHide'
    });
  }
  componentDidMount() {
    let { queryConditons } = this.props.formProps.base;
    //找出表单的name 然后set
    console.log(queryConditons);
    
    let values = this.props.form.getFieldsValue();
    values = Object.getOwnPropertyNames(values);
    let value = {};
    values.map(keyItem => {
      value[keyItem] = queryConditons[keyItem];
      return keyItem;
    });
    this.props.form.setFieldsValue(value);
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const closeDate = values.closeDate === undefined ? '' : values.closeDate;
        if (closeDate.length > 0) {
          values.settleStartTime = closeDate[0].format('YYYY-MM-DD');
          values.settleEndTime = closeDate[1].format('YYYY-MM-DD');
        }else {
          values.settleStartTime = '';
          values.settleEndTime = '';
        };
        this.props.formProps.dispatch({
          type:'base/setQueryConditions',
          payload: values
        });
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.formProps.dispatch({
      type:'base/clearQueryConditions'
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {display} = this.props.formProps.base;
    const expand = display === 'block';
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`部门`}>
              {
                getFieldDecorator(`supplierName`)(
                  <Select 
                    placeholder="请选择"
                    style={{
                      width: '100%'
                    }}
                  >
                    <Option key="全部" value="">全部</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`损益单号`}>
              {
                getFieldDecorator(`settleBillNo`)(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`损益类型`}>
              {
                getFieldDecorator(`invoiceParam`)(
                  <Select
                    placeholder="请选择"
                    style={{
                      width: '100%'
                    }}
                  >
                    <Option key="全部" value="">全部</Option>
                    <Option key="0" value="0">损</Option>
                    <Option key="1" value="1">益</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`生成时间`}>
              {
                getFieldDecorator(`closeDate`)(
                  <RangePicker />
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{float: 'right', textAlign: 'right', marginTop: 4}} >
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

class ProfitLoss extends PureComponent {
  state = {
    query: {},
  }
  _tableChange = values => {
    this.props.dispatch({
      type:'base/setQueryConditions',
      payload: values
    });
  }
  render() {
    const {match} = this.props;
    const columns = [
      {
        title: '损益单号',
        dataIndex: 'invoiceNo',
        width: 168,
        render: (text, record) => {
          return <span>
                  <Link to={{ pathname: `${match.path}/details/${text}`}}>{text}</Link>
                 </span>
        }
      }, {
        title: '部门',
        dataIndex: 'invoiceCode',
        width: 168,
      }, {
        title: '账面总库存',
        dataIndex: 'settleBillNo',
        width: 112,
      }, {
        title: '实际总库存',
        dataIndex: 'invoiceTime',
        width: 112,
      }, {
        title: '损益总数量',
        dataIndex: 'invoiceAmount',
        width: 168
      }, {
        title: '实际总损益金额(元)',
        dataIndex: 'supplierName',
        width: 168,
      }
    ];
    let query = this.props.base.queryConditons;
    query = {
      ...query,
    }
    delete query.invoiceDate;
    delete query.closeDate;
    delete query.key;
    return (
      <div className='ysynet-main-content'>
        <WrapperForm
          formProps={{...this.props}}
        />
        <RemoteTable
          onChange={this._tableChange}
          query={query}
          scroll={{x: 896}}
          isJson
          columns={columns}
          style={{marginTop: 20}}
          ref='table'
          rowKey={'id'}
          url={statisticAnalysis.INVOICE_LIST}
        />
      </div>
    )
  }
}
export default connect(state => state)(Form.create()(ProfitLoss));