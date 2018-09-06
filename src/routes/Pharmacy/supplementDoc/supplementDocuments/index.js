/*
 * @Author: gaofengjiao  补登单据 
 * @Date: 2018-08-06 17:40:15 
* @Last Modified time: 17:40:15 
 */
import React, { PureComponent } from 'react';
import { DatePicker , Form, Input ,Select , Row, Col, Button  , message   } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
import { Link } from 'react-router-dom';
import { supplementDoc } from '../../../../api/pharmacy/wareHouse';
import RemoteTable from '../../../../components/TableGrid';
import moment from 'moment';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class SpplementDocList extends PureComponent{

  state = {
    selected: [],
    selectedRows: [],
    loading: false,
    dataSource: createData(),
    query:{},
  }

  queryHandler = (query) => {
    this.setState({ query:query })
  }
  delete = () =>{
    const selected = this.state.selected;
    if (selected.length === 0) {
      message.warn('请至少选择一条数据')
    } else {
      this.setState({ loading: true });
      //出发删除请求
      this.props.dispatch({
        type:'pharmacy/DeleteMakeup',
        payload:{idList:selected},
        callback:(data)=>{
          message.success('删除成功')
          this.setState({loading: false,selected:[],selectedRows: []});
          this.refs.table.fetch();
        }
      })
    }
  }

  render(){
    const { query } = this.state;
    const columns = [
      {
       title: '补登单号',
       width:170,
       dataIndex: 'makeupCode',
       render: (text,record) =>{
        return <span>
           <Link to={{pathname: `/pharmacy/supplementDoc/supplementDocuments/detail/${record.makeupCode}`}}>{text}</Link>
         </span>
        }
      },
      {
        title: '入库/出库单',
        width:140,
        dataIndex: 'storeCode',
      },
      {
        title: '状态',
        width:100,
        dataIndex: 'makeupStatus',
      },
      {
        title: '部门',
        width:150,
        dataIndex: 'deptName',
      },
      {
        title: '类型',
        width:150,
        dataIndex: 'makeupType',
      },
      {
        title: '补登人',
        width:150,
        dataIndex: 'createUserName',
      },
      {
        title: '补登时间',
        width:180,
        dataIndex: 'createDate',
        render:(text,record)=>text?text.substr(0,11):''
      },
      {
        title: '审核人',
        width:150,
        dataIndex: 'reviewUserName',
      },
      {
        title: '审核时间',
        width:180,
        dataIndex: 'reviewDate',
        render:(text,record)=>text?text.substr(0,11):''
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <div className='ant-row-bottom'>
          <Button type='primary' onClick={()=>this.props.history.push({ pathname: `/AddSupplementDoc` })}>补登出库单</Button>
          <Button type='default' onClick={()=>this.props.history.push({ pathname: `/pharmacy/supplementDoc/supplementDocuments/add` })} style={{ marginLeft: 8 }}>补登入库单</Button>
          <Button type='default' onClick={this.delete} style={{ marginLeft: 8 }}>删除</Button>
        </div>
         <RemoteTable 
          ref='table'
          query={query}
          style={{marginTop: 20}}
          columns={columns}
          loading={this.state.loading}
          scroll={{ x: '100%' }}
          url={supplementDoc.list}
          rowSelection={{
            selectedRowKeys: this.state.selected, 
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
            }
          }}
          rowKey='id'
        />
      </div>
    )
  }
}
export default connect(state=>state)(SpplementDocList);

/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {

  state={
    state:[],
    type:[]
  }

 componentDidMount = () =>{
  this.props.dispatch({
    type:'base/orderStatusOrorderType',
    payload: { type : 'makeup_status' },
    callback:(data)=>{
      this.setState({
        fstate:data
      })
    }
  })
  this.props.dispatch({
    type:'base/orderStatusOrorderType',
    payload: { type : 'makeup_type' },
    callback:(data)=>{
      this.setState({
        type:data
      })
    }
  })
 } 
 handleSearch = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if(values.Time){
      values.startTime = moment(values.Time[0]).format('YYYY-MM-DD');
      values.endTime = moment(values.Time[1]).format('YYYY-MM-DD');
      delete values['Time']
     }
     if(values.reviewTime){
      values.reviewstartTime = moment(values.reviewTime[0]).format('YYYY-MM-DD');
      values.reviewendTime = moment(values.reviewTime[1]).format('YYYY-MM-DD');
      delete values['reviewTime']
     }
     this.props.query(values);
   });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 render() {
   const { getFieldDecorator } = this.props.form;
   const { type , fstate } = this.state;
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`单据号`} {...formItemLayout}>
             {getFieldDecorator('makeupCode', {})(
              <Input placeholder='补登单据/入库/出库单号'/>
             )}
           </FormItem>
         </Col>
       
        <Col span={8}>
           <FormItem label={`补登时间`} {...formItemLayout}>
             {getFieldDecorator('Time', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`审核时间`} {...formItemLayout}>
             {getFieldDecorator('reviewTime', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`makeupStatus`,{
                  initialValue: ''
                })(
                  <Select >
                    {
                      fstate && fstate.length ?
                      fstate.map(item=>(
                        <Option key={item.value} value={item.value}>{item.label}</Option>
                      )):null
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`类型`}>
              {
                getFieldDecorator('makeupType',{
                  initialValue: ''
                })(
                  <Select >
                    {
                      type && type.length ?
                      type.map(item=>(
                        <Option key={item.value} value={item.value}>{item.label}</Option>
                      )):null
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>
         <Col span={8} style={{ float:'right',textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
         </Col>
       </Row>
     </Form>
   )
 }
}
const SearchForm = connect(state=>state)(Form.create()(SearchFormWrapper)); 