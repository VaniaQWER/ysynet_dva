import React , {PureComponent} from 'react';

import { Link } from 'react-router-dom'

import { Form, Row, Col, Input, Button, Icon, Table,Tooltip } from 'antd';

import {createData} from '../../../common/data.js';

const FormItem = Form.Item;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
 };

let dataSource  = createData();

dataSource = dataSource.map((item) => {
  return {
    ...item,
    key: item.id,
    name: item.productName,
    packingUnit: '瓶',
    pharmacyInventory: 111,
    floorInventory: 222,
    dateOfManu: '2017-8-23',
    validUntil: '2018-8-23',
    supplier: '国药药业集团'
  }
})

const columns = [
{
  title: '通用名',
  dataIndex: 'name',
  key: 'name',
  width: 200,
  render: (text, record) => {
    return (
      <span>
        <Link to={{pathname: `/drugStorage/stockInquiry/details`}}>{text}</Link>
      </span>  
    )
  }
}, {
  title: '商品名',
  dataIndex: 'productName',
  key: 'productName',
}, {
  title: '规格',
  dataIndex: 'spec',
  key: 'spec',
  className: 'ellipsis',
  render:(text)=>(
    <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
  )
}, {
  title: '剂型',
  dataIndex: 'fmodal',
  key: 'fmodal',
}, {
  title: '包装单位',
  dataIndex: 'packingUnit',
  key: 'packingUnit',
}, {
  title: '生产厂家',
  dataIndex: 'productCompany',
  key: 'productCompany',
}, {
  title: '批准文号',
  dataIndex: 'approvalNo',
  key: 'approvalNo',
}, {
  title: '药库库存',
  dataIndex: 'pharmacyInventory',
  key: 'pharmacyInventory',
}, {
  title: '全院库存',
  dataIndex: 'floorInventory',
  key: 'floorInventory',
}, {
  title: '生产批号',
  dataIndex: 'medicinalCode',
  key: 'medicinalCode',
}, {
  title: '生产日期',
  dataIndex: 'dateOfManu',
  key: 'dateOfManu',
}, {
  title: '有效期至',
  dataIndex: 'validUntil',
  key: 'validUntil',
}, {
  title: '供应商',
  dataIndex: 'supplier',
  key: 'supplier',
}];


class StockInquiry extends PureComponent {
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
      this.props.query(values);
    });
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { display } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='ysynet-main-content'>
        <Form onSubmit={this.handleSearch}>
          <Row>
            <Col span={8}>
              <FormItem label={`名称`} {...formItemLayout}>
                {getFieldDecorator('assetCode', {})(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`规格`} {...formItemLayout}>
                {getFieldDecorator('specification', {})(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} style={{display: display}}>
              <FormItem label={`剂型`} {...formItemLayout}>
                {getFieldDecorator('dosageForm')(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} style={{display: display}}>
              <FormItem label={`生产厂家`} {...formItemLayout}>
                {getFieldDecorator('manufacturer')(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} style={{display: display}}>
              <FormItem label={`供应商`} {...formItemLayout}>
                {getFieldDecorator('supplier')(
                  <Input/> 
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
        <Table
          bordered={true}
          scroll={{x: '200%'}}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            showQuickJumper: true,
            showSizeChanger : true,
            showTotal: (total) => {
              return `总共${total}个项目`;
            }
          }}
        />
      </div>
    )
  }
}

const WrappedStockInquiry = Form.create()(StockInquiry);
export default WrappedStockInquiry;
