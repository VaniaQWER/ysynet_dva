/*
 * @Author: yuwei  拣货下架详情 /pickSoldOut/details
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Button, Modal ,Tabs , message , Input , Tooltip , Card} from 'antd';
import { createData } from '../../../../common/data';
const TabPane = Tabs.TabPane; 
const Conform = Modal.confirm;
class DetailsPickSoldOut extends PureComponent{

  //确认
  onSubmit = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history } = this.props;
        history.push({pathname:"/drugStorage/outStorage/pickingUnderShelve"})
      },
      onCancel:()=>{}
    })
  }

  onPrint = () => {
    Conform({
      content:"您确定要打印？",
      onOk:()=>{
        message.success('打印成功！')
      },
      onCancel:()=>{}
    })
  }

  render(){
    const columns = [
      {
        title: '通用名称',
        width: 180,
        dataIndex: 'productName1',
        render:(text,record)=>record.productName
      },
      {
        title: '规格',
        width: 150,
        dataIndex: 'spec',
        className:'ellipsis',
        render:(text)=>(
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      },
      {
        title: '生产厂家',
        width: 150,
        dataIndex: 'productCompany1',
      },
      {
        title: '生产批号',
        width: 150,
        dataIndex: 'productCompany2',
      },
      {
        title: '生产日期',
        width: 150,
        dataIndex: 'productCompany3',
      },
      {
        title: '有效期至',
        width: 150,
        dataIndex: 'productCompany4',
      },
      {
        title: '包装规格',
        width: 150,
        dataIndex: 'unit',
        render:(text)=>'g'
      },
      {
        title: '单位',
        width: 150,
        dataIndex: 'unit1',
      },
      {
        title: '指示货位',
        width: 150,
        dataIndex: 'productCompany23',
      },
      {
        title: '配货数量',
        width: 150,
        dataIndex: 'productCompany12',
      },
      {
        title: '实际拣货数量',
        width: 150,
        dataIndex: 'productCompany5',
        render:(text)=>(<Input/>)
      },
    ];
    return (
      <div className='bgf fadeIn'>
        <Card>
          <h3>单据信息 
            <Button style={{float:'right'}} onClick={()=>this.onPrint()}>打印</Button>
          </h3>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>拣货单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>JN00221180700005JS</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>申领单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>PA002211807000086U</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>申领部门</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>静配中心</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>待拣货</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>拣货时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'></div>
              </div>
            </Col>
          </Row>
          <hr className='hr'/>
          <h3>产品信息</h3>

          <Tabs tabBarExtraContent={<Button  type='primary'  onClick={()=>this.onSubmit()}>确认拣货</Button>}>
            <TabPane tab="待拣货" key="1"></TabPane>
            <TabPane tab="已拣货" key="2"></TabPane>
          </Tabs>

          <Table
            dataSource={createData()}
            bordered
            scroll={{x: '200%'}}
            columns={columns}
            rowKey={'id'}
            rowSelection={{
              onChange:(key,row)=>{
                console.log(key,row)
              }
            }}
            pagination={{
              size: 'small',
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
        </Card>
      </div>
    )
  }
}
export default DetailsPickSoldOut;