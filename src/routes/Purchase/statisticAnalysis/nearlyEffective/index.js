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
import { Form, Row, Col, Button, Input, Icon, Select, Tooltip } from 'antd';
import RemoteTable from '../../../../components/TableGrid';
import { connect } from 'dva';
import {statisticAnalysis} from '../../../../api/purchase/purchase';
const FormItem = Form.Item;
const { Option } = Select;
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
  componentDidMount() {
    
  }
  toggle = () => {
    this.props.formProps.dispatch({
      type:'base/setShowHide'
    });
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props._handlQuery(values);
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {display} = this.props.formProps.base;
    const expand = display === 'block';
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`供应商`}>
              {
                getFieldDecorator(`supplierName`)(
                  <Input placeholder='请输入' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={'商品名/通用名'}>
              {
                getFieldDecorator(`settleBillNo`)(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`临效期选择`}>
              {
                getFieldDecorator(`invoiceParam`, {
                  initialValue: "30"
                })(
                  <Select 
                    placeholder="请选择"
                    style={{
                      width: '100%'
                    }}
                  >
                    <Option value={"30"} key={"30"}>30</Option>
                    <Option value={"60"} key={"60"}>60</Option>
                    <Option value={"90"} key={"90"}>90</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`部门`}>
              {
                getFieldDecorator(`invoiceDate`)(
                  <Select 
                    placeholder="请选择"
                    style={{
                      width: '100%'
                    }}
                  >
                    <Option value={""} key={""}>全部</Option>
                  </Select>
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

class NearlyEffective extends PureComponent {
  state = {
    query: {
      invoiceParam: 30
    },
  }
  handlQuery = (query) => {
    this.setState({query});
  }
  export = () => {
    
  }
  render() {
    const columns = [
      {
        title: '部门',
        dataIndex: 'invoiceNo',
        width: 168,
      }, {
        title: '临效期天数',
        dataIndex: 'invoiceCode',
        width: 168,
      }, {
        title: '货位',
        dataIndex: 'settleBillNo',
        width: 168,
      }, {
        title: '货位类型',
        dataIndex: 'invoiceTime',
        width: 168,
      }, {
        title: '库存',
        dataIndex: 'invoiceAmount',
        width: 112
      }, {
        title: '通用名',
        dataIndex: 'tym',
        width: 224
      }, {
        title: '商品名',
        dataIndex: 'spm',
        width: 168
      }, {
        title: '规格',
        dataIndex: 'gg',
        width: 168,
      }, {
        title: '生产厂家',
        dataIndex: 'sccj',
        width: 224,
        className:'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      }, {
        title: '单位',
        dataIndex: 'unit',
        width: 112,
      }, {
        title: '生产批号',
        dataIndex: 'lot',
        width: 168,
      }, {
        title: '生产日期',
        dataIndex: 'scrq',
        width: 168,
      }, {
        title: '有效期止',
        dataIndex: 'yxqz',
        width: 168,
      }, {
        title: '包装规格',
        dataIndex: 'bzgg',
        width: 168,
      }, {
        title: '剂型',
        dataIndex: 'jx',
        width: 168,
      }, {
        title: '供应商',
        dataIndex: 'gys',
        width: 168,
      }, {
        title: '药品编号',
        dataIndex: 'ypbm',
        width: 168,
      }, {
        title: '批准文号',
        dataIndex: 'pzwh',
        width: 168,
      }
    ];
    const {query} = this.state;
    return (
      <div className='ysynet-main-content'>
        <WrapperForm
          formProps={{...this.props}}
          _handlQuery={this.handlQuery}
        />
        <div>
          <Button onClick={this.export}>导出</Button>
        </div>
        <RemoteTable
          onChange={this._tableChange}
          query={query}
          isJson
          columns={columns}
          scroll={{x: 3024}}
          style={{marginTop: 20}}
          ref='table'
          rowKey={'id'}
          url={statisticAnalysis.INVOICE_LIST}
        />
      </div>
    )
  }
}
export default connect(state => state)(Form.create()(NearlyEffective));