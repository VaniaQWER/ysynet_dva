/**
 * @file 药库 - 盘点损益 - 新建盘点 - 详情(待确认)
 */
import React, { PureComponent } from 'react';
import {Row, Col, Input, message, Tooltip} from 'antd';
import {profiLossRecord} from '../../../../api/checkDecrease';
import RetomeTable from '../../../../components/TableGrid';
import {connect} from 'dva';
import querystring from 'querystring';
const {Search} = Input;
class Details extends PureComponent {
  constructor(props) {
    super(props);
    let info = this.props.match.params.id;
    info = querystring.parse(info);
    this.state = {
      info: {},
      query: {
        checkBillNo: info.checkBillNo
      },
      causticExcessiveNo: info.causticExcessiveNo
    }
  }
  
  componentDidMount() {
    this.getDetail();
  }
  getDetail = () => {
    this.props.dispatch({
      type: 'checkDecrease/getCausticexcessive',
      payload: {
        causticExcessiveNo: this.state.causticExcessiveNo
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
    });
  }
  //搜索
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
        title: '通用名',
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
        dataIndex: 'practicalRepertory'
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
        dataIndex: 'validEndTime'
      },
      {
        title: '单价',
        dataIndex: 'referencePrice'
      },
      {
        title: '盈亏金额',
        dataIndex: 'mount'
      }
    ];
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <Row>
            <Col span={12}>
              <h2>损益单: <span>{info.causticExcessiveNo || ''}</span></h2>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>盘点单</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.checkBillNo || ''}</div>
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
                <div className='ant-form-item-control'>{info.deptName || ''}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>生成人</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.createUserName || ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                <label>生成时间</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{info.createDate || ''}</div>
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
          </Row>
          <hr className="hr"/>
          <RetomeTable
            query={query}
            url={profiLossRecord.GET_LIST_BY_BILLNO}
            scroll={{x: '280%'}}
            columns={columns}
            rowKey={'id'}
          />
        </div>
      </div>
    )
  }
}
export default connect()(Details);