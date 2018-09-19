/*
 * @Author: yuwei  拣货下架 /pickSoldOut
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Icon , message , Popconfirm, Select , Input , DatePicker ,} from 'antd';
import { Link } from 'react-router-dom'
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid';
import { outStorage } from '../../../../api/drugStorage/outStorage';
import { connect } from 'dva';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
  state = {
    display: 'none',
    deptOptions: [], // 申领部门
    picking_status: [], //拣货状态
    picking_type: []// 拣货类型
  }
  componentWillMount = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'outStorage/findApplyDepts',
      payload: {},
      callback: (data) => {
        this.setState({ deptOptions: data })
      }
    })

    // 拣货状态
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type : 'picking_status' },
      callback: (data) =>{
        this.setState({ picking_status: data })
      }
    });
    //拣货类型
    dispatch({
      type: 'base/orderStatusOrorderType',
      payload: { type : 'picking_type' },
      callback: (data) =>{
        this.setState({ picking_type: data })
      }
    })
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
        const Time = values.Time === undefined || values.Time === null ? "" : values.Time;
        if(Time.length > 0) {
          values.startTime = values.Time[0].format('YYYY-MM-DD');
          values.endTime = values.Time[1].format('YYYY-MM-DD');
        }
        delete values.Time;
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
 
  render() {
    const { display, deptOptions, picking_status, picking_type } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
     <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={`申领部门`} {...formItemLayout}>
              {getFieldDecorator('deptCode', {
                initialValue: ''
              })(
               <Select 
                 showSearch
                 placeholder={'请选择'}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                 >
                <Option key="" value="">全部</Option>
                {
                  deptOptions.map((item,index)=> <Option key={index} value={ item.id } deptType={item.deptType}>{ item.deptName }</Option>)
                }
               </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={`状态`} {...formItemLayout}>
              {getFieldDecorator('pickingStatus', {
                initialValue: ''
              })(
               <Select 
                 showSearch
                 placeholder={'请选择'}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                 >
                  {
                    picking_status.map((item,index)=> <Option key={index} value={item.value}>{item.label}</Option>)
                  }
               </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`类型`} {...formItemLayout}>
              {getFieldDecorator('pickingType',{
                initialValue: ''
              })(
               <Select 
                 showSearch
                 placeholder={'请选择'}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                 >
                {
                  picking_type.map((item,index)=> <Option key={index} value={item.value}>{item.label}</Option>)
                }
               </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`单据号`} {...formItemLayout}>
              {getFieldDecorator('applyOrderNo',{
                initialValue: ''
              })(
               <Input placeholder='拣货单/申领单'/>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{display: display}}>
            <FormItem label={`发起时间`} {...formItemLayout}>
              {getFieldDecorator('Time')(
               <RangePicker format={'YYYY-MM-DD'}/>
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
    )
  }
 }
const SearchForm = Form.create()(SearchFormWrapper);
class PickSoldOut extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{},
      messageError:"",
      selectedRowKeys:[]
    }
  }

  queryHandler = (query) => {
    this.setState({ query:query });
    this.refs.table.fetch(query);
  }

  //单行确认 
  confirmOk = () => {
    message.success('操作成功')
  }

  render(){
    const { query } = this.state;
    const columns = [
      {
        title: '拣货单',
        dataIndex: 'pickingOrderNo',
        width: 180,
        render:(text,record)=>(
          <span>
            <Link to={{pathname: `/pharmacy/outStorage/pickingUnderShelve/details/${text}/${record.pickingStatus}`}}>{text}</Link>
          </span> 
        )
      },
      {
       title: '申领部门',
       dataIndex: 'deptName',
       width: 120,
      },
      {
        title: '状态',
        dataIndex: 'statusName',
        width:120,
      },
      {
        title: '类型',
        width: 120,
        dataIndex: 'type',
      },
      {
        title: '发起人',
        dataIndex: 'createUserName',
        width:120,
      },
      {
        title: '发起时间',
        dataIndex: 'createDate',
        width:150,
      },
      {
        title: '拣货人',
        dataIndex: 'pickingUserName',
        width: 120,
      },
      {
        title: '拣货时间',
        dataIndex: 'updateDate',
        width: 180,
      },
      {
        title: '操作',
        width: 90,
        dataIndex: 'RN',
        render: (text, record) => 
          <span>
            <Popconfirm title="确定打印吗？" okText="是" cancelText="否"  onConfirm={()=>message.warning('此功能暂未开放')}>
              <a>打印</a>
            </Popconfirm>
          </span>  
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchForm 
          query={this.queryHandler}
          dispatch={this.props.dispatch} 
        />
        <RemoteTable
          bordered
          ref='table'
          query={query}
          url={outStorage.FINDPICKINGORDER_LIT}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        />
      </div>
    )
  }
}
export default connect(state => state)(PickSoldOut);

