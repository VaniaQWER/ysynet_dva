/**
 * @file 药库 - 盘点损益 - 新建盘点
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, DatePicker, Input, Select, Button, Icon, Table, Modal, Radio, message, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import moment from 'moment';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class SearchForm extends PureComponent {
  state = {
    display: 'none',
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
        const makingTime = values.makingTime === undefined || values.makingTime === null ? "" : values.makingTime;
        if(makingTime.length > 0) {
          values.startMakingTime = makingTime[0].format('YYYY-MM-DD HH:mm');
          values.endMakingTime = makingTime[1].format('YYYY-MM-DD HH:mm');
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
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSearch}>
        <Row gutter={30}>
          <Col span={8}>
            <FormItem label={'制单时间'} {...formItemLayout}>
              {getFieldDecorator('makingTime')(
                <RangePicker showTime={{ format: 'HH:mm' }} format={'YYYY-MM-DD HH:mm'} style={{ width: 313 }} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'单号'} {...formItemLayout}>
              {getFieldDecorator('odd')(
                <Input placeholder={'盘点单号'} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'状态'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('status', {
                initialValue: ''
              })(
                <Select>
                  <Option value={''}>全部</Option>
                  <Option value={'00'}>新建</Option>
                  <Option value={'01'}>待确认</Option>
                  <Option value={'02'}>已确认</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'类型'} {...formItemLayout} style={{ display: this.state.display }}>
              {getFieldDecorator('types', {
                initialValue: ''
              })(
                <Select>
                  <Option value={''}>全部</Option>
                  <Option value={'00'}>明盘全盘</Option>
                  <Option value={'01'}>暗盘动销盘</Option>
                  <Option value={'02'}>明盘动盘</Option>
                </Select>
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
    types2: '1',
    display: 'none'
  }
  queryHandler = query => {
    this.setState({ query });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  delete = () =>{
    const selected = this.state.selected;
    if (selected.length === 0) {
      message.warn('请至少选择一条数据')
    } else {
      this.setState({ loading: true });
      message.warn('删除成功！');
      setTimeout(()=>{this.setState({loading: false, selected: []});}, 500);
    }
  }
  render() {
    const plainOptions = [
      { label: '全部', value: '1' },
      { label: '补货货位', value: '2' },
      { label: '发药机货位', value: '3' }
    ];
    const plainOption = [
      { label: '拆零发药货位', value: '4' },
      { label: '预拆零货位', value: '5' },
      { label: '基数药货位', value: '6' }
    ];
    const { getFieldDecorator } = this.props.form;
    const formItemLayoutAdd = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
    const columns = [
      {
        title: '盘点单',
        dataIndex: 'odd',
        key: 'odd',
        render: (text, record) => {
          if (record.status === '已确认') {
            return <span><Link to={{ pathname: `/drugStorage/checkDecrease/newInventory/detailsConfirm`}}>{text}</Link></span>
          } else {
            return <span><Link to={{ pathname: `/drugStorage/checkDecrease/newInventory/details`}}>{text}</Link></span>
          }
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '类型',
        dataIndex: 'types',
        key: 'types'
      },
      {
        title: '部门',
        dataIndex: 'dept',
        key: 'dept'
      },
      {
        title: '制单人',
        dataIndex: 'oddUser',
        key: 'oddUser'
      },
      {
        title: '制单时间',
        dataIndex: 'makingTime',
        key: 'makingTime'
      },
      {
        title: '盘点时间',
        dataIndex: 'startTime',
        key: 'startTime'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      }
    ];
    const dataSource = [
      {
        key: '1',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '2',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '3',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '4',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '5',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '6',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '7',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '8',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '9',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '10',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '11',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '12',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '13',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '14',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '15',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '16',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '17',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '18',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '19',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '20',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '21',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '22',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '23',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '24',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '25',
        odd: 'KP0022118070000383',
        status: '草稿',
        types: '明盘全盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '26',
        odd: 'KP00221180700002DN',
        status: '待确认',
        types: '暗盘动销盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      },
      {
        key: '27',
        odd: 'KP00221180700001CW',
        status: '已确认',
        types: '明盘动盘',
        dept: '药库',
        oddUser: '张三三',
        makingTime: '2018-7-24 16:45',
        startTime: '2018-7-24 16:45',
        remark: '我是新建盘点列表'
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchFormWarp query={this.queryHandler} />
        <div>
          <Button type='primary' onClick={()=>this.setState({ visible: true })}><Icon type="plus" />新建</Button>
          <Button style={{ marginLeft: 10 }} onClick={this.delete}>删除</Button>
        </div>
        <Table
          loading={ this.state.loading}
          columns={columns}
          // rowKey={'oddGuid'}
          style={{marginTop: 20}}
          dataSource={dataSource}
          bordered
          rowSelection={{
            selectedRowKeys: this.state.selected,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
            }
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
                  {getFieldDecorator('types1')(
                    <RadioGroup>
                      <Radio value={'1'}>明盘</Radio>
                      <Radio value={'2'}>暗盘</Radio>
                    </RadioGroup>
                  )}
                  
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={''}>
                  {getFieldDecorator('types2')(
                    <RadioGroup style={{ marginLeft: 118 }} {...formItemLayoutAdd} onChange={(e) => this.setState({ types2: e.target.value })}>
                      <Radio value={'1'}>全盘</Radio>
                      <Radio value={'2'}>动盘</Radio>
                      <Radio value={'3'}>动销盘</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={'药品特征'} {...formItemLayoutAdd}>
                  {getFieldDecorator('types3')(
                    <RadioGroup>
                      <Radio value={'1'}>全部</Radio>
                      <Radio value={'2'}>中成药</Radio>
                      <Radio value={'3'}>西药</Radio>
                    </RadioGroup>
                  )}
                  
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={''}>
                  {getFieldDecorator('types4')(
                    <RadioGroup style={{ marginLeft: 118 }} {...formItemLayoutAdd}>
                      <Radio value={'1'}>大输液</Radio>
                      <Radio value={'2'}>报告药</Radio>
                      <Radio value={'3'}>贵重品</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={''}>
                  {getFieldDecorator('types5')(
                    <RadioGroup style={{ marginLeft: 118 }} {...formItemLayoutAdd}>
                      <Radio value={'1'}>冷藏</Radio>
                      <Radio value={'2'}>毒麻药品</Radio>
                      <Radio value={'3'}>中草药</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={'货位类别'} {...formItemLayoutAdd}>
                  {getFieldDecorator('types6')(
                    <CheckboxGroup options={plainOptions} />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={''}>
                  {getFieldDecorator('types7')(
                    <CheckboxGroup options={plainOption} style={{ marginLeft: 118 }} />
                  )}
                </FormItem>
              </Col>
              {
                this.state.types2 === '3' ?
                  <Col span={24}>
                    <FormItem label={'起始时间'} {...formItemLayoutAdd}>
                      {getFieldDecorator('startTime', {
                        rules: [{ required: true, message: '请选择起始时间' }],
                        initialValue: moment(new Date(), moment().format('YYYY-MM-DD HH:mm'))
                      })(
                        <DatePicker showTime={{ format: 'HH:mm' }} style={{ width: 280 }} />
                      )}
                    </FormItem>
                  </Col> 
                  : 
                  <Col span={24} style={{ display: 'none' }}>
                    <FormItem label={'起始时间'} {...formItemLayoutAdd}>
                      {getFieldDecorator('startTime', {
                        rules: [{ required: true, message: '请选择起始时间' }],
                      })(
                        <DatePicker showTime={{ format: 'HH:mm' }} format={'YYYY-MM-DD HH:mm'} style={{ width: 280 }} />
                      )}
                    </FormItem>
                  </Col>
              }
              <Col span={24}>
                <FormItem label={'备注'} {...formItemLayoutAdd}>
                  {getFieldDecorator('remark')(
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
export default Form.create()(NewInventory);