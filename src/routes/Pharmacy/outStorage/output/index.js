/*
 * @Author: yuwei  发药出库 /output
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, DatePicker } from 'antd';
import RetomeTable from '../../../../components/TableGrid';
import outStorage from '../../../../api/pharmacy/outStorage';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const columns = [
  {
   title: '出库单',
   dataIndex: 'backNo',
   width:150,
   render:(text)=>(
    <Link to={{pathname: `/pharmacy/outStorage/output/details/${text}`}}>{text}</Link>
   )
  },
  {
    title: '发药确认单',
    dataIndex: 'dispensingCode',
    width:150
   },
  {
    title: '内部药房',
    width:150,
    dataIndex: 'innerDeptName'
  },
  {
    title: '外部药房',
    width:150,
    dataIndex: 'outDeptName'
  },
  {
    title: '出库分类',
    width:100,
    dataIndex: 'backTypeName'
  },
  {
   title: '发药时间',
   width:100,
   dataIndex: 'dispensingDate'
  }
];

class Output extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      query:{},
    }
  }
  queryHandler = (query) => {
    this.setState({ query:query })
  }
  render(){
    let {query} = this.state;
    return (
      <div  className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <RetomeTable
          query={query}
          url={outStorage.BILLOUTSOTRE_LIST}
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        /> 
      </div>
    )
  }
}
export default Output;
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
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
   const { getFieldDecorator } = this.props.form;
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`单据`} {...formItemLayout}>
              {getFieldDecorator('parameter', {})(
                <Input placeholder="出库单/发药确认单"/>
              )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`发药时间`} {...formItemLayout}>
             {getFieldDecorator('assetName', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{float:'right', textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
         </Col>
       </Row>
     </Form>
   )
 }
}
const SearchForm = Form.create()(SearchFormWrapper);