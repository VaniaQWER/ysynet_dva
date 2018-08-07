import React, {PureComponent} from 'react';

import {Row, Col, Table, Button, Tooltip, Input} from 'antd';

import {createData} from '../../../../common/data.js';

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
        title: '通用名称',
        dataIndex: 'productName',
    }, {
        title: '规格',
        dataIndex: 'spec',
        className: 'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
        
    }, {
        title: '生产厂家',
        dataIndex: 'productCompany',
    }, {
        title: '生产批号',
        dataIndex: "medicinalCode",
    }, {
        title: '生产日期',
        dataIndex: "planTime",
    }, {
        title: '有效期至',
        dataIndex: "validUntil",
    }, {
        title: '包装规格',
        dataIndex: "packSpec"
    }, {
        title: '单位',
        dataIndex: 'unit'
    }, {
        title: '指示货位',
        dataIndex: 'IndiGoods'
    }, {
        title: '实际货位',
        dataIndex: 'actualGoods',
        render: (text) => <Input defaultValue={100} />
    }, {
        title: '指示数量',
        dataIndex: 'IndiNum'
    }, {
        title: '实际上架数量',
        dataIndex: 'actualNum',
        render: (text) => <Input defaultValue={100} />
    }
]


class Details extends PureComponent{
    render() {
        let height = 40;
        return (
            <div className="fullCol">
              <div className="fullCol-fullChild">
                <Row>
                    <Col span={12}>
                        <h3>单据信息</h3>
                    </Col>
                    <Col span={12} style={{textAlign: 'right'}} >
                        <Button style={{marginRight: 5}} type="primary">上架完成</Button>
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
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                            <label>上架人</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>张俊飞</div>
                        </div>
                    </Col>
                    <Col style={{height: height}}  span={8}>
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                            <label>上架时间</label>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                            <div className='ant-form-item-control'>2018-05-06</div>
                        </div>
                    </Col>
                </Row>
              </div>
                <div className='detailCard'>
                    <Table
                        scroll={{x: '150%'}}
                        bordered={true}
                        title={()=>'产品信息'}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            size: 'small',
                            showTotal: total => `总共${total}个项目`
                        }}
                    />
                </div>
            </div>
        )
    }
};

export default Details;