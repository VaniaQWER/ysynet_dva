import React, {PureComponent} from 'react';

import {Row, Col, Input, Table, Checkbox, Tooltip} from 'antd';

import {createData} from '../../../../common/data.js';

const {Search} = Input;

const columns = [
    {
      title: '发药确认单',
      dataIndex: 'voucher',
      width: 200
    },
    {
      title: '出库单',
      dataIndex: 'outList',
      width: 200
    },
    {
      title: '通用名',
      dataIndex: 'geName',
      width: 200
    },
    {
      title: '商品名',
      dataIndex: 'productName',
      width: 200
    },
    {
      title: '规格',
      dataIndex: 'spec',
      width: 200,
      className:'ellipsis',
      render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
      )
    },
    {
      title: '生产厂家',
      dataIndex: 'manu',
      width: 200
    },
    {
      title: '批准文号',
      dataIndex: 'approvalNo',
      width: 200
    },
    {
      title: '包装规格',
      dataIndex: 'packingSpec',
      width: 200,
    },
    {
      title: '发药单位',
      dataIndex: 'dispenUnit',
      width: 200
    },
    {
      title: '发药数量',
      dataIndex: 'dispenNum',
      width: 200
    },
    {
      title: '出库数量',
      dataIndex: 'stockNum',
      width: 200
    },
    {
      title: '出库货位类别',
      dataIndex: 'stockType',
      width: 200
    },
    {
      title: '生产批号',
      dataIndex: 'batchNum',
      width: 200
    },
    {
     title: '参考价格',
     dataIndex: 'referPrice',
     width: 200
    },
    {
      title: '参考金额',
      dataIndex: 'referAmount',
      width: 200
    },
    {
      title: '生产日期',
      dataIndex: 'maunDate',
      width: 200
    },
    {
      title: '有效期至',
      dataIndex: 'validUntil',
      width: 200
    },
    {
      title: '发药时间',
      dataIndex: 'takeTime',
      width: 200
    }, 
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      fixed: 'right',
      render: (text, record) => {
        return (
          <span>
            <a>补登单据 </a>
            <a onClick={ () => {
              console.log(record.id)
            } } >延期结算</a>
          </span>
        )
      }
    }
  ];

let dataSource = createData();

dataSource = dataSource.map( (item) => ({...item, 
    key: item.id, 
    documentMaker: '2018-07-16 09:05:06 ~2018-07-16 09:05:06',
    fstate: item.fstate === "00"? "已对账" : "未对账"
}) )


class NewSettlement extends PureComponent{
    render() {
        return (
            <div className="fullCol">
                <div className="fullCol-fullChild">
                    <h3 style={{ height: 40, borderBottom: '1px solid #f0f2f5' }}>新建入库单</h3>
                    <Row>
                        <Col span={8}>
                            <div className="ant-row">
                                <div className="ant-col-4 ant-form-item-label-left">
                                    <label>单号</label>
                                </div>
                                <div className="ant-col-18">
                                    <div className="ant-form-item-control">
                                        <Search 
                                            placeholder='发药单/出库单'
                                            onSearch={value => console.log(value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-row">
                                <div className="ant-col-4 ant-form-item-label-left">
                                    <label>名称</label>
                                </div>
                                <div className="ant-col-18">
                                    <div className="ant-form-item-control">
                                        <Search 
                                            placeholder='通用名/产品名/生产厂家/供应商'
                                            onSearch={value => console.log(value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={8} style={{lineHeight: '39px'}}>
                            <Checkbox>只显示异常</Checkbox>
                        </Col>
                    </Row>
                </div>
                <div className="detailCard">
                    <Row style={{ fontSize: '16px', paddingBottom: 10, borderBottom: '1px solid #f0f2f5' }}>基本信息</Row>
                    <Row>
                        <Col span={8}>
                            <div className="ant-row">
                                <div className="ant-col-4 ant-form-item-label-left">
                                    <label>账期</label>
                                </div>
                                <div className="ant-col-18">
                                    <div className="ant-form-item-control">
                                        2018-07-16 09:05:06 ~2018-07-16 09:05:06
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-row">
                                <div className="ant-col-4 ant-form-item-label-left">
                                    <label>状态</label>
                                </div>
                                <div className="ant-col-18">
                                    <div className="ant-form-item-control">
                                        未对账
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{fontSize: '16px', margin: '10px 0', paddingBottom: 10, borderBottom: '1px solid rgba(0, 0, 0, .1)' }} >产品信息</Row>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        bordered
                        scroll={{ x: '100%' }}
                    />
                </div>
            </div>
        )
    }
};


export default NewSettlement;