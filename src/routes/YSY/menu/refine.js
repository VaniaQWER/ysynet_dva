/* 
  精细化平台 Tab
*/
import React, { PureComponent } from 'react';
import { Table, Input, Switch, Popconfirm, Icon } from 'antd';
import { connect } from 'dva';

const { Search } = Input;
const openTilte = '是否确认开启此状态?';
const closeTitle = '是否确认关闭此状态?';
const EditableCell = ({ editable, value, onChange, check, edit }) => (
	<div className="editable-cell">
	{editable
    ?
    <div className="editable-cell-input-wrapper">
      <Input
        value={value}
        style={{ width: '85%',margin: '-3px 0' }}
        onChange={e => onChange(e.target.value)}
        onPressEnter={()=>check()}
      />
      <Icon
        type="check"
        className="editable-cell-icon-check"
        onClick={()=>check()}
      />
    </div>
    :
    <div className="editable-cell-text-wrapper">
      {value || ' '}
      <Icon
        type="edit"
        className="editable-cell-icon"
        onClick={()=> edit()}
      />
    </div>
	}
	</div>
);
class Refine extends PureComponent{
  state = {
    title: openTilte,
    isopen: false
  }
  componentWillMount = () =>{
    this.genMenuList();
  }
  genMenuList = (value) =>{
    this.props.dispatch({
      type: 'menu/queryMenuList',
      payload: { searchName: value ? value: '' }
    })
  }
  onSearch = (value) =>{
    this.genMenuList(value)
  }
  handleChange = (value, record,column) =>{
    const { dataSource } = this.props.menu;
    const target = dataSource.filter(item => record.menuId === item.menuId)[0];
    if (target) {
      target[column] = value;
      this.props.dispatch({
        type: 'menu/updateMenuInfo',
        payload: { ...target }
      })
    }
  }
  check = (value, record, column) =>{
    const { dataSource } = this.props.menu;
    const target = dataSource.filter(item => record.menuId === item.menuId)[0];
    this.props.dispatch({
      type: 'menu/modifyMenu',
      payload: {...target }
    })
  }
  edit = (value, record, column) =>{
    const { dataSource } = this.props.menu;
    const target = dataSource.filter(item => record.menuId === item.menuId)[0];
    if (target) {
      target[column] = value;
      this.props.dispatch({
        type: 'menu/update',
        payload: { ...target }
      })
    }
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record, column)}
        check={()=>this.check(text, record, column)}
        edit={()=>this.edit(text,record,column)}
      />
    );
  }
  render(){
    const { dataSource, tableLoading } = this.props.menu;
    const columns = [{
      title: '菜单名称',
      width: '20%',
      dataIndex: 'menuName'
    },{
      title:'菜单编号',
      width: '20%',
      dataIndex: 'menuId'
    },{
      title:'路径',
      width: '20%',
      dataIndex: 'url'
    },{
      title:'状态',
      dataIndex: 'fstate',
      width: 100,
      render:(text,record) =>{
        return (
        // <Popconfirm title={this.state.isopen ? '是否确认开启此状态':'是否确认关闭此状态?'} okText="是" cancelText="否">
            <Switch  
              checkedChildren="开" unCheckedChildren="关"
              defaultChecked={text === '01' ? true: false}
              onFocus={(e)=>console.log(e.target.checked)}
              onChange={(checked)=>console.log(checked,'checked')}
              /* onChange={(e)=>{
                this.setState({ isopen:this.state.isopen })
              }} */
            />
        // </Popconfirm>
        )
      }
    },{
      title:'备注',
      dataIndex: 'tfRemark',
      width: 280,
      render: (text,record)=>{
        return this.renderColumns(text,record,'tfRemark')
      }
    }]

    return (
    <div>
      <Search 
        style={{ width: 300 }}
        onSearch={this.onSearch}
        placeholder='请输入菜单名称/路径/编号'
      />
      <Table 
        style={{ marginTop: 10 }}
        columns={columns}
        loading={tableLoading}
        rowKey={'menuId'}
        bordered
        dataSource={dataSource}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true
        }}
        size='small'
        scroll={{ x: "100%" }}
      />
    </div>
    )
  }
}
export default connect(state => state)(Refine);