import React, { PureComponent } from 'react';
import { Input, Button, Row, Col, Form, Table, Select } from 'antd';
import { connect } from 'dva';
import { formItemLayout } from '../../../utils/commonStyles';
const FormItem = Form.Item
const { Option } = Select;
const dataSource = [];
for (let i = 0; i < 18; i++) {
  dataSource.push({
    key: i,
    configType: `上架${i+1}`,
    configName: `上架要求 ${i+2}`,
    option: [{
      text: '上架',
      value: '1'
    },{
      text: '纸单上架',
      value: '2'
    },{
      text: '出库结算',
      value: '3'
    }],
    configCode: `Accredit${i*2}`,
    configValueName: `上架要求${i}`,
    tfRemark: `备注测试${i+5}`
  });
}

const EditableCell = ({ value, record, index, onEditChange, options, column, max }) => (
  <div>
    {
      (record.editable && record.index === index) ?
      <Select
        onSelect={(value)=> onEditChange(value,record,index,column)} 
        defaultValue={record.configValue}
        style={{ width: '100%' }}>
        {
          options.map((item,index)=>{
            return <Option key={index} value={item.TF_CLO_CODE}>{item.TF_CLO_NAME}</Option>
          })
        }
      </Select>
      :
      value
    }
  </div>
);
class DrugStorageConfigMgt extends PureComponent{
  state = {
    record: {},
    options: [],
    loading: false
  }
  onCellChange = (value,record,index,column,max) => {
    record[column] = value;
    this.setState({ record });
  }
  renderColumns(text, record, index, column, max) {
    return (
      <EditableCell
        value={ text }
        index={index}
        column={column}
        options={this.state.options}
        record={this.state.record}
        max={max}
        onEditChange={(text, index, record, column, max)=>this.onCellChange(text, index, record, column, max)}
      />
    );
  }
  handSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      this.setState({ loading: true });
      setTimeout(()=>{
        this.setState({ loading: false })
      },500)
    })
  }
  reset = () =>{
    this.setState({ loading: true })
    this.props.form.resetFields();
    setTimeout(()=>{
      this.setState({ loading: false })
    },500)
  }
  edit = () =>{

  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    const columns = [{
      title: '编号',
      dataIndex: 'No',
      render: (text,record,index)=>{
        return index + 1;
      }
    },{
      title: '参数分类',
      dataIndex: 'configType',
    },{
      title: '参数名称',
      dataIndex: 'configName',
      width: 200,
    },{
      title: '代码',
      dataIndex: 'configCode',
    },{
      title: '默认值',
      dataIndex: 'configValueName',
      width: 200,
      render: (text, record, index) => {
        return this.renderColumns(text, record, index,'configValue')
      }
    },{
      title: '备注',
      dataIndex: 'tfRemark',
      width: 250,
    },{
      title: '操作',
      dataIndex: 'action',
      width: 90,
      fixed: 'right',
      render: (text,record,index)=>{
        return <span>
            <a onClick={this.edit.bind(null,record,this.state.record,index)}>{ this.state.record.editable && this.state.record.index===index ? '保存': '编辑' }</a>
        </span>
      }
    }];
    
    return (
      <div>
        <Form onSubmit={this.handSubmit} className='ant-row-bottom'>
          <Row>
            <Col span={6}>
              <FormItem {...formItemLayout} label={`参数名称`}>
                {
                  getFieldDecorator(`searchName`,{
                    initialValue: ''
                  })(
                    <Input placeholder='请输入'/>
                  )
                }
            </FormItem>
            </Col>
            <Col span={18} style={{ textAlign: 'right' }}>
              <Button type='primary' htmlType='submit'>查询</Button>
              <Button type='default' style={{ margin: '0 16px 0 8px' }} onClick={this.reset}>重置</Button>
            </Col>
          </Row>
        </Form>
        <Table 
          columns={columns}
          bordered
          loading={loading}
          dataSource={dataSource}
          scroll={{ x:'100%' }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true
          }}
        />
      </div>
    )
  }
}
export default connect()(Form.create()(DrugStorageConfigMgt));