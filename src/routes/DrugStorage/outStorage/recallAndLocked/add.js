import React, { PureComponent } from 'react';
import { Table, Col, Button, Modal, message, Input, Affix, Row, Tooltip, Form } from 'antd';
import { createData } from '../../../../common/data';
import { formItemLayout } from '../../../../utils/commonStyles';
const Conform = Modal.confirm;
const FormItem = Form.Item;
const columns = [
    {
        title: '部门',
        width: 100,
        dataIndex: 'medicinalCode',
        render: (text) => '研发部'
    },
    {
        title: '库存数量',
        width: 150,
        dataIndex: 'dqkc',
        render: (text) => '12000'
    },
    {
        title: '单位',
        width: 150,
        dataIndex: 'unit',
        render: (text) => '瓶'
    },
    {
        title: '通用名',
        width: 100,
        dataIndex: 'productName1',
        render: (text, record) => record.productName
    },
    {
        title: '商品名',
        width: 150,
        dataIndex: 'productName',
    },
    {
        title: '规格',
        width: 150,
        dataIndex: 'spec',
        className: 'ellipsis',
        render: (text) => (
            <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
    },
    {
        title: '剂型',
        width: 150,
        dataIndex: 'fmodal',
    },
    {
        title: '包装规格',
        dataIndex: 'bzgg',
        width: 150,
        render: (text) => '0.25gX12片'
    },
    {
        title: '生产批号',
        width: 150,
        dataIndex: 'productCompany2',
    },
    {
        title: '生产日期',
        width: 150,
        dataIndex: 'productCompany3',
    },
    {
        title: '有效期至',
        width: 150,
        dataIndex: 'productCompany4',
    },
    {
        title: '批准文号',
        width: 150,
        dataIndex: 'approvalNo',
    },
    {
        title: '生产厂家',
        width: 150,
        dataIndex: 'productCompany',
    },
    {
        title: '供应商',
        width: 150,
        dataIndex: 'gongyingshang',
    }
];
const modalColumns = [
    {
        title: '通用名',
        width: 100,
        dataIndex: 'productName1',
        render: (text, record) => record.productName
    },
    {
        title: '规格',
        width: 150,
        dataIndex: 'spec',
        className: 'ellipsis',
        render: (text) => (
            <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
    },
    {
        title: '生产批号',
        width: 150,
        dataIndex: 'productCompany2',
    },
    {
        title: '生产日期',
        width: 150,
        dataIndex: 'productCompany3',
    },
    {
        title: '有效期至',
        width: 150,
        dataIndex: 'productCompany4',
    },
    {
        title: '剂型',
        width: 150,
        dataIndex: 'fmodal',
    },
    {
        title: '包装规格',
        width: 150,
        dataIndex: 'unit',
        render: (text) => '0.25gX12片'
    },
    {
        title: '批准文号',
        width: 150,
        dataIndex: 'approvalNo',
    },
    {
        title: '生产厂家',
        width: 150,
        dataIndex: 'productCompany',
    },
    {
        title: '供应商',
        width: 150,
        dataIndex: 'gongyingshang',
    }
]
class Add extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKey: [],
            visible: false
        }
    }
    //移除
    delete = () => {
        const than = this;
        Conform({
            content: "您确定要执行此操作？",
            onOk: () => {
                if (this.state.selectedRowKey.length === 0) {
                    message.warn('至少选择一条产品');
                } else {
                    message.success('删除成功！')
                    than.setState({ selectedRowKey: [] });
                }   
            },
            onCancel: () => { }
        })
    }
    //提交该出库单
    onSubmit = () => {
        Conform({
            content: "您确定要执行此操作？",
            onOk: () => {
                message.success('操作成功！')
                const { history } = this.props;
                history.push({ pathname: "/drugStorage/outStorage/recallAndLocked" })
                this.setState({ selectedRowKey: [] });
            },
            onCancel: () => { }
        })
    }
    //添加产品 到 主表
    addToMain = () => {
        const { selectedRowKey } = this.state;
        if (selectedRowKey.length > 0) {
            this.setState({ visible: false, selectedRowKey: [] })

        } else {
            message.warn('最少选择一个产品添加！')
        }
    }
    render() {
        const { visible, selectedRowKey } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='fullCol'>
                <div className='fullCol-fullChild' style={{ height: 70 }}>
                    <Row>
                        <Col span={6} style={{ textAlign: 'left' }}>
                            <Button type='primary' className='button-gap' onClick={() => this.setState({ visible: true })}>添加产品</Button>
                            <Button onClick={() => this.delete()} >移除</Button>
                        </Col>
                        <Col span={8}>
                            <FormItem label={``} {...formItemLayout}>
                                {getFieldDecorator('remark', {})(
                                    <Input placeholder={'请输入原因'} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className='detailCard'>
                    <Table
                        title={() => '产品信息'}
                        rowSelection={{
                            onChange: (selectedRowKey) => {
                                this.setState({ selectedRowKey })
                            }
                        }}
                        dataSource={createData()}
                        bordered
                        scroll={{ x: '200%' }}
                        columns={columns}
                        rowKey={'id'}
                        style={{ marginTop: 24 }}
                    />
                </div>
                <Affix offsetBottom={0} className='affix'>共10种产品
             <Button style={{ float: 'right' }} onClick={() => { }}>
                        取消
              </Button>
                    <Button type="primary" className='button-gap' style={{ float: 'right' }} onClick={() => this.onSubmit()}>
                        确定
              </Button>
                </Affix>

                {/*选择产品-弹窗*/}
                <Modal title='添加产品' visible={visible} width={980}
                    onOk={() => this.addToMain()}
                    onCancel={() => this.setState({ visible: false, selectedRowKey: [] })}
                    // footer={null}
                >
                    <Row>
                        <Col span={8}>
                            <Input placeholder='通用名/商品名/供应商/生产厂家/批号' style={{ width: 300 }} />
                        </Col>
                        {/* <Col span={16} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={() => this.addToMain()} style={{ marginRight: 10 }}>确定</Button>
                            <Button onClick={() => this.setState({ visible: false, selectedRowKey: [] })}>取消</Button>
                        </Col> */}
                    </Row>
                    <Table
                        rowSelection={{
                            selectedRowKeys: selectedRowKey,
                            onChange: (selectedRowKey) => {
                                this.setState({ selectedRowKey })
                            }
                        }}
                        dataSource={createData()}
                        bordered
                        scroll={{ x: '200%' }}
                        columns={modalColumns}
                        rowKey={'id'}
                        style={{ marginTop: 24 }}
                    />
                </Modal>

            </div>
        )
    }
}
export default Form.create()(Add);