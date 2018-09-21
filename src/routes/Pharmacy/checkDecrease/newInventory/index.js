/**
 * @file 药库 - 盘点损益 - 新建盘点
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, DatePicker, Input, Select, Button, Icon, Modal, Checkbox, Radio, message } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid';
import {common} from '../../../../api/checkDecrease';
import {connect} from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class SearchForm extends PureComponent {
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
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let {status} = this.props
        const makingTime = values.makingTime === undefined || values.makingTime === null ? "" : values.makingTime;
        if(makingTime.length > 0) {
          values.checkStartTime = makingTime[0].format('YYYY-MM-DD HH:mm');
          values.checkEndTime = makingTime[1].format('YYYY-MM-DD HH:mm');
        };
        let {filterStatus} = values;
        if(filterStatus === '') {
          values.filterStatus = status.map(item=>item.value).filter(item=>item !== '').join(',');
        }
        
        console.log(values, '查询条件');
        this.props.query(values);
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.query({});
  }
  listRender = (list) => {
    return <Select placeholder="请选择">
            {
              list.map(item => {
                return <Option key={item.value} value={item.value}>{item.label}</Option>
              })
            }
           </Select>
  } 
  render() {
    const { getFieldDecorator } = this.props.form;
    let {status, types} = this.props;
    return(
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={'盘点时间'} {...formItemLayout}>
              {getFieldDecorator('makingTime')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'单号'} {...formItemLayout}>
              {getFieldDecorator('checkBillNo')(
                <Input placeholder={'盘点单号'} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'状态'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('filterStatus')(
                this.listRender(status)
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'类型'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('checkBillType')(
                this.listRender(types)
              )}
            </FormItem>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={8} style={{ textAlign: 'right', marginTop: 4 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
            <a style={{ marginLeft: 8, fontSize: 14 }} onClick={this.toggle}>
              {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SearchFormWarp = Form.create()(SearchForm);

class NewInventory extends PureComponent {
  state = {
    query: {},
    loading: false,
    visible: false,
    selected: [],
    selectedRows: [],
    subType: '',
    display: 'none',
    types: [],
    status: [],
    subTypes: [],
    deleteLoadig: false,
    locTypeList: [],
    checkValue: []
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'check_bill_type'
      },
      callback: (data) => {
        this.setState({
          types: data
        });
      }
    });
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'check_status'
      },
      callback: (data) => {
        this.setState({
          status: data
        });
      }
    });
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'check_bill_sub_type'
      },
      callback: (data) => {
        this.setState({
          subTypes: data
        });
      }
    });
    this.props.dispatch({
      type: 'base/orderStatusOrorderType',
      payload: {
        type: 'location_type'
      },
      callback: (data) => {
        this.setState({
          locTypeList: data
        });
      }
    })
  }
  //查询
  queryHandler = query => {
    this.setState({ query });
  }
  //新建
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return;
      console.log(values);
      if(values.checkStartTime) {
        values.checkStartTime = values.checkStartTime.format('YYYY-MM-DD HH:mm');
      }
      this.setState({ loading: true });
      
      // this.props.dispatch({
      //   type: 'checkDecrease/createCheckbill',
      //   payload: values,
      //   callback: (data) => {
      //     if(data.msg === 'success') {
      //       this.setState({
      //         loading: false,
      //         visible: false,
      //       });
      //       this.refs.table.fetch(this.state.query);
      //       message.success('新建成功！');
      //     }else {
      //       this.setState({
      //         loading: false
      //       });
      //       message.error(data.msg);
      //       message.warning('新建失败！');
      //     }
      //   }
      // })
    })
  }
  //删除
  delete = () =>{
    const {selectedRows} = this.state;
    if (selectedRows.length === 0) {
      return message.warn('请至少选择一条数据')
    };
    this.setState({ deleteLoadig: true });
    let ids = selectedRows.map(item=>item.id);
    this.props.dispatch({
      type: 'checkDecrease/deleteCheckBill',
      payload: {ids},
      callback: (data) => {
        if(data.msg === 'success') {
          this.refs.table.fetch(this.state.query);
        }else {
          message.error(data.msg);
          message.warning('删除失败！');
        }
        this.setState({
          deleteLoadig: false
        })
      }
    })
  }
  //新建
  newAdd = () => {
    this.setState({
      visible: true
    });
    this.props.form.resetFields();
  }
  //单选框渲染
  radioRender = (list) => {
    list = list.filter(item => item.label !== "全部")
    return list.map(item => {
      return <Radio key={item.value} value={item.value}>{item.label}</Radio>
    })
  }
  //多选框渲染
  renderCheckbox = (list) => {
    list = list.filter(item => item.value !== "");
    return list.map(item => {
      return <Col style={{marginBottom: 10}} key={item.value} span={8}>
              <Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>
             </Col>
    })
  }
  //多选框事件
  changeCheckbox = (checkedValue) => {
    console.log(checkedValue);
    
    let isCheckAll = checkedValue.some(item=>item === "");
    if(isCheckAll) {
      let checkValue = this.state.locTypeList.map(item=>item.value);
      this.setState({
        checkValue
      });
    }else {
      this.setState({
        checkValue: checkedValue
      });
    }
  }
  render() {
    const { getFieldDecorator} = this.props.form;
    const formItemLayoutAdd = { 
      labelCol: { span: 6 }, 
      wrapperCol: { span: 18 } 
    };
    const {status, types, query, checkValue, subTypes, subType, deleteLoadig, locTypeList} = this.state;
    const columns = [
      {
        title: '盘点单',
        dataIndex: 'checkBillNo',
        width: 220,
        render: (text, record) => {
          return <span><Link to={{ pathname: `/pharmacy/checkDecrease/newInventory/details/${record.checkBillNo}`}}>{text}</Link></span>
        }
      },
      {
        title: '状态',
        dataIndex: 'checkStatusName',
      },
      {
        title: '盘点类型',
        dataIndex: 'checkBillTypeName',
      },
      {
        title: '盘点子类型',
        dataIndex: 'checkBillSubTypeName',
      },
      {
        title: '部门',
        dataIndex: 'checkBillDeptName',
      },
      {
        title: '盘点责任人',
        dataIndex: 'sheveUserName',
      },
      {
        title: '制单时间',
        dataIndex: 'createDate',
      },
      {
        title: '盘点时间',
        dataIndex: 'checkTime',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchFormWarp
          status={status}
          types={types}
          dispatch={this.props.dispatch} 
          query={this.queryHandler} 
        />
        <div>
          <Button type='primary' onClick={this.newAdd}><Icon type="plus" />新建</Button>
          <Button loading={deleteLoadig} style={{ marginLeft: 8 }} onClick={this.delete}>删除</Button>
        </div>
        <RemoteTable 
          query={query}
          isJson
          url={common.CHECKBILL_LIST}
          columns={columns}
          rowKey={'id'}
          ref="table"
          scroll={{x: '130%'}}
          style={{marginTop: 20}}
          rowSelection={{
            selectedRowKeys: this.state.selected,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
            },
            getCheckboxProps: record => ({
              disabled: record.checkStatus !== 1
            }),
          }}
        />
        <Modal
          visible={this.state.visible}
          title="新增盘点"
          onOk={this.handleOk}
          onCancel={() => this.setState({ visible: false })}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>确认</Button>,
            <Button key="back" onClick={() => this.setState({ visible: false })}>取消</Button>
          ]}
        >
          <Form>
            <Row>
              <Col span={24}>
                <FormItem label={'类型'} {...formItemLayoutAdd}>
                  {getFieldDecorator('checkBillType', {
                    rules: [{ required: true, message: '请选择类型' }]
                  })(
                    <RadioGroup style={{width: '100%'}}>
                      {this.radioRender(types)}
                    </RadioGroup>
                  )}
                  
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={'子类型'} {...formItemLayoutAdd}>
                  {getFieldDecorator('checkBillSubType', {
                    rules: [{ required: true, message: '请选择子类型' }]
                  })(
                      <RadioGroup onChange={(e) => this.setState({ subType: e.target.value })}>
                        {this.radioRender(subTypes)}
                      </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={'货位类别'} {...formItemLayoutAdd}>
                  {/* {getFieldDecorator('locType', {
                    rules: [{ required: true, message: '请选择货位类别' }]
                  })( */}
                    <CheckboxGroup value={checkValue} onChange={this.changeCheckbox} style={{ width: '100%', marginTop: 10 }}>
                      <Row>
                        <Col style={{marginBottom: 10}} span={8}>
                          <Checkbox indeterminate={true} value={""}>全部</Checkbox>
                        </Col>
                        {this.renderCheckbox(locTypeList)}
                      </Row>
                    </CheckboxGroup>
                  {/* )} */}
                </FormItem>
              </Col>
              {
                subType === '3' ?
                  <Col span={24}>
                    <FormItem label={'起始时间'} {...formItemLayoutAdd}>
                      {getFieldDecorator('checkStartTime', {
                        rules: [{ required: true, message: '请选择起始时间' }],
                        initialValue: moment(new Date(), moment().format('YYYY-MM-DD 00:00'))
                      })(
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm"
                        />
                        )
                      }
                    </FormItem>
                  </Col> 
                  : 
                  null
              }
              <Col span={24}>
                <FormItem label={'备注'} {...formItemLayoutAdd}>
                  {getFieldDecorator('remarks')(
                    <Input style={{ width: 280 }} />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default connect()(Form.create()(NewInventory));