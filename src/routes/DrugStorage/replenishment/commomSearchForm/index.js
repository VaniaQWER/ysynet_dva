
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, DatePicker, Select, Icon,  } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles'
import moment from 'moment'; 
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
class SearchForm extends PureComponent{
  state = {
    display: 'none'
  }
  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none',
      expand: !expand
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { display, expand } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`计划单号`}>
              {
                getFieldDecorator(`planNo`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`fstate`,{
                  initialValue: ''
                })(
                  <Select className={'ysynet-formItem-width'}>
                    <Option key={-1} value=''>请选择</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`制单时间`}>
              {
                getFieldDecorator(`fstate`,{
                  initialValue: [moment().subtract(30, 'days'), moment(new Date())]
                })(
                  <RangePicker className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`类型`}>
              {
                getFieldDecorator('type',{
                  initialValue: ''
                })(
                  <Select className={'ysynet-formItem-width'}>
                    <Option key={-1} value=''>全部</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={expand ? 15: 8} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 30, fontSize: 14}} onClick={this.toggle}>
             {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
           </a>
         </Col>
        </Row>
      </Form>
    )
  }
}
export default SearchForm;