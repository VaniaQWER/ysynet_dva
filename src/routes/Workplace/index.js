import React, { PureComponent } from 'react';
import { connect } from 'dva';
import CardItem from '../../components/LoginCard';

const cardList = [{
  title: "总务物资管理系统",
  subTitle: 'Supersystem',
  key:'zongwu'
},{
  title: "临床科室物资管理系统",
  subTitle: 'Supersystem',
  key:'linchuang'
},{
  title: "临床科室物资管理系统",
  subTitle: 'Supersystem'
},{
  title: "临床科室物资管理系统",
  subTitle: 'Supersystem'
},{
  title: "临床科室物资管理系统",
  subTitle: 'Supersystem'
},]
@connect()
class Workplace extends PureComponent {
  onClick = (item,index) =>{
    this.props.history.push({
      pathname:'/login'
    })
  }
  render() {
    console.log(this.props,'props')
    return (
      <div style={{ display:'flex',justifyContent:'center',paddingTop: 110 }}>
         <CardItem 
          list={cardList}
          onClick={this.onClick}
          />
      </div>
    )
  }
}

export default Workplace;