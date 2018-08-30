/*
 * @Author: wwb 
 * @Date: 2018-07-24 18:49:01 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 00:09:24
 */
/**
 * @file 药库 - 补货管理--补货计划--新建计划
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, Select, Modal, Tooltip, message, Affix  } from 'antd';
import RemoteTable from '../../../../components/TableGrid';
// import { replenishmentPlan } from '../../../../api/replenishment/replenishmentPlan';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Search } = Input;
const { Option } = Select;
class NewAdd extends PureComponent{
  state = {
    isShow: false,
    query: {
      medDrugType: '1'
    },
    deptModules: [],// 采购部门
    visible: false,
    loading: false,
    selected: [],
    selectedRows: [],
    modalSelected: [],
    modalSelectedRows: []
  }
  componentWillMount = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'base/getModule',
      payload: { deptType : '3' },
      callback: (data) =>{
        this.setState({ deptModules: data })
      }
    })
  }
  handleOk = () =>{
    this.setState({ loading: true });
    setTimeout(()=>{
      message.success('添加成功')
      this.setState({ loading: false, visible: false })
    },500)
  }
  onChange = (record,index) =>{
    console.log(record,index,'onChange')
  }
  render(){
    const { visible, deptModules, query } = this.state;
    const columns = [{
      title: '通用名称',
      dataIndex: 'ctmmGenericName'
    },{
      title: '商品名',
      dataIndex: 'ctmmTradeName'
    },{
      title: '规格',
      dataIndex: 'ctmmSpecification',
      className:'ellipsis',
      render:(text)=>(
        <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
      )
    },{
      title: '剂型',
      dataIndex: 'ctmmDosageFormDesc',
      width: 150
    }, {
      title: '生产厂家',
      dataIndex: 'ctmmManufacturerName'
    },{
      title: '供应商',
      dataIndex: 'fOrgName',
      render: (text,record) =>{
        return (
          <Select defaultValue=''>
            <Option key={-1} value=''>xxxxxxxx</Option>
          </Select>
        )
      }
    },{
      title: '包装规格',
      dataIndex: 'packageSpecification',
      width: 100,
    }, {
      title: '报告药申请单号',
      dataIndex: 'planNo',
      render: (text,record) =>{
        return (
          <Input />
        )
      }
    },{
      title: '需求数量',
      dataIndex: 'amount',
      width: 120,
      render: (text,record,index)=>{
        return <Input defaultValue={ text || 1} onChange={this.onChange.bind(this, record, index)}/>
      }
    },{
      title: '单价',
      dataIndex: 'price',
      render: (text,record) => '10.00'
    },{
      title: '金额',
      dataIndex: 'total',
      render: (text,record) => '2100.00'
    },{
      title: '批准文号',
      dataIndex: 'approvalNo',
      width: 150,
    }];
    const modalColumns = [
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName'
      }, {
        title: '商品名',
        dataIndex: 'ctmmTradeName'
      }, {
        title: '规格',
        dataIndex: 'ctmmSpecification'
      }, {
        title: '剂型',
        dataIndex: 'ctmmDosageFormDesc',
        width: 150
      }, {
        title: '包装规格',
        dataIndex: 'packageSpecification',
        width: 150
      }, {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName'
      }, {
        title: '批准文号',
        dataIndex: 'approvalNo',
        width: 150,
      },
    ]
    return (
      <div style={{ padding: 24 }}>
        <Affix>
          <div>
            <h2>新建计划</h2>
            <hr className='hr'/>
          </div>
          <Row>
            <Col span={6}>
              <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label={`采购部门`}>
                <Select
                  showSearch
                  defaultValue={deptModules.length?deptModules[0].value:''}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.indexOf(input) >= 0} 
                  style={{ width: 200 }}
                >
                  <Option value=''>请选择</Option>
                  {
                    deptModules.map((item,index)=> <Option key={index} value={item.id}>{ item.deptName }</Option>)
                  }
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <Button type='primary' icon='plus' onClick={()=>this.setState({ visible: true })}>添加产品</Button>
              <Button type='default' style={{ marginLeft: 8 }}>删除</Button>
            </Col>
          </Row>
        </Affix>
        <Modal
          title={'添加产品'}
          visible={visible}
          width={1100}
          style={{ top: 20 }}
          onCancel={()=>this.setState({ visible: false })}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>确认</Button>,
            <Button key="back" onClick={() => this.setState({ visible: false })}>取消</Button>
          ]}
        >
        <Row>
          <Col span={7} style={{marginLeft: 4}}>
            <Search 
              style={{ width: 248 }}
              placeholder='通用名/商品名'
              onSearch={val => this.refs.table.fetch({ ...query, paramName: val })}
            />
          </Col>
        </Row>
        <div className='detailCard'>
          <RemoteTable
            ref='table'
            query={query}
            style={{ marginTop: 16 }} 
            columns={modalColumns}
            bordered
            scroll={{ x: '130%' }}
            rowKey='id'
            rowSelection={{
              selectedRowKeys: this.state.modalSelected,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({modalSelected: selectedRowKeys, modalSelectedRows: selectedRows})
              }
            }}
          />
        </div>
        </Modal>
        <div className='newPageBorder'>
          <div className='ysynet-table-Content'>
            <RemoteTable 
              title={()=>'产品信息'}
              columns={columns}
              bordered
              rowKey='id'
              scroll={{ x: '130%' }}
              rowSelection={{
                selectedRowKeys: this.state.selected,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
                }
              }}
            />
          </div>
        </div>
        <Affix offsetBottom={0}>
          <Row>
            <Col style={{ textAlign:'right', padding: '20px' }}>
              <Button type='primary'>提交</Button>
              <Button type='danger' style={{ marginLeft: 8 }} ghost>保存</Button>
            </Col>
          </Row>
        </Affix>
      </div>
    )
  }
}
export default connect(state => state)(Form.create()(NewAdd));