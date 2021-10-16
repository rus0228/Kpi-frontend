import { Card, Radio, Typography, DatePicker } from 'antd';
import numeral from 'numeral';
import { Pie } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
const {RangePicker} = DatePicker;

const NumRepairs = ({loading, NumberOfRepairsData}) => {
  const data = [];
  NumberOfRepairsData.map((item) => {
    data.push({
      x: `status ${item.status}`,
      y: item.count
    })
  })
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Number of repairs"
      style={{
        height: '100%',
      }}
      size='small'
    >
      <div>
        <Pie
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
            type: 'outer',
            formatter: (text, item) => {
              // eslint-disable-next-line no-underscore-dangle
              return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
            },
          }}
          statistic={{
            totalLabel: 'Total Number',
          }}
        />
      </div>
    </Card>
  )
};

export default NumRepairs;
