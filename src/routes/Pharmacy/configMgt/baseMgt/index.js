/*
 * @Author: 基数药目录管理
 * @Date: 2018-08-28 17:42:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-06 21:48:20
 */

import React , {PureComponent} from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import {Link} from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid';
import { baseMgt } from '../../../../api/pharmacy/configMgt';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },//5
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  },
};

class SearchForm extends PureComponent{
  state = {
    baseList: []
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.query(values);
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }

  baseListRender = () => {
    let {baseList} = this.state;
    return baseList.map(item => {
      return <Option key={item.id} value={item.id}>{item.deptName}</Option>
    })
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'configMgt/findBaseMedicineDeptlist',
      callback: (data) => {
        this.setState({
          baseList: data
        });
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`基数药部门`}>
              {
                getFieldDecorator(`ctmmDesc`)(
                  <Select placeholder="请选择">
                    {this.baseListRender()}
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`货位`}>
              {
                getFieldDecorator(`ctmmDosageFormDesc`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col style={{textAlign: 'right'}} span={8}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
const WrappSearchForm = Form.create()(SearchForm);
class BaseMgt extends PureComponent{
  state = {
    addVisible: false,
    addLoading: false,
    query: {},
  }
  queryHandler = (query) => {
    this.setState({ query });
    this.refs.table.fetch(query);
  }
  render(){
    const { query } = this.state;
    const IndexColumns = [
      {
        title: '部门名称',
        dataIndex: 'deptName'
      },
      {
        title: '货位名称',
        dataIndex: 'storeLoc',
      },
      {
        title: '操作',
        dataIndex: 'RN',
        width: 60,
        render: (text, record) => <Link to={{pathname: `/pharmacy/configMgt/baseMgt/drug/code=${record.deptCode}&loc=${record.storeLoc}`}}>药品</Link>
      }
    ];
    return (
    <div className='ysynet-main-content'>
      <WrappSearchForm dispatch={this.props.dispatch} query={this.queryHandler}/>
      <RemoteTable
        ref='table'
        query={query}
        url={baseMgt.FIND_CARDINAL_MADICINE}
        scroll={{x: true}}
        columns={IndexColumns}
        rowKey={'deptCode'}
      />
    </div>
    )
  }
}
export default connect()(BaseMgt)