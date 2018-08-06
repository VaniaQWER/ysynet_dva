/**
 * @file 药房 - 日对账单 - 详情
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Input, Button, Modal, message, Tooltip } from 'antd';
import { createData } from '../../../../common/data';

class Details extends PureComponent {

  // 确认
  confirm = () => {
    Modal.confirm({
      content:"您确定要执行此操作？",
      onOk: () => {
        message.success('操作成功！');
        const { history } = this.props;
        history.push({pathname:"/drugStorage/checkDecrease/inventoryAudit"});
      },
      onCancel: () => {}
    })
  }


  render() {
    const columns = [
      {
        title: '发药单',
        dataIndex: 'sendList',
      },
      {
        title: '出库单',
        dataIndex: 'outList'
      },
      {
        title: '药房',
        dataIndex: 'phar'
      },
      {
        title: '通用名',
        dataIndex: 'commonName'
      },
      {
        title: '商品名',
        dataIndex: 'goodsName',
      },
      {
        title: '规格',
        dataIndex: 'spec',
        className:'ellipsis',
        render:(text)=>(
            <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '剂型',
        dataIndex: ' dosageForm '
      },
      {
        title: '生产厂家',
        dataIndex: 'manu'
      },
      {
       title: '包装单位',
       dataIndex: 'pack'
      },
      {
        title: '最小单位',
        dataIndex: 'mixUnit'
      },
      {
        title: '发药单位',
        dataIndex: 'dispenUnit'
      },
      {
        title: '生产批号',
        dataIndex: 'shengcNumber'
      },
      {
        title: '出库数量',
        dataIndex: 'stockNum'
      },
      {
        title: '生产批号',
        dataIndex: 'batchNum'
      },
      {
        title: '生产日期',
        dataIndex: 'maunDate'
      },
      {
        title: '有效期至',
        dataIndex: 'validUntil'
      }
    ];
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild'>
          <Row>
            <Col span={12}>
              <h2>对账单: <span>KP00221180700001CW</span></h2>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type='primary' style={{marginRight: 10}} onClick={this.confirm} >确认生成</Button>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>结算药房</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>中心药房</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>待确认</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>结算日期</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>确认人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>确认时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col>
          </Row>
          <div style={{borderBottom: '1px dashed #d9d9d9', marginBottom: 10}}></div>
          <Row>
            <Col span={8}>
              <div className="ant-row">
                <div className="ant-col-4 ant-form-item-label-left-left" style={{ textAlign: 'right' }}>
                  <label>单号</label>
                </div>
                <div className="ant-col-18">
                  <div className="ant-form-item-control">
                    <Input placeholder='发药单/出库单' />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-row">
                <div className="ant-col-4 ant-form-item-label-left-left" style={{ textAlign: 'right' }}>
                  <label>名称</label>
                </div>
                <div className="ant-col-18">
                  <div className="ant-form-item-control">
                    <Input placeholder='通用名/产品名' />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
            <Col span={4}>产品信息</Col>
            <Col span={4} push={17}>
                <a style={{marginRight: 10}} >补登单据</a>
                <a>延期结算</a>
            </Col>
        </Row>
        <Table
          dataSource={createData()}
          bordered
          scroll={{x: '220%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 24}}
          pagination={{
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
}
export default Details;
