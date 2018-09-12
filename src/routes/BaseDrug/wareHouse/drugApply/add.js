/*
 * @Author: wwb 
 * @Date: 2018-07-24 18:49:01 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-31 00:06:02
 */
/**
 * @file 基数药 - 申领 - 新建
 */
import React, { PureComponent } from 'react';
import { Row, Col, Button, Table, Modal, Icon, Tooltip, message, InputNumber } from 'antd';
import {wareHouse} from '../../../../api/pharmacy/wareHouse';
import RemoteTable from '../../../../components/TableGrid';
import FetchSelect from '../../../../components/FetchSelect/index';
import _ from 'lodash';
import {connect} from 'dva';

class NewAdd extends PureComponent {
  state = {
    modalLoading: false,
    visible: false,
    loading: false,
    query: {
      existDrugCodeList: [],
      hisDrugCodeList: []
    },
    selected: [],
    selectedRows: [],
    modalSelected: [],
    modalSelectedRows: [],
    dataSource: [],
    btnLoading: false,
    saveLoading: false,
    applyType: '1',        //补货方式
    value: undefined
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
      type: 'base/applyAddDrug',
      payload: {
        deptCode: query.deptCode,
        drugCodeList: modalSelectedRows
      },
      callback: (data) => {
        this.setState({
          dataSource: data,
          btnLoading: false,
          visible: false,
          modalSelected: []
        })
      }
    })
  }
  showModal = () => {
    let {query, dataSource} = this.state;
    query = {
      ...query,
      hisDrugCodeList: [],
      value: undefined,
      existDrugCodeList: dataSource.map(item=>item.drugCode)
    };
    this.setState({visible: true, query: {...query}});
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
  submit = (applyStatus) => {   //提交  保存
    let {dataSource, applyType, query} = this.state;
    let isNull = dataSource.every(item => {
      if(!item.applyNum) {
        message.warning('申领数量不能为空');
        return false;
      };
      return true
    });
    if(!isNull) return;
    dataSource = dataSource.map(item => {
      return {
        applyNum: item.applyNum,
        drugCode: item.drugCode,
      }
    });
    this.setState({
      saveLoading: true
    });
    let body = {
      applyStatus,
      applyType,
      distributeDeptCode: query.deptCode,
      detaiList: dataSource
    };
    
    this.props.dispatch({
      type: 'base/applySubmit',
      payload: body,
      callback: ()=>{
        message.success(`${applyStatus === '0'? '保存' : '提交'}成功`);
        this.props.history.go(-1);
      }
    });
  }
  setSelectList = (value) => {
    let {query} = this.state;
    query = {
      ...query,
      hisDrugCodeList: value ? [value] : []
    };
    this.setState({
      query,
      value
    });
  }
  render() {
    let { 
      visible, 
      query,  
      dataSource, 
      loading, 
      modalLoading,
      btnLoading,
      saveLoading,
      value
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
        title: '包装规格',
        dataIndex: 'packageSpecification',
        width: 240
      }, {
        title: '单位',
        dataIndex: 'replanUnit',
        width: 150,
      }, {
        title: '申领数量',
        dataIndex: 'applyNum',
        width: 120,
        render: (text, record, i) => {
          return <InputNumber
                    defaultValue={text}
                    min={1}
                    precision={0}
                    onChange={(value)=>{
                      dataSource = JSON.parse(JSON.stringify(dataSource));
                      dataSource[i].applyNum = value;
                      this.setState({dataSource});
                    }} 
                 />
        }
      }, {
        title: '药房库存',
        dataIndex: 'usableQuantity',
      }, {
        title: '库存上限',
        dataIndex: 'upperQuantity'
      }, {
        title: '库存下限',
        dataIndex: 'downQuantity'
      }, {
        title: '批准文号',
        dataIndex: 'approvalNo',
        width: 150,
      }
    ];
    const modalColumns = [
      {
        title: '通用名',
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
        title: '批准文号',
        dataIndex: 'approvalNo',
        width: 150,
      }, {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName'
      },
    ];
    return (
      <div className="fullCol" style={{ padding: 24, background: '#f0f2f5' }}>
        <div className="fullCol-fullChild" style={{margin: '-9px -24px 0'}}>
          <Row style={{borderBottom: '1px solid rgba(0, 0, 0, .1)', marginBottom: 10}}>
            <Col span={8}>
              <h2>新建申领</h2>
            </Col>
            <Col span={16} style={{ textAlign: 'right' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => this.props.history.go(-1)}><Icon type="close" style={{ fontSize: 26, marginTop: 8 }} /></span>
            </Col>
          </Row>
          <Row style={{marginTop: '10px'}}>
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
          onCancel={() => this.setState({ visible: false, modalSelected: [] })}
          footer={[
            <Button key="submit" type="primary" loading={btnLoading} onClick={this.handleOk}>确认</Button>,
            <Button key="back" onClick={() => this.setState({visible: false, modalSelected: []})}>取消</Button>
          ]}
        >
          <Row>
            <Col span={7} style={{ marginLeft: 4 }}>
              <FetchSelect
                allowClear
                value={value}
                style={{ width: 248 }}
                placeholder='通用名/商品名'
                url={wareHouse.QUERY_DRUG_BY_LIST}
                cb={this.setSelectList}
              />
            </Col>
          </Row>
          <div className='detailCard'>
            <RemoteTable
              query={query}
              url={wareHouse.QUERYDRUGBYDEPT}
              isJson={true}
              ref="table"
              modalLoading={modalLoading}
              columns={modalColumns}
              scroll={{ x: '180%' }}
              rowKey='drugCode'
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
        {
          dataSource.length === 0? null : 
          <div className="detailCard" style={{margin: '-12px -8px 0px -8px'}}>
            <Row>
              <Col style={{ textAlign: 'right', padding: '10px' }}>
                <Button loading={saveLoading} onClick={()=>{this.submit('1')}} type='primary'>提交</Button>
                <Button loading={saveLoading} onClick={()=>{this.submit('0')}} type='danger' style={{ marginLeft: 8 }} ghost>保存</Button>
              </Col>
            </Row>
          </div>
        }
      </div>
    )
  }
}
export default connect(state=>state)(NewAdd);