/*
 * @Author: wwb 
 * @Date: 2018-07-24 18:49:01 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 00:06:02
 */
/**
 * @file 药库 - 补货管理--补货计划--新建计划
 */
import React, { PureComponent } from 'react';
import { Row, Col, Button, Input, Table, Modal, Icon, Tooltip, message, Select, Spin } from 'antd';
// import { formItemLayout } from '../../../../utils/commonStyles';
import {replenishmentPlan} from '../../../../api/replenishment/replenishmentPlan';
import RemoteTable from '../../../../components/TableGrid';
import _ from 'lodash';
import {connect} from 'dva';

const { Search } = Input;
const { Option } = Select;

class NewAdd extends PureComponent {
  state = {
    modalLoading: false,
    spinLoading: true,
    isShow: false,
    visible: false,
    loading: false,
    deptModules: [],// 补货部门
    query: {
      medDrugType: '1'
    },
    selected: [],
    selectedRows: [],
    modalSelected: [],
    modalSelectedRows: [],
    info: {},
    isEdit: false,
    dataSource: [],
    btnLoading: false
  }
  componentWillMount = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'base/getModule',
      payload: { deptType : '3' },
      callback: (data) =>{
        this.setState({ deptModules: data })
      }
    });
  };
  componentDidMount = () => {
    if(this.props.match.path === "/editReplenishment/:planCode") {
      let { planCode } = this.props.match.params;
      this.setState({loading: true})
      this.props.dispatch({
        type:'base/ReplenishDetails',
        payload: { planCode },
        callback:(data)=>{
          let deptCode;
          let {deptModules, query} = this.state;
          deptModules.map(item=>{
            if(data.deptCode === item.id) {
              deptCode = item.id
            };
            return item;
          });
          let existDrugCodeList = data.list.map(item => item.drugCode);
          this.setState({ 
            info: data, 
            isEdit: true, 
            dataSource: data.list,
            loading: false,
            query: {
              ...query,
              deptCode,
              existDrugCodeList
            },
            spinLoading: false
          });
        }
      });
    }else {
      this.setState({spinLoading: false})
    }
  }
  handleOk = () => {
    let {modalSelectedRows, query} = this.state;
    if(modalSelectedRows.length === 0) {
      message.warning('至少选择一条信息');
      return;
    }
    this.setState({btnLoading: true});
    modalSelectedRows = modalSelectedRows.map(item=>item.drugCode);
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
  onChange = (record, index) => {
    console.log(record, index, 'onchange')
  }
  showModal = () => {
    let {query} = this.state;
    if(!query.deptCode) {
      message.warning('请选择部门');
      return;
    };
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
  submit = () => {   //提交
    // let {isEdit, info, dataSource} = this.state;
    // if(dataSource.length === 0) {
    //   message.warning('请添加产品');
    //   return;
    // }
    // this.props.dispatch({
    //   type: 'base/submit',
    //   payload: {
    //     auditStatus: '2',
    //     id: isEdit? info.id : '',
        
    //   }
    // })
  }
  save = () => {    //保存

  }
  render() {
    let { 
      visible, 
      deptModules, 
      query, 
      // info, 
      isEdit, 
      dataSource, 
      loading, 
      modalLoading,
      spinLoading,
      btnLoading
    } = this.state;
    const columns = [
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName'
      }, {
        title: '商品名',
        dataIndex: 'ctmmTradeName'
      }, {
        title: '规格',
        dataIndex: 'ctmmSpecification',
        className: 'ellipsis',
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      }, {
        title: '剂型',
        dataIndex: 'ctmmDosageFormDesc',
        width: 150
      }, {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName'
      }, {
        title: '供应商',
        dataIndex: 'supplierCode',
        width: 240,
        render: (text, record, i) => {
          let {supplierList} = record;
          supplierList.push({
            ctmaSupplierCode: '569151',
            ctmaSupplierName: '你猜',
            referencePrice: 80
          });
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
                dataSource[i].referencePrice = referencePrice;
                dataSource[i].totalPrice = referencePrice * record.demandQuantity;
                this.setState({dataSource});
                console.log(dataSource, referencePrice, i);
                
              }} 
              defaultValue={text} 
              style={{ width: 210 }}
            >
              {supplier}
            </Select>
          )
        }
      }, {
        title: '包装规格',
        dataIndex: 'packageSpecification',
        width: 100,
      }, {
        title: '单位',
        dataIndex: 'replanUnit',
        width: 150,
      }, {
        title: '需求数量',
        dataIndex: 'demandQuantity',
        width: 120,
        render: (text, record, index) => {
          return <Input defaultValue={text || 1} onChange={this.onChange.bind(this, record, index)} />
        }
      }, {
        title: '当前库存',
        dataIndex: 'usableQuantity',
      }, {
        title: '库存上限',
        dataIndex: 'upperQuantity'
      }, {
        title: '库存下限',
        dataIndex: 'downQuantity'
      }, {
        title: '参考价格',
        dataIndex: 'referencePrice',
        render: (text, record) => {
          let {supplierList, supplierCode} = record;
          let referencePrice;
          supplierList.map(item => {
            if(item.ctmaSupplierCode === supplierCode) {
              referencePrice = item.referencePrice
            };
            return item;
          });
          return referencePrice;
        }
      }, {
        title: '金额',
        dataIndex: 'totalPrice',
        
      }, {
        title: '批准文号',
        dataIndex: 'approvalNo',
        width: 150,
      }
    ];
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
        title: '当前库存',
        dataIndex: 'totalStoreNum',
        width: 100,
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
    ];
    return (
      <Spin spinning={spinLoading} size="large">
        <div className="fullCol" style={{ padding: 24, background: '#f0f2f5' }}>
          <div className="fullCol-fullChild" style={{marginTop: '-9px'}}>
            <Row style={{borderBottom: '1px solid rgba(0, 0, 0, .1)', marginBottom: 10, paddingLeft: 35}}>
              <Col span={8}>
                <h2>{isEdit? '编辑计划' : '新建计划'}</h2>
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => this.props.history.push({ pathname: `/purchase/replenishment/replenishmentPlan` })}><Icon type="close" style={{ fontSize: 26, marginTop: 8 }} /></span>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                  <label>补货部门</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                  <div className='ant-form-item-control'>
                    <Select
                      showSearch
                      value={query.deptCode}
                      onChange={(value) => {
                        let {query} = this.state;
                        this.setState({
                          query: {
                            ...query,
                            deptCode: value
                          }
                        });
                      }}
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.indexOf(input) >= 0} 
                      style={{ width: 200 }}
                      placeholder="请选择"
                    >
                      {
                        deptModules.map((item,index)=> <Option key={index} value={item.id}>{ item.deptName }</Option>)
                      }
                    </Select>
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{marginTop: '10px', paddingLeft: 35}}>
              <Button type='primary' icon='plus' onClick={this.showModal}>添加产品</Button>
              <Button type='default' style={{ margin: '0 8px' }}>一键添加低库存产品</Button>
              <Button onClick={this.delete} type='default'>删除</Button>
            </Row>
          </div>
          <Modal
            bordered
            title={'添加产品'}
            visible={visible}
            width={1100}
            style={{ top: 20 }}
            onCancel={() => this.setState({ visible: false })}
            footer={[
              <Button key="submit" type="primary" loading={btnLoading} onClick={this.handleOk}>确认</Button>,
              <Button key="back" onClick={() => this.setState({ visible: false })}>取消</Button>
            ]}
          >
            <Row>
              <Col span={7} style={{ marginLeft: 4 }}>
                <Search
                  style={{ width: 248 }}
                  placeholder='通用名/商品名'
                  ref="paramName"
                  onSearch={val => this.refs.table.fetch({ ...query, paramName: val })}
                />
              </Col>
            </Row>
            <div className='detailCard'>
              <RemoteTable
                query={query}
                url={replenishmentPlan.QUERYDRUGBYDEPT}
                isJson={true}
                ref="table"
                modalLoading={modalLoading}
                columns={modalColumns}
                scroll={{ x: '150%' }}
                rowKey='bigDrugCode'
                rowSelection={{
                  selectedRowKeys: this.state.modalSelected,
                  onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({ modalSelected: selectedRowKeys, modalSelectedRows: selectedRows })
                  }
                }}
                pagination={false}
              />
            </div>
          </Modal>
          <div className='detailCard' style={{margin: '-12px -8px 0px -8px'}}>
            <Table
              title={()=>'产品信息'}
              loading={loading}
              bordered
              columns={columns}
              dataSource={dataSource}
              scroll={{ x: '200%' }}
              rowKey='drugCode'
              rowSelection={{
                selectedRowKeys: this.state.selected,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({ 
                    selected: selectedRowKeys, 
                    selectedRows: selectedRows
                  })
                }
              }}
              pagination={false}
            />
          </div>
          <div className="detailCard" style={{margin: '-12px -8px 0px -8px'}}>
            <Row>
              <Col style={{ textAlign: 'right', padding: '10px' }}>
                <Button onClick={this.submit} type='primary'>提交</Button>
                <Button onClick={this.save} type='danger' style={{ marginLeft: 8 }} ghost>保存</Button>
              </Col>
            </Row>
          </div>
        </div>
      </Spin>
    )
  }
}
export default connect(state=>state)(NewAdd);