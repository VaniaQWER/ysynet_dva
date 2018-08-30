import React, {PureComponent} from 'react';
import {Row, Col, Table, Button, Input, Tabs, Select, message, InputNumber} from 'antd';
import {connect} from 'dva';
import querystring from 'querystring';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Details extends PureComponent{

    constructor(props){
        super(props);
        let info = querystring.parse(this.props.match.params.id);
        this.state = {
            btnShow: true,
            defaultActiveKey: info.status,
            id: info.id,
            loading: true,
            selectedRows: []
        }
    }

    componentDidMount = () => {
        this.queryDetail();
    }

    queryDetail = () => {
        this.props.dispatch({
            type: 'wareHouse/putawayRequest',
            payload: {
                distribute: this.state.id
            },
            callback: ()=>{
                this.setState({loading: false})
            }
        });
    }

    callback = (key) => {
        if(key === "1") {
            this.setState({btnShow: true});
        };
        if(key === "2") {
            this.setState({btnShow: false});
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
        let detailVos = selectedRows.map((item)=>{
            return {
                id: item.id,
                directiveStore: item.directiveStore,
                realStore: item.realStore,
                unit: item.unit,
                bigDrugCode: item.bigDrugCode,
                hisDrugCode: item.hisDrugCode,
                genericName: item.genericName,
                realNum: item.realNum,
                specification: item.specification,
                manufactureName: item.manufactureName,
                packageSpecification: item.packageSpecification,
            }
        });
        console.log(detailVos);
        this.props.dispatch({
            type: 'wareHouse/putSaveCheck',
            payload: {
                detailVos,
                shelfCode: this.state.id,
                status: this.state.defaultActiveKey
            },
            callback: (data) => {
                if(data === 200) {
                    message.succese('确认上架成功');
                    this.queryDetail();
                }
            }
        });
    }

    render() {
        let {putawayInfo} = this.props;
        let {shevleDetailList, unShevleDetailList, goodsLists} = putawayInfo;
        let {btnShow, defaultActiveKey, loading} = this.state;
        let goodList = goodsLists.map((item, i) => {
            return (<Option key={item.id} value={item.id}>{item.storeName}</Option>)
        });
        
        unShevleDetailList = unShevleDetailList.map(item => {
            let replanStore;
            goodsLists.map(goodsItem=>{
                if(item.replanStore === goodsItem.storeName) {
                    replanStore = goodsItem.id
                };
                return goodsItem;
            });
            item.realNum = item.realDeliveryQuantiry;
            item.realStore = replanStore ? replanStore : "";
            return item
        })
        const unShevleColumns = [
            {
                title: '指示货位',
                dataIndex: 'replanStore',
            }, {
                title: '实际货位',
                dataIndex: 'realStore',
                render:(text, record)=>{
                    return (
                        <Select 
                            onSelect={(value)=>{
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
                            console.log(value);
                            
                            record.realNum = value;
                        }} 
                        defaultValue={record.realDeliveryQuantiry}
                     />
                )   
            },{
                title: '单位',
                dataIndex: 'unit'
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
                dataIndex: 'replanStore',
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
                dataIndex: 'unit'
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
                <Tabs defaultActiveKey={defaultActiveKey} onChange={this.callback} tabBarExtraContent={btnShow? <Button onClick={this.saveCheck} type='primary'>确认上架</Button> : null}>
                    <TabPane tab="待上架" key="2">
                        <Table
                            loading={loading}
                            scroll={{x: '200%'}}
                            bordered={true}
                            dataSource={unShevleDetailList}
                            columns={unShevleColumns}
                            rowKey="id"
                            pagination={{
                                size: 'small',
                                showTotal: total => `总共${total}个项目`
                            }}
                            rowSelection={{
                                selectedRowKeys: this.state.selectedRowKeys,
                                onChange: (selectedRowKeys, selectedRows) => {
                                    this.setState({selectedRowKeys, selectedRows})
                                }
                            }}
                        />
                    </TabPane>
                    <TabPane tab="已上架" key="3">
                        <Table
                            loading={loading}
                            scroll={{x: '200%'}}
                            bordered={true}
                            dataSource={shevleDetailList}
                            columns={shevleColumns}
                            pagination={{
                                size: 'small',
                                showTotal: total => `总共${total}个项目`
                            }}
                            rowKey="id"
                        />
                    </TabPane>
                </Tabs>
                
            </div>
        )
    }
};

export default connect(state=>state.wareHouse)(Details);
