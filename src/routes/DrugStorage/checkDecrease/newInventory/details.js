/**
 * @file 药库 - 盘点损益 - 新建盘点 - 详情(待确认)
 */
import React, { PureComponent } from 'react';
import {Row, Col, Input, Button, Modal, message, Tooltip} from 'antd';
import {checkDecrease} from '../../../../api/checkDecrease';
import RetomeTable from '../../../../components/TableGrid';
import {connect} from 'dva';
const {Search} = Input;
class Details extends PureComponent {
  state = {
    info: {},
    query: {
      checkBillNo: this.props.match.params.id
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'checkDecrease/getCheckbill',
      payload: {
        checkBillNo: this.props.match.params.id
      },
      callback: (data) => {
        if(data.msg === 'success') {
          this.setState({
            info: data.data
          });
        }else {
          message.error(data.msg);
          message.error('获取详情头部失败！');
        }
      }
    })
  }
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
  onSearch = (value) => {
    let {query} = this.state;
    query.paramName = value;
    this.setState({
      query: {...query}
    });
  }
  render() {
    let {info, query} = this.state;
    let columns = [
      {
        title: '货位',
        dataIndex: 'locName',
      },
      {
        title: '货位类型',
        dataIndex: 'positionTypeName',
      },
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName',
      },
      {
        title: '规格',
        dataIndex: 'ctmmSpecification',
        className: 'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName',
        width: 220,
      },
      {
        title: '包装规格',
        dataIndex: 'packageSpecification',
      },
      {
        title: '单位',
        dataIndex: 'unit',
      },
      {
        title: '账面库存',
        dataIndex: 'accountStoreNum',
      },
      {
        title: '实际数量',
        dataIndex: 'practicalRepertory',
        render:(text,record)=>{
          return <Input defaultValue={110} />
        }
      },
      {
        title: '盈亏数量',
        dataIndex: 'checkNum', 
        render: (text, record) => text? text : 0
      },
      {
        title: '账面批号',
        dataIndex: 'accountBatchNo',
      },
      {
        title: '实际批号',
        dataIndex: 'practicalBatch',
      },
      {
        title: '生产日期',
        dataIndex: 'productDate'
      },
      {
        title: '实际生产日期',
        dataIndex: 'realProductTime'
      },
      {
        title: '有效期至',
        dataIndex: 'accountEndTime'
      },
      {
        title: '实际有效期至',
        dataIndex: 'validEndTime',
        render: (text, record, index) => '2022-07-09'
      },
      {
        title: '单价',
        dataIndex: 'referencePrice'
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
              <h2>盘点单: <span>{info.checkBillNo || ''}</span></h2>
            </Col>
            {
              info.checkStatus === 1 ? 
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type='primary' style={{marginRight: 10}} onClick={this.recover}>盘点</Button>
              </Col> : null
            }
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.checkStatusName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>类型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.checkBillTypeName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>部门</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.checkBillDeptName || ''}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>制单人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.createUserName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>制单时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.createDate || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>起始时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.checkStartTime || ''}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>盘点时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.checkTime || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>提交时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.checkEndTime || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>备注</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.remarks || ''}</div>
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
                <div className='ant-form-item-control'>
                  <Search onSearch={this.onSearch} placeholder={'通用名称/商品名称'} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Row>
            <Col span={12}>
              <span style={{margin: 0, fontSize: 16, lineHeight: '32px'}}>产品信息</span>
            </Col>
            {
              info.checkStatus === 2 ? 
              <Col style={{textAlign: 'right'}} span={12}>
                <Button className='button-gap' onClick={this.confirm} >提交</Button>
              </Col> : null
            }
          </Row>
          <hr className="hr"/>
          <RetomeTable
            query={query}
            url={checkDecrease.GET_LIST_BY_BILLNO}
            scroll={{x: '280%'}}
            columns={columns}
            rowKey={'uuid'}
            rowSelection={{
              selectedRowKeys: this.state.selected,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
              }
            }}
          />
        </div>
      </div>
    )
  }
}
export default connect()(Details);