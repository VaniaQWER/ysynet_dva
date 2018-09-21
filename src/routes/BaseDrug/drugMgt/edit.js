/*
 * @Author: yuwei  药品目录 - 编辑
 * @Date: 2018-07-24 10:58:49 
* @Last Modified time: 2018-07-24 10:58:49 
 */
import React, { PureComponent } from 'react';
import { Form , Row , Button , Col , Select , InputNumber , Modal , Collapse , message} from 'antd';
import { connect } from 'dva';
import querystring from 'querystring';
const formItemLayout ={
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  },
}
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;
const Comfirm = Modal.confirm;

const customPanelStyle = {
  background: '#fff',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
}

class EditDrugDirectory extends PureComponent{

  state={
    fillBackData:{},//药品目录详情信息
    replanUnitSelect:[],//补货单位下拉框
    minUnit: '',        //最小单位
    packUnit: '',       //包装单位
    packageSpecification: '',   //包装规格
    saveLoading: false,
    max: 0,
    min: 0,
    id: ''
  }

  componentDidMount(){
    let info = this.props.match.params.id;
    info = querystring.parse(info);

    //获取当前药品目录详情信息
    this.props.dispatch({
      type: 'drugMgt/getHisMedicineInfo',
      payload: {
        bigDrugCode: info.bCode,
        drugCode: info.dCode
      },
      callback: (data) => {
        this.setState({
          fillBackData: data,
          bigDrugCode: info.bCode,
          max: data.upperQuantity,
          min: data.downQuantity,
          id: info.id
        });
      }
    });
    //获取补货单位下拉框
    this.props.dispatch({
      type: 'drugMgt/getUnitInfo',
      payload: {
        bigDrugCode: info.bCode
      },
      callback: (data) => {
        this.setState({
          replanUnitSelect: data
        });
      }
    });
    //获取转换关系
    this.props.dispatch({
      type: 'drugMgt/getHisMedicineTransfor',
      payload: {
        bigDrugCode: info.bCode
      },
      callback: (data) => {
        let minUnit = data.filter(item => item.sort === 3);
        let packUnit = data.filter(item => item.sort === 1);
        let packageSpecification = data.filter(item => item.sort === 2);
        if(minUnit.length) {
          minUnit = this.unitTransform(minUnit);
        }else {
          minUnit = '';
        };
        packUnit = this.unitTransform(packUnit);
        packageSpecification = this.unitTransform(packageSpecification);
        this.setState({
          minUnit,
          packUnit,
          packageSpecification
        });
      }
    })
  }

  unitTransform(unitList) {
    console.log(unitList);
    
    let {bigUnit, conversionRate, smallUit} = unitList[0];
    return `${bigUnit} = ${conversionRate} ${smallUit}`;
  }

  //保存
  onSubmit = () =>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        Comfirm({
          content:"确认保存吗？",
          onOk:()=>{
            this.setState({saveLoading: true});
            let {replanUnitCode, ...otherValue} = values;
            let {replanUnitSelect, fillBackData, bigDrugCode, id} = this.state;
            let {unit} = replanUnitSelect.filter(item => item.unitCode === replanUnitCode)[0];
            let params = {
              unit,
              unitCode: replanUnitCode,
              ...otherValue,
              bigDrugCode,
              hisDrugCode: fillBackData.hisDrugCode,
              id
            };
            this.props.dispatch({
              type: 'drugMgt/getHisMedicineBound',
              payload: params,
              callback: (data) => {
                message.success('编辑成功');
                this.props.history.push('/baseDrug/drugMgt/drugCatalog');
              }
            })
          },
          onCancel:()=>{}
        })
      }
    })
  }

  changeQuantity = (value, stateName) => {
    let {min, max} = this.state;
    if(stateName === 'min' && value > max) {
      return message.warning('库存下限不能超过库存上限！');
    }
    if(stateName === 'max' && value < min) {
      return message.warning('库存上限不能低于库存下限！');
    }
    this.setState({
      [stateName]: value? value : 0
    });
  }

  getLayoutInfo = (label,val)=>(
    <Col span={8}>
      <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-8">
        <label>{label}</label>
      </div>
      <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
        <div className='ant-form-item-control'>
          {val}
        </div>
      </div>
    </Col>
  )

  render(){
    const {fillBackData, saveLoading, replanUnitSelect, minUnit, packUnit, packageSpecification, min, max} =this.state;
    const { getFieldDecorator } = this.props.form;
    // getFieldDecorator('keys', { initialValue: fillBackData?fillBackData.customUnit?fillBackData.customUnit:[]:[] });
    return (
      <div className='fullCol fadeIn fixHeight'>
        <div className='fullCol-fullChild'>
          <div style={{ display:'flex',justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: 'bold' }}>基本信息</h3>
            <Button type='primary' loading={saveLoading} onClick={this.onSubmit}>保存</Button>
          </div>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>通用名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.ctmmGenericName:''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>商品名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.ctmmTradeName:''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>别名</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.ctmmAnotherName:''}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                <label>规格</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.ctmmSpecification:''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>包装规格</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.packageSpecification:''}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>剂型</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.ctmmDosageFormDesc:''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>生产厂家</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.ctmmManufacturerName:''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>批准文号</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.approvalNo:''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>药品编码</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.hisDrugCode:''}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>状态</label>
              </div>
              <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                <div className='ant-form-item-control'>{fillBackData?fillBackData.ctmmStatusCode==="1"?'停用':'启用':''}</div>
              </div>
            </Col>
          </Row>
        </div>
        <Form className='leftLable'>
          <Collapse bordered={false} style={{backgroundColor:'#f0f2f5', marginLeft: '-12px', marginRight: '-12px'}} defaultActiveKey={['1','2','3','4','5']}>
            <Panel header="使用单位" key="1" style={customPanelStyle}>
              <Row>
                <Col span={10}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>最小发药单位</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>{minUnit}</div>
                  </div>
                </Col>
                <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>包装规格</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>{packageSpecification}</div>
                </div>
                </Col>
                <Col span={10}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>整包装单位</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>{packUnit}</div>
                  </div>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} label={`补货单位`}>
                    {
                      getFieldDecorator(`replanUnitCode`,{
                        initialValue:fillBackData?fillBackData.replanUnitCode: undefined,
                        rules:[{
                          required:true,message:"请选择补货单位！"
                        }]
                      })(
                        <Select
                          placeholder="请选择补货单位"
                          style={{ width: 200 }}>
                            {
                              replanUnitSelect && replanUnitSelect.length?
                              replanUnitSelect.map((item,index)=>(
                                <Option key={index} value={item.unitCode}>{item.unit}</Option>
                              )):null
                            }
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Panel>

            <Panel header="库存上下限" key="2" style={customPanelStyle}>
              <Row>
                <Col span={10}>
                  <FormItem {...formItemLayout} label={`本部门上限`}>
                    {
                      getFieldDecorator(`upperQuantity`,{
                        initialValue:fillBackData?fillBackData.upperQuantity:''
                      })(
                        <InputNumber
                          onChange={(value) => {this.changeQuantity(value, 'max')}}
                          min={min}
                          precision={0}
                          style={{width: '100%'}}
                          placeholder='请输入' />
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} label={`采购量`}>
                    {
                      getFieldDecorator(`purchaseQuantity`,{
                        initialValue: fillBackData?fillBackData.purchaseQuantity : ''
                      })(
                        <InputNumber
                          min={0}
                          precision={0}
                          style={{width: '100%'}}
                          placeholder='请输入'/>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <FormItem {...formItemLayout} label={`本部门下限`}>
                    {
                      getFieldDecorator(`downQuantity`,{
                        initialValue: fillBackData?fillBackData.downQuantity:'',
                      })(
                        <InputNumber
                          onChange={(value) => {this.changeQuantity(value, 'min')}}
                          precision={0}
                          min={0}
                          max={max}
                          style={{width: '100%'}}
                          placeholder='请输入' />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Panel>

            <Panel header="药品信息" key="3" style={customPanelStyle}>
              <Row className='fixHeight'>
                {this.getLayoutInfo('药品名称',fillBackData?fillBackData.ctmmDesc:'')}
                {this.getLayoutInfo('药品剂量',fillBackData?fillBackData.ctphdmiDosageUnitDesc:'')}
                {this.getLayoutInfo('药学分类描述',fillBackData?fillBackData.ctphdmiCategoryDesc:'')}
                {this.getLayoutInfo('管制分类描述',fillBackData?fillBackData.ctphdmiRegulatoryClassDesc:'')}
                {this.getLayoutInfo('危重药物标志',fillBackData?fillBackData.ctmmCriticalCareMedicine:'')}
                {this.getLayoutInfo('抗菌药物标志',fillBackData?fillBackData.ctmmAntibacterialsign:'')}
                {this.getLayoutInfo('国家基本药物标记',fillBackData?fillBackData.ctmmEssentialMedicine:'')}
                {this.getLayoutInfo('贵重标记',fillBackData.ctmmValuableSign?fillBackData.ctmmValuableSign==="1"?'Y':'N':'')}
                {this.getLayoutInfo('皮试标志',fillBackData.ctmmSkintestSign?fillBackData.ctmmSkintestSign==="1"?'Y':'N':'')}
                {this.getLayoutInfo('冷藏标识',fillBackData.refrigerateType?fillBackData.refrigerateType==="1"?'Y':'N':'')}
                {this.getLayoutInfo('停用标记',fillBackData.ctmmStatusCode?fillBackData.ctmmStatusCode==="1"?'Y':'N':'')}
               
               {/* 
                {this.getLayoutInfo('适应症',12)}
                {this.getLayoutInfo('禁忌症',12)}
                {this.getLayoutInfo('不良反应',12)}
                {this.getLayoutInfo('相互作用',12)}
                {this.getLayoutInfo('年龄限制',12)}
                {this.getLayoutInfo('疗程描述',12)}
                {this.getLayoutInfo('频次描述',12)}
                {this.getLayoutInfo('注意事项',12)}
                {this.getLayoutInfo('原描述',12)} */}
              </Row>
            </Panel>

          </Collapse>
        </Form>
      </div>
    )
  }
}
export default connect(state=>state)(Form.create()(EditDrugDirectory));