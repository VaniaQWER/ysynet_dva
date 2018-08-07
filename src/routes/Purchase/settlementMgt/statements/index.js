/**
 * @file 结算管理 - 结算单
 */
import React, {PureComponent} from 'react';

import {Link} from 'react-router-dom';

import { Form, Row, Col, Input, Button, Table, DatePicker } from 'antd';

import {createData} from '../../../../common/data.js';

const FormItem = Form.Item;

const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
};

let dataSource = createData();

dataSource = dataSource.map( (item) => ( {...item, key: item.id, fstate: item.fstate === "00"? "确认" : "未确认"} ) )

const columns = [
    {
    title: '结算单',
    dataIndex: 'planNo',
    render: (text) => (
        <span>
            <Link to={{ pathname: `/purchase/settlementMgt/statements/details`}}>{text}</Link>
        </span>
    )
}, {
    title: '供应商',
    dataIndex: 'productCompany'
}, {
    title: '状态',
    dataIndex: 'fstate'
}, {
    title: '结算总金额',
    dataIndex: 'totalMoney',
    render: (text,record,index) =>{
        return (index*1500*1.5 + 2000)
    }
}, {
    title: '对账单数量',
    dataIndex: 'billNum',
    render: (text,record,index) =>{
        return index %3 === 0 ? index + 2: index + 3
    }
}, {
    title: '结算人',
    dataIndex: 'createUser'
}, {
    title: '结算时间',
    dataIndex: 'planTime'
}]


class SettlementMgt extends PureComponent {
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
            <div className="ysynet-main-content">
                <Form onSubmit={this.handleSearch}>
                    <Row gutter={30}>
                        <Col span={8}>
                            <FormItem label={`汇总单`} {...formItemLayout}>
                                {getFieldDecorator('summarSheet', {})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={`汇总日期`} {...formItemLayout}>
                                {getFieldDecorator('summarData', {})(
                                    <RangePicker onChange={this.onChange} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8} style={{ textAlign: 'right', marginTop: 4}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Row style={{marginBottom: 30}}>
                    <Button type="primary" onClick={() => {
                        const { history } = this.props;
                        history.push({pathname:"/purchase/settlementMgt/statements/newSettlement"});
                    }}>新建结算</Button>
                </Row>
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                      size: 'small',
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

const WrappedSettlementMgt = Form.create()(SettlementMgt);

export default WrappedSettlementMgt;
