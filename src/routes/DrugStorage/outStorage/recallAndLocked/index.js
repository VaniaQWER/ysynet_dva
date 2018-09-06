import React, { PureComponent } from 'react';
import { Form, Row, Col, DatePicker, Input, Select, Button, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid';
import { outStorage } from '../../../../api/drugStorage/outStorage';
import { connect } from 'dva';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

class SearchForm extends PureComponent {
  state = {
    display: 'none',
    recall_status_options: []
  }
  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none',
      expand: !expand
    })
  }
  componentWillMount = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type: 'recall_status' },
      callback: (data) =>{
        this.setState({ recall_status_options: data });
      }
    });
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const makingTime = values.makingTime === undefined || values.makingTime === null ? "" : values.makingTime;
        if (makingTime.length > 0) {
          values.startTime = makingTime[0].format('YYYY-MM-DD HH:mm');
          values.endTime = makingTime[1].format('YYYY-MM-DD HH:mm');
        }
        delete values.makingTime;
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
    const { recall_status_options } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={'单据号'} {...formItemLayout}>
              {getFieldDecorator('recallNo',{
                initialValue: ''
              })(
                <Input placeholder={'请输入'} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'原因'} {...formItemLayout}>
              {getFieldDecorator('remarks',{
                initialValue: ''
              })(
                <Input placeholder={'请输入'} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'状态'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('recallStatus', {
                initialValue: ''
              })(
                <Select
                  showSearch
                  placeholder={'请选择'}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                  {
                     recall_status_options.map((item,index)=> <Option key={index} value={item.value}>{item.label}</Option>)
                  }
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
              {getFieldDecorator('supplierName', {
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
    selectedRows: [],
    display: 'none'
  }
  queryHandler = query => {
    this.setState({ query });
    // this.refs.table.fetch(query);
  }
  delete = () =>{
    const { selectedRows, query } = this.state;
    if (selectedRows.length === 0) {
      return message.warn('请选择一条数据')
    }
    if(selectedRows.length > 1){
      return message.warning('只能选择一条数据');
    }
    let { recallStatus } = selectedRows[0]
    if(recallStatus !== 3) {
      return message.warning('只能删除已驳回状态的单据，请重新选择');
    }
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'outStorage/deleteRecallPlan',
      payload: { recallNo: selectedRows[0].recallNo },
      callback: () =>{
        message.success('删除成功');
        this.setState({ loading: false });
        this.refs.table.fetch({ ...query });
      }
    })
    
  }
  render() {
    const { query, loading } = this.state;
    const columns = [
      {
        title: '召回及锁定单号',
        dataIndex: 'recallNo',
        width: 180,
        render: (text, record) => 
        <span>
          <Link to={{pathname: `/drugStorage/outStorage/recallAndLocked/details/${text}/${record.recallStatus}`}}>{text}</Link>
        </span>
       },
      {
        title: '状态',
        width:100,
        dataIndex: 'recallStatusName',
      },
      {
        title: '类型',
        width: 100,
        dataIndex: 'recallTypeName',
      },
      {
        title: '供应商',
        width:100,
        dataIndex: 'supplierName',
      },
      {
        title: '发起人',
        width:100,
        dataIndex: 'createUserName',
      },
      {
       title: '发起时间',
       width:150,
       dataIndex: 'createDate',
      },
      {
        title: '审核人',
        width:100,
        dataIndex: 'updateUserName',
      },
      {
       title: '审核时间',
       width:150,
       dataIndex: 'updateDate',
      },
      {
        title: '原因',
        width:150,
        dataIndex: 'remarks',
       }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchFormWarp 
          query={this.queryHandler} 
          dispatch={this.props.dispatch}
        />
        <div>
          <Button type='primary'><Link to={{pathname:`/AddNewReCallOrLocked/recall`}}>新建召回</Link></Button>
          <Button style={{ marginLeft: 10 }}><Link to={{pathname:`/AddNewReCallOrLocked/locked`}}>新建锁定</Link></Button>
          <Button style={{ marginLeft: 10 }} onClick={this.delete} loading={loading}>删除</Button>
        </div>
        <RemoteTable
          ref='table'
          query={query}
          bordered
          url={outStorage.ROOMRECALL_LIST}
          columns={columns}
          rowKey={'id'}
          scroll={{ x: '130%' }}
          style={{marginTop: 20}}
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
export default connect(state => state)(RecallAndLocked);