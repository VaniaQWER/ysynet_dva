import React, {PureComponent} from 'react';

import {Link} from 'react-router-dom';

import {Form, Row, Col, Input, Table} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
};

const columns2 = [
    { 
        title: '对账单',
        dataIndex: 'statements',
        key: 'statements',
        render: (text) => (
            <span>
                <Link to={{ pathname: `/pharmacy/settlementMgt/statements/newSettlement/details`}}>{text}</Link>
            </span>
        )
    }, {
        title: '结算药房',
        dataIndex: 'clearingPharmacy',
        key: 'clearingPharmacy'
    }, {
        title: '结算日期',
        dataIndex: 'totalMoney',
        key: 'totalMoney'
    }, {
        title: '明细数量',
        dataIndex: 'soaNum',
        key: 'soaNum'
    }, {
        title: '结算金额',
        dataIndex: 'state',
        key: 'state'
    }, {
        title: '状态',
        dataIndex: 'documentMaker',
        key: "documentMaker"
    }
]

const dataSource2 = [
    {
        key: 1,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    } , {
        key: 2,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 3,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 4,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 5,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 6,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 7,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 8,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 9,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 10,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 11,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }, {
        key: 12,
        statements: 'KFJS22118070000383',
        clearingPharmacy: '中心药房',
        totalMoney: '12345678.08',
        soaNum: 30,
        state: '待汇总',
        documentMaker: '张一山',
        documentDate: '2018-07-16 09:05:06'
    }
]


class NewSettlement extends PureComponent{
    render() {
        let height = 40;
        let {getFieldDecorator} = this.props.form;
        return (
            <div className="fullCol">
                <div className="fullCol-fullChild">
                    <Form>
                        <Row>
                            <Col span={8}>
                                <FormItem label={`条形码`} {...formItemLayout}>
                                    {getFieldDecorator('summarSheet', {})(
                                        <Input placeholder={'使用条码枪扫描'}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label={`备注`} {...formItemLayout}>
                                    {getFieldDecorator('remark', {})(
                                        <Input placeholder={'请输入'}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Row>
                    <Col style={{height: height, fontSize: 16}} span={24}>基本信息</Col>
                    <Col style={{height: height}}  span={8}>结算单：注射用复方甘草酸苷</Col>
                    <Col style={{height: height}}  span={8}>药房：注射用复方甘草酸苷</Col>
                    <Col style={{height: height}}  span={8}>制单人：甘草酸苷80mg</Col>
                    <Col style={{height: height}}  span={8}>制单时间：甘草酸苷80mg</Col>
                </Row>
                
                <Row style={{marginTop: 20, paddingBottom: 20, borderBottom: '1px solid rgba(0, 0, 0, .1)' }} >产品信息</Row>
                <Table
                    rowSelection = {{
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        },
                        getCheckboxProps: record => ({
                            disabled: record.name === 'Disabled User', // Column configuration not to be checked
                            name: record.name,
                        }),
                    }}
                    dataSource={dataSource2}
                    columns={columns2}
                    bordered
                />
            </div>
        )
    }
};

const WrappedNewSettlement = Form.create()(NewSettlement);

export default WrappedNewSettlement;