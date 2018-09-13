import React, {PureComponent} from 'react';
import {Row, Col, Table, Button, Tabs, Select, message, InputNumber} from 'antd';
import {connect} from 'dva';
import querystring from 'querystring';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Details extends PureComponent{

    constructor(props){
        super(props);
        let info = querystring.parse(this.props.match.params.id);
        this.state = {
            defaultActiveKey: info.status === '2' ? '1' : '2',
            id: info.id,
            loading: true,
            selectedRows: [],
            confirmLoading: false,
            putawayInfo: {}
        }
    }

    componentDidMount = () => {
        this.queryDetail();
    }
    //获取详情
    queryDetail = () => {
        this.props.dispatch({
            type: 'wareHouse/putawayRequest',
            payload: {
                distribute: this.state.id
            },
            callback: (data)=>{
                data.unShevleDetailList = data.unShevleDetailList.map(item => {
                let replanStore;
                    data.goodsLists.map(goodsItem=>{
                        if(item.replanStore === goodsItem.id) {
                            replanStore = goodsItem.id
                        };
                        return goodsItem;
                    });
                    item.realNum = item.realDeliveryQuantiry;
                    item.realStore = replanStore ? replanStore : "";
                    return item
                })
                this.setState({
                    loading: false,
                    putawayInfo: data,
                })
            }
        });
    }

    change = (key) => {
        if(key === "1") {
            this.setState({
                btnShow: true,
                defaultActiveKey: key,
            });
        };
        if(key === "2") {
            this.setState({
                btnShow: false,
                defaultActiveKey: key
            });
        }
    }

    saveCheck = () => {
        let {selectedRows} = this.state;
        if(selectedRows.length === 0) {
            message.error('至少选择一条数据');
            return;
        };
        let isNull = selectedRows.every(item => {
            if(!item.realStore){
                message.error('实际货位不能为空');
                return false;
            };
            if(!item.realNum){
                message.error('实际上架数量不能为空');
                return false;
            };
            return true;
        });
        if(!isNull) return;
        this.setState({confirmLoading: true});
        let detailVos = selectedRows.map((item)=>{
            return {
                id: item.id,
                realStore: item.realStore,
                bigDrugCode: item.bigDrugCode,
                hisDrugCode: item.hisDrugCode,
                realNum: item.realNum,
                drugCode: item.drugCode
            }
        });
        this.props.dispatch({
            type: 'wareHouse/putSaveCheck',
            payload: {
                detailVos,
                shelfCode: this.state.id,
                status: this.state.defaultActiveKey
            },
            callback: (data) => {
                this.queryDetail();
                this.setState({confirmLoading: false});
                message.success('确认上架成功');
            }
        });
    }

    render() {
        let {putawayInfo} = this.state;
        let shevleDetailList = putawayInfo.shevleDetailList || [];
        let unShevleDetailList = putawayInfo.unShevleDetailList || []
        let goodsLists = putawayInfo.goodsLists || [];
        let {defaultActiveKey, loading, confirmLoading} = this.state;
        let goodList = goodsLists.map((item, i) => {
            return (<Option key={item.id} value={item.id}>{item.storeName}</Option>)
        });
        const unShevleColumns = [
            {
                title: '指示货位',
                dataIndex: 'replanStoreName',
            }, {
                title: '实际货位',
                dataIndex: 'realStore',
                render:(text, record, i)=>{
                    return (
                        <Select
                            style={{width: '100%'}}
                            onSelect={(value)=>{
                                console.log(value);
                            console.log(unShevleDetailList);

                                record.realStore = value;
                            }} 
                            defaultValue={text} 
                        >
                            {goodList}
                        </Select>
                    )
                }
            }, {
                title: '指示数量',
                dataIndex: 'realDeliveryQuantiry',
            }, {
                title: '实际上架数量',
                dataIndex: "realNum",
                render: (text, record)=>(
                    <InputNumber 
                        onChange={(value) => {
                            record.realNum = value;
                            
                        }} 
                        defaultValue={record.realDeliveryQuantiry}
                     />
                )   
            },{
                title: '单位',
                dataIndex: 'replanUnit'
            }, {
                title: '通用名称',
                dataIndex: "ctmmGenericName",
            }, {
                title: '规格',
                dataIndex: "ctmmSpecification"
            }, {
                title: '生产厂家',
                dataIndex: "ctmmManufacturerName"
            },{
                title: '生产批号',
                dataIndex: "productBatchNo"
            },{
                title: '生产日期',
                dataIndex: "realProductTime"
            },{
                title: '有效期至',
                dataIndex: "realValidEndDate"
            },{
                title: '包装规格',
                dataIndex: "packageSpecification"
            }
        ];
        const shevleColumns = [
            {
                title: '指示货位',
                dataIndex: 'replanStoreName',
            }, {
                title: '实际货位',
                dataIndex: 'realStore'
            }, {
                title: '指示数量',
                dataIndex: 'realDeliveryQuantiry',
            }, {
                title: '实际上架数量',
                dataIndex: "realNum" 
            },{
                title: '单位',
                dataIndex: 'replanUnit'
            }, {
                title: '通用名称',
                dataIndex: "ctmmGenericName",
            }, {
                title: '规格',
                dataIndex: "ctmmSpecification"
            }, {
                title: '生产厂家',
                dataIndex: "ctmmManufacturerName"
            },{
                title: '生产批号',
                dataIndex: "productBatchNo"
            },{
                title: '生产日期',
                dataIndex: "realProductTime"
            },{
                title: '有效期至',
                dataIndex: "realValidEndDate"
            },{
                title: '包装规格',
                dataIndex: "packageSpecification"
            }
        ];
        return (
            <div className='detailCard'>
                <div>
                    <Row>
                        <Col span={12}>
                            <h3>单据信息</h3>
                        </Col>
                        <Col span={12} style={{textAlign: 'right'}} >
                            <Button>打印</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                                <label>验收单</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>{putawayInfo.shelfCode || ''}</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                                <label>状态</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>{putawayInfo.status || ''}</div>
                            </div>
                        </Col>
                        <Col  span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                                <label>验收时间</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>{putawayInfo.shelfTime || ''}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                                <label>上架时间</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>{putawayInfo.updateTime || ''}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Tabs 
                    activeKey={defaultActiveKey} 
                    onChange={this.change} 
                    tabBarExtraContent={defaultActiveKey === '1' && unShevleDetailList && unShevleDetailList.length > 0? <Button onClick={this.saveCheck} loading={confirmLoading} type='primary'>确认上架</Button> : null}
                >
                    <TabPane tab="待上架" key="1">
                        <Table
                            loading={loading}
                            scroll={{x: '200%'}}
                            bordered={true}
                            dataSource={unShevleDetailList || []}
                            columns={unShevleColumns}
                            rowKey="id"
                            pagination={false}
                            rowSelection={{
                                selectedRowKeys: this.state.selectedRowKeys,
                                onChange: (selectedRowKeys, selectedRows) => {
                                    this.setState({selectedRowKeys, selectedRows})
                                }
                            }}
                        />
                    </TabPane>
                    <TabPane tab="已上架" key="2">
                        <Table
                            loading={loading}
                            scroll={{x: '200%'}}
                            bordered={true}
                            pagination={false}
                            dataSource={shevleDetailList || []}
                            columns={shevleColumns}
                            rowKey="id"
                        />
                    </TabPane>
                </Tabs>
                
            </div>
        )
    }
};

export default connect(state=>state.wareHouse)(Details);
