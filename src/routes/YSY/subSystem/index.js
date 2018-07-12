import React, { PureComponent } from 'react';
import { Menu, Button, Row, Col, Input,Table, Modal,Form, Checkbox, Icon, message } from 'antd';
import { connect } from 'dva';
import EditableCell from '../../../components/EditableCell';
const SubMenu = Menu.SubMenu;
const { Search } = Input;
const FormItem = Form.Item;

const dataSource = [{
  menuName:'菜单一',
  menuCode: '001',
  routes:'/菜单一',
  fstate: '00',
  tfRemark: "备注"
},{
  menuName:'菜单二',
  menuCode: '002',
  routes:'/菜单二',
  fstate: '01',
  tfRemark: "备注11"
}];
const formItemLayout = {
  labelCol: { span: 6},
  wrapperCol:{ span: 15 }
}

class NewAddForm extends PureComponent{
  render(){
    const { getFieldDecorator } = this.props.form;
    const { isEdit } = this.props;
    return (
      <Form>
          <FormItem {...formItemLayout} label={`子系统名称`}>
            {
              getFieldDecorator(`subSystemName`,{
                initialValue: isEdit ? '111': '',
                rules: [{ required: true,message: '请输入子系统名称' }]
              })(
                <Input disabled={isEdit}/>
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label={`关联标识`}>
            {
              getFieldDecorator(`subSystemFlag`,{
                initialValue: [],
                rules: [{ required: true,message: '请选择关联标识' }]
              })(
                <Checkbox.Group>
                  <Row>
                    <Col span={12}><Checkbox value='00'>关联部署</Checkbox></Col>
                    <Col span={12}><Checkbox value='01'>关联机构</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              )
            }
          </FormItem>
        </Form>
    )
  }
}

const WrapAddForm = Form.create()(NewAddForm);

class MenuAddForm extends PureComponent{
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem {...formItemLayout} label={`菜单编码`}>
          {
            getFieldDecorator(`menuCode`,{
              initialValue:'',
              rules: [{ required: true,message:'请输入菜单编码' }]
            })(
              <Input placeholder='请输入'/>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout} label={`菜单名称`}>
          {
            getFieldDecorator(`menuName`,{
                
              initialValue:'',
              rules: [{ required: true,message:'请输入菜单名称' }]
            })(
              <Input placeholder='请输入'/>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout} label={`路径`}>
          {
            getFieldDecorator(`menuUrl`,{
              initialValue:'',
              rules: [{ required: true,message:'请输入路径' }]
            })(
              <Input placeholder='请输入'/>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
const WrapperMenuForm  = Form.create()(MenuAddForm);

@connect(({ subSystem, app })=>({
  subSystem, app
}))
class SubSystem extends PureComponent{
  state = {
    newAddVisible: false,
    addMenuVisible: false,
    subSystemLoading: false,
    isEdit: false,
    name: '',
    title: '新增',
    current: '',
    currentName: '',
    menuData: []
  }
  componentWillMount = () =>{
    this.props.dispatch({
      type: 'subSystem/fetchSubsystemList',
      payload: {}
    });
  }
  /* 
    添加子系统确认
  */
  handelSystemOk = (e) =>{
    e.preventDefault();
    this.form_system.validateFields((err,values)=>{
      if(!err){
        console.log(values,'values');
        values.subSystemFlag = values.subSystemFlag.length > 1 ? '02':values.subSystemFlag[0];
        this.setState({ subSystemLoading: true });
        this.props.dispatch({
          type:'subSystem/addSubSystem',
          payload: { ...values }
        });
      }
    })
  }
  loading =  () =>{
    this.setState({ subSystemLoading: false })
  }
  /* 
    添加新增菜单确认
  */
  handleMenuOk = (e) =>{
    e.preventDefault();
    this.form_menu.validateFields((err,values)=>{
      if(!err){
        console.log(values,'values')
      }
    })
  }
  IconEdit = (item,e) =>{
    e.stopPropagation();
    this.setState({ newAddVisible: true,title: '编辑',isEdit: true,name: item.subSystemName });
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
      currentName: e.item.props.children
    });
  }
  //删除
  delete = () =>{
    if(!this.state.current){
      message.warning('请选中任一子系统')
    }else{
      console.log(this.state.current,this.state.currentName)
    }
  }
  genMenu = data =>{
    return data.map(item =>{
      if(item.children.length){
        return (
          <SubMenu key={item.subSystemId} title={<span><span>{item.subSystemName}</span><Icon type="edit" onClick={this.IconEdit.bind(this,item)} className='menuNode_tool'/></span>}>
            {
              item.children.map((ii,idx)=>{
               return <Menu.Item key={ii.subSystemId}>{ ii.subSystemName }</Menu.Item>
              })
            }
          </SubMenu>
        )
      }else{
        return (<Menu.Item key={item.subSystemId}>{item.subSystemName}</Menu.Item>)
      }
    })
  }
  render(){
    console.log(this,'this')
    const { newAddVisible, title, isEdit, name,addMenuVisible } = this.state;
    const columns = [{
      title: '菜单名称',
      dataIndex: 'menuName'
    },{
      title:'菜单编号',
      dataIndex: 'menuCode'
    },{
      title:'路径',
      dataIndex: 'routes'
    },{
      title:'备注',
      dataIndex: 'tfRemark',
      width: 280,
      render: (text,record)=>{
        return (
          <EditableCell
            value={ text }
            record={record}
            max='50'
            onEditChange={(index,record,editable)=>this.onCellChange(index, record, editable)}
          />
        )
      }
    }]
    return (
    <div className='subSystem'>
      <Modal 
        title={title}
        visible={newAddVisible}
        onCancel={()=>this.setState({ newAddVisible: false })}
        footer={[
          <Button key="back"  type='default' onClick={()=>this.setState({ newAddVisible: false })}>关闭</Button>,
          <Button key="submit" type='primary' loading={this.state.subSystemLoading} onClick={this.handelSystemOk}>
              确认
          </Button>
        ]}
      >
        <WrapAddForm 
          ref={(form) => this.form_system = form}
          isEdit={isEdit}/>
      </Modal>
      <Modal
        title='添加菜单'
        visible={addMenuVisible}
        onCancel={()=>this.setState({ addMenuVisible: false })}
        footer={[
          <Button key="back" type='default' onClick={()=>this.setState({ addMenuVisible: false })}>关闭</Button>,
          <Button key="submit" type='primary' loading={this.state.loading} onClick={this.handleMenuOk}>
              确认
          </Button>
        ]}
      >
        <WrapperMenuForm 
          ref={(form) => this.form_menu = form}  
        />
      </Modal>
      <Row>
        <Col span={6} style={{ borderRight:' dashed 1px rgb(217,217,217)' }}>
          <Row className='ant-row-bottom'>
            <Col>
              <Button type='primary' style={{ marginRight: 8 }} onClick={()=>{
                if(this.form_system){
                  this.form_system.resetFields();
                }
                this.setState({ newAddVisible: true })}
                }>新建子系统</Button>
              <Button type='default' onClick={this.delete}>删除</Button>
            </Col>
          </Row>
          <Row className='ant-row-bottom'>
            <Col>
                <Search 
                  style={{ width: 256 }}
                  placeholder='请输入系统名称'/>
            </Col>
          </Row>
         <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            mode="inline"
            selectedKeys={[this.state.current]}
          >
            { this.genMenu(this.props.subSystem.menuData) }
          </Menu>
        </Col>
        <Col span={18} style={{ paddingLeft: 16,paddingRight: 16 }}>
          <Row className='ant-row-bottom'>
            <Col span={12}>
              <Search
                onSearch={this.onSearch}
                style={{ width: 256 }}
                placeholder='请输入菜单名称/路径/编号'
              />
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type='primary' onClick={()=>{
                if(this.form_menu){
                  this.form_menu.resetFields();
                }
                this.setState({ addMenuVisible: true })}
              }>添加菜单</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table 
                columns={columns}
                rowKey={'menuCode'}
                bordered
                dataSource={dataSource}
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true
                }}
                size='small'
                scroll={{ x: "100%" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    )
  }
}
export default SubSystem;