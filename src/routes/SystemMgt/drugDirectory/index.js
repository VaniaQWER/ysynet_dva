/*
 * @Author: wwb 
 * @Date: 2018-08-28 17:42:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-06 21:48:20
 */

import React , {PureComponent} from 'react';
import { Form, Row, Col, Button, Input, Select, Icon, Tooltip, Modal,Badge  } from 'antd';
import RemoteTable from '../../../components/TableGrid';
import { systemMgt } from '../../../api/systemMgt';
import { Link } from 'react-router-dom';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },//5
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  },
};
const singleFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },//5
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 }
  },
}

class SearchForm extends PureComponent{
  state = {
    display: 'none'
  }
  toggle = () => {
    const { display, expand } = this.state;
    this.setState({
      display: display === 'none' ? 'block' : 'none',
      expand: !expand
    })
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.query(values);
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { display, expand } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`名称`}>
              {
                getFieldDecorator(`ctmmDesc`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`剂型`}>
              {
                getFieldDecorator(`ctmmDosageFormDesc`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`规格`}>
              {
                getFieldDecorator(`ctmmSpecification`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`ctmmStatusCode`,{
                  initialValue: ''
                })(
                  <Select>
                    <Option value=''>全部</Option>
                    <Option value='0'>启用</Option>
                    <Option value='1'>停用</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`是否报告药`}>
              {
                getFieldDecorator('medDrugType',{
                  initialValue: ''
                })(
                  <Select>
                    <Option key={-1} value='1'>是</Option>
                    <Option key={-1} value='2'>否</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={expand ? 8: 24} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
             {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
           </a>
         </Col>
        </Row>
      </Form>
    )
  }
}
const WrappSearchForm = Form.create()(SearchForm);

const columns = [{
  title: '通用名称',
  dataIndex: 'ctmmGenericName',
  width: 168,
  render: (text,record) =>{
    return <span>
            <Link to={{pathname: `/sys/drugDirectory/directory/edit/${record.bigDrugCode}/${record.medDrugType}`}}>{text}</Link>
          </span>
  }
},
{
  title: '商品名',
  dataIndex: 'ctmmTradeName',
  width: 224,
},
{
  title: '规格',
  dataIndex: 'ctmmSpecification',
  width: 168,
  className: 'ellipsis',
  render:(text)=>(
    <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
  )
},
{
  title: '剂型',
  dataIndex: 'ctmmDosageFormDesc',
  width: 168,
},
{
  title: '包装规格',
  dataIndex: 'packageSpecification',
  width: 112,
},
{
  title: '药品编码',
  dataIndex: 'hisDrugCode',
  width: 224,
},
{
  title: '批准文号',
  dataIndex: 'approvalNo',
  width: 224,
}]

class DrugDirectory extends PureComponent{
  state = {
    addVisible: false,
    addLoading: false,
    query: {}
  }
  queryHandler = (query) => {
    this.setState({ query });
    this.refs.table.fetch(query);
  }
  add = () =>{
    this.setState({ addVisible: true })
  }
  save = (e) =>{
    e.preventDefault();
    let { dispatch, form } = this.props;
    form.validateFields((err,values)=>{
      this.setState({ addLoading: true });
      if(!err){
        values.medDrugType = '2';
        console.log(JSON.stringify(values),'values');
        dispatch({
          type: "drugDirectory/addMedicine",
          payload: {
            hisCtMedicineMaterial: values
          },
          callback: () =>{
            this.setState({ addVisible: false, addLoading: false });
            this.refs.table.fetch(this.state.query);
            this.props.form.resetFields()
          }
        })
      }else{
        this.setState({ addLoading: false });
      }
    })
    
    
  }
  render(){
    const { addVisible, addLoading, query } = this.state;
    const { getFieldDecorator } = this.props.form;
    const IndexColumns = [
      ...columns,
      {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName',
        width: 224,
      },
      {
        title: '状态',
        dataIndex: 'ctmmStatusCode',
        width: 112,
        fixed: 'right',
        render: text => <Badge status={text==="0" ? "success" :"error"} text={text==="0" ? "启用" :"停用"}/>
      },
    ];
    return (
    <div className='ysynet-main-content'>
      <WrappSearchForm query={this.queryHandler}/>
      <Row className='ant-row-bottom'>
        <Col>
          <Button type='primary' onClick={this.add} style={{ margin: '0 8px' }}>新增</Button>
        </Col>
      </Row>
      <Modal
        title='新建'
        width={1000}
        visible={addVisible}
        onCancel={()=>{this.setState({ addVisible: false });this.props.form.resetFields()}}
        footer={[
          <Button key="submit" type='primary' loading={addLoading} onClick={this.save}>
              确认
          </Button>,
          <Button key="back"  type='default' onClick={()=>{this.setState({ addVisible: false });this.props.form.resetFields()}}>取消</Button>
        ]}
      >
        <Form>
          <Row>
            <Col span={10}>
              <FormItem {...singleFormItemLayout} label={`通用名称`}>
                {
                  getFieldDecorator(`ctmmGenericName`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入通用名称' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`商品名`}>
                {
                  getFieldDecorator(`ctmmTradeName`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入商品名' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`规格`}>
                {
                  getFieldDecorator(`ctmmSpecification`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入规格' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`剂型`}>
                {
                  getFieldDecorator(`ctmmDosageFormDesc`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入剂型' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`生产厂家`}>
                {
                  getFieldDecorator(`ctmmManufacturerName`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入生产厂家' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
             
            </Col>
            <Col span={10} push={1}>
              <FormItem {...singleFormItemLayout} label={`批准文号`}>
                {
                  getFieldDecorator(`approvalNo`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入批准文号' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`包装规格`}>
                {
                  getFieldDecorator(`ctpHdmsCheckinUnitDesc`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入包装规格' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`最小发药单位`}>
                {
                  getFieldDecorator(`ctpHdmsBasicUnitDesc`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入最小发药单位' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`1包装规格 = `}>
                {
                  getFieldDecorator(`ctpHdmsPackConvfacCode`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入转换系数' }]
                  })(
                    <Input placeholder='请输入' addonAfter='最小发药单位'/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
      <RemoteTable
        ref='table'
        bordered
        query={query}
        url={systemMgt.MEDICINEMATERIAL_LIST}
        scroll={{x: 1624}}
        columns={IndexColumns}
        rowKey={'id'}
      />
    </div>
    )
  }
}
export default connect()(Form.create()(DrugDirectory))