/*
 * @Author: yuwei 
 * @Date: 2018-08-22 10:50:34 
* @Last Modified time: 2018-08-22 10:50:34 
 */

import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Button, Select , Radio , Affix , Modal , Tree} from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const TreeNode = Tree.TreeNode;
const singleFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

class AddMenuMgt extends PureComponent{

  state = {
    baseInfo:{},
    loading: false,
    visible:false,
    treeSelectedKeys:[],
    treeInfo:{},
    selectCache:{},//打开上级菜单之前存储的内容
    topMenuTitle:''
  }

  componentDidMount (){
    console.log(this.props.location.state)
    if(this.props.location.state){
      this.setState({
        baseInfo:this.props.location.state
      })
    }
  }

  //提交表单
  onSubmit = () => {

    this.props.form.validateFieldsAndScroll((err,values)=>{
      console.log(values)
      if(!err){
        console.log(values)
        console.log(this.state.treeSelectedKeys[0]);//获取上级菜单的key值

      }
    })  
  }

  //取消 - 提交表单
  goBack = () => {
    const { history } = this.props;
    history.push({pathname:'/system/setting/menuMgt'})
  }

  // 选择上级菜单 
  onSelect = (treeSelectedKeys, treeInfo)=> {
    //存储选择信息 以及 相关 key 值
    this.setState({
      treeSelectedKeys,
      treeInfo
    })
    console.log('selected', treeSelectedKeys, treeInfo);
  }
  //选择上级菜单
  submitModal =()=>{
    const { treeInfo , treeSelectedKeys} = this.state;
    this.setState({visible:false,topMenuTitle:treeInfo.node.props.title,
      selectCache:{
        treeSelectedKeys,treeInfo
      }
    })
    this.props.form.setFieldsValue({topMenuTitle:treeInfo.node.props.title})
  }

  //取消选择上级菜单
  cancelSubmitModal = () => {
    const { selectCache } = this.state;
    if(selectCache.treeSelectedKeys && selectCache.treeInfo){
      this.setState({
        visible:false,
        treeSelectedKeys:selectCache.treeSelectedKeys,
        treeInfo:selectCache.treeInfo,
      })
      this.props.form.setFieldsValue({topMenuTitle:selectCache.treeInfo.node.props.title})
    }else{
      this.setState({visible:false})
    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { visible , baseInfo } = this.state;
    return (
      <div className='ysynet-main-content'>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Row>
            <Col span={8}>
              <FormItem {...singleFormItemLayout} label={`上级菜单`}>
                {
                  getFieldDecorator(`topMenuTitle`,{
                    initialValue:baseInfo?baseInfo.topMenuTitle:'',
                    rules: [{ required: true,message: '请输入' }]
                  })(
                    <Input onClick={()=>this.setState({visible:true})  } />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...singleFormItemLayout} label={`菜单名称`}>
                {
                  getFieldDecorator(`userNo`,{
                    initialValue:baseInfo?baseInfo.userNo:'',
                    rules: [{ required: true,message: '请输入' }]
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...singleFormItemLayout} label={`链接`}>
                {
                  getFieldDecorator(`name`,{
                    initialValue:baseInfo?baseInfo.name:'',
                    rules: [{ required: true,message: '请输入' }]
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...singleFormItemLayout} label={`排序`}>
                {
                  getFieldDecorator(`sort`,{
                    initialValue:baseInfo?baseInfo.sort:'',
                    rules: [{ required: true,message: '请输入' }]
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
                <span style={{padding:8,display:' inline-block'}}>排序顺序，升序</span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...singleFormItemLayout} label={`部门类型`}>
                {
                  getFieldDecorator(`deptType`,{
                    initialValue:baseInfo?baseInfo.sort:'0',
                    rules: [{ required: true,message: '请填写链接' }]
                  })(
                    <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                      <Option value='0' key='0'>系统管理</Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...singleFormItemLayout} label={`是否可见`}>
                {
                  getFieldDecorator(`status`,{
                    initialValue:baseInfo?baseInfo.status:'0',
                  })(
                    <Radio.Group>
                      <Radio value='0' key='0'>是</Radio>
                      <Radio value='1' key='1'>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
                <span style={{padding:8,display:' inline-block'}}>该菜单是否显示在系统菜单中。</span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...singleFormItemLayout} label={`权限标识`}>
                {
                  getFieldDecorator(`flag`,{
                    initialValue:baseInfo?baseInfo.flag?baseInfo.flag:'0':'',
                  })(
                    <Input placeholder='请输入' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
                <span style={{padding:8,display:' inline-block'}}>控制器中定义的权限标识，如：@RequiresPermissions("权限标识")</span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...singleFormItemLayout} label={`备注`}>
                {
                  getFieldDecorator(`remark`,{
                    initialValue:baseInfo?baseInfo.remark:'',
                  })(
                    <Input.TextArea placeholder='请输入' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Affix offsetBottom={0} className='affix'  style={{textAlign: 'right',marginLeft:'-16px',marginRight:'-16px'}}>
            <Button
              style={{padding:20,margin:5}}
              type="primary"
              onClick={() => {this.onSubmit()}}
            >
              确认
            </Button>
            <Button
              style={{padding:20,margin:5}}
              onClick={() => {this.goBack()}}
            >
              取消
            </Button>
        </Affix>

        <Modal 
          visible={visible}
          onOk={()=>this.submitModal()}
          onCancel={()=>this.cancelSubmitModal()}
          title='上级菜单'
          >
            <Tree
              showLine
              defaultExpandedKeys={['0-0-0']}
              onSelect={this.onSelect}
            >
              <TreeNode title="parent 1" key="0-0">
                <TreeNode title="parent 1-0" key="0-0-0">
                  <TreeNode title="leaf" key="0-0-0-0" />
                  <TreeNode title="leaf" key="0-0-0-1" />
                  <TreeNode title="leaf" key="0-0-0-2" />
                </TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1">
                  <TreeNode title="leaf" key="0-0-1-0" />
                </TreeNode>
                <TreeNode title="parent 1-2" key="0-0-2">
                  <TreeNode title="leaf" key="0-0-2-0" />
                  <TreeNode title="leaf" key="0-0-2-1" />
                </TreeNode>
              </TreeNode>
            </Tree>
          </Modal>

      </div>
    )
  }
}
export default Form.create()(AddMenuMgt);