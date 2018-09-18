/**
 * @file 药房 - 日对账单 - 详情
 */
import React, { PureComponent } from 'react';
import { Row, Col, Input, message, Tooltip } from 'antd';
import RemoteTable from '../../../../components/TableGrid';
import FetchSelect from '../../../../components/FetchSelect';
import {settlementMgt, common} from '../../../../api/purchase/purchase';
import {connect} from 'dva';
const {Search} = Input;


class Details extends PureComponent {
  state = {
    info: {},
    vaule: undefined,
    query: {
      settleBillNo: this.props.match.params.id,
      drugCodeList: [],
      dispensingNo: ''
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'settlementMgt/settleDetail',
      payload: {settleBillNo: this.state.query.settleBillNo},
      callback: (data) => {
        if(data.msg === 'success') {
          this.setState({
            info: data.data
          });
        }else {
          message.error(data.msg);
        }
      } 
    })
  }
  changeFetchSelect = (value) => {
    let {query} = this.state;
    query = {
      ...query,
      drugCodeList: value? [value] : []
    };
    this.setState({
      value,
      query
    });
  }
  changeSelect = (value) => {
    let {query} = this.state;
    query = {
      ...query,
      dispensingNo: value
    };
    this.setState({
      query
    });
  }
  render() {
    let {info, query, value} = this.state;
    const columns = [
      {
        title: '通用名',
        dataIndex: 'ctmmGenericName'
      },
      {
        title: '商品名',
        dataIndex: 'drugName',
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
        title: '包装规格',
        dataIndex: 'packageSpecification',
        width: 200,
      },
      {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName'
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNo',
      },
      {
        title: '结算单位',
        dataIndex: 'replanUnit'
      },
      {
        title: '结算数量',
        dataIndex: 'settleQty'
      },
      {
        title: '结算价格',
        dataIndex: 'settlePrice'
      },
      {
        title: '结算金额',
        dataIndex: 'settleAmount'
      },
      // {
      //   title: '结余单位',
      //   dataIndex: 'surplusUnit'
      // },
      // {
      //  title: '上期结余',
      //  dataIndex: 'prevSurplus'
      // },
      // {
      //   title: '本期结余',
      //   dataIndex: 'nowSurplus'
      // }
    ];
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild'>
          <Row>
            <Col span={12}>
              <h2>结算单: <span>{info.settleBillNo || ''}</span></h2>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.settleStatusName || ''}</div>
              </div>
            </Col>
            {/* <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>账期</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-07-16 09:05:06 ~2018-07-16 09:05:06</div>
              </div>
            </Col> */}
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>供应商</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.ctmaSupplierName || ''}</div>
              </div>
            </Col>
            {/* <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>对账人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>对账完成时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>结算人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>张三三</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>结算时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>2018-7-24 16:45:15</div>
              </div>
            </Col> */}
          </Row>
          <div style={{borderBottom: '1px dashed #d9d9d9', marginBottom: 10}}></div>
          <Row align="middle">
            <Col span={8}>
              <div className="ant-row">
                <div className="ant-col-4 ant-form-item-label-left">
                  <label>单号</label>
                </div>
                <div className="ant-col-18">
                  <div className="ant-form-item-control">
                    <Search 
                      placeholder='发药单/出库单'
                      onSearch={this.changeSelect}
                     />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-row">
                <div className="ant-col-4 ant-form-item-label-left">
                  <label>名称</label>
                </div>
                <div className="ant-col-18">
                  <div className="ant-form-item-control">
                    <FetchSelect
                      allowClear
                      value={value}
                      style={{width: '100%'}}
                      url={common.QUERY_DRUG_BY_LIST}
                      placeholder='通用名/产品名/生产厂家/供应商'
                      cb={this.changeFetchSelect}
                     />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="detailCard">
          <Row>
              <Col span={4} style={{ paddingBottom: 10, borderBottom: '1px solid #f5f5f5' }} >产品信息</Col>
          </Row>
          <RemoteTable
            isJson={true}
            query={query}
            url={settlementMgt.DETAIL_LIST}
            scroll={{x: '220%'}}
            columns={columns}
            rowKey={'id'}
            style={{marginTop: 24}}
          />
        </div>
      </div>
    )
  }
}
export default connect(state=>state)(Details);
