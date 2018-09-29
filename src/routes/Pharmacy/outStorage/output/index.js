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
import {connect} from 'dva';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const columns = [
  {
   title: '出库单',
   dataIndex: 'backNo',
   width: 280,
   render:(text)=>(
    <Link to={{pathname: `/pharmacy/outStorage/output/details/${text}`}}>{text}</Link>
   )
  },
  {
    title: '发药确认单',
    dataIndex: 'dispensingCode',
    width: 280
   },
  {
    title: '内部药房',
    width: 168,
    dataIndex: 'innerDeptName'
  },
  {
    title: '外部药房',
    width: 168,
    dataIndex: 'outDeptName'
  },
  {
    title: '出库分类',
    width: 168,
    dataIndex: 'backTypeName'
  },
  {
   title: '发药时间',
   width: 224,
   dataIndex: 'dispensingDate'
  }
];

class Output extends PureComponent{
  _tableChange = values => {
    this.props.dispatch({
      type:'base/setQueryConditions',
      payload: values
    });
  }
  render(){
    let query = this.props.base.queryConditons;
    query = {...query};
    delete query.key;
    delete query.assetName;
    return (
      <div  className='ysynet-main-content'>
        <SearchForm formProps={{...this.props}} />
        <RetomeTable
          onChange={this._tableChange}
          query={query}
          url={outStorage.BILLOUTSOTRE_LIST}
          scroll={{x: 1288}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        /> 
      </div>
    )
  }
}
export default connect(state=>state)(Output);
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.formProps.dispatch({
        type:'base/setQueryConditions',
        payload: values
      });
    });
  }
  componentDidMount() {
    let { queryConditons } = this.props.formProps.base;
    //找出表单的name 然后set
    let values = this.props.form.getFieldsValue();
    values = Object.getOwnPropertyNames(values);
    let value = {};
    values.map(keyItem => {
      value[keyItem] = queryConditons[keyItem];
      return keyItem;
    });
    this.props.form.setFieldsValue(value);
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.formProps.dispatch({
      type:'base/clearQueryConditions'
    });
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