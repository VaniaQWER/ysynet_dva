/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-06 16:37:22 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-06 16:37:22 
 */
/**
 * @file 药库 - 货位调整--新建货位
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, Table, Modal, Icon, Tooltip  } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles'
import { createData } from '../../../../common/data';
const FormItem = Form.Item;
const { Search } = Input;
const modalData = createData().splice(5,16);

class NewAdd extends PureComponent{
  state = {
    isShow: false,
    visible: false,
    loading: false,
    selected: [],
    selectedRows: [],
    modalSelected: [],
    modalSelectedRows: []
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    const columns = [
    {
      title: '数量',
      width: 100,
      dataIndex: 'num',
      render: (text,record,index)=>{
        return <Input defaultValue={text || '24'}/>
      }
    },
    {
      title: '单位',
      dataIndex: 'unit',
      width: 100,
    },
    {
      title: '原货位',
      width: 100,
      dataIndex: 'spec',
      render:(text)=>'B121'
    },
    {
      title: '目的货位',
      width: 100,
      dataIndex: 'spec',
      render: (text,record,index)=>{
        return <Input defaultValue={text || 'A1231'}/>
      }
    },
    {
      title: '原货位类型',
      width: 120,
      dataIndex: 'spec',
      render:(text)=>'补货货位'
    },
    {
      title: '目的货位类型',
      width: 120,
      dataIndex: 'unit',
      render:(text)=>'补货货位'
    },
    {
      title: '通用名称',
      dataIndex: 'geName'
    },
    {
      title: '规格',
      dataIndex: 'spec',
      className:'ellipsis',
      render:(text)=>(
        <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
      )
    },{
      title: '包装规格',
      dataIndex: 'fmodal',
      width: 150
    },{
      title: '生产厂家',
      dataIndex: 'productCompany'
    },{
      title: '生产批号',
      width: 180,
      dataIndex: 'flot',
    }, {
      title: '生产日期',
      width: 200,
      dataIndex: 'produceTime',
      render: (text,record,index) => '2018-07-10' 
    },
    {
      title: '有效期至',
      width: 200,
      dataIndex: 'UserfulDate',
      render: (text,record,index) => '2022-07-09' 
    }
    ];
    const modalColumns = [
      {
        title: '通用名称',
        dataIndex: 'geName'
      },{
        title: '产品名称',
        dataIndex: 'productName'
      },{
        title: '规格',
        dataIndex: 'spec'
      },{
        title: '剂型',
        dataIndex: 'fmodal',
        width: 150
      },{
        title: '包装规格',
        dataIndex: 'unit',
        width: 100,
      },{
        title: '批准文号',
        dataIndex: 'medicinalCode',
        width: 150,
      },{
        title: '生产厂家',
        dataIndex: 'productCompany'
      }
    ]
    return (
      <div className='fadeIn'>
        <div className='ant-row-bottom'> 
          <Button type='primary' icon='plus' onClick={()=>this.setState({ visible: true })}>添加产品</Button>
          <Button type='default' style={{ marginLeft: 8 }}>删除</Button>
        </div>
        <Modal
          title={'添加产品'}
          visible={visible}
          width={1100}
          style={{ top: 20 }}
          onCancel={()=>this.setState({ visible: false })}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>确认</Button>,
            <Button key="back" onClick={() => this.setState({ visible: false })}>取消</Button>
          ]}
        >
        <Row>
          <Col span={7} style={{marginLeft: 4}}>
            <Search 
              style={{ width: 248 }}
              placeholder='通用名/商品名'
            />
          </Col>
          <Col span={7} style={{textAlign: 'left', marginTop: 4}}>
            <a style={{userSelect: 'none'}} onClick={()=>this.setState({isShow: !this.state.isShow})}> 
              <Icon type={this.state.isShow ? 'up-circle-o' : 'down-circle-o'} /> {this.state.isShow ? '收起' : '更多筛选'}
            </a>
          </Col>
        </Row>
        <Form style={{marginTop: 20, display: this.state.isShow ? 'block' : 'none'}} onSubmit={this.onSubmit}>
          <Row>
            <Col span={7}>
              <FormItem label={`产品名称`} {...formItemLayout}>
                {getFieldDecorator('materialNameOrFqun')(
                  <Input placeholder={`请输入产品名称/产品名称首字母`} />
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label={`通用名称`} {...formItemLayout}>
                {getFieldDecorator('geNameOrFqun')(
                  <Input placeholder={`请输入通用名称/简码`} />
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label={`规格`} {...formItemLayout}>
                {getFieldDecorator('spec')(
                  <Input placeholder={`请输入规格`} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <FormItem label={`型号`} {...formItemLayout}>
                {getFieldDecorator('fmodel')(
                  <Input placeholder={`请输入型号`} />
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label={`品牌`} {...formItemLayout}>
                {getFieldDecorator('brandName')(
                  <Input placeholder={`请输入品牌`} />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={`生产商`} {...formItemLayout}>
                {getFieldDecorator('produceName')(
                  <Input placeholder={`请输入生产商`} />
                )}
              </FormItem>
            </Col>
            <Col span={4} style={{textAlign: 'right'}}>
              <Button type="primary" style={{ marginRight: 8 }} htmlType="submit">查询</Button>
              <Button onClick={()=>this.props.form.resetFields()}>重置</Button>
            </Col>
          </Row>
        </Form>
        <Table
          style={{ marginTop: 16 }} 
          columns={modalColumns}
          dataSource={modalData}
          bordered
          scroll={{ x: '150%' }}
          rowKey='id'
          pagination={{
            size: "small",
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
          title={()=>'产品信息'}
          columns={columns}
          bordered
          rowKey='id'
          scroll={{ x: '150%' }}
          pagination={false}
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
export default Form.create()(NewAdd);