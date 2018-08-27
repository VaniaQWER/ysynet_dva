import React, {PureComponent} from 'react';
import {Row, Col, Table, Button, Input, Tabs , Select} from 'antd';
import {createData} from '../../../../common/data.js';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
let dataSource = createData();

dataSource = dataSource.map((item) => {
    return {
      ...item,
      key: item.id,
      name: item.productName,
      packingUnit: '瓶',
      pharmacyInventory: 111,
      floorInventory: 222,
      dateOfManu: '2017-8-23',
      validUntil: '2018-8-23',
      supplier: '国药药业集团',
      operation: '查看'
    }
  })

const columns = [
    {
        title: '指示货位',
        dataIndex: 'productName',
    }, {
        title: '实际货位',
        dataIndex: 'spec',
        render:(text)=>(
          <Select style={{width:120}}>
            <Option value='123' key='123'>A1231</Option>
          </Select>
        )
    }, {
        title: '指示数量',
        dataIndex: 'productCompany',
    }, {
        title: '实际上架数量',
        dataIndex: "medicinalCode",
        render:(text)=>(
            <Input/>
        )   
    },{
        title: '单位',
        dataIndex: 'unit'
    }, {
        title: '通用名称',
        dataIndex: "planTime",
    }, {
        title: '规格',
        dataIndex: "packSpec1"
    }, {
        title: '生产厂家',
        dataIndex: "packSpec2"
    },{
        title: '生产批号',
        dataIndex: "packSpec3"
    },{
        title: '生产日期',
        dataIndex: "packSpec4"
    },{
        title: '有效期至',
        dataIndex: "packSpec5"
    },{
        title: '包装规格',
        dataIndex: "packSpec6"
    }
]


class Details extends PureComponent{

    callback = () => {
        //切换tab
    }

    render() {
        let height = 40;
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
                        <Col style={{height: height}}  span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                                <label>验收单</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>PA002211807000086U</div>
                            </div>
                        </Col>
                        <Col style={{height: height}}  span={8}>
                            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                                <label>状态</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>待上架</div>
                            </div>
                        </Col>
                        <Col style={{height: height}}  span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                                <label>验收时间</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>2018-05-06</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{height: height}}  span={8}>
                            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                                <label>上架时间</label>
                            </div>
                            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                                <div className='ant-form-item-control'>2018-05-06</div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Tabs defaultActiveKey="1" onChange={this.callback} tabBarExtraContent={<Button type='primary'>确认上架</Button>}>
                    <TabPane tab="待上架" key="1"></TabPane>
                    <TabPane tab="已上架" key="2"></TabPane>
                </Tabs>
                <Table
                    scroll={{x: '150%'}}
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        size: 'small',
                        showTotal: total => `总共${total}个项目`
                    }}
                />
            </div>
        )
    }
};

export default Details;