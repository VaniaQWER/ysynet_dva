import React, {PureComponent} from 'react';

import {Row, Col, Table} from 'antd';

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
        title: '货位类型',
        dataIndex: "zhyType",
    }, {
        title: '单位',
        dataIndex: "unit",
    }, {
        title: '数量',
        dataIndex: "num"
    }, {
        title: '供应商',
        dataIndex: 'supplier'
    }
]


class Details extends PureComponent{
    render() {
        let height = 40;
        return (
            <div className="fullCol">
              <div className="fullCol-fullChild">
                <h3>基本信息</h3>
                <Row>
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                            <label>通用名</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>注射用复方甘草酸苷</div>
                        </div>
                    </Col>
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                            <label>商品名</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>注射用复方甘草酸苷</div>
                        </div>
                    </Col>
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                            <label>规格</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>甘草酸苷80mg</div>
                        </div>
                    </Col>
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                            <label>剂型</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>注射剂（冻干粉针剂）</div>
                        </div>
                    </Col>
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                            <label>包装单位</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>瓶</div>
                        </div>
                    </Col>
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                            <label>生产厂家</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>北京宝树堂科技药业有限公司</div>
                        </div>
                    </Col>
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                            <label>批准文号</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>86900234000039</div>
                        </div>
                    </Col>
                </Row>
              </div>
                <div className='detailCard'>
                    <Table
                        bordered={true}
                        title={()=>'库存信息'}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            showTotal: total => `总共${total}个项目`
                        }}
                    />
                </div>
            </div>
        )
    }
};

export default Details;