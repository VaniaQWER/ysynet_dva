/**
 * @file 结算管理 - 结算单
 */
import React, {PureComponent} from 'react';

import {Link} from 'react-router-dom';

import { Form, Row, Col, Input, Button, DatePicker } from 'antd';

import {settlementMgt} from '../../../../api/purchase/purchase';

import RemoteTable from '../../../../components/TableGrid/index';

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

const columns = [
    {
    title: '结算单',
    dataIndex: 'settleBillNo',
    render: (text, record) => (
        <span>
            <Link to={{ pathname: `/purchase/settlementMgt/statements/details/${text}`}}>{text}</Link>
        </span>
    )
    }, {
        title: '供应商',
        dataIndex: 'ctmaSupplierName'
    }, {
        title: '状态',
        dataIndex: 'settleStatusName'
    }, {
        title: '结算总金额',
        dataIndex: 'settleSumAmount',
        render: (text,record,index) =>{
            return (index*1500*1.5 + 2000)
        }
    }, {
        title: '对账单数量',
        dataIndex: 'settleSumQty',
        render: (text,record,index) =>{
            return index %3 === 0 ? index + 2: index + 3
        }
    }, {
        title: '结算时间',
        dataIndex: 'settleDate'
    }]


class SettlementMgt extends PureComponent {
    state = {
        query: {}
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let {time} = values;
            if(time && time.length > 0) {
                values.startTime = time[0].format('YYYY-MM-DD');
                values.endTime = time[1].format('YYYY-MM-DD');
            }else {
                values.startTime = '';
                values.endTime = '';
            };
            delete values.time;
            this.setState({
                query: values
            });
        })
    }
    handleReset = (e) => {
        this.props.form.resetFields();
        this.setState({
            query: {}
        });
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        let {query} = this.state;
        return (
            <div className="ysynet-main-content">
                <Form onSubmit={this.handleSearch}>
                    <Row gutter={30}>
                        <Col span={8}>
                            <FormItem label={`汇总单`} {...formItemLayout}>
                                {getFieldDecorator('settleBillNo', {})(
                                    <Input placeholder="请输入"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={`制单日期`} {...formItemLayout}>
                                {getFieldDecorator('time', {})(
                                    <RangePicker />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8} style={{ textAlign: 'right', marginTop: 4}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <RemoteTable
                    query={query}
                    url={settlementMgt.SETTLE_LIST}
                    columns={columns}
                    rowKey={'id'}
                    scroll={{x: '100%'}}
                />
            </div>
        )
    }
};

const WrappedSettlementMgt = Form.create()(SettlementMgt);

export default WrappedSettlementMgt;
