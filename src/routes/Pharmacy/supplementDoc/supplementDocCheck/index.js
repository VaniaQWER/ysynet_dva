/*
 * @Author: gaofengjiao  补登单据 
 * @Date: 2018-08-06 17:40:15 
* @Last Modified time: 17:40:15 
 */
import React, { PureComponent } from 'react';
import { Table , DatePicker , Form, Input ,Select , Row, Col, Button  , message   } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Putaway extends PureComponent{

  state = {
    selected: [],
    selectedRows: [],
    loading: false,
    dataSource: createData()
  }

  queryHandler = (query) => {
    this.setState({ query:query })
  }
  pass = () => {
    const selected = this.state.selected;
    if (selected.length === 0) {
      message.warn('请至少选择一条数据')
    } else {
      message.info("批量审核通过!")
    }
  }
  noPass = () =>{
    const selected = this.state.selected;
    if (selected.length === 0) {
      message.warn('请至少选择一条数据')
    } else {
      message.warn("驳回")
    }
  }

  //单行确认 
  confirmOk = () => {
    message.success('操作成功')
  }

  render(){
    const columns = [
      {
       title: '补登单号',
       width:170,
       dataIndex: 'applyNo',
       render: (text,record) =>{
        return <span>
           <Link to={{pathname: `/pharmacy/supplementDoc/supplementDocCheck/detail`}}>{text}</Link>
         </span>
        }
      },
      {
        title: '入库/出库单',
        width:140,
        dataIndex: 'planNo',
      },
      {
        title: '状态',
        width:100,
        dataIndex: 'fstate',
        render:()=>`待上架`
      },
      {
        title: '部门',
        width:150,
        dataIndex: 'createUser',
        render:()=>`静配中心`
      },
      {
        title: '类型',
        width:150,
        dataIndex: 'leixing',
        render:()=>`补登入库`
      },
      {
        title: '补登人',
        width:150,
        dataIndex: 'createUser',
        render:()=>`赵立春`
      },
      {
        title: '补登时间',
        width:180,
        dataIndex: 'planTime1',
        render:(text,record)=>`${record.planTime}`
      },
      {
        title: '审核人',
        width:150,
        dataIndex: 'createUser',
        render:()=>`赵立春`
      },
      {
        title: '审核时间',
        width:180,
        dataIndex: 'planTime1',
        render:(text,record)=>`${record.planTime}`
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <div className='ant-row-bottom'>
          <Button type='primary' onClick={this.pass} >审核通过</Button>
          <Button type='default' onClick={this.noPass} style={{ marginLeft: 8 }}>不通过</Button>
        </div>
        <Table 
          columns={columns}
          bordered
          loading={this.state.loading}
          dataSource={this.state.dataSource}
          scroll={{ x: '130%' }}
          rowKey={'id'}
          pagination={{
            size: "small",
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
export default Putaway;

/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {

 handleSearch = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     this.props.query(values);
   });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 render() {
   const { getFieldDecorator } = this.props.form;
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`单据号`} {...formItemLayout}>
             {getFieldDecorator('assetCode', {})(
              <Input placeholder='请输入'/>
             )}
           </FormItem>
         </Col>
       
        <Col span={8}>
           <FormItem label={`补登时间`} {...formItemLayout}>
             {getFieldDecorator('shijian1', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`审核时间`} {...formItemLayout}>
             {getFieldDecorator('shijian2', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
            <FormItem {...formItemLayout} label={`状态`}>
              {
                getFieldDecorator(`fstate`,{
                  initialValue: ''
                })(
                  <Select >
                    <Option key={-1} value=''>请选择</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label={`类型`}>
              {
                getFieldDecorator('type',{
                  initialValue: ''
                })(
                  <Select >
                    <Option key={-1} value=''>全部</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
         <Col span={8} style={{ float:'right',textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
         </Col>
       </Row>
     </Form>
   )
 }
}
const SearchForm = Form.create()(SearchFormWrapper); 