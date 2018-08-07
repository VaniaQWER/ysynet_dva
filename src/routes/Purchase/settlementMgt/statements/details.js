/**
 * @file 药房 - 日对账单 - 详情
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Input, Modal, message, Tooltip } from 'antd';
import { createData } from '../../../../common/data';

const {Search} = Input;

let dataSource = createData().map((item) => {
  return {
    ...item,
    key: item.id,
    closeUnit: '盒',
    closeNum: 238,
    closePrice: '10.0000',
    closeMoney: '2390.0000',
    surplusUnit: '粒',
    prevSurplus: 2,
    nowSurplus: 5
  }
})

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
        title: '通用名',
        dataIndex: 'geName'
      },
      {
        title: '商品名',
        dataIndex: 'productName',
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
        title: '包装规格',
        dataIndex: 'packingSpec',
        width: 200,
      },
      {
        title: '生产厂家',
        dataIndex: 'manu'
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNo',
      },
      {
        title: '结算单位',
        dataIndex: 'closeUnit'
      },
      {
        title: '结算数量',
        dataIndex: 'closeNum'
      },
      {
        title: '结算价格',
        dataIndex: 'closePrice'
      },
      {
        title: '结算金额',
        dataIndex: 'closeMoney'
      },
      {
        title: '结余单位',
        dataIndex: 'surplusUnit'
      },
      {
       title: '上期结余',
       dataIndex: 'prevSurplus'
      },
      {
        title: '本期结余',
        dataIndex: 'nowSurplus'
      }
    ];
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild'>
          <Row>
            <Col span={12}>
              <h2>结算单: <span>KP00221180700001CW</span></h2>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>对账失败</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>账期</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-16 09:05:06 ~2018-07-16 09:05:06</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>华润药业集团</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>对账人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>对账完成时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>结算人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>结算时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col>
          </Row>
          <div style={{borderBottom: '1px dashed #d9d9d9', marginBottom: 10}}></div>
          <Row align="middle">
            <Col span={8}>
              <div className="ant-row">
                <div className="ant-col-4 ant-form-item-label-left">
                  <label>单号</label>
                </div>
                <div className="ant-col-18">
                  <div className="ant-form-item-control">
                    <Search 
                      placeholder='发药单/出库单'
                      onSearch={value => console.log(value)}
                     />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-row">
                <div className="ant-col-4 ant-form-item-label-left">
                  <label>名称</label>
                </div>
                <div className="ant-col-18">
                  <div className="ant-form-item-control">
                    <Search 
                      placeholder='通用名/产品名/生产厂家/供应商'
                      onSearch={value => console.log(value)}
                     />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="detailCard">
          <Row>
              <Col span={4} style={{ paddingBottom: 10, borderBottom: '1px solid #f5f5f5' }} >产品信息</Col>
          </Row>
          <Table
            dataSource={dataSource}
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
          <footer>总金额<span style={{ color: 'red' }}>123456.0000</span>元</footer>
        </div>
      </div>
    )
  }
}
export default Details;
