/**
 * @file 药库 - 盘点损益 - 盘后调整
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, DatePicker, Input, Select, Button, Icon, Table } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

class SearchForm extends PureComponent {
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
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.startTime = values.makingTime[0].format('YYYY-MM-DD HH:mm');
        values.endTime = values.makingTime[1].format('YYYY-MM-DD HH:mm');
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = { labelCol: {span: 4}, wrapperCol: {span: 18} };
    return(
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem label={'制单时间'} {...formItemLayout}>
              {getFieldDecorator('makingTime')(
                <RangePicker showTime={{ format: 'HH:mm' }} format={'YYYY-MM-DD HH:mm'} style={{ width: 313 }} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'单号'} {...formItemLayout}>
              {getFieldDecorator('odd')(
                <Input placeholder={'盘点单号'} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'状态'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('status', {
                initialValue: ''
              })(
                <Select>
                  <Option value={''}>全部</Option>
                  <Option value={'01'}>待审核</Option>
                  <Option value={'02'}>已审核</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'类型'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('types', {
                initialValue: ''
              })(
                <Select>
                  <Option value={''}>全部</Option>
                  <Option value={'00'}>明盘全盘</Option>
                  <Option value={'01'}>暗盘动销盘</Option>
                  <Option value={'02'}>明盘动盘</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={8} style={{ textAlign: 'right', marginTop: 4 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 30 }} onClick={this.handleReset}>重置</Button>
            <a style={{ marginLeft: 30, fontSize: 14 }} onClick={this.toggle}>
              {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchFormWarp = Form.create()(SearchForm);

class AfterAdjustment extends PureComponent{
  state = {
    query: {},
    loading: false
  }
  queryHandler = query => {
    this.setState({ query });
  }
  render() {
    const columns = [
      {
        title: '盘点单',
        dataIndex: 'odd',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '类型',
        dataIndex: 'types',
      },
      {
        title: '部门',
        dataIndex: 'dept',
      },
      {
        title: '制单人',
        dataIndex: 'oddUser',
      },
      {
        title: '制单时间',
        dataIndex: 'makingTime',
      },
      {
        title: '起始时间',
        dataIndex: 'startTime',
      },{
        title: '审核人',
        dataIndex: 'auditor',
      },{
        title: '审核时间',
        dataIndex: 'auditorTime',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        dataIndex: 'RN',
        render: (text, record) =>
          <span>
            <Link to={{ pathname: `/checkDecrease/newInventory/add/${record.oddGuid}` }}>详情</Link>
          </span>
      }
    ];
    return (
      <div>
        <SearchFormWarp />
        <Table
          loading={ this.state.loading}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'oddGuid'}
          style={{marginTop: 20}}
        />
      </div>
    )
  }
}
export default AfterAdjustment;