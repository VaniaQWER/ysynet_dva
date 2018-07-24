/**
 * @file 药库 - 盘点损益 - 新建盘点 - 详情(待确认)
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
        history.push({pathname:"/drugStorage/checkDecrease/newInventory"});
      },
      onCancel: () => {}
    })
  }

  // 保存
  save = () => {
    Modal.confirm({
      content:"您确定要执行此操作？",
      onOk: () => {
        message.success('保存成功！');
        const { history } = this.props;
        history.push({pathname:"/drugStorage/checkDecrease/newInventory"});
      },
      onCancel: () => {}
    })
  }

  // 恢复
  recover = () => {
    Modal.confirm({
      content:"您确定要执行此操作？",
      onOk: () => {
        message.success('恢复成功！');
        const { history } = this.props;
        history.push({pathname:"/drugStorage/checkDecrease/newInventory"});
      },
      onCancel: () => {}
    })
  }

  render() {
    const columns = [
      {
        title: '通用名称',
        dataIndex: 'productName1',
        render:(text,record)=>record.productName
      },
      {
        title: '商品名',
        dataIndex: 'productName'
      },
      {
        title: '规格',
        dataIndex: 'spec',
        className: 'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '剂型',
        dataIndex: 'fmodal'
      },
      {
        title: '包装单位',
        dataIndex: 'unit',
        render:(text)=>'g'
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNo'
      },
      {
        title: '生产厂家',
        dataIndex: 'productCompany'
      },
      {
        title: '库存数量',
        dataIndex: 'assetsRecord'
      },
      {
       title: '盘点数量',
       dataIndex: 'pdNumber'
      },
      {
        title: '盈亏数量',
        dataIndex: 'ykNumber'
      },
      {
        title: '货位',
        dataIndex: 'huow'
      },
      {
        title: '生产批号',
        dataIndex: 'shengcNumber'
      },
      {
        title: '生产日期',
        dataIndex: 'shengcDate'
      },
      {
        title: '有效期至',
        dataIndex: 'yxqz'
      },
      {
        title: '供应商',
        dataIndex: 'supplier'
      }
    ];
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild'>
          <Row>
            <Col span={12}>
              <h2>盘点单: <span>KP00221180700001CW</span></h2>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type='primary' style={{marginRight: 10}} onClick={this.confirm} >确认</Button>
              <Button className='button-gap' style={{marginRight: 10}} onClick={this.save}>保存</Button>
              <Button className='button-gap' onClick={this.recover}>恢复</Button>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>已确认</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>类型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>明盘全盘</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>部门</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>药库</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>制单人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>制单时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>起始时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <label>备注</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>我是新建盘点列表</div>
              </div>
            </Col>
          </Row>
          <div style={{borderBottom: '1px dashed #d9d9d9', marginBottom: 10}}></div>
          <Row>
            <Col span={8}>
              <div className="ant-row">
                <div className="ant-col-4 ant-form-item-label-left" style={{ textAlign: 'right' }}>
                  <label>名称</label>
                </div>
                <div className="ant-col-18">
                  <div className="ant-form-item-control">
                    <Input />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-row">
                <div className="ant-col-4 ant-form-item-label-left" style={{ textAlign: 'right' }}>
                  <label>供应商</label>
                </div>
                <div className="ant-col-18">
                  <div className="ant-form-item-control">
                    <Input />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Table
          dataSource={createData()}
          bordered
          scroll={{x: '220%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 24}}
        />
      </div>
    )
  }
}
export default Details;