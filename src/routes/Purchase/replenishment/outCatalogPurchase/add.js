/*
 * @Author: wwb 
 * @Date: 2018-07-24 18:49:01 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 20:17:54
 */
/**
 * @file 药库 - 补货管理--补货计划--新建计划
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, Select, Modal, Tooltip, message, Affix  } from 'antd';
import RemoteTable from '../../../../components/TableGrid';
import { replenishmentPlan } from '../../../../api/replenishment/replenishmentPlan';
import _ from 'lodash';
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
    dataSource: [],// 添加的产品
    deptModules: [],// 采购部门
    visible: false,
    btnLoading: false,
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
  handleOk = () => {
    let { modalSelectedRows, query } = this.state;
    if(modalSelectedRows.length === 0) {
      return message.warning('至少选择一条信息');
    }
    this.setState({ btnLoading: true });
    modalSelectedRows = modalSelectedRows.map(item => item.drugCode);
    this.props.dispatch({
      type: 'base/addDrug',
      payload: {
        deptCode: query.deptCode,
        drugCodeList: modalSelectedRows
      },
      callback: (data) => {
        this.setState({
          dataSource: data,
          btnLoading: false,
          visible: false
        })
      }
    })
  }
  onChange = (record,index) =>{
    console.log(record,index,'onChange')
  }
  addProduct = () =>{
    if(!this.state.query.deptCode){
      return message.warning('请选择部门');
    }
    this.setState({ visible: true });
  }
  delete = () => {  //删除
    let {selectedRows, dataSource, query} = this.state;
    dataSource = _.difference(dataSource, selectedRows);
    let existDrugCodeList = dataSource.map((item) => item.drugCode)
    this.setState({
      dataSource,
      selected: [],
      selectedRows: [],
      query: {
        ...query,
        existDrugCodeList
      }
    });
  }
  //提交
  submit = () => {   
    let { dataSource } = this.state;
    if(dataSource.length === 0) {
      message.warning('请添加产品');
      return;
    }
    this.updateFstate('2')
  }
  //保存
  save = () => {    
    let { dataSource } = this.state;
    if(dataSource.length === 0) {
      message.warning('请添加产品');
      return;
    }
    this.updateFstate('1')
  }
  updateFstate = (auditStatus) =>{
    let { dataSource } = this.state;
    let { dispatch, history } = this.props;
    let list = [], postData = {};
    dataSource.map(item => list.push({
      bigDrugCode: item.bigDrugCode,
      demandQuantity: item.demandQuantity,
      drugCode: item.drugCode,
      drugPrice: item.drugPrice,
      supplierCode: item.supplierCode
    }));
    postData.list = list;
    postData.auditStatus = auditStatus;
    postData.planType = '1';
    dispatch({
      type: 'base/submit',
      payload: { ...postData },
      callback: () =>{
        history.push({ pathname: '/purchase/replenishment/outCatalogPurchase' });
      }
    })
  }
  render(){
    const { visible, deptModules, query, btnLoading } = this.state;
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
      dataIndex: 'demandQuantity',
      width: 120,
      render: (text,record,index)=>{
        return <Input defaultValue={ text || 1} onChange={this.onChange.bind(this, record, index)}/>
      }
    },{
      title: '单价',
      dataIndex: 'drugPrice',
    },{
      title: '金额',
      dataIndex: 'totalPrice',
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
                  onSelect={(value) => this.setState({ query: {...query, deptCode: value} })}
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
              <Button type='primary' icon='plus' onClick={this.addProduct}>添加产品</Button>
              <Button type='default' onClick={this.delete} style={{ marginLeft: 8 }}>删除</Button>
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
            <Button key="submit" type="primary" loading={btnLoading} onClick={this.handleOk}>确认</Button>,
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
            bordered
            query={query}
            isJson={true}
            columns={modalColumns}
            url={replenishmentPlan.QUERYDRUGBYDEPT}
            scroll={{ x: '150%' }}
            rowKey='bigDrugCode'
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
              <Button type='primary' onClick={this.submit}>提交</Button>
              <Button type='danger' onClick={this.save} style={{ marginLeft: 8 }} ghost>保存</Button>
            </Col>
          </Row>
        </Affix>
      </div>
    )
  }
}
export default connect(state => state)(Form.create()(NewAdd));