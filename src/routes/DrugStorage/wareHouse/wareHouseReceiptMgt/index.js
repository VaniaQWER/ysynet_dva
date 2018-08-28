/*
 * @Author: gaofengjiao  入库单管理 
 * @Date: 2018-08-06 15:31:15 
* @Last Modified time: 2018-08-06 15:31:15 
 */
import React, { PureComponent } from 'react';
import { DatePicker, Form, Input , Row, Col, Button, Icon, Select, message, Popconfirm } from 'antd';
import { formItemLayout } from '../../../../utils/commonStyles';
import { Link } from 'react-router-dom';
import RemoteTable from '../../../../components/TableGrid';
import wareHouse from '../../../../api/drugStorage/wareHouse';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
class Putaway extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query:{},
      messageError:"",
      selectedRowKeys:[]
    }
  }

  queryHandler = (query) => {
    this.setState({ query: query })
  }

  //单行确认 
  confirmOk = () => {
    message.success('操作成功')
  }

  render(){
    const columns = [
      {
       title: '入库单',
       width:170,
       dataIndex: 'inStoreCode',
       render: (text,record) =>{
        return <span>
           <Link to={{pathname: `/drugStorage/wareHouse/wareHouseReceiptMgt/detail/${record.inStoreCode}`}}>{text}</Link>
         </span>
        }
      },
      {
        title: '配送单',
        width:170,
        dataIndex: 'distributeCode',
      },
      {
        title: '订单',
        width:170,
        dataIndex: 'orderCode',
      },
      {
        title: '状态',
        width:100,
        dataIndex: 'auditStatuslName',
      },
      {
        title: '入库分类',
        width:150,
        dataIndex: 'inStoreTypeName',
      },
      {
        title: '供应商',
        width:150,
        dataIndex: 'ctmaSupplierName',
      },
      {
        title: '上架时间',
        width:180,
        dataIndex: 'createDate'
      },
      {
        title: '操作',
        width: 90,
        dataIndex: 'RN',
        render: (text, record) => 
          <span>
            <Popconfirm title="确定打印吗？" okText="是" cancelText="否"  onConfirm={()=>this.confirmOk(record)}>
              <a>打印</a>
            </Popconfirm>
          </span>  
      }
    ];
    const {query} = this.state;
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <RemoteTable
          query={query}
          url={wareHouse.depotinstoreList}
          ref="tab"
          scroll={{x: '150%'}}
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
 handleSearch = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     for (const key in values) {
       values[key] = values[key] === undefined? "" : values[key]
     };
     if(values.time !== "") {
       values.startTime = values.time[0].format('YYYY-MM-DD');
       values.endTime = values.time[1].format('YYYY-MM-DD');
     }else {
       values.startTime = "";
       values.endTime = "";
     }
     this.props.query(values);
   });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 render() {
   const { display } = this.state;
   const { getFieldDecorator } = this.props.form;
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`单号`} {...formItemLayout}>
             {getFieldDecorator('inStoreCode', {})(
              <Input placeholder='入库单/配送单/订单号'/>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
          <FormItem label={`供应商`} {...formItemLayout}>
            {getFieldDecorator('supplierCode', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
                    <Option key="01" value="01">裕美供应商</Option>
                    <Option key="02" value="02">国药集团</Option>
                    <Option key="03" value="03">山东医药商贸集团</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8}>
           <FormItem label={`入库时间`} {...formItemLayout}>
             {getFieldDecorator('time', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`入库分类`} {...formItemLayout}>
             {getFieldDecorator('inStoreType', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
                    <Option key="01" value="01">采购入库</Option>
                    <Option key="02" value="02">零库存入库</Option>
                    <Option key="03" value="03">报告药入库</Option>
                    <Option key="04" value="04">盘点入库</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{ float:'right',textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
             {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
           </a>
         </Col>
       </Row>
     </Form>
   )
 }
}
const SearchForm = Form.create()(SearchFormWrapper); 