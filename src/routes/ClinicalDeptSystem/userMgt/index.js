import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, Select, Radio, DatePicker, Icon, Popconfirm, Badge, Modal, Table   } from 'antd';
// import { formItemLayout } from '../../../utils/commonStyles'
import RemoteTable from '../../../components/TableGrid';
import user from '../../../api/user';
import moment from 'moment';
import { connect } from 'dva';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea,Search } = Input;
const { Option } = Select;
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },//5
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const powerColumns = [{
  title: '菜单名称',
  width: '30%',
  dataIndex: 'name',
  key: 'name'
},{
  title:'路径',
  width: '30%',
  dataIndex: 'routerName',
  key: 'routerName'
},{
  title:'备注',
  dataIndex: 'tfRemark',
  width: '40%',
  key: 'tfRemark'
}]

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
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`账号`}>
              {
                getFieldDecorator(`userNo`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`用户名`}>
              {
                getFieldDecorator(`userName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`工号`}>
              {
                getFieldDecorator(`userName`,{
                  initialValue: ''
                })(
                  <Input placeholder='请输入' className={'ysynet-formItem-width'}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`科室`}>
              {
                getFieldDecorator(`fstate`,{
                  initialValue: ''
                })(
                  <Select className={'ysynet-formItem-width'}>
                    <Option key={-1} value=''>请选择</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ display: display }}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator('fstate',{
                  initialValue: '01'
                })(
                  <Select className={'ysynet-formItem-width'}>
                    <Option key={-1} value='01'>启用</Option>
                    <Option key={-1} value='00'>停用</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={expand ? 8: 24} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button type='default' style={{marginLeft: 30}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 30, fontSize: 14}} onClick={this.toggle}>
             {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
           </a>
         </Col>
        </Row>
      </Form>
    )
  }
}

const WrapperForm = Form.create()(SearchForm);
class UserMgt extends PureComponent{
  state = {
    query: {},
    title: '添加用户',
    record: {},
    visible: false,
    isEdit: false,
    dirtyClick: false,
    powerVisible: false,
    loading: false ,// 权限菜单列表 loading 
    buttonLoading: false,
    powerData: [],
    selected: [],
    selectedRows: []
  }
  resetPwd = (record) =>{
    this.props.dispatch({
      type: 'clinicalSystem/resetPwd',
      payload: { userId: record.userId },
      callback: () => this.refs.table.fetch()
    })
  }
  edit = (record) =>{
    this.props.form.resetFields();
    this.setState({ record,isEdit: true,title: '编辑',visible: true });
  }
  // 新建 编辑提交
  handSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      this.setState({ dirtyClick: true })
      values.birthDay = values.birthDay === undefined || values.birthDay === null ? "" : values.birthDay.format('YYYY-MM-DD');
      values.userLevel = '03';
      if(this.state.isEdit){
        // 编辑
        values.userId = this.state.record.userId;
      }
      this.props.dispatch({
        type:'clinicalSystem/addOrUpdateUser',
        payload: values,
        callback: () =>{
          this.setState({ visible: false,dirtyClick: false });
          this.refs.table.fetch();
        }
      })
    })
  }
  power = (record) =>{
    this.setState({ record,powerVisible: true })
    this.genPowerMenu(record);
  }
  genPowerMenu = (record,value) =>{
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'clinicalSystem/getPowerMenu',
      payload: { userId: record.userId,searchName: value ? value: '' },
      callback: (data) => {
        let selected = [];
        data.map(item=>{
          if(item.children.length){
            item.children.map(child=>{
              if(child.isSelected === 1){
                selected.push(child.id)
              }
              return null
            });
            return null
          }
          if(item.isSelected === 1){
            selected.push(item.id);
          }
          return null
        });
        console.log(selected,'selected')
        this.setState({ loading: false, powerData: data,selected })
      }
    })
  }
  search = (value) =>{
    this.genPowerMenu(this.state.record,value)
  }
  updateUserMenus = () =>{
    this.setState({ buttonLoading: true })
    let { selected, record } = this.state;
    let postData = {};
    postData.menuIds = selected;
    postData.userId = record.userId;
    this.props.dispatch({
      type: 'clinicalSystem/updateUserMenus',
      payload: postData,
      callback: ()=>{
        this.setState({ powerVisible: false, buttonLoading: false })
      }
    })
  }
  render(){
    const { query, title, visible, isEdit, dirtyClick, record, powerVisible, powerData, loading, buttonLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '账号',
      dataIndex: 'userNo'
    },{
      title: '用户名',
      dataIndex: 'userName'
    },{
      title: '用户类型',
      dataIndex: 'userType'
    },{
      title: '状态',
      dataIndex: 'fstate',
      render: (text,record)=>{
        return <Badge status={text==='01'?'success':'error'} text={text==="01" ? "启用" :"停用"}/>
      }
    },{
      title: '工号',
      dataIndex: 'jobNum'
    },{
      title: '科室名称',
      dataIndex: 'deptName'
    },{
      title: '最后编辑时间',
      dataIndex: 'lastEditTime'
    },{
      title: '操作',
      dataIndex: 'action',
      width: 180,
      fixed: 'right',
      render: (text,record) =>{
        return <span>
            <Popconfirm title="是否确认重置该用户密码?" onConfirm={this.resetPwd.bind(null, record)} okText="是" cancelText="否">
              <a>重置密码</a>
            </Popconfirm>
            <a onClick={this.edit.bind(null,record)} style={{ margin: '0 16px' }}>编辑</a>
            <a onClick={this.power.bind(null,record)}>权限</a>
        </span>
      }
    }]
    return (
    <div>
      <WrapperForm />
      <div className='ant-row-bottom'>
        <Button type='primary' onClick={()=>{
            this.props.form.resetFields();
            this.setState({ visible: true,isEdit: false,title: '添加用户' })}
          }
        >
          添加用户</Button>
      </div>
      <Modal
        title={title}
        visible={visible}
        width={460}
        style={{ top: 20 }}
        onCancel={()=>this.setState({ visible: false })}
        footer={null}
      >
        <Form onSubmit={this.handSubmit}>
          <FormItem {...formItemLayout} label={`账号`}>
            {
              getFieldDecorator(`userNo`,{
                initialValue: isEdit ? record.userNo : '',
                rules: [{ required: true,message: '请输入账号' }]
              })(
                <Input disabled={isEdit ? true: false} placeholder='请输入'/>
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label={`类型`}>
            {
              getFieldDecorator(`userType`,{
                initialValue: '00',
                rules: [{ required: true,message: '请输入账号' }]
              })(
                <Select disabled>
                  <Option key={-1} value='00'>普通用户</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label={`用户名`}>
            {
              getFieldDecorator(`userName`,{
                initialValue: isEdit ? record.userName : '',
                rules: [{ required: true,message: '请输入用户名' }]
              })(
                <Input placeholder='请输入' />
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label={`性别`}>
            {
              getFieldDecorator(`gender`,{
                initialValue: isEdit ? record.gender : '',
              })(
               <RadioGroup>
                 <Radio value='00'>男</Radio>
                 <Radio value='01'>女</Radio>
               </RadioGroup>
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label={`工号`}>
            {
              getFieldDecorator(`jobNum`,{
                initialValue: isEdit ? record.jobNum : '',
              })(
                <Input placeholder='请输入'/>
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label={`生日`}>
            {
              getFieldDecorator(`birthDay`,{
                initialValue: isEdit ? moment(record.birthDay): undefined
              })(
                <DatePicker />
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label={`备注`}>
            {
              getFieldDecorator(`tfRemark`,{
                initialValue: isEdit ? record.tfRemark : '',
              })(
                <TextArea rows={2}/>
              )
            }
          </FormItem>
          <FormItem wrapperCol={{ span: 22,offset: 2 }}>
            <Button type="primary" htmlType="submit" loading={dirtyClick} style={{ width: '95%' }}>保存</Button>
          </FormItem>
        </Form>
      </Modal>
      <Modal
        title='用户权限'
        width={1100}
        style={{ top: 20 }}
        visible={powerVisible}
        onCancel={()=>this.setState({ powerVisible: false })}
        footer={[
          <Button key="submit" type='primary' loading={buttonLoading} onClick={this.updateUserMenus}>
              确认
          </Button>,
          <Button key="back"  type='default' onClick={()=>this.setState({ powerVisible: false })}>取消</Button>
        ]}
      >
          <div className='ant-row-bottom'>
            <Search 
              style={{ width: 256 }}
              placeholder='请输入菜单名称/菜单别名'
              onSearch={value=>this.search(value)}
            />
          </div>
          <Table 
            columns={powerColumns}
            dataSource={powerData}
            pagination={false}
            loading={loading}
            rowKey='id'
            scroll={{ x: '100%' }}
            size='small'
            rowSelection={{
              selectedRowKeys: this.state.selected,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
              }
            }}
          />
      </Modal>
      <RemoteTable 
        ref='table'
        url={user.FINDORGUSERS}
        rowKey={'userId'}
        scroll={{ x:'120%' }}
        query={query}
        columns={columns}
        showHeader={true}
      />
    </div>
    )
  }
}
export default connect(state =>  state)(Form.create()(UserMgt));