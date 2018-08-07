/**
 * @file 药房 - 日对账单 - 详情
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Input, Modal, message, Tooltip, Checkbox } from 'antd';
import { createData } from '../../../../common/data';

const {Search} = Input;

let dataSource = createData().map((item) => {
  return {
    ...item,
    key: item.id,
    packingSpec: '0.25gX12片',
    dispenUnit: '瓶',
    dispenNum: '21',
    stockNum: '100',
    stockType: '发药机货位',
    batchNum: 'SF5120201505881',
    referPrice: '500',
    referAmount: '450',
    maunDate: '2018-07-10',
    validUntil: '2022-07-09'
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
        title: '对账反馈',
        dataIndex: 'planNo',
      },{
        title: '发药确认单',
        dataIndex: 'voucher'
      },
      {
        title: '出库单',
        dataIndex: 'outList'
      },
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
        title: '生产厂家',
        dataIndex: 'manu'
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNo',
      },
      {
        title: '包装规格',
        dataIndex: 'packingSpec',
        width: 200,
      },
      {
        title: '发药单位',
        dataIndex: 'dispenUnit'
      },
      {
        title: '发药数量',
        dataIndex: 'dispenNum'
      },
      {
        title: '出库数量',
        dataIndex: 'stockNum'
      },
      {
        title: '出库货位类别',
        dataIndex: 'stockType'
      },
      {
        title: '生产批号',
        dataIndex: 'batchNum'
      },
      {
       title: '参考价格',
       dataIndex: 'referPrice'
      },
      {
        title: '参考金额',
        dataIndex: 'referAmount'
      },
      {
        title: '生产日期',
        dataIndex: 'maunDate'
      },
      {
        title: '有效期至',
        dataIndex: 'validUntil'
      },
      {
        title: '发药时间',
        dataIndex: 'takeTime'
      }, 
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        render: (text, record) => {
          return (
            <span>
              <a>补登单据 </a>
              <a onClick={ () => {
                console.log(record.id)
              } } >延期结算</a>
            </span>
          )
        }
      }
    ];
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild'>
          <Row>
            <Col span={12}>
              <h2>对账单: <span>KP00221180700001CW</span></h2>
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
            <Col span={8} style={{lineHeight: '39px'}}>
                <Checkbox>只显示异常</Checkbox>
            </Col>
          </Row>
        </div>
        <div className="detailCard">
          <Row>
              <Col span={24} style={{ paddingBottom: 10, borderBottom: '1px solid #f5f5f5' }} >产品信息</Col>
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
        </div>
      </div>
    )
  }
}
export default Details;
