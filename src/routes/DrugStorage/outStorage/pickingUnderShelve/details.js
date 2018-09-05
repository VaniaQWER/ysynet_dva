/*
 * @Author: yuwei  拣货下架详情 /pickSoldOut/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Button, Modal ,Tabs , message , Input , Tooltip , Card} from 'antd';
import { connect } from 'dva';
const TabPane = Tabs.TabPane; 
const Conform = Modal.confirm;
class DetailsPickSoldOut extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      detailsData: {},
      loading: false,
      activeKey: this.props.match.params.pickingStatus === '1'? '1': '2',
      pickingStatus: null, // 拣货状态 显示tabs
      leftDataSource: [], // 待拣货
      rightDataSource: [], // 已拣货
      selected: [],
      selectedRows: []
    }
  }
  
  componentWillMount = () =>{
    if (this.props.match.params.pickingOrderNo) {
      let { pickingOrderNo, pickingStatus } = this.props.match.params;
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
            pickingStatus,
            activeKey: pickingStatus === '1'? '1': '2'
          });
        }
      });
    }
  }
  onChange = (record, index, e) => {
    let value = e.target.value;
    let { leftDataSource } = this.state;
    let newDataSource = [ ...leftDataSource ];
      if (/^\d+$/.test(value)) {
        if (value > record.allocationNum) {
          e.target.value  = record.allocationNum;
          newDataSource[index].amount = record.allocationNum;
          return message.warn(`输入数值过大, 不能超过${record.allocationNum}`)
        }
        else{
          newDataSource[index].amount = value;
        }
      } else {
         return message.warn('请输入非0正整数')
      }
      this.setState({ leftDataSource: newDataSource });
    }
  //确认拣货
  onSubmit = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        const { history, dispatch } = this.props;
        let postData = {}, pickingDetail = [];
        let { selectedRows, detailsData } = this.state;
        if(selectedRows.length === 0){
          return message.warning('请至少选中一条数据')
        }
        selectedRows.map(item => pickingDetail.push({
          drugCode: item.drugCode,
          id: item.id,
          pickingNum: item.amount,
        }));
        postData.pickingDetail = pickingDetail;
        postData.applyNo = detailsData.applyOrder;
        postData.pickingOrderNo = detailsData.pickingOredr;
        console.log(postData,'postData')
        dispatch({
          type: 'outStorage/finishPicking',
          payload: { ...postData },
          callback: () =>{
            history.push({pathname:"/drugStorage/outStorage/pickingUnderShelve"})
          }
        })
      },
      onCancel:()=>{}
    })
  }

  render(){
    const { detailsData ,loading, pickingStatus, activeKey, leftDataSource, rightDataSource } = this.state;
    const columns = [
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName',
      },
      {
        title: '规格',
        dataIndex: 'ctmmSpecification',
        className:'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '生产厂家',
        width: 150,
        dataIndex: 'ctmmManufacturerName'
      },
      {
        title: '生产批号',
        width: 150,
        dataIndex: 'ph'
      },
      {
        title: '生产日期',
        width: 160,
        dataIndex: 'productDate'
      },
      {
        title: '有效期至',
        width: 160,
        dataIndex: 'validEndDate'
      },
      {
        title: '包装规格',
        dataIndex: 'packageSpecification',
      },
      {
        title: '单位',
        width: 80,
        dataIndex: 'replanUnit'
      },
      {
        title: '指示货位',
        dataIndex: 'locName',
      },
      {
        title: '配货数量',
        width: 90,
        fixed: 'right',
        dataIndex: 'allocationNum',
      },
      {
        title: '实际拣货数量',
        width: 120,
        fixed: 'right',
        dataIndex: 'amount',
        render:(text,record,index)=>{
          return <Input
                    defaultValue={record.allocationNum ? record.allocationNum: 1} 
                    onInput={this.onChange.bind(this, record, index)}
                  />
        }
      },
    ];
    let readyPickingColumns = columns.slice(0,columns.length-1);
    readyPickingColumns.push({
      title: '实际拣货数量',
      width: 150,
      fixed: 'right',
      dataIndex: 'pickingNum',
    })
    return (
      <div className='bgf fadeIn' style={{ marginLeft: -16 }}>
        <Card>
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
                <div className='ant-form-item-control'>{ detailsData.status }</div>
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
            defaultActiveKey={activeKey}
            tabBarExtraContent={ activeKey  === '2' && pickingStatus === '2' ? null: <Button  type='primary'  onClick={()=>this.onSubmit()}>确认拣货</Button>}>
            <TabPane tab="待拣货" key="1">
              <Table
                bordered
                dataSource={leftDataSource}
                scroll={{x: '160%'}}
                columns={columns}
                loading={loading}
                pagination={false}
                rowKey={'bigDrugCode'}
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
                scroll={{x: '160%'}}
                loading={loading}
                columns={readyPickingColumns}
                pagination={false}
                rowKey={'bigDrugCode'}
              />
            </TabPane>
          </Tabs>
          
        </Card>
      </div>
    )
  }
}
export default connect(state => state)(DetailsPickSoldOut);