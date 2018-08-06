import React, { PureComponent } from 'react';
import { Table, Form, Row, Col, Button, Icon, Select, Input, DatePicker, message } from 'antd';
import { Link } from 'react-router-dom'
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class SearchFormWrapper extends PureComponent {
    state = {
        display: 'none',
    }
    toggle = () => {
        const { display, expand } = this.state;
        this.setState({
            display: display === 'none' ? 'block' : 'none',
            expand: !expand
        })
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.query(values);
        });
    }
    //重置
    handleReset = () => {
        this.props.form.resetFields();
        this.props.query({});
    }
    render() {
        const { display } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch}>
                <Row gutter={30}>
                    <Col span={8}>
                        <FormItem label={`申领部门`} {...formItemLayout}>
                            {getFieldDecorator('assetCode', {})(
                                <Select
                                    showSearch
                                    placeholder={'请选择'}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                >
                                    <Option key="" value="">全部</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={`状态`} {...formItemLayout}>
                            {getFieldDecorator('fstate', {})(
                                <Select
                                    showSearch
                                    placeholder={'请选择'}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                >
                                    <Option key="" value="">全部</Option>
                                    <Option key="01" value="01">待复核</Option>
                                    <Option key="02" value="02">已复核</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display: display }}>
                        <FormItem label={`类型`} {...formItemLayout}>
                            {getFieldDecorator('spec')(
                                <Select
                                    showSearch
                                    placeholder={'请选择'}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                >
                                    <Option key="" value="">全部</Option>
                                    <Option key="01" value="01">申领</Option>
                                    <Option key="02" value="02">欠品申领</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display: display }}>
                        <FormItem label={`单据号`} {...formItemLayout}>
                            {getFieldDecorator('danjuhao')(
                                <Input placeholder='申领单' />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display: display }}>
                        <FormItem label={`发起时间`} {...formItemLayout}>
                            {getFieldDecorator('time')(
                                <RangePicker />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right', marginTop: 4 }} >
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                        <a style={{ marginLeft: 8, fontSize: 14 }} onClick={this.toggle}>
                            {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const SearchForm = Form.create()(SearchFormWrapper);

class NewOut extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: {},
            selected: []
        }
    }
    queryHandler = (query) => {
        this.setState({ query: query })
    }
    delete = () =>{
        const selected = this.state.selected;
        if (selected.length === 0) {
          message.warn('请至少选择一条数据')
        } else {
          this.setState({ loading: true });
          message.warn('删除成功！');
          setTimeout(()=>{this.setState({loading: false, selected: []});}, 500);
        }
      }
    render() {
        const columns = [
            {
                title: '出库单',
                dataIndex: 'medicinalCode',
                width: 120,
                render: (text) =>
                    <span>
                        <Link to={{ pathname: `/pharmacy/outStorage/newOut/details` }}>{text}</Link>
                    </span>
            },
            {
                title: '拣货单',
                dataIndex: 'index',
                width: 170,
                render: (text, record, index) => 'RK00221180700005QU'
            },
            {
                title: '出库分类',
                dataIndex: 'fstate',
                width: 120,
                render: (text, record, index) => text === '01' ? '待复核' : '已复核'
            },
            {
                title: '申调部门',
                dataIndex: 'equipmfmodalentStandardName',
                width: 150,
                render: (text, record, index) => '静配中心' + index
            },
            {
                title: '发起人',
                dataIndex: 'spec123',
                width: 120,
                render: (text, record, index) => 'cheng' + index
            },
            {
                title: '发起时间',
                dataIndex: 'custodian',
                width: 150,
                render: (text, record, index) => '2018-7-25 21:17'
            },
            {
                title: '复核人',
                dataIndex: 'bDept',
                width: 120,
                render: (text, record, index) => '王文斌'
            },
            {
                title: '复核时间',
                dataIndex: 'time',
                width: 120,
                render: (text, record, index) => '2018-7-25 21:17'
            }
        ];
        return (
            <div className='ysynet-main-content'>
                <SearchForm query={this.queryHandler} />
                <div>
                    <Button type='primary'><Link to={{ pathname: `/pharmacy/outStorage/newOut/add` }}>新建出库</Link></Button>
                    <Button style={{ marginLeft: 10 }} onClick={this.delete}>删除</Button>
                </div>
                <Table
                    dataSource={createData()}
                    bordered
                    loading={this.state.loading}
                    scroll={{ x: '100%' }}
                    pagination={{
                        size: "small",
                        showQuickJumper: true,
                        showSizeChanger: true
                    }}
                    columns={columns}
                    rowKey={'id'}
                    style={{ marginTop: 20 }}
                    rowSelection={{
                        selectedRowKeys: this.state.selected,
                        onChange: (selectedRowKeys, selectedRows) => {
                          this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
                        }
                      }}
                />
            </div>
        )
    }
}
export default NewOut;