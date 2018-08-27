import React , {PureComponent} from 'react';
import { Form, Row, Col, Button, Input, Select, Icon, Table, Tooltip, message, Modal  } from 'antd';
import { createData } from '../../../common/data';
import { Link } from 'react-router-dom';
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
    sm: { span: 6 },//5
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
                  <Input placeholder='请输入' />
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
  dataIndex: 'ctmmGenericName'
},
{
  title: '商品名',
  dataIndex: 'ctmmTradeName'
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
  title: '剂型',
  dataIndex: 'ctmmDosageFormDesc'
},
{
  title: '包装规格',
  dataIndex: 'ctmmPackingUnit'
},
{
  title: '单位',
  dataIndex: 'ctmmDosUom',
  render:(text)=>'g'
},
{
  title: '批准文号',
  dataIndex: 'approvalNo'
}]

class DrugDirectory extends PureComponent{
  state = {
    addVisible: false,
    addLoading: false
  }
  bitchEditConfirm = () =>{
    this.props.form.validateFields( (err,values) =>{
      if(!err){
        this.setState({ loading: true });
        console.log(values,'values');
        setTimeout(()=>{
          message.success('编辑成功');
          this.setState({ loading: false, visible: false, selected:[],selectedRows: [] })
        },500)
      }
    })
  }
  add = () =>{
    this.setState({ addVisible: true })
  }
  save = () =>{
   
    this.setState({ addLoading: true });
    setTimeout(()=>{
      message.success('添加成功');
    })
  }
  render(){
    const { addVisible, addLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const IndexColumns = [
      ...columns,
      {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName'
      },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        width: 100,
        render: (text,record)=>{
          return  <span>
            <Link to={{pathname: `/system/drugDirectory/directory/edit`}}>{'编辑'}</Link>
          </span>
        }
      },
    ];
    return (
    <div className='ysynet-main-content'>
      <WrappSearchForm />
      <Row className='ant-row-bottom'>
        <Col>
          <Button type='primary' onClick={this.add} style={{ margin: '0 8px' }}>新增</Button>
        </Col>
      </Row>
      <Modal
        title='新建'
        width={1000}
        visible={addVisible}
        onCancel={()=>this.setState({ addVisible: false })}
        footer={[
          <Button key="submit" type='primary' loading={addLoading} onClick={this.save}>
              确认
          </Button>,
          <Button key="back"  type='default' onClick={()=>this.setState({ addVisible: false })}>取消</Button>
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
            </Col>
            <Col span={10} push={1}>
              <FormItem {...singleFormItemLayout} label={`默认供应商`}>
                {
                  getFieldDecorator(`ctmmManufacturerName`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入默认供应商' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`包装规格`}>
                {
                  getFieldDecorator(`ctmmPackingUnit`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入包装规格' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`最小发药单位`}>
                {
                  getFieldDecorator(`spec`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入最小发药单位' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`采购单位`}>
                {
                  getFieldDecorator(`ctmmDosUom`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请选择采购单位' }]
                  })(
                    <Select>
                      <Option key={-1} value=''>请选择</Option>
                      <Option key={1} value='个'>个</Option>
                      <Option key={2} value='颗'>颗</Option>
                    </Select>
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`采购价格`}>
                {
                  getFieldDecorator(`ctmmRetailPrice`,{
                    initialValue: '',
                    rules: [{ required: true,message: '请输入采购价格' }]
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
              <FormItem {...singleFormItemLayout} label={`1包装规格 = `}>
                {
                  getFieldDecorator(`conversionRate`,{
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
      <Table 
        dataSource={createData()}
        bordered
        scroll={{x: '160%'}}
        columns={IndexColumns}
        rowKey={'id'}
        pagination={{
          size: 'small',
          showQuickJumper: true,
          showSizeChanger: true
        }}
      />
    </div>
    )
  }
}
export default Form.create()(DrugDirectory);