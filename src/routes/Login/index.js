import React, { PureComponent } from 'react';
import { Form, Button, Checkbox, Input, Icon } from 'antd';
import { connect } from 'dva';
// import querystring from 'querystring';
import styles from './style.css';
const FormItem = Form.Item;

class Login extends PureComponent{
  state = {
    loading: false
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.setState({ loading: true });
         let { userName, password } = values;
         password = userName === 'admin'? '02a3f0772fcca9f415adc990734b45c6f059c7d33ee28362c4852032': 'a2357bb8ae6b26a14119a0591ab45847c437f7e9f42e90b154db07e9';
         this.userLogin(userName, password)
          /* this.props.dispatch({
            type: 'users/EncryptPassword',
            payload: { password },
            callback: (data) =>{
              let newPassword = data.password;
              this.userLogin(userName,newPassword);
            }
        }) */
      }
    })
  }
  userLogin = (username,password) =>{
    let { dispatch, history } = this.props;
    dispatch({
      type: 'users/userLogin',
      payload: { username, password },
      callback: (data) => {
        this.setState({ loading: false });
        if(data.deptInfo && data.deptInfo.length !== 1){
          let { menuList } = data.deptInfo[0];
          for (let i=0; i<menuList.length; i++) {
            menuList[i].parentIds = menuList[i].parentIds.split(',')
            menuList[i].parentIds.pop();
          }
          let index = 1, tree = [], currentNode = '';
          menuList.sort(function(a, b) {
            return a.parentIds.length - b.parentIds.length;
          })

          let max = menuList[menuList.length - 1].parentIds.length;

          function genRoot(keyNodes, target) {
            for (let i=0; i<target.length; i++) {
              if (target[i].id === keyNodes.parentId) {
                target[i].children = target[i].children || [];
                target[i].children = [ ...target[i].children, keyNodes ]
              } else if (target[i].children){
                genRoot(keyNodes, target[i].children)
              }
            }
          }
          function genTree(index) {
            for (let i=0; i<menuList.length; i++) {
              if (menuList[i].parentIds.length === index) {
                if (index === 1) {
                  tree.push(menuList[i])
                } else {
                  genRoot(menuList[i], tree);
                }
              }
            }
          }
          
          let min = 1;
          while (min < max + 1) {
            genTree(min);
            min++;
          }
          console.log(tree,'tree');
          console.log(tree[0].children[0]);
          let href = tree[0].children[0].children[0].children[0].href;
          href = href.substring(0,href.length-1);
          this.props.dispatch({
            type: 'users/setCurrentMenu',
            payload: { menu : tree[0].children[0] }
          })
          // history.push({ pathname: href })
          history.push({ pathname: '/subSystem' })
        }
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.users,'users')
    const wrapperLayout = {
      wrapperCol:{ span: 15, offset: 5 }
    }
    return (
      <div className={styles['container']}>
         <div className={styles['ysy-Login-bg']} style={{ width: '62%' }}></div>
         <div className={styles['ysy-Login-form']} style={{ width: '38%' }}>
            <div className={styles['ysy-Login-form-top']}>
              {/* <span className={styles['ysy-orgName']}>{orgName}</span> */}
              <span className={styles['ysy-lgo']}></span>
              {/* <span className={styles['ysy-login-logo']}></span> */}
            </div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...wrapperLayout}>
                {getFieldDecorator('userName', {
                  rules: [{required: true, message: '请输入用户名!'}],
                  })(
                    <Input addonBefore={<Icon type='user'/>} placeholder='用户名'/>
                )}
              </FormItem>
              <FormItem {...wrapperLayout}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem  {...wrapperLayout}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                  })(
                    <Checkbox>记住用户名和密码</Checkbox>
                  )}
                  <Button type="primary" htmlType="submit" className={styles["login-form-button"]} loading={this.state.loading}>
                    登录
                  </Button>
              </FormItem>
            </Form>
            <div style={{ textAlign:'center',fontSize: 12,height: 70,paddingTop: 50  }}>
              {/* <span>版权所有&nbsp;@普华信联&nbsp;( 武汉 )&nbsp;科技有限公司&nbsp;保留一切权力</span> */}
            </div>
         </div>
      </div>
    )
  }
}
export default connect( state => state)(Form.create()(Login));

