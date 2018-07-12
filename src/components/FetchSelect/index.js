import React from 'react';
import { Select} from 'antd';
import querystring from 'querystring';
const Option = Select.Option;

let timeout;
let currentValue;

function fake(value, callback, url, query, parmas) {
  
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
   fetch(url + '?searchName=' + value + '&' + querystring.stringify(query), {
        method: 'get',
        mode:'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    .then(response => {
      return response.json();
    })
    .then(d => {
        if (currentValue === value) {
          let result = d;
          const data = [];
          if(parmas){
            result.forEach((r) => {
              data.push({
                value: r.value.toString(),
                text: r.text,
                [parmas]: r[parmas]
              });
            });
          }else{
            result.forEach((r) => {
              data.push({
                value: r.value.toString(),
                text: r.text
              });
            });
          }
          callback(data);   
        }
    })
    .catch(e => console.log("Oops, error", e))

}




class FetchSelect extends React.Component {
  state = {
    data: [],
    value: '',
  }
 
  getValues = (value,option) => {
    this.props.cb(value,option.props.parmas);
  }
  handleChange = (value) => {
    this.setState({ value });
    fake(value, data => this.setState({ data }), this.props.url, this.props.query,this.props.parmas);
  }
  render() {
    let options = [];
    if(this.props.parmas){
      let parmas = this.props.parmas;
      options = this.state.data.map(d => <Option value={d.value} parmas={d[parmas]} key={d.value}>{d.text}</Option>); 
    }else{
      options = this.state.data.map(d => <Option value={d.value}  key={d.value}>{d.text}</Option>);
    }
    return (
      <Select
        showSearch
        defaultValue={this.props.defaultValue}
        onSearch={this.handleChange}
        // onChange={(value,option)=>this.getValues(value,option)}
        onSelect={(value,option)=>this.getValues(value,option)}
        notFoundContent="暂无查询结果"
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        allowClear={this.props.allowClear}
        filterOption={false}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
      >
        {options}
      </Select>
    );
  }
}

export default FetchSelect;