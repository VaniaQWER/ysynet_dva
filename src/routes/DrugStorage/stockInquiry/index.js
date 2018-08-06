import React , {PureComponent} from 'react';

import { Link } from 'react-router-dom'

import { Form, Row, Col, Input, Button, Select, Table,Tooltip } from 'antd';

import {createData} from '../../../common/data.js';

const FormItem = Form.Item;
const {Option} = Select;

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
  width: 200,
}, {
  title: '规格',
  dataIndex: 'spec',
  width: 200,
  className: 'ellipsis',
  render:(text)=>(
    <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
  )
}, {
  title: '生产厂家',
  dataIndex: 'productCompany',
  width: 200,
}, {
  title: '包装规格',
  dataIndex: 'packingSpec',
  width: 200,
}, {
  title: '单位',
  dataIndex: 'unit',
  width: 200,
}, {
  title: '数量',
  dataIndex: 'num',
  width: 200,
}, {
  title: '剂型',
  dataIndex: 'fmodal',
  width: 200,
}, {
  title: '批准文号',
  dataIndex: 'approvalNo',
  width: 200,
},];


class StockInquiry extends PureComponent {
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='ysynet-main-content'>
        <Form onSubmit={this.handleSearch}>
          <Row>
            <Col span={8}>
              <FormItem label={`关键字`} {...formItemLayout}>
                {getFieldDecorator('keyword')(
                  <Input placeholder="通用名/商品名/规格/厂家"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={`药品类型`} {...formItemLayout}>
                {getFieldDecorator('drugType', {
                  initialValue: "全部"
                })(
                  <Select>
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
