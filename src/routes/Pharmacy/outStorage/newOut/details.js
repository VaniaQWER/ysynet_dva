import React, { PureComponent } from 'react';
import { Table, Row, Col, Button, Tooltip, Modal, message } from 'antd';
import { createData } from '../../../../common/data';

class Details extends PureComponent {
    // 确认
  confirm = () => {
    Modal.confirm({
      content:"您确定要执行此操作？",
      onOk: () => {
        message.success('复核通过！');
        const { history } = this.props;
        history.push({pathname:"/pharmacy/outStorage/newOut"});
      },
      onCancel: () => {}
    })
  }

  // 保存
  save = () => {
    Modal.confirm({
      content:"您确定要执行此操作？",
      onOk: () => {
        message.error('复核不通过');
      },
      onCancel: () => {}
    })
  }
    render() {
        const columns = [
            {
                title: '通用名称',
                dataIndex: 'productName1',
                render: (text, record) => record.productName
            },
            {
                title: '商品名',
                dataIndex: 'productName'
            },
            {
                title: '规格',
                dataIndex: 'spec',
                className: 'ellipsis',
                render: (text) => (
                    <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
                )
            },
            {
                title: '剂型',
                dataIndex: 'fmodal'
            },
            {
                title: '包装规格',
                dataIndex: 'gzgz',
                render: (text) => '0.25gX12片'
            },
            {
                title: '单位',
                dataIndex: 'unit',
                render: (text) => 'g'
            },
            {
                title: '库存数量',
                dataIndex: 'assetsRecord',
                render: (text) => '120'
            },
            {
                title: '货位类型',
                dataIndex: 'huow',
                render: (text) => '补货货位'
            },
            {
                title: '生产批号',
                dataIndex: 'shengcNumber',
                render: (text) => 'PH1231'
            },
            {
                title: '生产日期',
                dataIndex: 'shengcDate',
                render: (text) => '2018-04-04'
            },
            {
                title: '有效期至',
                dataIndex: 'yxqz',
                render: (text) => '2020-04-04'
            },
            {
                title: '批准文号',
                dataIndex: 'approvalNo',
                render: (text, record, index) => '86900234000039'+index
            },
            {
                title: '生产厂家',
                dataIndex: 'productCompany',
                render: (text) => '浙江安宝药业有限公司'
            },
            {
                title: '供应商',
                dataIndex: 'supplier'
            }
        ];
        return (
            <div className='fullCol'>
                <div className='fullCol-fullChild'>
                    <Row>
                        <Col span={12}>
                            <h2>单据信息</h2>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button type='primary' style={{ marginRight: 10 }} onClick={this.confirm}>复核通过</Button>
                            <Button className='button-gap' onClick={this.save}>不通过</Button>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>出库单</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>PA002211807000086U</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>状态</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>待复核</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>申调部门</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>静配中心</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>发起人</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>李四四</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>发起时间</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>联系电话</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>13809099090</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>药房地址</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>科室地址科室地址地址挺长的</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>复核人</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>王文斌</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>复核时间</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>2018-08-06 17:09:15</div>
                            </div>
                        </Col>
                    </Row>
                    <div style={{ borderBottom: '1px solid #d9d9d9', marginBottom: 20, marginTop: 20 }}></div>
                </div>
                <Table
                    title={() => '产品信息'}
                    dataSource={createData()}
                    bordered
                    scroll={{ x: '220%' }}
                    columns={columns}
                    rowKey={'id'}
                    style={{ marginTop: 24 }}
                    pagination={{
                        size: 'small',
                        showQuickJumper: true,
                        showSizeChanger: true
                    }}
                />
            </div>
        )
    }
}
export default Details;