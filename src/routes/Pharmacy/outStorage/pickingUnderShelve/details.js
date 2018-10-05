/*
 * @Author: yuwei  拣货下架详情 /pickSoldOut/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Button, Modal, Tabs, message , InputNumber, Tooltip } from 'antd';
import { connect } from 'dva';
const TabPane = Tabs.TabPane; 
const Conform = Modal.confirm;
class DetailsPickSoldOut extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      detailsData: {},
      loading: false,
      activeKey: null,
      pickingStatus: null, // 拣货状态 显示tabs
      leftDataSource: [], // 待拣货
      rightDataSource: [], // 已拣货
      selected: [],
      selectedRows: []
    }
  }
  
  componentDidMount = () =>{
    if (this.props.match.params.pickingOrderNo) {
      let { pickingOrderNo } = this.props.match.params;
      this.setState({ loading: true });
      this.props.dispatch({
        type:'outStorage/getpickingDetail',
        payload: { pickingOrderNo },
        callback:(data)=>{
          this.setState({ 
            detailsData: data, 
            loading: false,
            leftDataSource: data.notDetail,
            rightDataSource: data.existDetail,
            pickingStatus: data.status,
            activeKey: data.status === 1? '1': '2'
          });
        }
      });
    }
  }
  //确认拣货
  onSubmit = () =>{
    let { selectedRows, detailsData } = this.state;
    if(selectedRows.length === 0) {
      return message.warning('至少选择一条数据');
    };
    console.log(detailsData);
    
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history, dispatch } = this.props;
        let postData = {}, pickingDetail = [];
        selectedRows.map(item => pickingDetail.push({
          drugCode: item.drugCode,
          id: item.id,
          pickingNum: item.amount ? item.amount : 1,
        }));
        postData.pickingDetail = pickingDetail;
        postData.applyNo = detailsData.applyOrder;
        postData.pickingOrderNo = detailsData.pickingOredr;
        dispatch({
          type: 'outStorage/finishPicking',
          payload: { ...postData },
          callback: () =>{
            history.push({pathname:"/pharmacy/outStorage/pickingUnderShelve"})
          }
        })
      },
      onCancel:()=>{}
    })
  }

  render(){
    const { detailsData ,loading, activeKey, leftDataSource, rightDataSource } = this.state;
    const columns = [
      {
        title: '通用名称',
        width: 168,
        dataIndex: 'ctmmGenericName',
      },
      {
        title: '规格',
        width: 168,
        dataIndex: 'ctmmSpecification',
        className:'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '生产厂家',
        width: 224,
        dataIndex: 'ctmmManufacturerName',
        className:'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '生产批号',
        width: 168,
        dataIndex: 'lot'
      },
      {
        title: '生产日期',
        width: 168,
        dataIndex: 'productDate'
      },
      {
        title: '有效期至',
        width: 168,
        dataIndex: 'validEndDate'
      },
      {
        title: '包装规格',
        width: 168,
        dataIndex: 'packageSpecification',
      },
      {
        title: '单位',
        width: 60,
        dataIndex: 'replanUnit'
      },
      {
        title: '指示货位',
        width: 168,
        dataIndex: 'locName',
      },
      {
        title: '配货数量',
        width: 112,
        dataIndex: 'allocationNum',
      },
      {
        title: '实际拣货数量',
        width: 168,
        dataIndex: 'amount',
        render:(text,record,index)=>{
          return <InputNumber
                    min={1}
                    max={record.allocationNum}
                    precision={0}
                    defaultValue={record.allocationNum ? record.allocationNum: 1} 
                    onChange={(value) => {
                      record.amount = value;
                    }}
                  />
        }
      },
    ];
    let readyPickingColumns = columns.slice(0,columns.length-1);
    readyPickingColumns.push({
      title: '实际拣货数量',
      width: 120,
      fixed: 'right',
      dataIndex: 'pickingNum'
    })
    return (
      <div className='fadeIn' style={{ padding: '0 16px' }}>
        <h3>单据信息 
          <Button style={{float:'right'}} icon='printer' onClick={()=> message.warning('敬请期待下个版本迭代内容')}>打印</Button>
        </h3>
        <Row>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
              <label>拣货单</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>{ detailsData.pickingOredr }</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
              <label>申领单</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>{ detailsData.applyOrder }</div>
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
              <label>状态</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>{ detailsData.statusName }</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
              <label>拣货时间</label>
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
              <div className='ant-form-item-control'>{ detailsData.pickingTime }</div>
            </div>
          </Col>
        </Row>
        <hr className='hr'/>
        <h3>产品信息</h3>
        <Tabs  
          activeKey={activeKey} 
          onChange={(activeKey)=>this.setState({ activeKey })} 
          tabBarExtraContent={ (activeKey  === '1' && leftDataSource.length > 0) ? <Button  type='primary'  onClick={()=>this.onSubmit()}>确认拣货</Button> : null}>
          <TabPane tab="待拣货" key="1">
            <Table
              bordered
              dataSource={leftDataSource}
              scroll={{x: 1684}}
              columns={columns}
              loading={loading}
              pagination={false}
              rowKey={'id'}
              rowSelection={{
                selectedRowKeys: this.state.selected,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
                }
              }}
            />
          </TabPane>
          <TabPane tab="已拣货" key="2">
            <Table
              bordered
              dataSource={rightDataSource}
              scroll={{x: 1684}}
              loading={loading}
              columns={readyPickingColumns}
              pagination={false}
              rowKey={'id'}
            />
          </TabPane>
        </Tabs>
        
      </div>
    )
  }
}
export default connect(state => state)(DetailsPickSoldOut);