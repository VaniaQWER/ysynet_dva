/**
 * @file 药库 - 盘点损益 - 盘点审核
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
            <FormItem label={'开始时间'} {...formItemLayout}>
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

class InventoryAudit extends PureComponent {
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
        key: 'odd',
        render: (text, record) => {
          if (record.status === '已审核') {
            return <span><Link to={{ pathname: `/pharmacy/checkDecrease/inventoryAudit/detailsConfirm` }}>{text}</Link></span>
          } else {
            return <span><Link to={{ pathname: `/pharmacy/checkDecrease/inventoryAudit/details` }}>{text}</Link></span>
          }
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '类型',
        dataIndex: 'types',
        key: 'types'
      },
      {
        title: '部门',
        dataIndex: 'dept',
        key: 'dept'
      },
      {
        title: '盈亏总金额',
        dataIndex: 'ykje',
        key: 'ykje',
        render: (text, record, index) => '0.00'
      },
      {
        title: '盘点责任人',
        dataIndex: 'oddUser',
        key: 'oddUser'
      },
      {
        title: '制单时间',
        dataIndex: 'makingTime',
        key: 'makingTime'
      },
      {
        title: '盘点时间',
        dataIndex: 'startTime',
        key: 'startTime'
      },{
        title: '审核人',
        dataIndex: 'auditor',
        key: 'auditor',
        render: () => '王力宏'
      },{
        title: '审核时间',
        dataIndex: 'auditorTime',
        key: 'auditorTime',
        render: () => '2018-7-25 21:45'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      }
    ];
    const dataSource = [
      {
        key: '1',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '2',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '3',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '4',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '5',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '6',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '7',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '8',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '9',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '10',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '11',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '12',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '13',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '14',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '15',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '16',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '17',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '18',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '19',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '20',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '21',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '22',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '23',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '24',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '25',
        odd: 'KP0022118070000383',
        status: '待审核',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '26',
        odd: 'KP00221180700002DN',
        status: '待审核',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      },
      {
        key: '27',
        odd: 'KP00221180700001CW',
        status: '已审核',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是盘点审核列表'
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchFormWarp />
        <Table
          loading={ this.state.loading}
          scroll={{x: '150%'}}
          bordered
          columns={columns}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
          dataSource={dataSource}
        />
      </div>
    )
  }
}
export default InventoryAudit;