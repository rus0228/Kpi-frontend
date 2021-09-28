import { Card, Radio, Typography, DatePicker } from 'antd';
import numeral from 'numeral';
import {Bar, Donut} from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';

const {RangePicker} = DatePicker;
const SosBarPanel = ({loading, barData}) => {
  const data = [];
  const actions = ['received', 'shipped']
  barData.map((item, index) => {
    data.push({
      action: actions[index],
      number: item[0]['number']
    })
  })
  const config = {
    forceFit : true ,
    data: data,
    xField : 'number' ,
    yField : 'action' ,
    conversionTag : { visible : true },
    barSize: 30
  } ;
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Number of orders received and shipped"
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

export default SosBarPanel;
