/*
 * @Author: yuwei  药品目录 - 编辑
 * @Date: 2018-07-24 10:58:49 
* @Last Modified time: 2018-07-24 10:58:49 
 */
import React, { PureComponent } from 'react';
import { Form , Row , Button , Col , Select , Input , Modal , Icon , Collapse , Radio , message} from 'antd';
import { connect } from 'dva';

const supplyFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  },
}
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
const RadioGroup = Radio.Group;
let uuid = 0;
let uuidSupply = 1;

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
    goodsTypeSelect:[],//补货指示货位
    supplierSelect:[],//供应商
    keys:[]
  }

  componentDidMount(){
    console.log(this.props.match.params.id)
    //获取当前药品目录详情信息
    this.props.dispatch({
      type:'drugStorageConfigMgt/GetDrugInfo',
      payload:{id:this.props.match.params.id},
      callback:(data)=>{
        console.log(data)
        this.setState({fillBackData:data.data})
         //获取补货单位下拉框
          this.props.dispatch({
            type:'drugStorageConfigMgt/GetUnitInfo',
            payload:{bigDrugCode:data.data.bigDrugCode},
            callback:(data)=>{
              console.log(data)
              this.setState({replanUnitSelect:data.data})
            }
          })

          //获取供应商信息
          this.props.dispatch({
            type:'drugStorageConfigMgt/getSupplier',
            payload:{hisDrugCode:data.data.hisDrugCode},
            callback:(data)=>{
              this.setState({supplierSelect:data.data})
            }
          })
      }
    })

    //获取补货指示h货位
    
    this.props.dispatch({
      type:'drugStorageConfigMgt/getGoodsTypeInfo',
      payload:{positionType:'1'},
      callback:(data)=>{
        this.setState({goodsTypeSelect:data.data})
      }
    })
  }
   

  //保存
  onSubmit = () =>{
    Comfirm({
      content:"确认保存吗？",
      onOk:()=>{
        this.props.form.validateFields((err,values)=>{
          console.log(values)

          const { customUnit ,  supplier , replanUnit , replanStore , purchaseQuantity ,
            upperQuantity , downQuantity  }  =values; 

            let postData = {
              customUnit,
              // supplier,
              drugInfo:{
                replanUnit , replanStore , purchaseQuantity ,
                upperQuantity , downQuantity ,
                drugCode:this.state.fillBackData.drugCode||'',
                bigDrugCode:this.state.fillBackData.bigDrugCode,
                hisDrugCode:this.state.fillBackData.hisDrugCode,
              }
            }
          console.log(JSON.stringify(postData));
          //发出请求
          this.props.dispatch({
            type:'drugStorageConfigMgt/EditOperDeptInfo',
            payload:postData,
            callback:(data)=>{
              message.success('保存成功！')
              const { history } = this.props;
              history.push({pathname:"/drugStorage/configMgt/drugDirectory"})
            }
          })
        })
      },
      onCancel:()=>{}
    })
  }

  //新增自定义单位
  addUnit = ()=>{
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  removeUnit = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    uuid--;
    let ret = []
    keys.filter((key,index) =>{
      if(key !== k){
        ret.push(index)
      }
      return key
    })
    ret = ret.map((item,index)=>{item=index;return item})
    form.setFieldsValue({
      keys: ret
    });
  }

  addSupply = ()=>{
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keySupply');
    const nextKeys = keys.concat(uuidSupply);
    uuidSupply++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keySupply: nextKeys,
    });
  }

  removeSupply = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keySupply');
    uuidSupply--;
    let ret = []
    keys.filter((key,index) =>{
      if(key !== k){
        ret.push(index)
      }
      return key 
    })
    ret = ret.map((item,index)=>{item=index;return item})
    form.setFieldsValue({
      keySupply: ret
    });
  }

  //获取使用单位
  getMaPInfo = (List,ind)=>{
    if(List && List.length){
      let ret =  List.filter(item=>item.sort===ind);
      return `${ret[0].bigUnit||''}  -  ${ret[0].conversionRate||''}${ret[0].smallUit||''}`
    }
  }

  render(){
    const { fillBackData , replanUnitSelect , goodsTypeSelect } =this.state;
    const { getFieldDecorator , getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: fillBackData?fillBackData.customUnit?fillBackData.customUnit:[]:[] });
    const keys = getFieldValue('keys');
    getFieldDecorator('keySupply', { initialValue: fillBackData?fillBackData.supplier?fillBackData.supplier:[]:[0] });
    const keySupply = getFieldValue('keySupply');
    const formItems = keys.map((k, index) => {
      return (
        <Col span={10} key={index}>
          <FormItem {...formItemLayout} label={`自定义包装${k+1}`}  key={k}>
            {
              getFieldDecorator(`customUnit[${k}].unitName`,{
                initialValue: '',
                rules:[{
                  required:true,message:"必填！"
                }]
              })(
                <Input  style={{ width: 50 }}/>
              )
            }
            = 
            <FormItem style={{display: 'inline-block'}}>
              {
                getFieldDecorator(`customUnit[${k}].unitCoefficient`,{
                  initialValue: '',
                  rules:[{
                    required:true,message:"必填！"
                  }]
                })(
                  <Input type='number' style={{ width: 80 ,marginRight: 8}}/>
                )
              }
            </FormItem>
            <FormItem style={{display: 'inline-block',marginRight:8}}>
              {
                getFieldDecorator(`customUnit[${k}].unit`,{
                  initialValue: '',
                  rules:[{
                    required:true,message:"必填！"
                  }]
                })(
                  <Select
                    style={{ width: 100 }}>
                      {
                        replanUnitSelect?
                        replanUnitSelect.map((item,index)=>(
                          <Option key={index} value={item.unitCode}>{item.unit}</Option>
                        )):null
                      }
                  </Select>
                )
              }
            </FormItem>
            {keys.length > 0 ? (
                <Icon
                  style={{marginRight:8}}
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.removeUnit(k)}
                />
            ) : null}
            {keys.length-1 === k ? (
                <Icon
                  className="dynamic-delete-button"
                  type="plus-circle-o"
                  onClick={() => this.addUnit(k)}
                />
            ) : null}
          </FormItem>
        </Col>
      )
    });
    const formItemSupply = keySupply.map((k, index) => {
      return (
        <Col span={12} key={index}>
          <FormItem {...supplyFormItemLayout} label={`供应商${k+1}`}  key={k}>
            {
              getFieldDecorator(`supplier[${k}].supplierName`,{
                initialValue: '',
              })(
                <Input  style={{ width: 150 }} disabled={true}/>
              )
            }
            价格  :  
            <FormItem style={{display: 'inline-block'}} >
              {
                getFieldDecorator(`supplier[${k}].supplierPrice`,{
                  initialValue: '',
                  rules:[{
                    required:true,message:"必填！"
                  }]
                })(
                  <Input type='number' style={{ width: 80 ,marginRight: 8}} addonAfter='元'/>
                )
              }
            </FormItem>
            <FormItem style={{display: 'inline-block',marginRight:8}}>
              {
                getFieldDecorator(`supplier[${k}].whetherDefault`,{
                  initialValue: '',
                  rules:[{
                    required:true,message:"必填！"
                  }]
                })(//onChange={this.onChange}
                  <RadioGroup >
                    <Radio value={1}>设为默认</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            {keySupply.length > 1 ? (
                <Icon
                  style={{marginRight:8}}
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.removeSupply(k)}
                />
            ) : null}
            {keySupply.length-1 === k ? (
                <Icon
                  className="dynamic-delete-button"
                  type="plus-circle-o"
                  onClick={() => this.addSupply(k)}
                />
            ) : null}
          </FormItem>
        </Col>
      )
    });
    console.log(fillBackData)
    return (
      <div className='fullCol fadeIn'>
        <div className='fullCol-fullChild'>
          <div style={{ display:'flex',justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: 'bold' }}>基本信息</h3>
            <Button type='primary' onClick={this.onSubmit}>保存</Button>
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
            <Panel header="单位信息" key="1" style={customPanelStyle}>
              <Row>
                <Col span={10}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>最小发药单位</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>片  =  1  片  {fillBackData?this.getMaPInfo(fillBackData.listTransforsVo,3) :''}</div>
                  </div>
                </Col>
                <Col span={10}>
                <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                  <label>包装规格</label>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                  <div className='ant-form-item-control'>盒  =  12  片  {fillBackData?this.getMaPInfo(fillBackData.listTransforsVo,2) :''}</div>
                </div>
                </Col>
                <Col span={10}>
                  <div className="ant-form-item-label-left ant-col-xs-24 ant-col-sm-5">
                    <label>整包装单位</label>
                  </div>
                  <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-18">
                    <div className='ant-form-item-control'>箱  =  24  盒 {fillBackData?this.getMaPInfo(fillBackData.listTransforsVo,1) :''}</div>
                  </div>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} label={`补货单位`}>
                    {
                      getFieldDecorator(`replanUnit`,{
                        initialValue:fillBackData?fillBackData.replanUnit:'',
                        rules:[{
                          required:true,message:"请选择补货单位！"
                        }]
                      })(
                        <Select
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
                <Col span={10} style={{display: !keys.length ? 'block':'none'}}>
                  <Button onClick={this.addUnit}><Icon type="plus"   />添加自定义单位</Button>
                </Col>
                
                {formItems}
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
                        <Input placeholder='请输入' />
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} label={`采购量`}>
                    {
                      getFieldDecorator(`purchaseQuantity`,{
                        initialValue: fillBackData?fillBackData.purchaseQuantity:'',
                        rules:[{
                          required:true,message:"请填写采购量！"
                        }]
                      })(
                        <Input />
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
                        <Input placeholder='请输入' />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Panel>

            <Panel header="供应商" key="3" style={customPanelStyle}>
              {formItemSupply}
            </Panel>

            <Panel header="指示货位" key="4" style={customPanelStyle}>
              <Row>
                <Col span={10}>
                  <FormItem {...formItemLayout} label={`补货指示货位`}>
                    {
                      getFieldDecorator(`replanStore`,{
                        initialValue:fillBackData?fillBackData.replanStore:'',
                        rules:[
                          {required:true,message:'请选择补货指示货位！'}
                        ]
                      })(
                        <Select
                        style={{ width: 200 }}
                      >
                        {
                          goodsTypeSelect && goodsTypeSelect.length ?
                          goodsTypeSelect.map((item,index)=>(
                            <Option key={index} value={item.id}>{item.positionName}</Option>
                          )):null
                        }
                      </Select>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Panel>

            <Panel header="药品信息" key="5" style={customPanelStyle}>
              {/* <Row>
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
              </Row> */}
            </Panel>

          </Collapse>
        </Form>
      </div>
    )
  }
}
export default connect(state=>state)(Form.create()(EditDrugDirectory));