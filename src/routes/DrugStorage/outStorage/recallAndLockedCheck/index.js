/*
 * @Author: yuwei  召回及锁定审核 /recallAndLockedCheck
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */
import React, { PureComponent } from 'react';
import { Table , Form, Row, Col, Button, Icon, Select , message ,  Input ,DatePicker , Modal } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const Confirm = Modal.confirm;
const columns = [
  {
    title: '召回/锁定单号',
    dataIndex: 'medicinalCode',
    width:150,
    render: (text, record) => 
    <span>
      <Link to={{pathname: `/drugStorage/outStorage/recallAndLockedCheck/details`}}>{text}</Link>
    </span>
   },
  {
    title: '状态',
    width:100,
    dataIndex: 'spec21',
    render:(text)=>'待审核'
  },
  {
    title: '供应商',
    width:100,
    dataIndex: 'custodian',
    render: (text, record, index) => 'PHXL'
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
   dataIndex: 'useDept123',
   render: (text, record, index) => '2018-7-25 21:47'
  },
  {
    title: '审核人',
    width:100,
    dataIndex: 'bDept123',
    render: (text, record, index) => 'wang' + index
  },
  {
    title: '审核时间',
    width:150,
    dataIndex: 'useDep12t',
    render: (text, record, index) => '2018-7-25 21:47'
  },
  {
    title: '原因',
    dataIndex: 'spec1',
    width:150
  }
];

class RecallAndLockedCheck extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      query:{},
    }
  }
  queryHandler = (query) => {
    this.setState({ query:query })
  }

  //删除
  delete = () =>{
    Confirm({
      content:'确定要执行此操作吗？',
      onOk:()=>{
        message.success('删除成功！')
      }
    })
  }
  render(){
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <Row>
          <Button type='primary' className='button-gap'>
            <Link to={{pathname:`/drugStorage/outStorage/recallAndLocked/add`}}>新建召回</Link>
          </Button>
          <Button onClick={()=>this.delete()}>删除</Button>
        </Row>
        <Table
          dataSource={createData()}
          bordered
          loading={ this.state.loading}
          scroll={{x: '100%'}}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        /> 
      </div>
    )
  }
}
export default RecallAndLockedCheck;
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
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
 handleSearch = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     this.props.query(values);
   });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 render() {
   const { display } = this.state;
   const { getFieldDecorator } = this.props.form;
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`单据号`} {...formItemLayout}>
             {getFieldDecorator('assetCode', {})(
              <Input/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`原因`} {...formItemLayout}>
             {getFieldDecorator('reson')(
              <Input/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
            <FormItem label={`状态`} {...formItemLayout}>
              {getFieldDecorator('useDeptGuid')(
                <Select 
                  showSearch
                  placeholder={'请选择'}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                  >
                  <Option key="" value="">全部</Option>
                  <Option key="02" value="02">待审核</Option>
                </Select>
              )}
            </FormItem>
          </Col>
         <Col span={8}  style={{display: display}}>
           <FormItem label={`发起时间`} {...formItemLayout}>
             {getFieldDecorator('assetName', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`供应商`} {...formItemLayout}>
             {getFieldDecorator('manageDeptGuid')(
              <Input/>
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