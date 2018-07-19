import React, { Component } from 'react';
import { Table, message } from 'antd';
import querystring from 'querystring';
import { objCompare } from '../../utils/utils'
// import request from '../../utils/request';
class RemoteTable extends Component {
  constructor(props) {
    super(props)
    this.defaultPageSize = window.screen.height >= 1080 ? 20 : 10
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      searchParams: {}
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if ((nextProps.url !== this.props.url) || 
      (typeof nextProps.query === 'string' ? nextProps.query !== this.props.query : !objCompare(nextProps.query, this.props.query))) {
        this.fetch(nextProps.query, nextProps.url)
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = this.state.pagination;
    pager.pageSize = pagination.pageSize;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    const postData = Object.assign({}, this.state.searchParams, {
      results: pagination.pagesize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
    this.fetch(postData);
  }
  fetch = (params = {...this.props.query}, url = this.props.url,catchData={...this.props.catchData}) => {
    this.setState({ loading: true, searchParams: params });
    if(url){
      let pagination = this.state.pagination;
      const body = querystring.stringify({
        pagesize: pagination.pageSize ?  pagination.pageSize : ( this.props.pagesize || this.defaultPageSize ),
        ...params,
        ...catchData
      });
      fetch(url,{
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      }).then(res => res.json())
        .then((data)=> {
          if(!data.status){
            message.error(data.msg);
          }
          pagination.total = data.result.records;
          pagination.showSizeChanger = true;
          pagination.pageSizeOptions=['10','20','30'];
          pagination.showQuickJumper = true;
          pagination.showTotal=(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`;
          pagination.pageSize = pagination.pageSize ?  pagination.pageSize : ( this.props.pagesize || this.defaultPageSize );
          if(!params.page) {
            pagination.current = 1;
          }
          if (typeof this.props.cb === 'function') {
            this.props.cb(data.result.rows, data.result);
          }
          if (typeof this.props.getTotal === 'function') {
            this.props.getTotal(data.result);
          }
          this.setState({
            loading: false,
            data: data.result.rows || (Array.isArray(data.result) ? data.result : []),
            // fieldName: data.result.fieldName,
            pagination,
          });
        })
    }
    else{
      this.setState({
        loading: false,
        data: []
      })
    }
  }
  componentDidMount() {
    this.fetch();
  }
  render () {
    const { columns, rowKey, rowClassName, 
            rowSelection, scroll, footer,showHeader,title } = this.props;   
    return (
      <Table 
        style={this.props.style}
        columns={columns || null}
        rowKey={rowKey}
        bordered={true}
        size={this.props.size || 'small'}
        dataSource={this.props.data || this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        rowClassName={rowClassName}
        showHeader={showHeader || null}
        title={title || null}
        rowSelection={rowSelection || null}
        scroll={scroll || { x: '1300px' }}
        footer={footer || null}
        expandedRowRender={this.props.expandedRowRender}
      />
    )
  }
}

export default RemoteTable;