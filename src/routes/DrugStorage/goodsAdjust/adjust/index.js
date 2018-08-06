/*
 * @Author: gaofengjiao  货位调整 
 * @Date: 2018-08-06 16:18:15 
* @Last Modified time: 16:18:15 
 */
import React, { PureComponent } from 'react';
import { Table , DatePicker , Form, Input , Row, Col, Button  , message   } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class Putaway extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{},
    }
  }

  queryHandler = (query) => {
    this.setState({ query:query })
  }

  //单行确认 
  confirmOk = () => {
    message.success('操作成功')
  }

  render(){
    const columns = [
      {
       title: '调整单号',
       width:170,
       dataIndex: 'applyNo',
       render: (text,record) =>{
        return <span>
           <Link to={{pathname: `/drugStorage/goodsAdjust/adjust/detail`}}>{text}</Link>
         </span>
        }
      },
      {
        title: '状态',
        width:100,
        dataIndex: 'fstate',
        render:()=>`待上架`
      },
      {
        title: '调整人',
        width:150,
        dataIndex: 'createUser',
      },
      {
        title: '调整时间',
        width:180,
        dataIndex: 'planTime1',
        render:(text,record)=>`${record.planTime}`
      }
    ];
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <div className='ant-row-bottom'>
          <Button type='primary' onClick={()=>this.props.history.push({ pathname: `/drugStorage/goodsAdjust/adjust/add` })}>新建调整</Button>
        </div>
        <Table
          dataSource={createData()}
          bordered
          loading={ this.state.loading}
          scroll={{x: '100%'}}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 24}}
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
           <FormItem label={`调整单号`} {...formItemLayout}>
             {getFieldDecorator('assetCode', {})(
              <Input placeholder='请输入'/>
             )}
           </FormItem>
         </Col>
       
        <Col span={8}>
           <FormItem label={`调整时间`} {...formItemLayout}>
             {getFieldDecorator('shijian', {})(
              <RangePicker/>
             )}
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