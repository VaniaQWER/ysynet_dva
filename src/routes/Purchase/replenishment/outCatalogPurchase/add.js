/*
 * @Author: wwb 
 * @Date: 2018-07-24 18:49:01 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-09-01 13:09:02
 */
/**
 * @file 药库 - 补货管理--补货计划--新建计划
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, Select, Modal, Tooltip, message, Affix, Table, InputNumber  } from 'antd';
import RemoteTable from '../../../../components/TableGrid';
import { replenishmentPlan } from '../../../../api/replenishment/replenishmentPlan';
import {validAmount} from '../../../../utils/utils';
import _ from 'lodash';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Search } = Input;
const { Option } = Select;
class NewAdd extends PureComponent{
  state = {
    isShow: false,
    query: {
      medDrugType: '2'
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
    let drugCodeList = [];
    modalSelectedRows.map(item => drugCodeList.push(item.drugCode))
    this.props.dispatch({
      type: 'base/addDrug',
      payload: {
        deptCode: query.deptCode,
        drugCodeList
      },
      callback: (data) => {
        this.setState({
          dataSource: data,
          btnLoading: false,
          visible: false,
          modalSelectedRows: []
        })
      }
    })
  }
  setRowInput = (val, record, i) => {
    let {usableQuantity} = record;
    let {dataSource} = this.state;
    dataSource = JSON.parse(JSON.stringify(dataSource));
    let validResult = validAmount(val, usableQuantity);
    if(val === "") {
      dataSource[i].demandQuantity = val;
      this.setState({dataSource});
    }
    if(validResult) {
      dataSource[i].demandQuantity = val;
      // dataSource[i].totalPrice = val * dataSource[i].drugPrice;
      this.setState({dataSource});
    }else {
      this.setState({dataSource});
    }
  }
  addProduct = () =>{
    if(!this.state.query.deptCode){
      return message.warning('请选择部门');
    }
    let { dataSource, query } = this.state;
    let existDrugCodeList = [];
    dataSource.map(item => existDrugCodeList.push(item.drugCode));
    this.setState({ visible: true,query: { ...query, existDrugCodeList } });
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
    let isNull = dataSource.every(item => {
      if(!item.supplierCode) {
        message.warning('供应商不能为空');
        return false;
      };
      if(!item.demandQuantity) {
        message.warning('需求数量不能为空');
        return false;
      };
      if(!item.planNo) {
        message.warning('报告药申请单号不能为空');
        return false;
      }
      return true
    });
    if(!isNull) return;
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
    const { visible, deptModules, query, btnLoading, dataSource } = this.state;
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
      dataIndex: 'supplierCode',
      render: (text, record, i) => {
        let {supplierList} = record;
        let supplier = supplierList.map(item=>{
          return <Option key={item.ctmaSupplierCode} value={item.ctmaSupplierCode}>{item.ctmaSupplierName}</Option>
        });
        return (
          <Select 
            onSelect={(value)=>{
              let {dataSource} = this.state;
              dataSource = JSON.parse(JSON.stringify(dataSource));
              let referencePrice;
              supplierList.map(item=>{
                if(item.ctmaSupplierCode === value) {
                  referencePrice = item.referencePrice;
                };
                return item;
              });
              dataSource[i].drugPrice = referencePrice;
              dataSource[i].totalPrice = referencePrice * record.demandQuantity;
              this.setState({dataSource});
              
            }} 
            defaultValue={text} 
            style={{ width: 180 }}
          >
            {supplier}
          </Select>
        )
      }
    },{
      title: '包装规格',
      dataIndex: 'packageSpecification',
    }, {
      title: '报告药申请单号',
      dataIndex: 'planNo',
      width: 120,
      render: (text,record) =>{
        return (
          <Input onChange={(e) => {
            record.planNo = e.target.value;
          }}/>
        )
      }
    },{
      title: '需求数量',
      dataIndex: 'demandQuantity',
      width: 120,
      render: (text,record,index)=>{
        return <InputNumber
                  defaultValue={text || 1}
                  min={1}
                  precision={0}
                  onChange={(value)=>{
                    this.setRowInput(value, record, index);
                  }} 
              />
      }
    },{
      title: '单价',
      dataIndex: 'drugPrice',
      width: 120,
    },{
      title: '金额',
      dataIndex: 'totalPrice',
      width: 120,
      render: (text,record)=>{
        let amount = record.demandQuantity ? record.demandQuantity: 1;
        return amount * record.drugPrice
      }
    },{
      title: '批准文号',
      dataIndex: 'approvalNo',
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
      <div className='ysynet_newPage' style={{ padding: 24 }}>
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
                disabled={dataSource.length ? true: false}
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
          <Col span={8}>
            <Button type='primary' icon='plus' onClick={this.addProduct}>添加产品</Button>
            <Button type='default' onClick={this.delete} style={{ marginLeft: 8 }}>删除</Button>
          </Col>
        </Row>
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
        <div className='detailCard' style={{ background: '#f0f2f5',marginTop: '-10px' }}>
          <Table 
            title={()=>'产品信息'}
            columns={columns}
            bordered
            rowKey='drugCode'
            dataSource={dataSource}
            scroll={{ x: '180%' }}
            pagination={false}
            rowSelection={{
              selectedRowKeys: this.state.selected,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
              }
            }}
          />
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