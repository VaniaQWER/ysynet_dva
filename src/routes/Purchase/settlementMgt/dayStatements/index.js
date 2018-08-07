/**
 * @file 结算管理 - 日对账单
 */
import React, {PureComponent} from 'react';

import { Form, Row, Col, Input, Button, Table, DatePicker, Select } from 'antd';

import {Link} from 'react-router-dom';

import {createData} from '../../../../common/data';

const FormItem = Form.Item;

const {Option} = Select; 

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

const dataSource = createData().map( (item) => {
    return {
            ...item,
            key: item.id,
            SettlementMan: '路飞',
            detailsNum: 50,
            paymentDay: '2018-08-08',
            confirmMan: '索隆',
            fstate: item.fstate === "00"? '对账中' : '对账失败'
          }
} )
const columns = [
    {
    title: '对账单',
    dataIndex: 'planNo',
    fixed: 'left',
    width: 200,
    render: (text) => (
        <span>
            <Link to={{ pathname: `/purchase/settlementMgt/dayStatements/details`}}>{text}</Link>
        </span>
    )
}, {
    title: '供应商',
    dataIndex: 'productCompany',
}, {
    title: '状态',
    dataIndex: 'fstate',
    width: 100
}, {
    title: '明细数量',
    dataIndex: 'detailsNum',
    width: 90
}, {
    title: '账期',
    dataIndex: 'paymentDay',
}, {
    title: '对账人',
    dataIndex: 'confirmMan',
    width: 100
}, {
    title: '对账完成时间',
    dataIndex: 'planTime',
}, {
    title: '结算人',
    dataIndex: 'SettlementMan',
    width: 100
}, {
    title: '结算时间',
    dataIndex: 'SettlementData',
    render: (text,record) =>{
        return '2018-10-28'
    }
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
            <div className="ysynet-main-content">
                <Form onSubmit={this.handleSearch}>
                    <Row gutter={30} style={{marginBottom: 20}}>
                        <Col span={8}>
                            <FormItem label={`对账单`} {...formItemLayout}>
                                {getFieldDecorator('summarSheet', {})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={`对账日期`} {...formItemLayout}>
                                {getFieldDecorator('summarData', {})(
                                    <RangePicker onChange={this.onChange} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
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
                        <Col span={12}>
                            <Link to={{ pathname: `/purchase/settlementMgt/dayStatements/newRecon` }}><Button type="primary">新建对账</Button></Link>
                        </Col>
                        <Col span={12} style={{marginTop: 4, textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Table
                    bordered={true}
                    columns={columns}
                    scroll={{ x: '120%' }}
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
const WrappedStatements = Form.create()(Statements);
export default WrappedStatements;