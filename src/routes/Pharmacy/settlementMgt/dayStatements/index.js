/**
 * @file 结算管理 - 日对账单
 */
import React, {PureComponent} from 'react';

import { Form, Row, Col, Input, Button, Table, DatePicker, Select } from 'antd';

import {Link} from 'react-router-dom';

const FormItem = Form.Item;

const {Option} = Select; 

const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};

const dataSource = [
    {
        key: 1,
        statement: 'DZ0022118070000383',
        clearPharmacy: '中心药房',
        clearDate: '2018-07-15',
        detailsNum: '2984',
        state: '待确认',
        confirmMan: '张医生',
        confirmDate: '2018-07-16 09:05:06'
    }, {
        key: 2,
        statement: 'DZ0022118070000383',
        clearPharmacy: '中心药房',
        clearDate: '2018-07-15',
        detailsNum: '2984',
        state: '待确认',
        confirmMan: '张医生',
        confirmDate: '2018-07-16 09:05:06'
    }, {
        key: 3,
        statement: 'DZ0022118070000383',
        clearPharmacy: '中心药房',
        clearDate: '2018-07-15',
        detailsNum: '2984',
        state: '待确认',
        confirmMan: '张医生',
        confirmDate: '2018-07-16 09:05:06'
    }, {
        key: 4,
        statement: 'DZ0022118070000383',
        clearPharmacy: '中心药房',
        clearDate: '2018-07-15',
        detailsNum: '2984',
        state: '待确认',
        confirmMan: '张医生',
        confirmDate: '2018-07-16 09:05:06'
    }, 
]

const columns = [
    {
    title: '对账单',
    dataIndex: 'statement',
    render: (text) => (
        <span>
            <Link to={{ pathname: `/pharmacy/settlementMgt/dayStatements/details`}}>{text}</Link>
        </span>
    )
}, {
    title: '结算药房',
    dataIndex: 'clearPharmacy',
}, {
    title: '结算日期',
    dataIndex: 'clearDate',
}, {
    title: '明细数量',
    dataIndex: 'detailsNum',
}, {
    title: '状态',
    dataIndex: 'state',
}, {
    title: '确认人',
    dataIndex: 'confirmMan',
}, {
    title: '确认时间',
    dataIndex: 'confirmDate',
}]


class Statements extends PureComponent{
    state = {
        showNewSummary: false
    }
    showNewSummary = () => {
        let {showNewSummary} = this.state;
        showNewSummary = !showNewSummary;
        this.setState({
            showNewSummary
        });
    }
    handleCancel = (e) => {
        this.showNewSummary();
    }
    handleOk = (e) => {
        this.showNewSummary();
    }
    onChange = (e) => {
        console.log(e)
    }
    handleSearch = (e) => {
        console.log(e)
    }
    handleReset = (e) => {
        this.props.form.resetFields();
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSearch}>
                    <Row style={{marginBottom: 20}}>
                        <Col span={8} pull={1}>
                            <FormItem label={`对账单`} {...formItemLayout}>
                                {getFieldDecorator('summarSheet', {})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}  pull={1}>
                            <FormItem label={`结算日期`} {...formItemLayout}>
                                {getFieldDecorator('summarData', {})(
                                    <RangePicker onChange={this.onChange} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}  pull={1}>
                            <FormItem label={`状态`} {...formItemLayout}>
                                {getFieldDecorator('assetName', {})(
                                <Select 
                                    showSearch
                                    placeholder={'请选择'}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                    >
                                        <Option key="" value="">全部</Option>
                                        <Option key="01" value="01">待确认</Option>
                                        <Option key="02" value="02">已确认</Option>
                                </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} push={20} style={{marginTop: 4}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                      showQuickJumper: true,
                      showSizeChanger : true,
                      showTotal: (total) => {
                        return `总共${total}个项目`;
                      }
                    }}
                />
            </div>
        )
    }
};
const WrappedStatements = Form.create()(Statements);
export default WrappedStatements;