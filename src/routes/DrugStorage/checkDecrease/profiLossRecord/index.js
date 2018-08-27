/**
 * @file 药库 - 盘点损益 - 损益记录
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
        values.startTime = values.generatedTime[0].format('YYYY-MM-DD HH:mm');
        values.endTime = values.generatedTime[1].format('YYYY-MM-DD HH:mm');
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
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={'生成时间'} {...formItemLayout}>
              {getFieldDecorator('generatedTime')(
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
          <Col span={16} style={{ display: this.state.display }}>
          </Col>
          <Col span={8} style={{ textAlign: 'right', marginBottom: 10 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
            <a style={{ marginLeft: 8, fontSize: 14 }} onClick={this.toggle}>
              {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchFormWarp = Form.create()(SearchForm);
class ProfiLossRecord extends PureComponent {
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
        title: '损益单',
        dataIndex: 'syNo',
        key: 'syNo',
        render: (text, record) =>
          <span>
            <Link to={{ pathname: `/drugStorage/checkDecrease/profiLossRecord/details` }}>{text}</Link>
          </span>
      },
      {
        title: '盘点单',
        dataIndex: 'odd',
        key: 'odd'
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
        title: '生成人',
        dataIndex: 'generatedUser',
        key: 'generatedUser'
      },
      {
        title: '生成时间',
        dataIndex: 'generatedTime',
        key: 'generatedTime'
      }
    ];
    const dataSource = [
      {
        key: '1',
        syNo: 'SY0022118070000383',
        odd: 'KP0022118070000383',
        types: '明盘全盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '2',
        syNo: 'SY00221180700002DN',
        odd: 'KP00221180700002DN',
        types: '暗盘动销盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '3',
        syNo: 'SY00221180700001CW',
        odd: 'KP00221180700001CW',
        types: '明盘动盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '4',
        syNo: 'SY0022118070000383',
        odd: 'KP0022118070000383',
        types: '明盘全盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '5',
        syNo: 'SY00221180700002DN',
        odd: 'KP00221180700002DN',
        types: '暗盘动销盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '6',
        syNo: 'SY00221180700001CW',
        odd: 'KP00221180700001CW',
        types: '明盘动盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '7',
        syNo: 'SY0022118070000383',
        odd: 'KP0022118070000383',
        types: '明盘全盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '8',
        syNo: 'SY00221180700002DN',
        odd: 'KP00221180700002DN',
        types: '暗盘动销盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '9',
        syNo: 'SY00221180700001CW',
        odd: 'KP00221180700001CW',
        types: '明盘动盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '10',
        syNo: 'SY0022118070000383',
        odd: 'KP0022118070000383',
        types: '明盘全盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '11',
        syNo: 'SY00221180700002DN',
        odd: 'KP00221180700002DN',
        types: '暗盘动销盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '12',
        syNo: 'SY00221180700001CW',
        odd: 'KP00221180700001CW',
        types: '明盘动盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '13',
        syNo: 'SY0022118070000383',
        odd: 'KP0022118070000383',
        types: '明盘全盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '14',
        syNo: 'SY00221180700002DN',
        odd: 'KP00221180700002DN',
        types: '暗盘动销盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '15',
        syNo: 'SY00221180700001CW',
        odd: 'KP00221180700001CW',
        types: '明盘动盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '16',
        syNo: 'SY0022118070000383',
        odd: 'KP0022118070000383',
        types: '明盘全盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '17',
        syNo: 'SY00221180700002DN',
        odd: 'KP00221180700002DN',
        types: '暗盘动销盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '18',
        syNo: 'SY00221180700001CW',
        odd: 'KP00221180700001CW',
        types: '明盘动盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '19',
        syNo: 'SY0022118070000383',
        odd: 'KP0022118070000383',
        types: '明盘全盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '20',
        syNo: 'SY00221180700002DN',
        odd: 'KP00221180700002DN',
        types: '暗盘动销盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '21',
        syNo: 'SY00221180700001CW',
        odd: 'KP00221180700001CW',
        types: '明盘动盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '22',
        syNo: 'SY0022118070000383',
        odd: 'KP0022118070000383',
        types: '明盘全盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '23',
        syNo: 'SY00221180700002DN',
        odd: 'KP00221180700002DN',
        types: '暗盘动销盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      },
      {
        key: '24',
        syNo: 'SY00221180700001CW',
        odd: 'KP00221180700001CW',
        types: '明盘动盘',
        dept: '药库',
        generatedUser: '张三三',
        generatedTime: '2018-7-24 20:06'
      }
    ]
    return (
      <div className='ysynet-main-content'>
        <SearchFormWarp />
        <Table
          loading={ this.state.loading}
          scroll={{x: '100%'}}
          columns={columns}
          bordered
          dataSource={dataSource}
          pagination={{
            size: 'small',
            showQuickJumper: true,
            showSizeChanger: true
          }}
        />
      </div>
    )
  }
}
export default ProfiLossRecord;