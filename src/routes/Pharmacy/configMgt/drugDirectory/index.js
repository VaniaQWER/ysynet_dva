import React , {PureComponent} from 'react';
import { Form, Row, Col, Button, Input, Select, Icon, Table, Tooltip, message, Modal  } from 'antd';
import { createData } from '../../../../common/data';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;
const { Search } = Input;

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
                getFieldDecorator(`planNo`,{
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
                getFieldDecorator(`jx`,{
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
                getFieldDecorator(`fmodel`,{
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
                getFieldDecorator(`fstate`,{
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
                getFieldDecorator('type',{
                  initialValue: ''
                })(
                  <Select>
                    <Option key={-1} value='01'>是</Option>
                    <Option key={-1} value='00'>否</Option>
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
  dataIndex: 'productName1',
  render:(text,record)=>record.productName
},
{
  title: '商品名',
  dataIndex: 'productName'
},
{
  title: '规格',
  dataIndex: 'spec',
  className: 'ellipsis',
  render:(text)=>(
    <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
  )
},
{
  title: '剂型',
  dataIndex: 'fmodal'
},
{
  title: '包装规格',
  dataIndex: 'fmodel'
},
{
  title: '单位',
  dataIndex: 'unit',
  render:(text)=>'g'
},
{
  title: '批准文号',
  dataIndex: 'approvalNo'
}]

class DrugDirectory extends PureComponent{
  state = {
    selected: [],
    selectedRows: [],
    modalSelected: [],
    modalSelectedRows: [],
    visible: false,
    addVisible: false,
    loading: false,
    addLoading: false
  }
  // 批量设置上下限
  bitchEdit = () =>{
    const { selected } = this.state;
    if(selected.length === 0){
      return message.warning('请至少选中一条数据')
    }
    this.setState({ visible: true })
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
  remove = () =>{
    const { selected } = this.state;
    if(selected.length === 0){
      return message.warning('请至少选中一条数据')
    }
    Modal.confirm({
      title: '确认',
      content: '是否确认删除该产品',
      onOk(){
        console.log('OK 删除')
      },
      onCancel(){}
    })
  }
  add = () =>{
    this.setState({ addVisible: true })
  }
  addDrug = () =>{
    let { modalSelected } = this.state;
    if(modalSelected.length === 0){
      return message.warning('请至少勾选一项')
    }
    this.setState({ addLoading: true });
    setTimeout(()=>{
      message.success('添加成功');
      this.setState({ addLoading: false, addVisible: false, modalSelected:[],modalSelectedRows: [] })
    })
  }
  render(){
    const { visible, loading, addVisible, addLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const IndexColumns = [
      ...columns,
      {
        title: '生产厂家',
        dataIndex: 'productCompany'
      },
      {
        title: '库存上限',
        dataIndex: 'upperkcsl',
        width: 100
      },
      {
       title: '库存下限',
       dataIndex: 'lowerkcsl',
       width: 100
      },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        width: 100,
        render: (text,record)=>{
          return  <span>
            <Link to={{pathname: `/pharmacy/configMgt/drugDirectory/edit`}}>{'编辑'}</Link>
          </span>
        }
      },
    ];
    return (
    <div className='ysynet-main-content'>
      <WrappSearchForm />
      <Row className='ant-row-bottom'>
        <Col>
          <Button type='primary' onClick={this.bitchEdit}>批量设置上下限</Button>
          <Button type='default' onClick={this.add} style={{ margin: '0 8px' }}>新增</Button>
          <Button type='default' onClick={this.remove}>移除</Button>
        </Col>
      </Row>
      <Modal
        title={'批量编辑'}
        width={488}
        visible={visible}
        onCancel={()=>this.setState({ visible: false })}
        footer={[
          <Button key="submit" type='primary' loading={loading} onClick={this.bitchEditConfirm}>
              确认
          </Button>,
          <Button key="back"  type='default' onClick={()=>this.setState({ visible: false })}>取消</Button>
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label={`库存上限`}>
            {
              getFieldDecorator(`upper`,{
                initialValue: '',
                rules: [{  }]
              })(
                <Input placeholder='请输入'/>
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label={`库存下限`}>
            {
              getFieldDecorator(`lower`,{
                initialValue: '',
              })(
                <Input placeholder='请输入'/>
              )
            }
          </FormItem>
        </Form>
      </Modal>
      <Modal
        title='添加药品'
        width={1100}
        visible={addVisible}
        onCancel={()=>this.setState({ addVisible: false })}
        footer={[
          <Button key="submit" type='primary' loading={addLoading} onClick={this.addDrug}>
              确认
          </Button>,
          <Button key="back"  type='default' onClick={()=>this.setState({ addVisible: false })}>取消</Button>
        ]}
      >
        <Search placeholder='通用名/商品名/生产厂家' style={{ width: 256 }}/>
        <Table 
          dataSource={createData()}
          bordered
          scroll={{x: '100%'}}
          columns={columns}
          rowKey={'id'}
          pagination={{
            size: 'small',
            showQuickJumper: true,
            showSizeChanger: true
          }}
          rowSelection={{
            selectedRowKeys: this.state.modalSelected,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({modalSelected: selectedRowKeys, modalSelectedRows: selectedRows})
            }
          }}
        />
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
        rowSelection={{
          selectedRowKeys: this.state.selected,
          onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
          }
        }}
      
      />
    </div>
    )
  }
}
export default Form.create()(DrugDirectory);