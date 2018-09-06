/*
 * @Author: yuwei  召回及锁定审核 /recallAndLockedCheck
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Icon, Select , message , Input ,DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid';
import { outStorage } from '../../../../api/drugStorage/outStorage';
import { connect } from 'dva';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
  {
    title: '召回/锁定单号',
    dataIndex: 'recallNo',
    width:150,
    render: (text, record) => 
    <span>
      <Link to={{pathname: `/drugStorage/outStorage/recallAndLockedCheck/details/${text}/${record.recallStatus}`}}>{text}</Link>
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
    dataIndex: 'remarks',
    width:150
  }
];
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
  state = {
    display: 'none',
    recall_status_options: []
  }
  componentWillMount = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type: 'recall_status' },
      callback: (data) =>{
        let res = data.filter(item => item.value === '1' || item.value === '2' || item.value === '4');
        this.props.defaultQuery({ recallStatus: res[0].value });
        this.setState({ recall_status_options: res });
      }
    });
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
            <FormItem label={'状态'} {...formItemLayout}>
              {getFieldDecorator('recallStatus', {
                initialValue: recall_status_options.length ? recall_status_options[0].value: null
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
          <Col span={8} style={{ display: this.state.display }}>
            <FormItem label={'原因'} {...formItemLayout}>
              {getFieldDecorator('remarks',{
                initialValue: ''
              })(
                <Input placeholder={'请输入'} />
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
const SearchForm = Form.create()(SearchFormWrapper);
class RecallAndLockedCheck extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      query:{},
      selected: [],
      selectedRows: []
    }
  }
  defaultQuery = (query) =>{
    this.setState({ query: query });
  }
  queryHandler = (query) => {
    this.setState({ query:query });

  }
  bitchPass = () =>{
    let { selectedRows, query } = this.state;
    if(selectedRows.length === 0){
      return message.warning('请至少选中一条数据');
    }
    let detailList = [];
    selectedRows.map(item => detailList.push(item.recallNo));
    this.props.dispatch({
      type: 'outStorage/batchAudit',
      payload: { ...detailList },
      callback: () =>{
        message.success('批量处理成功');
        this.refs.table.fetch(query);
      }
    })

  }
  render(){
    const { query } = this.state;
    return (
      <div className='ysynet-main-content'>
        <SearchForm
          defaultQuery={(query)=>this.defaultQuery(query)}
          query={this.queryHandler} 
          dispatch={this.props.dispatch}  
        />
        <Row>
          <Button type='primary' className='button-gap'onClick={this.bitchPass} > 批量通过</Button>
        </Row>
        {
          query.recallStatus 
          &&
          <RemoteTable
            ref='table'
            query={query}
            bordered
            url={outStorage.ROOMRECALL_LIST}
            scroll={{x: '100%'}}
            columns={columns}
            rowKey={'id'}
            style={{marginTop: 20}}
            rowSelection={{
              selectedRowKeys: this.state.selected,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
              }
            }}
          /> 
        }
      </div>
    )
  }
}
export default  connect(state => state)(RecallAndLockedCheck) ;
