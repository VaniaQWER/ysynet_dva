import React, { PureComponent } from 'react';
import { Row, Col, Input, Button, Select,message } from 'antd';
import RemoteTable from '../../../components/TableGrid';
import { CommonData } from '../../../utils/utils';
import jxh from '../../../api/jxh'
import { connect } from 'dva';
const { Search } = Input;
const { Option } = Select;
const EditableCell = ({ value, record, index, onEditChange, options, column, max }) => (
  <div>
    {
      (record.editable && record.index === index) ?
      column === 'configValue' ?
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
      <Input style={{ margin: '-2px 0' }} defaultValue={value} onChange={e => onEditChange(e.target.value, record, index, column, max)} />
      : 
      value
    }
  </div>
);
class ConfigMgt extends PureComponent{
  state = {
    query: {
      deptGuid: this.props.users.subSystem.deptGuid
    },
    record: {},
    options: []
  }
  edit = (record,stateRecord,index)=>{
    if(stateRecord.editable){
      let values = {};
      values.configName = stateRecord.configName;
      values.configCode = stateRecord.configCode;
      values.configValue = stateRecord.configValue;
      values.configType = stateRecord.configType;
      values.tfRemark = stateRecord.tfRemark;
      values.deptGuid = this.props.users.subSystem.deptGuid;
      if(stateRecord.configGuid){
        values.configGuid = stateRecord.configGuid;
      }
      console.log(values,'values');
      this.props.dispatch({
        type: 'clinicalSystem/saveDeptConfig',
        payload: values,
        callback: () => {
          this.setState({ record: {...record, editable: false,index } })
          this.refs.table.fetch()
        }
      })
    }else{
      console.log('编辑')
      if(record.configCode){
        CommonData(record.configCode, (data) => {
          this.setState({ options: data })
        });
      }
      this.setState({ record: {...record, editable: true, index } })
    }
  }
  onCellChange = (value,record,index,column,max) => {
    if(column !== 'configValue'){
      if(value.length > max){
        message.warning(`输入字符长度不能超过${max}`)
      }else{
        record[column] = value;
        this.setState({ record });
      }
    }else{
      record[column] = value;
      this.setState({ record });
    }
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
  render(){
    const columns = [{
      title: '编号',
      dataIndex: 'No',
      width: 90,
      render: (text,record,index)=>{
        return index + 1;
      }
    },{
      title: '参数分类',
      dataIndex: 'configTypeName',
    },{
      title: '参数名称',
      dataIndex: 'configName',
      width: 200,
      render: (text, record, index) => {
        return this.renderColumns(text, record, index,'configName',100)
      }
    },{
      title: '代码',
      dataIndex: 'configCode',
    },{
      title: '默认值',
      dataIndex: 'configValue',
      width: 200,
      render: (text, record, index) => {
        return this.renderColumns(text, record, index,'configValue')
      }
    },{
      title: '备注',
      dataIndex: 'tfRemark',
      width: 250,
      render: (text, record, index) => {
        return this.renderColumns(text, record, index,'tfRemark',250)
      }
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
    }]
    const { query } = this.state;
    return (
      <div>
        <Row className='ant-row-bottom'>
          <Col span={4}>
            <Button type='primary' onClick={()=>this.refs.table.fetch()}>更新</Button>
          </Col>
          <Col span={20} style={{ textAlign: 'right' }}>
            <Search 
              style={{ width: 256 }}
              placeholder='请输入参数名称/参数分类'
              onSearch={value => this.refs.table.fetch({ searchName: value }) }
            />
          </Col>
        </Row>
        <RemoteTable 
          ref='table'
          url={jxh.FINDDEPTCONFIGLIST}
          rowKey={'templateDcGuid'}
          scroll={{ x:'100%' }}
          query={query}
          columns={columns}
          showHeader={true}
        />
      </div>
    )
  }
}
export default connect(state =>  state)(ConfigMgt);