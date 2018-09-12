/*
 * @Author: yuwei 配货详情 /picking/details
 * @Date: 2018-07-24 13:16:33 
* @Last Modified time: 2018-07-24 13:16:33 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Card, Spin, Button, Modal , Input , Tooltip, message } from 'antd';
import { connect } from 'dva';
const Conform = Modal.confirm;


class DetailsPicking extends PureComponent{

  constructor(props){
    super (props)
    this.state = {
      detailsData: {},
      rigthDistribut: {},// 配货明细
      leftDataSource: [],
      rightDataSource: [], // 配货明细表格列表
      selectedRow: {}, // 选中行
      loading: false,
      selectedRowKey: [],
      applyStatus: null, // 单据状态
      hasStyle: null, // 表格选中某行index
    }
  }
  componentWillMount = () => {
    this.getDatailInfo();
  }
  getDatailInfo = () => {
    if (this.props.match.params.applyCode) {
      let { applyCode } = this.props.match.params;
      this.setState({ loading: true });
      this.props.dispatch({
        type:'outStorage/distributeDetail',
        payload: { applyCode },
        callback:(data)=>{
          this.setState({ 
            detailsData: data, 
            applyStatus: data.applyStatus, 
            loading: false, 
            leftDataSource: data.detailList 
          });
        }
      });
    }
  }
  // 配货
  distribite = () =>{
    this.distributeEvent('allocate')
  }
  //请求
  distributeEvent = (editType) =>{
    let values = {};
    values.applyCode = this.state.detailsData.applyCode;
    values.editType = editType;
    this.props.dispatch({
      type: 'outStorage/distributeEvent',
      payload: { ...values },
      callback: (data) =>{
        this.getDatailInfo();
        let msg;
        switch(editType){
          case 'allocate':
            msg = '配货';
            break;
          case 'cancel':
            msg = '取消';
            break;
          case 'addPick':
            msg = '拣货';
            break;
          default: 
            break;
        }
        return message.success(`${msg}成功`);
      }
    })
  }
  //生成拣货单
  onCreate = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        this.distributeEvent('addPick')
      },
      onCancel:()=>{}
    })
  }
  //确认配货 - 取消
  onCancel = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        this.distributeEvent('cancel');
      },
      onCancel:()=>{}
    })
  }
  // 查询配货明细的单条配货记录
  getDistributeDetail = (id) =>{
    this.setState({ rightLoading: true });
    this.props.dispatch({
      type: 'outStorage/getDistributeDetail',
      payload: { id },
      callback: (data) =>{
        this.setState({ rightDataSource: data.detailList, rightLoading: false, rigthDistribut: data })
      }
    })
  }
  onChange = (record,index, e) =>{
    let value = e.target.value;
    let newRightDataSource = [...this.state.rightDataSource];
      if (/^\d+$/.test(value)) {
        if (value > 99999999) {
          e.target.value  = 99999999;
          newRightDataSource[index].amount = 99999999;
          return message.warn('输入数值过大, 不能超过100000000')
        }
        else{
          newRightDataSource[index].amount = value;
        }
      } else {
          return message.warn('请输入非0正整数')
      }
    this.setState({  rightDataSource: newRightDataSource })
  }
  // 修改配货明细
  singleUpdateDetail = (id) =>{
    let { rightDataSource } = this.state;
    let detailList = [], postData = {};
    rightDataSource.map(item => detailList.push({ id: item.id, usableQuantity: item.amount }));
    postData.detailList = detailList;
    postData.id = id;
    this.props.dispatch({
      type: 'outStorage/singUpdate',
      payload: { ...postData },
      callback: () =>{
        
      }
    })
  }
  //时候禁用按钮
  isDisabled = (x, y) => {
    let {applyStatus} = this.state;
    return applyStatus === x || applyStatus === y;
  }

  render(){
    const { detailsData, leftDataSource, rightDataSource,
      applyStatus, loading, rightLoading, hasStyle
    } = this.state;
    const leftColumns = [
      {
        title: '通用名称',
        width:100,
        dataIndex: 'ctmmGenericName',
      },
      {
        title: '规格',
        width:150,
        dataIndex: 'ctmmSpecification',
        className:'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '剂型',
        width:150,
        dataIndex: 'ctmmDosageFormDesc',
      },
      {
        title: '生产厂家',
        width:150,
        dataIndex: 'ctmmManufacturerName',
      },
      {
        title: '单位',
        width:80,
        dataIndex: 'replanUnit',
      },
      {
        title: '申领数量',
        width:80,
        dataIndex: 'applyNum',
      },
      {
        title: '当前库存',
        width:80,
        dataIndex: 'totalStoreNum',
      },
      {
        title: '已分配',
        width:80,
        dataIndex: 'finishNum',
      },
      {
        title: '欠品数',
        width:80,
        dataIndex: 'lackNum',
      },
      {
        title: '预分配数',
        width:150,
        dataIndex: 'receiveNum'
      },
    ];
    const rightColumns =  [
      {
        title: '生产批号',
        width:150,
        dataIndex: 'lot',
      },
      {
        title: '生产日期',
        width: 100,
        dataIndex: 'productDate'
      },
      {
        title: '有效期至',
        width: 100,
        dataIndex: 'validEndDate',
      },
      {
        title: '可分配数',
        width: 90,
        dataIndex: 'allocationNum',
      },
      {
        title: '分配数',
        width: 110,
        dataIndex: 'amount',
        render:(text,record,index)=>{
          return record.detailDistributeStatus === '0'? 
          <span>{record.allocationNum}</span>
          : 
          <Input onInput={this.onChange.bind(this,record,index)} defaultValue={record.allocationNum}/>
        }
      }
    ];
    return (
      <div className='fadeIn ysynet-content'>
        <Card>
          <Spin spinning={loading}>
            <div className='ysynet-details-flex-header'>
              <h3>单据信息</h3>
              <div>
                {
                  applyStatus !== 5
                  &&
                  <div>
                    <div style={{ textAlign: 'right' }}>
                      <Button 
                        type='primary' 
                        disabled={this.isDisabled(3, 4)} 
                        className='button-gap' 
                        onClick={()=>this.distribite()}
                      >
                        配货
                      </Button>
                      <Button 
                        disabled={this.isDisabled(1, 2)}
                        className='button-gap'
                        onClick={()=>this.onCancel()} 
                      >
                        取消
                      </Button>
                      <Button 
                        disabled={this.isDisabled(1, 2)}
                        onClick={()=>this.onCreate()} 
                      >
                        生成拣货单
                      </Button>
                    </div>
                  </div> 
                }
              </div>
            </div>
            <Row>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>申领单</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.applyCode }</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>状态</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.applyStatusName }</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>申领部门</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.applyDeptName }</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>发起人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.createUserName }</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>发起时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.createDate }
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>联系电话</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.mobile }</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>药房地址</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.receiveAddress }</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>配货人</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.distributeUserName }</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>配货时间</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ detailsData.distributeDate }</div>
                </div>
              </Col>
            </Row>
            <hr className='hr'/>
          </Spin>
          <h3>产品信息</h3>
          <Row>
            <Col span={13} >
              <Table
                bordered
                loading={loading}
                scroll={{x: '100%'}}
                columns={leftColumns}
                dataSource={leftDataSource}
                rowKey={'id'}
                pagination={false}
                rowClassName={ (record, index) => index === hasStyle ? 'rowClassBg' : ''}
                onRow={ (record, index) => {
                  return {
                    onClick: () => {
                      let { id } = record;
                      if(this.state.selectedRow.id !== id){
                        this.setState({ hasStyle: index , selectedRow: record });
                        this.getDistributeDetail(id);
                      }
                      /* if(applyStatus !== '5'){
                        this.singleUpdateDetail(id)
                      } */
                    }
                  };
                }}

              />
            </Col>
            <Col span={10} offset={1}>
              <Table
                bordered
                scroll={{x: '100%'}}
                dataSource={rightDataSource}
                columns={rightColumns}
                loading={rightLoading}
                rowKey={'id'}
                pagination={false}
              />
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
export default connect(state => state)(DetailsPicking);