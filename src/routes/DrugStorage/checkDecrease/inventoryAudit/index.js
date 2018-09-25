/**
 * @file 药库 - 盘点损益 - 新建盘点
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, DatePicker, Input, Select, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid';
import {common} from '../../../../api/checkDecrease';
import {connect} from 'dva';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

class SearchForm extends PureComponent {
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
        const makingTime = values.makingTime === undefined || values.makingTime === null ? "" : values.makingTime;
        if(makingTime.length > 0) {
          values.checkStartTime = makingTime[0].format('YYYY-MM-DD HH:mm');
          values.checkEndTime = makingTime[1].format('YYYY-MM-DD HH:mm');
        };
        let {filterStatus} = values;
        let {status} = this.props;
        if(filterStatus === "") {
          values.filterStatus = status.map(item=>item.value).filter(item=>item !== "").join(',');
        }
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({
      filterStatus: '3,4,5,6'
    });
  }
  listRender = (list) => {
    return <Select placeholder="请选择">
            {
              list.map(item => {
                return <Option key={item.value} value={item.value}>{item.label}</Option>
              })
            }
           </Select>
  } 
  render() {
    const { getFieldDecorator } = this.props.form;
    let {status, types} = this.props;
    return(
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={'盘点时间'} {...formItemLayout}>
              {getFieldDecorator('makingTime')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'单号'} {...formItemLayout}>
              {getFieldDecorator('checkBillNo')(
                <Input placeholder={'盘点单号'} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'状态'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('filterStatus')(
                this.listRender(status)
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'类型'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('checkBillType')(
                this.listRender(types)
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

class InventoryAudit extends PureComponent {
  state = {
    query: {
      filterStatus: '3,4,5,6'
    },
    display: 'none',
    types: [],
    status: [],
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'check_bill_type'
      },
      callback: (data) => {
        this.setState({
          types: data
        });
      }
    });
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'check_status',
        values: '3,4,5,6'
      },
      callback: (data) => {
        this.setState({
          status: data
        });
      }
    });
  }
  //查询
  queryHandler = query => {
    this.setState({ query });
  }
  render() {
    const {status, types, query} = this.state;
    const columns = [
      {
        title: '盘点单',
        dataIndex: 'checkBillNo',
        width: 280,
        render: (text, record) => {
          return <span><Link to={{ pathname: `/drugStorage/checkDecrease/inventoryAudit/details/${record.checkBillNo}`}}>{text}</Link></span>
        }
      },
      {
        title: '状态',
        dataIndex: 'checkStatusName',
        width: 112,
      },
      {
        title: '盘点类型',
        dataIndex: 'checkBillTypeName',
        width: 168,
      },
      {
        title: '盘点子类型',
        dataIndex: 'checkBillSubTypeName',
        width: 168,
      },
      {
        title: '部门',
        dataIndex: 'checkBillDeptName',
        width: 168,
      },
      {
        title: '盘点责任人',
        dataIndex: 'sheveUserName',
        width: 112,
      },
      {
        title: '制单时间',
        dataIndex: 'createDate',
        width: 224,
      },
      {
        title: '盘点时间',
        dataIndex: 'checkTime',
        width: 224,
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        width: 280,
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchFormWarp
          status={status}
          types={types}
          dispatch={this.props.dispatch} 
          query={this.queryHandler} 
        />
        <RemoteTable
          query={query}
          url={common.CHECKBILL_LIST}
          columns={columns}
          rowKey={'id'}
          ref="table"
          scroll={{x: 1736}}
          style={{marginTop: 20}}
        />
      </div>
    )
  }
}
export default connect()(InventoryAudit);