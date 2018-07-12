import React, { PureComponent } from 'react';
import { Input, Row, Table, Popconfirm } from 'antd';
import { connect } from 'dva';
const { Search } = Input;

const EditableCell = ({ editable, value, onChange }) => (
	<div>
	{editable
			? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
			: value
	}
	</div>
);

class ManagerMgt extends PureComponent{
  componentWillMount = () =>{
    this.searchAdminList();
  }
  onSearch = (value) =>{
    this.searchAdminList(value);
  }
  searchAdminList = (value) =>{
    this.props.dispatch({
      type: 'managerMgt/searchAdminList',
      payload: {searchName: value ? value: '' }
    })
  }
  resetPwd = (record) =>{
    this.props.dispatch({
      type: 'managerMgt/resetPwd',
      payload: { userId: record.userId,restPwd: '01' }
    })
  }
  handleChange(value, record, column) {
    const { dataSource } = this.props.managerMgt;
    const target = dataSource.filter(item => record.userId === item.userId)[0];
    if (target) {
      target[column] = value;
      this.props.dispatch({
        type: 'managerMgt/update',
        payload: { target }
      })
    }
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record, column)}
      />
    );
  }
  edit = (record) =>{
    const { dataSource } = this.props.managerMgt;
    const target = dataSource.filter(item => record.userId === item.userId)[0];
    if(target.editable){
      this.props.dispatch({
        type: 'managerMgt/updateEditFalse',
        payload: { ...record }
      })
    }else{
      this.props.dispatch({
        type: 'managerMgt/updateEdit',
        payload:{ userId: record.userId }
      })
    }
  }
  render(){
    const { dataSource, tableLoading } = this.props.managerMgt
    const columns = [{
      title: '账号',
      dataIndex: 'userNo'
    },{
      title: '姓名',
      dataIndex: 'userName',
      width: 150,
      render: (text,record)=>{
        return this.renderColumns(text,record,'userName')
      }
    },{
      title: '联系电话',
      dataIndex: 'mobilePhone',
      width: 150,
      render: (text,record)=>{
        return this.renderColumns(text,record,'mobilePhone')
      }
    },{
      title: '部署名称',
      dataIndex: 'deployName'
    },{
      title: '机构名称',
      dataIndex: 'orgName'
    },{
      title: '备注',
      dataIndex: 'tfRemark',
      width: 200,
      render: (text,record)=>{
        return this.renderColumns(text,record,'tfRemark')
      }
    },{
      title: '操作',
      dataIndex: 'action',
      render: (text,record) =>{
        return <span>
          <Popconfirm title="是否确认重置该用户密码?" onConfirm={this.resetPwd.bind(null, record)} okText="是" cancelText="否">
            <a>重置密码</a>
          </Popconfirm>
          <a onClick={this.edit.bind(null,record)} style={{ marginLeft: 8 }}>{ record.editable ?'保存':'编辑' }</a>
        </span>
      }
    }]
    return (
      <div>
        <Row className='ant-row-bottom'>
          <Search 
            style={{ width: 256 }}
            placeholder='账号/部署名/机构名'
            onSearch={this.onSearch}
          />
        </Row>
        <Table 
          dataSource={dataSource}
          columns={columns}
          bordered
          rowKey='userId'
          loading={tableLoading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true
          }}
          size='small'
        />
      </div>
    )
  }
}
export default connect(state =>  state)(ManagerMgt);