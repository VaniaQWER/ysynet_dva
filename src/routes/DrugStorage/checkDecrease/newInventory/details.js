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
        message.success('提交成功！');
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
        message.success('盘点成功！');
        const { history } = this.props;
        history.push({pathname:"/drugStorage/checkDecrease/newInventory"});
      },
      onCancel: () => {}
    })
  }
  add = () => {
    message.success('增加成功！');
  }
  render() {
    const columns = [
      {
        title: '货位',
        dataIndex: 'huowei',
        render:(text,record, index)=>'A1231'+index
      },
      {
        title: '货位类型',
        dataIndex: 'huoweitype',
        render:(text,record, index)=>'发药机货位'
      },
      {
        title: '通用名称',
        dataIndex: 'productName1',
        render:(text,record)=>record.productName
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
        title: '生产厂家',
        dataIndex: 'productName1d2',
        render:(text,record)=>'浙江安宝药业有限公司'
      },
      {
        title: '包装规格',
        dataIndex: 'bzgg',
        render:(text,record)=>'0.25gX12片'
      },
      {
        title: '单位',
        dataIndex: 'dw',
        render:(text,record)=>'瓶'
      },
      {
        title: '账面库存',
        dataIndex: 'zmkc',
        render:(text,record)=>'120'
      },
      {
        title: '实际数量',
        dataIndex: 'sjsl',
        render:(text,record)=>{
          return <Input defaultValue={110} />
        }
      },
      {
        title: '盈亏数量',
        dataIndex: 'yksl', 
        render: (text, record, index) => '01'
      },
      {
        title: '账面批号',
        dataIndex: 'zmph',
        render:(text)=> 'PH123'
      },
      {
        title: '实际批号',
        dataIndex: 'sjph',
        render: (text, record, index) => <Input defaultValue={'PH123'} />
      },
      {
        title: '生产日期',
        dataIndex: 'shengcDate'
      },
      {
        title: '实际生产日期',
        dataIndex: 'sjshengcDate'
      },
      {
        title: '有效期至',
        dataIndex: 'yxqz'
      },
      {
        title: '实际有效期至',
        dataIndex: 'sjyxqz',
        render: (text, record, index) => '2022-07-09'
      },
      {
        title: '单价',
        dataIndex: 'unit',
        render:(text)=>'10.00'
      },
      {
        title: '盈亏金额',
        dataIndex: 'mount'
      },
      {
        title: '操作',
        dataIndex: 'action', 
        render: (text, record, index) => {
          return <a onClick={this.add}>新增批号</a>
        }
      }
    ];
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <Row>
            <Col span={12}>
              <h2>盘点单: <span>KP00221180700001CW</span></h2>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type='primary' style={{marginRight: 10}} onClick={this.recover}>盘点</Button>
              <Button className='button-gap' style={{marginRight: 10}} onClick={this.save}>保存</Button>
              <Button className='button-gap' onClick={this.confirm} >提交</Button>
              
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>已确认</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>类型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>明盘全盘</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>部门</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>药库</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>制单人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>制单时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>起始时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>盘点周期</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-11 ~ 2018-07-12</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>盘点时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>提交时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
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
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4">
                <label>名称</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18" style={{ marginLeft: -30 }}>
                <div className='ant-form-item-control'><Input placeholder={'通用名称/商品名称'} /></div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-4" style={{ textAlign: 'right' }}>
                <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'><Input placeholder={'请输入'} /></div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Table
            dataSource={createData()}
            bordered
            title={()=>'产品信息'}
            scroll={{x: '220%'}}
            columns={columns}
            rowKey={'id'}
            pagination={{
              size: 'small',
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
        </div>
      </div>
    )
  }
}
export default Details;