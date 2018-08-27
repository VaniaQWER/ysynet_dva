/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-27 11:41:01
 */
/* 
  @file  药库 - 入库--配送单验收-详情
*/
import React, { PureComponent } from 'react';
import { Table ,Row, Col, Tooltip, Input, DatePicker , Tabs , Button} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createData } from '../../../../common/data';
const TabPane = Tabs.TabPane;
const columns = [
  {
    title: '通用名称',
    dataIndex: 'geName',
    width:200,
  },
  {
    title: '商品名',
    width:220,
    dataIndex: 'productName'
  },
  {
    title: '规格',
    dataIndex: 'spec1',
    width: 180,
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '生产厂家',
    width:180,
    dataIndex: 'productCompany'
  },
  {
    title: '单位',
    dataIndex: 'unit',
    width: 180,
  },
  {
    title: '配送数量',
    dataIndex: 'amount',
    width: 120,
    render: (text,record,index)=> {
      return text || 100
    }
  },  
  {
    title: '生产批号',
    dataIndex: 'flot',
    width: 180,
    render: (text,record,index)=>{
      return <Input defaultValue={text || 'PH123'}/>
    }
  },
  {
    title: '生产日期',
    dataIndex: 'produceTime',
    width: 180,
    render: (text,record,index)=> {
      return <DatePicker defaultValue={moment(new Date()) } />
    }
  },
  {
    title: '有效期至',
    dataIndex: 'UserfulDate',
    width: 180,
    render: (text,record,index)=> {
      return <DatePicker defaultValue={moment(new Date()) } />
    }
  },
  {
    title: '验收温度',
    dataIndex: 'template',
    width: 120,
    render: (text,record,index)=> {
      return <Input defaultValue={text|| 5 } addonAfter={`℃`}/>
    }
  },
  {
    title: '包装规格',
    dataIndex: 'spe3c',
    width:180,
  },
  {
    title: '剂型',
    dataIndex: 'fmodel',
    width: 180,
  },
  {
    title: '供应商',
    dataIndex: 'fOrgName',
    width: 180,
    render: (text,record)=> `武汉供应商`
  },
  {
    title: '批准文号',
    width:180,
    dataIndex: 'approvalNo',
    render: (text,record,index)=>{
      return <Input defaultValue={text || 'PH123'}/>
    }
  },
  
  // {
  //   title: '包装单位',
  //   dataIndex: 'unit',
  //   width:120,
  // },
  // {
  //   title: '实际数量',
  //   dataIndex: 'sjamount',
  //   width: 150,
  //   render: (text,record,index)=> {
  //     return <Input defaultValue={text || 100}/>
  //   }
  // }, 
  // {
  //   title: '价格',
  //   dataIndex: 'price',
  //   render: (text,record,index)=> `10`
  // },
  // {
  //   title: '配送金额',
  //   dataIndex: 'total',
  //   render: (text,record,index)=> `1200.00`
  // },
 
  {
    title: '操作',
    width: 120,
    dataIndex: 'medicinalCode',
    render: (text,record) =>{
      return <span>
         <Link to={{pathname: `#`}}>增加验收批号</Link>
       </span>
    }
   },
];
class PslistCheck extends PureComponent{
  state = {
    selected: [],
    selectedRows: [],
  }
  callback = (key) =>{
    console.log(key);
  }
  render(){
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <h3>单据信息</h3>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>配送单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>PA002211807000086U</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>订单号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>PA002211807000086U</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>订单完成</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>类型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>药品配送单</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>国药药业集团</div>
              </div>
            </Col>
            {/* <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>制单人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>制单人</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>制单时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2015-09-03 15:00:02
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>验收人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>高晓松
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>验收时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-12 17:09:15</div>
              </div>
            </Col> */}
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>收货地址</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>这是一个药房的地址</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
          <Tabs defaultActiveKey="1" onChange={this.callback} tabBarExtraContent={<Button type='primary'>确认验收</Button>}>
            <TabPane tab="待验收" key="1"></TabPane>
            <TabPane tab="已验收" key="2"></TabPane>
          </Tabs>
         <Table
            dataSource={createData()}
            bordered
            scroll={{x: '160%'}}
            columns={columns}
            pagination={{
              size: 'small',
              showQuickJumper: true,
              showSizeChanger: true
            }}
            rowKey={'id'}
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
export default PslistCheck;
