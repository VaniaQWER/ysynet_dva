/*
 * @Author: yuwei 
 * @Date: 2018-08-22 15:31:52 
* @Last Modified time: 2018-08-22 15:31:52 
 */
 /**
 * @file 系统管理--组织机构--部门管理-编辑
 */

 import React , { PureComponent } from 'react';
import { Button , Row , Col, Input} from 'antd';


class EditDepartmentMgt extends PureComponent {

  state={
    record:{}
  }

  componentDidMount (){

    if(this.props.location.state){
      this.setState({
        record:this.props.location.state
      })
    }
  }


  //提交该表单
  onSubmit = ()=>{

  }
  render(){
    const { record } = this.state;

    return(
      <div className='ysynet-main-content' style={{minHeight: '80vh'}}>
        <h3>基本信息 <Button type='primary' onClick={this.onSubmit} style={{float: 'right'}}>保存</Button></h3>
        <Row>
          <Col span={10}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
              类型 :&nbsp;
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
              <div className="ant-form-item-control">
                <span className="ant-form-item-children">
                  {record.name||'123123'}
                </span>
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
            部门名称 :&nbsp;
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
              <div className="ant-form-item-control">
                <span className="ant-form-item-children">
                  {record.name||'部门名称'}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
            科室名称 :&nbsp;
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
              <div className="ant-form-item-control">
                <span className="ant-form-item-children">
                  {record.name||'科室名称'}
                </span>
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
            内部编码 :&nbsp;
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
              <div className="ant-form-item-control">
                <span className="ant-form-item-children">
                  {record.name||'内部编码'}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
            医院科室代码 :&nbsp;
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
              <div className="ant-form-item-control">
                <span className="ant-form-item-children">
                  {record.name||'医院科室代码'}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
            地址 :&nbsp;
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-17">
              <div className="ant-form-item-control">
                <span className="ant-form-item-children">
                 
                  <Input.TextArea value={record.remark||'remark'}></Input.TextArea>

                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }


 }
 export default EditDepartmentMgt 