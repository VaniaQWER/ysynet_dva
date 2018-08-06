/**
 * @file 药房 - 日对账单 - 详情
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Modal, message, Tooltip , Button} from 'antd';
import { createData } from '../../../../common/data';
const Confirm = Modal.confirm;
class DetailsRecallAndLockedCheck extends PureComponent {

  onSubmit = () =>{
    Confirm({
      content:"您确定要执行此操作吗？",
      onOk:()=>{
        message.warn('操作成功！')
        const { history } = this.props;
        history.push({pathname:'/drugStorage/outStorage/recallAndLockedCheck'})
      }
    })
  }
  render() {
    const columns = [
      {
        title: '部门',
        width:100,
        dataIndex: 'geName',
        render:(text,record)=>`静配中心`
      },
      {
        width:100,
        title: '库存数量',
        dataIndex: 'amout',
        render:(text,record)=>`123`
      },
      {
        width:100,
        title: '单位',
        dataIndex: 'unit',
        render:(text,record)=>`盒`
      },
      {
        width:120,
        title: '通用名',
        dataIndex: 'productName',
      },
      {
        width:120,
        title: '商品名',
        dataIndex: 'productName123',
        render:(text,record)=>`${record.productName}`
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width:100,
        className:'ellipsis',
        render:(text)=>(
            <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '剂型',
        width:100,
        dataIndex: 'fmodal'
      },
      {
        title: '包装规格',
        width:100,
        dataIndex: 'packSpec',
      },
      {
        title: '生产批号',
        width:150,
        dataIndex: 'applyNo'
      },
      {
        title: '生产日期',
        width:150,
        dataIndex: 'planTime123',
        render:(text,record)=>`${record.planTime}`
      },
      {
        title: '有效期至',
        width:130,
        dataIndex: 'planTime',
      },
      {
        title: '生产厂家',
        width:130,
        dataIndex: 'productCompany'
      },
      {
        title: '批准文号',
        width:130,
        dataIndex: 'approvalNo'
       },
      {
        title: '供应商',
        width:150,
        dataIndex: 'supplier'
      }
    ];
    return (
      <div  className='ysynet-main-content'>
        <Row>
          <Col span={12}>
            <h3>单据信息</h3>
          </Col>
          <div style={{float:'right'}}>
            <Button type='primary' className='button-gap' onClick={this.onSubmit}>审核通过</Button>
            <Button type='danger'  onClick={this.onSubmit}>不通过</Button>
          </div>
        </Row>
        <Row>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
              <label>召回单</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>TH002211807000086U</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
              <label>状态</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>待审核</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
              <label>发起人</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>李四四</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
              <label>发起时间</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
              <label>审核人</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>李四四</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
              <label>审核时间</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
            </div>
          </Col>
        </Row>
        <hr className='hr'/>
        <div className="detailCard">
          <Row>
              <Col span={4} style={{ paddingBottom: 10 }} >产品信息</Col>
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
      </div>
    )
  }
}
export default DetailsRecallAndLockedCheck;
