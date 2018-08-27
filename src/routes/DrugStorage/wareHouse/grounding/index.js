/*
 * @Author: yuwei  上架 /putaway
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Table , DatePicker , Form, Input , Row, Col, Button, Icon, Select , Modal , message  , Popconfirm } from 'antd';
import {Link} from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
const FormItem = Form.Item;
const Option = Select.Option;
const Confirm = Modal.confirm;
const { RangePicker } = DatePicker;
class Putaway extends PureComponent{

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
    this.setState({ query:query })
  }

  //批量编辑 - 打开弹窗
  onSubmit = () =>{
    const { selectedRowKeys } = this.state;
    if(selectedRowKeys.length>0){
      Confirm({
        content:"您确定要执行此操作？",
        onOk:()=>{
          message.success('操作成功！')
        },
        onCancel:()=>{}
      })
    }else{
      message.warn('最少选择一条数据进行操作！')
    }
  }

  //单行确认 
  confirmOk = () => {
    message.success('操作成功')
  }

  render(){
    const columns = [
      {
       title: '配送单',
       width:150,
       dataIndex: 'medicinalCode',
       render: (text) => <span><Link to={{ pathname: `/drugStorage/wareHouse/grounding/detail` }}>{text}</Link></span>
      },
      {
        title: '状态',
        width:100,
        dataIndex: 'fstate',
        render:()=>`待上架`
      },
      {
        title: '类型',
        width:100,
        dataIndex: 'productName1',
        render:(text,record)=>`零库存补货`
      },
      {
        title: '验收人',
        width:150,
        dataIndex: 'createUser',
      },
      {
        title: '验收时间',
        width:150,
        dataIndex: 'planTime',
      },
      // {
      //   title: '上架人',
      //   width:150,
      //   dataIndex: 'unit',
      //   render:(text)=>'g'
      // },
      {
        title: '上架时间',
        width:180,
        dataIndex: 'planTime1',
        render:(text,record)=>`${record.planTime}`
      },
      {
        title: '操作',
        width: 90,
        fixed: 'right',
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
              <Input placeholder='验收单'/>
             )}
           </FormItem>
         </Col>
         <Col span={8} >
           <FormItem label={`状态`} {...formItemLayout}>
             {getFieldDecorator('time')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
                    <Option key="01" value="01">待上架</Option>
                    <Option key="02" value="02">已上架</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`类型`} {...formItemLayout}>
             {getFieldDecorator('assetName', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
                    <Option key="01" value="01">零库存补货</Option>
                    <Option key="02" value="02">采购</Option>
                    <Option key="03" value="03">报告药</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`验收时间`} {...formItemLayout}>
             {getFieldDecorator('shijian', {})(
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