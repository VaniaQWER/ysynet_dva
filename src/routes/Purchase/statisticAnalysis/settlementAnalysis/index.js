/*
 * @Author: wwb 
 * @Date: 2018-07-24 16:08:53 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-06 23:17:40
 */

/**
 * @file 采购计划 - 补货管理--补货计划
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, DatePicker } from 'antd';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import {DataSet} from '@antv/data-set';
import { connect } from 'dva';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  },
};


class SearchForm extends PureComponent{
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const closeDate = values.closeDate === undefined ? '' : values.closeDate;
        if (closeDate.length > 0) {
          values.settleStartTime = closeDate[0].format('YYYY-MM-DD');
          values.settleEndTime = closeDate[1].format('YYYY-MM-DD');
        }else {
          values.settleStartTime = '';
          values.settleEndTime = '';
        };
      }
    })
  }
  //重置
  handleReset = () => {
    this.props.form.resetFields();
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`供应商`}>
              {
                getFieldDecorator(`supplierName`)(
                  <Input placeholder='请输入' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`结算时间`}>
              {
                getFieldDecorator(`closeDate`)(
                  <RangePicker className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{float: 'right', textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
         </Col>
        </Row>
      </Form>
    )
  }
}
const WrapperForm = Form.create()(SearchForm);

class SettlementAnalysis extends PureComponent {
  state = {
    data: []
  }
  setData = (data) => {
    this.setState({
      data
    });
  }
  export() {
    
  }
  
  render() {
    const data = [
      { year: "1992", '结算金额': 4 },
      { year: "1993", '结算金额': 3.5 },
      { year: "1994", '结算金额': 5 },
      { year: "1995", '结算金额': 4.9 },
      { year: "1996", '结算金额': 6 },
      { year: "1997", '结算金额': 7 },
      { year: "1998", '结算金额': 9 },
      { year: "1999", '结算金额': 13 }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: [ '结算金额' ], // 展开字段集
      key: 'city', // key字段
      value: 'value', // value字段
    });
    return (
      <div className='ysynet-main-content'>
        <WrapperForm
          formProps={{...this.props}}
          setData={this.setData}
        />
        <div>
          <Button onClick={this.export} style={{marginLeft: 42}}>导出</Button>
        </div>
        <div style={{marginTop: 20}}>
          <Chart height={400} data={dv} forceFit>
            <Legend position="bottom-left" marker={'circle'}/>
            <Axis name="year"/>
            <Axis name="value" />
            <Tooltip crosshairs={{type : "y"}}/>
            <Geom type="line" position="year*value" color={'city'} size={2} />
            <Geom type='point' position="year*value" color={'city'} size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
          </Chart>
        </div>
      </div>
    )
  }
}
export default connect(state => state)(Form.create()(SettlementAnalysis));