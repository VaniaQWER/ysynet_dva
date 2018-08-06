import React, { PureComponent } from 'react';
import { Table ,Row, Col, Button, Tooltip, Modal, message } from 'antd';
import { createData } from '../../../../common/data';
class Details extends PureComponent {
    // 驳回
  reject = () => {
    Modal.confirm({
      content:"您确定要执行此操作？",
      onOk: () => {
        message.success('操作成功！');
        const { history } = this.props;
        history.push({pathname:"/drugStorage/outStorage/recallAndLocked"});
      },
      onCancel: () => {}
    })
  }
    render() {
        const columns = [
            {
                title: '部门',
                width: 100,
                dataIndex: 'geName',
                render: (text, record) => `静配中心`
            },
            {
                width: 100,
                title: '库存数量',
                dataIndex: 'amout',
                render: (text, record) => `123`
            },
            {
                width: 100,
                title: '单位',
                dataIndex: 'unit',
                render: (text, record) => `盒`
            },
            {
                width: 120,
                title: '通用名',
                dataIndex: 'productName',
            },
            {
                width: 120,
                title: '商品名',
                dataIndex: 'productName123',
                render: (text, record) => `${record.productName}`
            },
            {
                title: '规格',
                dataIndex: 'spec',
                width: 100,
                className: 'ellipsis',
                render: (text) => (
                    <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
                )
            },
            {
                title: '剂型',
                width: 100,
                dataIndex: 'fmodal'
            },
            {
                title: '包装规格',
                width: 100,
                dataIndex: 'packSpec',
            },
            {
                title: '生产批号',
                width: 150,
                dataIndex: 'applyNo'
            },
            {
                title: '生产日期',
                width: 150,
                dataIndex: 'planTime123',
                render: (text, record) => `${record.planTime}`
            },
            {
                title: '有效期至',
                width: 130,
                dataIndex: 'planTime',
            },
            {
                title: '生产厂家',
                width: 130,
                dataIndex: 'productCompany'
            },
            {
                title: '批准文号',
                width: 130,
                dataIndex: 'approvalNo'
            },
            {
                title: '供应商',
                width: 150,
                dataIndex: 'supplier'
            }
        ];
        return (
            <div className='fullCol fadeIn'>
                <div className='fullCol-fullChild'>
                    <Row>
                        <Col span={12}>
                            <h2>单据信息</h2>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button type='primary' style={{ marginRight: 10 }} onClick={this.reject} >取消锁定</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>单据号</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>TH002211807000086U</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>状态</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>待审核</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>发起人</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>张三三</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>发起时间</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>审核人</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>李四四</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                                <label>审核时间</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='detailCard'>
                    <Table
                        dataSource={createData()}
                        bordered
                        title={() => '产品信息'}
                        scroll={{ x: '220%' }}
                        columns={columns}
                        rowKey={'id'}
                        pagination={{
                            size: 'small',
                            showQuickJumper: true,
                            showSizeChanger: true
                        }}
                    />
                </div>
            </div>
        )
    }
}
export default Details;