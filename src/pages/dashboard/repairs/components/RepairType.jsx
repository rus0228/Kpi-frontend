import { Card, Radio, Typography, DatePicker } from 'antd';
import numeral from 'numeral';
import { Donut } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';

const NumRepairs = ({loading, repairTypeData}) => {
  const data = []
  const types = ['repair', 'warranty', 'sos']
  repairTypeData.map((item, index) => {
    data.push({
      x: types[index],
      y: item[0]['type']
    })
  })
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Repair Type"
      style={{
        height: '100%',
      }}
    >
      <div>
        <Donut
          forceFit
          height={340}
          radius={0.8}
          angleField="y"
          colorField="x"
          data={data}
          legend={{
            visible: false,
          }}
          label={{
            visible: true,
            type: 'spider',
            formatter: (text, item) => {
              // eslint-disable-next-line no-underscore-dangle
              return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
            },
          }}
          statistic={{
            totalLabel: 'Total',
          }}
        />
      </div>
    </Card>
  )
};

export default NumRepairs;
