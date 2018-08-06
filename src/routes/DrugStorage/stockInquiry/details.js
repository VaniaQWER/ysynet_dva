import React, {PureComponent} from 'react';

import {Tabs, Row, Col, Table} from 'antd';

import {createData} from '../../../common/data.js';

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
        title: '生产批号',
        dataIndex: 'medicinalCode',
        key: 'medicinalCode',
    }, {
        title: '生产日期',
        dataIndex: 'dateOfManu',
        key: 'dateOfManu',
    }, {
        title: '有效期至',
        dataIndex: 'validUntil',
        key: 'validUntil',
    }, {
        title: '货位',
        dataIndex: "zhy",
        key: "zhy"
    }, {
        title: '可备货数量',
        dataIndex: "QuantityAva",
        key: "QuantityAva"
    }, {
        title: '部门',
        dataIndex: "depart",
        key: "depart"
    }, {
        title: '供应商',
        dataIndex: 'supplier',
        key: 'supplier',
    }
]

const {TabPane} = Tabs;

class Details extends PureComponent{
    render() {
        let height = 40;
        return (
            <div className="fullCol" style={{ padding: '0 16px',backgroundColor:'#fff' }}>
              <div className="fullCol-fullChild">
                <Tabs defaultActiveKey={'1'}>
                    <TabPane tab="药库详情" key="1">
                        <Row style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Col style={{height: height, fontSize: 16}} span={24}>基本信息</Col>
                            <Col style={{height: height}}  span={8}>通用名：注射用复方甘草酸苷</Col>
                            <Col style={{height: height}}  span={8}>商品名：注射用复方甘草酸苷</Col>
                            <Col style={{height: height}}  span={8}>规格：甘草酸苷80mg</Col>
                            <Col style={{height: height}}  span={8}>剂型：注射剂（冻干粉针剂）</Col>
                            <Col style={{height: height}}  span={8}>包装单位：瓶</Col>
                            <Col style={{height: height}}  span={8}>生产厂家：北京宝树堂科技药业有限公司</Col>
                            <Col style={{height: height}}  span={8}>批准文号：86900234000039</Col>
                        </Row>
                        <div className='detailCard'>
                            <Table
                                bordered={true}
                                title={()=>'产品信息'}
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="供应商详情" key="2" >
                        <Row style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Col style={{height: height, fontSize: 16}} span={24}>基本信息</Col>
                            <Col style={{height: height}}  span={8}>通用名：注射用复方甘草酸苷</Col>
                            <Col style={{height: height}}  span={8}>商品名：注射用复方甘草酸苷</Col>
                            <Col style={{height: height}}  span={8}>规格：甘草酸苷80mg</Col>
                            <Col style={{height: height}}  span={8}>剂型：注射剂（冻干粉针剂）</Col>
                            <Col style={{height: height}}  span={8}>包装单位：瓶</Col>
                            <Col style={{height: height}}  span={8}>生产厂家：北京宝树堂科技药业有限公司</Col>
                            <Col style={{height: height}}  span={8}>批准文号：86900234000039</Col>
                        </Row>
                        <div className='detailCard'>
                            <Table
                                title={()=>'产品信息'}
                                bordered={true}
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </div>
                        </TabPane>
                </Tabs>
              </div>
            </div>
        )
    }
};

export default Details;