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
      activeKey: null,
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
        type:'outStorage/distributeDetail',
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
        message.success('操作成功！')
        const { history, dispatch } = this.props;
        let postData = {}, pickingDetail = [];
        let { selectedRows, detailsData } = this.state;
        selectedRows.map(item => pickingDetail.push({
          drugCode: item.drugCode,
          id: item.id,
          pickingNum: item.pickingNum,
          pickingOrderNo: item.pickingOrderNo
        }));
        postData.pickingDetail = pickingDetail;
        postData.applyNo = detailsData.applyNo;
        postData.pickingOrderNo = detailsData.pickingOrderNo;
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
    const { detailsData ,loading, activeKey, leftDataSource, rightDataSource } = this.state;
    const columns = [
      {
        title: '通用名称',
        width: 180,
        dataIndex: 'ctmmGenericName',
      },
      {
        title: '规格',
        width: 150,
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
        width: 150,
        dataIndex: 'productDate'
      },
      {
        title: '有效期至',
        width: 150,
        dataIndex: 'validEndDate'
      },
      {
        title: '包装规格',
        width: 150,
        dataIndex: 'packageSpecification',
      },
      {
        title: '单位',
        width: 150,
        dataIndex: 'replanUnit'
      },
      {
        title: '指示货位',
        width: 150,
        dataIndex: 'locName',
      },
      {
        title: '配货数量',
        width: 150,
        dataIndex: 'allocationNum',
      },
      {
        title: '实际拣货数量',
        width: 150,
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
      dataIndex: 'amount',
      render: (text,record)=> {
        return record.allocationNum ? record.allocationNum: 1
      }
    })
    return (
      <div className='bgf fadeIn'>
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
            onChange={(activeKey)=>this.setState({ activeKey })} 
            tabBarExtraContent={ activeKey  === '2' ? null: <Button  type='primary'  onClick={()=>this.onSubmit()}>确认拣货</Button>}>
            <TabPane tab="待拣货" key="1">
              <Table
                bordered
                dataSource={leftDataSource}
                scroll={{x: '200%'}}
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
                scroll={{x: '200%'}}
                loading={loading}
                columns={readyPickingColumns}
                pagination={false}
                rowKey={'id'}
              />
            </TabPane>
          </Tabs>
          
        </Card>
      </div>
    )
  }
}
export default connect(state => state)(DetailsPickSoldOut);