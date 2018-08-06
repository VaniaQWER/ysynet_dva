import React, { PureComponent } from 'react';
import { Form, Row, Col, DatePicker, Input, Select, Button, Icon, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
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
        const makingTime = values.makingTime === undefined || values.makingTime === null ? "" : values.makingTime;
        if (makingTime.length > 0) {
          values.startMakingTime = makingTime[0].format('YYYY-MM-DD HH:mm');
          values.endMakingTime = makingTime[1].format('YYYY-MM-DD HH:mm');
        }
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
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={'单据号'} {...formItemLayout}>
              {getFieldDecorator('odd')(
                <Input placeholder={'请输入'} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'原因'} {...formItemLayout}>
              {getFieldDecorator('remark')(
                <Input placeholder={'请输入'} />
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
                  <Option value={'00'}>待审核</Option>
                  <Option value={'01'}>待召回</Option>
                  <Option value={'02'}>已完成</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'发起时间'} {...formItemLayout}>
              {getFieldDecorator('makingTime')(
                <RangePicker showTime={{ format: 'HH:mm' }} format={'YYYY-MM-DD HH:mm'} style={{ width: 313 }} />
              )}
            </FormItem>
          </Col>


          <Col span={8}>
            <FormItem label={'供应商'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('types', {
                initialValue: ''
              })(
                <Input placeholder={'请输入'} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={8} style={{ textAlign: 'right', marginTop: 4 }}>
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

class RecallAndLocked extends PureComponent {
  state = {
    query: {},
    loading: false,
    visible: false,
    selected: [],
    types2: '1',
    display: 'none'
  }
  queryHandler = query => {
    this.setState({ query });
  }
  delete = () =>{
    const selected = this.state.selected;
    if (selected.length === 0) {
      message.warn('请至少选择一条数据')
    } else {
      this.setState({ loading: true });
      message.warn('删除成功！');
      setTimeout(()=>{this.setState({loading: false, selected: []});}, 500);
    }
  }
  locked = () =>{
    const selected = this.state.selected;
    if (selected.length === 0) {
      message.warn('请至少选择一条数据')
    } else {
      this.setState({ loading: true });
      message.warn('锁定成功！');
      setTimeout(()=>{this.setState({loading: false, selected: []});}, 500);
    }
  }
  render() {
    const columns = [
      {
        title: '召回及锁定单号',
        dataIndex: 'medicinalCode',
        width:150,
        render: (text, record) => 
        <span>
          <Link to={{pathname: `/drugStorage/outStorage/recallAndLocked/details`}}>{text}</Link>
        </span>
       },
      {
        title: '状态',
        width:100,
        dataIndex: 'spec21',
        render:(text)=>{
          if (text === '00') {
            return '待审核'
          } else if (text === '01') {
            return '待召回'
          } else {
            return '已完成'
          }
        }
       },
      {
        title: '供应商',
        width:100,
        dataIndex: 'custodian',
        render: (text, record, index) => '国药控股集团'
      },
      {
        title: '发起人',
        width:100,
        dataIndex: 'bDept',
        render: (text, record, index) => 'wang' + index
      },
      {
       title: '发起时间',
       width:150,
       dataIndex: 'useDept',
       render: (text, record, index) => '2018-7-25 21:47'
      },
      {
        title: '审核人',
        width:100,
        dataIndex: 'bDepts',
        render: (text, record, index) => 'li' + index
      },
      {
       title: '审核时间',
       width:150,
       dataIndex: 'useDepts',
       render: (text, record, index) => '2018-7-25 21:47'
      },
      {
        title: '原因',
        width:150,
        dataIndex: 'remark',
        render: (text, record, index) => '2018-7-25 21:47'
       }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchFormWarp query={this.queryHandler} />
        <div>
          <Button type='primary'><Link to={{pathname:`/drugStorage/outStorage/recallAndLocked/add`}}>新建召回</Link></Button>
          <Button style={{ marginLeft: 10 }} onClick={this.locked}>新建锁定</Button>
          <Button style={{ marginLeft: 10 }} onClick={this.delete}>删除</Button>
        </div>
        <Table
          loading={ this.state.loading}
          columns={columns}
          dataSource={createData()}
          style={{marginTop: 20}}
          bordered
          rowSelection={{
            selectedRowKeys: this.state.selected,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
            }
          }}
        />
      </div>
    )
  }
}
export default RecallAndLocked;