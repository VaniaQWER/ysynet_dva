import React , {PureComponent} from 'react';

import { Link } from 'react-router-dom'

import { Form, Row, Col, Input, Button, Select, Tooltip } from 'antd';

// import {connect} from 'dva';

import RemoteTable from '../../../components/TableGrid';

import drugStorage from '../../../api/drugStorage/stockInquiry';


const FormItem = Form.Item;
const {Option} = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
 };

const columns = [
{
  title: '通用名',
  dataIndex: 'ctmmGenericName',
  width: 200,
  render: (text, record) => {
    return (
      <span>
        <Link to={{pathname: `/pharmacy/stockInquiry/details/${record.drugCode}`}}>{text}</Link>
      </span>  
    )
  }
}, {
  title: '商品名',
  dataIndex: 'ctmmTradeName',
  width: 200,
}, {
  title: '规格',
  dataIndex: 'ctmmSpecification',
  width: 200,
  className: 'ellipsis',
  render:(text)=>(
    <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
  )
}, {
  title: '生产厂家',
  dataIndex: 'ctmmManufacturerName',
  width: 200,
}, {
  title: '包装规格',
  dataIndex: 'packageSpecification',
  width: 200,
}, {
  title: '单位',
  dataIndex: 'replanUnit',
  width: 200,
}, {
  title: '数量',
  dataIndex: 'currentStoreNum',
  width: 200,
}, {
  title: '剂型',
  dataIndex: 'ctmmDosageFormDesc',
  width: 200,
}, {
  title: '批准文号',
  dataIndex: 'approvalNo',
  width: 200,
},];


class StockInquiry extends PureComponent {
  state = {
    query: {
      paramName: "",
      deptCode: ""
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.paramName = values.paramName === undefined? "" : values.paramName;
      values.deptCode = values.deptCode === undefined? "" : values.deptCode;
      let {query} = this.state;
      query = {...query};
      query.paramName = values.paramName;
      query.deptCode = values.deptCode;
      this.setState({query});
    });
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {query} = this.state;
    return (
      <div className='ysynet-main-content'>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={30}>
            <Col span={8}>
              <FormItem label={`关键字`} {...formItemLayout}>
                {getFieldDecorator('paramName')(
                  <Input placeholder="通用名/商品名/规格/厂家"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`药品类型`} {...formItemLayout}>
                {getFieldDecorator('deptCode')(
                  <Select placeholder="请选择">
                    <Option value="全部">全部</Option>
                    <Option value="抗生素">抗生素</Option>
                    <Option value="营养类">营养类</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} style={{ textAlign: 'right', marginTop: 4}} >
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
            </Col>
          </Row>
        </Form>
        <RemoteTable
          url={drugStorage.queryDrugByDept}
          isJson={true}
          showHeader={true}
          query={query}
          ref="tab"
          bordered={true}
          scroll={{x: '200%'}}
          columns={columns}
          rowKey="drugCode"
        />
      </div>
    )
  }
}

const WrappedStockInquiry = Form.create()(StockInquiry);
export default WrappedStockInquiry;
