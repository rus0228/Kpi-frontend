import { Card, Radio, Typography, DatePicker } from 'antd';
import numeral from 'numeral';
import { Donut } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
const {RangePicker} = DatePicker;

const FrequentSupplier = ({loading, frequentSupplierData}) => {
  const data = [];
  frequentSupplierData.map((item) => {
    data.push({
      x: item.name,
      y: parseFloat(item.quantity)
    })
  })
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Most frequent suppliers(quantity)"
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
            visible: false,
          }}
        />
      </div>
    </Card>
  )
};

export default FrequentSupplier;
