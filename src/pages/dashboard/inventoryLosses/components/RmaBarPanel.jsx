import { Card, Radio, Typography, DatePicker } from 'antd';
import numeral from 'numeral';
import {Bar, Donut} from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';

const RmaBarPanel = ({loading, barData}) => {
  const actions = ['Total RMA Value', 'Lost RMA Value']
  const {data} = React.useMemo(() => {
    let data = [];
    if (barData.length > 0){
      Object.keys(barData[0]).map((key, index) => {
        data.push({
          action: actions[index],
          number: barData[0][key] === null ? 0 : parseFloat(barData[0][key])
        })
      })
    }
    return {data};
  }, [barData]);


  const config = {
    forceFit : true ,
    data: data,
    xField : 'number' ,
    yField : 'action' ,
    barSize: 30
  } ;
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Total/Lost RMA Value"
      style={{
        height: '100%',
      }}
    >
      <div>
        <Bar {...config} style={{height: 200}}/>
      </div>
    </Card>
  )
};

export default RmaBarPanel;
