/*
 * @Author: yuwei  药品目录 - 编辑
 * @Date: 2018-07-24 10:58:49 
* @Last Modified time: 2018-07-24 10:58:49 
 */
import React, { PureComponent } from 'react';
import { Form , Row  , Col , Select , Modal} from 'antd';
const Option = Select.Option;
const Comfirm = Modal.confirm;
class EditDrugDirectory extends PureComponent{

  onSubmit = () =>{
    Comfirm({
      content:"确认保存吗？",
      onOk:()=>{
        const { history } = this.props;
        history.push({pathname:"/drugStorage/configMgt/drugDirectory"})
      },
      onCancel:()=>{}
    })
  }
  render(){
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <div style={{ display:'flex',justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: 'bold' }}>基本信息</h3>
          </div>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>通用名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>注射用复方甘草酸苷</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>商品名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>注射用复方甘草酸苷</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>别名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'></div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>规格</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>0.25g</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>包装规格</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>0.25gX12片
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>剂型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>注射剂</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>生产厂家</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>这是一个生产厂家地址</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>批准文号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>国药准字H20066358</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>启用</div>
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
                  <div className='ant-form-item-control'>箱  =  24  盒</div>
                </div>
              </Col>
              <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>补货单位</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    <Select 
                      defaultValue={'00'}
                      style={{ width: 200 }}>
                      <Option key={-1} value='00'>{'箱'}</Option>
                    </Select>
                  </div>
                </div>
              </Col>
              <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>开票单位</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>
                    <Select 
                      defaultValue={'00'}
                      style={{ width: 90 }}>
                      <Option key={'-1'} value={'00'}>{'板'}</Option>
                    </Select>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className='detailCard'>
            <h3>供应商</h3>
            <hr className='hr'/>
            <Row>
              <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>默认供应商</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-14">
                  <div className='ant-form-item-control'>
                    <Select defaultValue='00'>
                      <Option key={-1} value='00'>华润医药集团</Option>
                      <Option key={-1} value='01'>九州通</Option>
                    </Select>
                    <span>单价: <label>10.00</label></span>
                  </div>
                </div>
              </Col>
              <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>备选供应商一</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-14">
                  <div className='ant-form-item-control'>
                    <Select defaultValue='00'>
                      <Option key={-1} value='00'>九州通</Option>
                      <Option key={-1} value='01'>华润医药集团</Option>
                    </Select>
                    <span>单价: <label>10.00</label></span>
                  </div>
                </div>
              </Col>
              <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>备选供应商二</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-14">
                  <div className='ant-form-item-control'>
                    <Select defaultValue='02'>
                      <Option key={-1} value='00'>九州通</Option>
                      <Option key={-1} value='01'>华润医药集团</Option>
                      <Option key={-1} value='02'>上海医药</Option>
                    </Select>
                    <span>单价: <label>10.00</label></span>
                  </div>
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
export default Form.create()(EditDrugDirectory);