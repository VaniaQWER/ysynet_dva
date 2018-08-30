/*
 * @Author: yuwei  上架 /putaway
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import {DatePicker, Form, Input, Row, Col, Button, Icon, Select, message, Popconfirm } from 'antd';
import {Link} from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid';
import wareHouse from '../../../../api/drugStorage/wareHouse';
import request from '../../../../utils/request';
import {_local} from '../../../../api/local';
import { formItemLayout } from '../../../../utils/commonStyles';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
class Putaway extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{},
      messageError:"",
      selectedRowKeys:[],
    }
  }

  queryHandler = (query) => {
    this.refs.tab.fetch(query);
  }

  //单行确认 
  confirmOk = () => {
    message.success('操作成功')
  }

  render(){
    let {query} = this.state;
    const columns = [
      {
       title: '配送单',
       width:150,
       dataIndex: 'shelfCode',
       render: (text, record) => 
       <span>
        <Link 
          to={{ pathname: `/drugStorage/wareHouse/grounding/detail/id=${record.shelfCode}&status=${record.status === '待上架'? 2 : 3}`}}>
          {text}
        </Link>
       </span>
      },
      {
        title: '状态',
        width:100,
        dataIndex: 'status'
      },
      {
        title: '类型',
        width:100,
        dataIndex: 'shelfType'
      },
      {
        title: '验收时间',
        width:150,
        dataIndex: 'shelfTime',
      },
      {
        title: '上架时间',
        width:180,
        dataIndex: 'sjsj',
      },
      {
        title: '操作',
        width: 90,
        dataIndex: 'RN',
        render: (text, record) => 
          <span>
            <Popconfirm title="确定打印吗？" okText="是" cancelText="否"  onConfirm={()=>this.confirmOk(record)}>
              <a>打印</a>
            </Popconfirm>
          </span>  
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <RemoteTable
          query={query}
          isJson={true}
          ref="tab"
          url={wareHouse.shelfList}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'shelfCode'}
          style={{marginTop: 24}}
        />
      </div>
    )
  }
}
export default Putaway;

/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
 state = {
   display: 'none',
   type: [],
   status: []
 }
 componentDidMount() {
   let status = request(`${_local}/a/spd/dict/type`, {
      methods: 'POST',
      type: 'formData',
      body: {
        type: "audit_status"
      }
    });
    status.then(({data}) => {
      this.setState({
        status: data
      })
    });

    let type = request(`${_local}/a/spd/dict/type`, {
      methods: 'POST',
      type: 'formData',
      body: {
        type: "in_store_type"
      }
    });
    type.then(({data}) => {
      this.setState({
        type: data
      })
    });
 }
 toggle = () => {
   const { display, expand } = this.state;
   this.setState({
     display: display === 'none' ? 'block' : 'none',
     expand: !expand
   })
 }
 handleSearch = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
    for (const key in values) {
      values[key] = values[key] === undefined? "" : values[key]
    };
    if(values.shelfTime === "") {
      values.startTime = "";
      values.endTime = "";
    }else {
      values.startTime = values.shelfTime[0].format('YYYY-MM-DD');
      values.endTime = values.shelfTime[1].format('YYYY-MM-DD');
    };
    delete values.shelfTime;
    this.props.query(values);
   });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
 }

 render() {
   let { display, status, type } = this.state;
   const { getFieldDecorator } = this.props.form;
   type = type.map(item => {
      return (<Option key={item.value} value={item.value}>{item.label}</Option>)
    });
    status = status.filter(item => item.value !== "1").map(item => {
      return (<Option key={item.value} value={item.value}>{item.label}</Option>)
    });
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`单据号`} {...formItemLayout}>
             {getFieldDecorator('shelfCode', {})(
              <Input placeholder='验收单'/>
             )}
           </FormItem>
         </Col>
         <Col span={8} >
           <FormItem label={`状态`} {...formItemLayout}>
             {getFieldDecorator('shelfStatus')(
              <Select
                
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                  <Option key="0" value="0">全部</Option>
                  {status}
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`类型`} {...formItemLayout}>
            {getFieldDecorator('shelfType', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                > 
                  <Option key="0" value="0">全部</Option>  
                  {type}
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`验收时间`} {...formItemLayout}>
             {getFieldDecorator('shelfTime', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{ float:'right',textAlign: 'right', marginTop: 4}} >
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