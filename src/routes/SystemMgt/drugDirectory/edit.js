/*
 * @Author: yuwei  药品目录 - 编辑
 * @Date: 2018-07-24 10:58:49 
* @Last Modified time: 2018-07-24 10:58:49 
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col} from 'antd';
import { connect } from 'dva';
class EditDrugDirectory extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      baseData: {}
    }
  }
  componentDidMount = () =>{
    const { bigDrugCode, medDrugType } = this.props.match.params;
    this.props.dispatch({
      type: 'drugDirectory/getMedicineInfo',
      payload: { bigDrugCode , medDrugType },
      callback: (data) =>{
        this.setState({ baseData: data })
      }
    })
  }
  render(){
    const { baseData } = this.state;
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <div style={{ display:'flex',justifyContent: 'space-between' }}>
            <h3><b>基本信息</b></h3>
          </div>
          <Row gutter={30}>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>通用名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.ctmmGenericName ? baseData.ctmmGenericName: ''  }</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>商品名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.ctmmTradeName ? baseData.ctmmTradeName: ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>别名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.ctmmAnotherName ? baseData.ctmmAnotherName: ''}</div>
              </div>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>规格</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.ctmmSpecification ? baseData.ctmmSpecification: ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>包装规格</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.ctmmSpecification ? baseData.ctmmSpecification: ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>剂型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.ctmmDosageFormDesc ? baseData.ctmmDosageFormDesc: ''}</div>
              </div>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>生产厂家</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.ctmmManufacturerName ? baseData.ctmmManufacturerName: ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>批准文号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.approvalNo ? baseData.approvalNo: ''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-19">
                <div className='ant-form-item-control'>{ baseData.statusName ? baseData.statusName: ''}</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='detailCard'>
            <h3>单位信息</h3>
            <hr className='hr'/>
            <Row>
              <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>最小发药单位</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>片  =  1  片</div>
                </div>
              </Col>
              <Col span={10}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>包装规格</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>盒  =  12  片</div>
              </div>
              </Col>
              <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>整包装单位</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{ `${baseData.ctmmPackingUnit} = ${baseData.ctmmPackingCoefficient}` }</div>
                </div>
              </Col>
            </Row>
          </div>
          <div className='detailCard'>
            <h3>药品信息</h3>
            <hr className='hr'/>
            <Row>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>一类精神药品</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    非一类精神药品
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>二类精神药品</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    非二类精神药品
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>基药标识</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    非基药
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>是否胰岛素</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    否
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>报告药</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    非报告药
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>活动中标识</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    活动中
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>皮试用药</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    不需要皮试
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>抗生素级别</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    0
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>毒麻药品</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    非毒麻药品
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-6">
                  <label>贵重标识</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    否
                  </div>
                </div>
              </Col>
            </Row>
          </div>
      </div>
    )
  }
}
export default connect()(Form.create()(EditDrugDirectory))