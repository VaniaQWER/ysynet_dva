import React, { PureComponent } from 'react';
import styles from './style.css';
import { connect } from 'dva';
class SubSystem extends PureComponent {
  state = {
    subSystemList: []
  }
  componentWillReceiveProps = nextProps =>{
    if(nextProps.users.subSystemList.length){
      this.setState({ subSystemList: nextProps.users.subSystemList })
    }
  }
 
  render() {
    // console.log(this.props.users,'users')
    console.log(this.state.subSystemList,'subSystemList')
    
    const { subSystemList } = this.props.users;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <a style={{ color: '#999'}}>退 出</a>
        </div>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <span>武大口腔医院管理系统</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardList}>
              {
                subSystemList.map(item => (
                  <div key={item.subSystemId} className={styles.cardItem}>
                    <div className={styles.upperCon}>
                      <div className={styles.cardBackground}></div>
                      <div className={styles.icon}></div>
                    </div>
                    <div className={styles.main}>
                      <div className={styles.mainTitle}>{item.name}</div>
                      <div className={styles.subTitle}> {item.subTitle} </div>
                      <a className={styles.enterBtn} onClick={()=>console.log(item,'item')}>进 入</a>
                    </div>
                  </div>
                )
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(SubSystem)