/*
 * @Author: wwb 
 * @Date: 2018-07-24 18:49:01 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-08-21 20:33:53
 */
/**
 * @file 药库 - 补货管理--补货计划--新建计划
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Button, Input, Table, Modal, Icon, Tooltip, message, Affix, Select } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles'

const FormItem = Form.Item;
const { Search } = Input;
const { Option } = Select;

class NewAdd extends PureComponent {
  state = {
    isShow: false,
    visible: false,
    loading: false,
    selected: [],
    selectedRows: [],
    modalSelected: [],
    modalSelectedRows: []
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      message.success('添加成功')
      this.setState({ loading: false, visible: false })
    }, 500)
  }
  onChange = (record, index) => {
    console.log(record, index, 'onchange')
  }
  render() {
    const { visible } = this.state;
    const columns = [
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName'
      }, {
        title: '商品名',
        dataIndex: 'ctmmTradeName'
      }, {
        title: '规格',
        dataIndex: 'ctmmSpecification',
        className: 'ellipsis',
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        )
      }, {
        title: '剂型',
        dataIndex: 'ctmmDosageFormDesc',
        width: 150
      }, {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName'
      }, {
        title: '供应商',
        dataIndex: 'supplierName',
        width: 240,
        render: (text, record, index) => {
          return (
            <Select style={{ width: 210 }}>
              <Option value={''}>供应商</Option>
            </Select>
          )
        }
      }, {
        title: '包装规格',
        dataIndex: 'packageSpecification',
        width: 100,
      }, {
        title: '单位',
        dataIndex: 'replanUnit',
        width: 150,
      }, {
        title: '需求数量',
        dataIndex: 'demandQuantity',
        width: 120,
        render: (text, record, index) => {
          return <Input defaultValue={text || 1} onChange={this.onChange.bind(this, record, index)} />
        }
      }, {
        title: '当前库存',
        dataIndex: 'totalStoreNum',
      }, {
        title: '库存上限',
        dataIndex: 'upperQuantity'
      }, {
        title: '库存下限',
        dataIndex: 'usableQuantity'
      }, {
        title: '参考价格',
        dataIndex: 'referencePrice'
      }, {
        title: '金额',
        dataIndex: 'totalPrice'
      }, {
        title: '批准文号',
        dataIndex: 'approvalNo',
        width: 150,
      }
    ];
    const modalColumns = [
      {
        title: '通用名称',
        dataIndex: 'ctmmGenericName'
      }, {
        title: '商品名',
        dataIndex: 'ctmmTradeName'
      }, {
        title: '规格',
        dataIndex: 'ctmmSpecification'
      }, {
        title: '当前库存',
        dataIndex: 'totalStoreNum',
        width: 100,
      }, {
        title: '剂型',
        dataIndex: 'ctmmDosageFormDesc',
        width: 150
      }, {
        title: '包装规格',
        dataIndex: 'packageSpecification',
        width: 150
      }, {
        title: '生产厂家',
        dataIndex: 'ctmmManufacturerName'
      }, {
        title: '批准文号',
        dataIndex: 'approvalNo',
        width: 150,
      },
    ]
    return (
      <div style={{ padding: 24 }}>
        <Affix>
          <div>
            <h2>新建计划</h2>
            <hr className='hr' />
          </div>
          <Row>
            <Col span={8}>
              <FormItem label={`补货部门`} {...formItemLayout}>
                <Select
                  style={{ width: 240 }}
                >
                  <Option value={'00'}>药库</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={8} style={{ marginTop: 3 }}>
              <Button type='primary' icon='plus' onClick={() => this.setState({ visible: true })}>添加产品</Button>
              <Button type='default' style={{ margin: '0 8px' }}>一键添加低库存产品</Button>
              <Button type='default'>删除</Button>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => this.props.history.push({ pathname: `/purchase/replenishment/replenishmentPlan` })}><Icon type="close" style={{ fontSize: 26, marginTop: 8 }} /></span>
            </Col>
          </Row>
        </Affix>
        <Modal
          title={'添加产品'}
          visible={visible}
          width={1100}
          style={{ top: 20 }}
          onCancel={() => this.setState({ visible: false })}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>确认</Button>,
            <Button key="back" onClick={() => this.setState({ visible: false })}>取消</Button>
          ]}
        >
          <Row>
            <Col span={7} style={{ marginLeft: 4 }}>
              <Search
                style={{ width: 248 }}
                placeholder='通用名/商品名'
                ref="paramName"
              />
            </Col>
            {/* <Col span={7} style={{ textAlign: 'left', marginTop: 4 }}>
              <a style={{ userSelect: 'none' }} onClick={() => this.setState({ isShow: !this.state.isShow })}>
                <Icon type={this.state.isShow ? 'up-circle-o' : 'down-circle-o'} /> {this.state.isShow ? '收起' : '更多筛选'}
              </a>
            </Col> */}
          </Row>
          {/* <Form style={{ marginTop: 20, display: this.state.isShow ? 'block' : 'none' }} onSubmit={this.onSubmit}>
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
              <Col span={4} style={{ textAlign: 'right' }}>
                <Button type="primary" style={{ marginRight: 8 }} htmlType="submit">查询</Button>
                <Button onClick={() => this.props.form.resetFields()}>重置</Button>
              </Col>
            </Row>
          </Form> */}
          <div className='detailCard'>
            <Table
              columns={modalColumns}
              scroll={{ x: '150%' }}
              rowKey='id'
              rowSelection={{
                selectedRowKeys: this.state.modalSelected,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({ modalSelected: selectedRowKeys, modalSelectedRows: selectedRows })
                }
              }}
            />
          </div>
        </Modal>
        <div className='newPageBorder'>
          <div className='ysynet-table-Content'>
            <Table
              title={() => '产品信息'}
              columns={columns}
              rowKey='id'
              scroll={{ x: '150%' }}
              rowSelection={{
                selectedRowKeys: this.state.selected,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({ selected: selectedRowKeys, selectedRows: selectedRows })
                }
              }}
            />
          </div>
        </div>
        <Affix offsetBottom={20}>
          <Row>
            <Col style={{ textAlign: 'right', padding: '10px' }}>
              <Button type='primary'>提交</Button>
              <Button type='danger' style={{ marginLeft: 8 }} ghost>保存</Button>
            </Col>
          </Row>
        </Affix>
      </div>
    )
  }
}
export default Form.create()(NewAdd);