/*
 * @Author: yuwei  上架 /putaway
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Table , Form, Input , Icon , DatePicker , Row, Col, Button, Select , message  , Popconfirm } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
import { Link } from 'react-router-dom';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class Putaway extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{},
    }
  }

  queryHandler = (query) => {
    this.setState({ query:query })
  }

  //单行确认 
  confirmOk = () => {
    message.success('操作成功')
  }

  render(){
    const columns = [
      {
        title: '验收单',
        dataIndex: 'medicinalCode',
        width:150,
        render:(text)=>(<Link to={{pathname: `/pharmacy/wareHouse/putaway/details`}}>{text}</Link>)
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
        dataIndex: 'productCompany41',
        render: (text, record, index) => 'PHXL'
      },
      {
        title: '验收时间',
        width:150,
        dataIndex: 'productCompany3',
        render: (text, record, index) => '2018-7-25'
      },
      {
        title: '上架人',
        width:150,
        dataIndex: 'productCompany42',
        render: (text, record, index) =>  'PHXL'
      },
      {
        title: '上架时间',
        width:150,
        dataIndex: 'productCompany3232',
        render: (text, record, index) => '2018-7-25'
      },
      {
        title: '操作',
        width:150,
        dataIndex: 'RN',
        render: (text, record) => 
          <span>
            <Popconfirm title="确定打印吗？" okText="是" cancelText="否"  onConfirm={()=>this.confirmOk(record)}><a>打印</a></Popconfirm>
          </span>  
      }
    ];
    return (
      <div  className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <Table
          dataSource={createData()}
          bordered
          loading={ this.state.loading}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 24}}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
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
            {getFieldDecorator('useDeptGuid123')(
            <Select 
              showSearch
              placeholder={'请选择'}
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
              >
              <Option key="" value="">全部</Option>
              <Option key="01" value="01">待验收</Option>
            </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8} style={{display: display}}>
          <FormItem label={`发起时间`} {...formItemLayout}>
            {getFieldDecorator('assetName', {})(
            <RangePicker/>
            )}
          </FormItem>
        </Col>
        <Col span={8} style={{display: display}}>
          <FormItem label={`验收时间`} {...formItemLayout}>
            {getFieldDecorator('assetName123', {})(
            <RangePicker/>
            )}
          </FormItem>
        </Col>
        <Col span={8} style={{ textAlign: 'right', marginTop: 4,float:'right'}} >
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