import {Card, Empty} from 'antd';
import numeral from 'numeral';
import { Pie } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';

const getDiffAndPercentage = (cur, prev, symbol) => {
  const prefix = symbol === 0 ? '' : '€'
  if (prev > 0) {
    const diff = symbol === 0 ? cur - prev : (cur - prev).toFixed(2);
    const percentage = (diff / prev) * 100;
    return {
      diff: diff > 0 ? `+${diff}${prefix}` : `${diff}${prefix}`,
      percentage: percentage > 0 ? `+${percentage.toFixed(2)}` : percentage.toFixed(2)
    }
  }else {
    const diff = symbol === 0 ? cur : cur.toFixed(2);
    const percentage = '∞';
    return {
      diff: diff > 0 ? `+${diff}${prefix}` : `${diff}${prefix}`,
      percentage: percentage
    }
  }
}

const FrequentSupplier = ({loading, frequentSupplierData, time}) => {
  const data = [];
  frequentSupplierData.map((item) => {
    const diffAndPercentage = getDiffAndPercentage(parseFloat(item['quantity']), parseFloat(item['_quantity']), 0)
    data.push({
      x: item.name,
      y: parseFloat(item['quantity']),
      a: diffAndPercentage.diff,
      b: diffAndPercentage.percentage
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
      {
        data.length === 0 ? (
          <Empty/>
        ) : (
          <Pie
            forceFit
            height={340}
            radius={0.8}
            angleField="y"
            colorField="x"
            data={data}
            legend={{
              visible: true,
            }}
            label={{
              visible: true,
              type: 'spider',
              formatter: (text, item) => {
                // eslint-disable-next-line no-underscore-dangle
                return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
              },
              style: {
                fontSize: 15
              }
            }}
            tooltip={{
              customContent: (title, data) => {
                return data.length > 0 ?
                  `<div style="padding: 10px; font-size: 15px"">` +
                  `${time}`+
                  `</div>` +
                  `<div style="padding: 10px; font-size: 15px"">` +
                  `${data[0]['data']['a']}`+
                  `</div>` +
                  `<div style="padding: 10px; font-size: 15px"">` +
                  `${data[0]['data']['b']}%`+
                  `</div>`
                  : ``;
              }
            }}
            statistic={{
              visible: false,
            }}
          />
        )
      }
    </Card>
  )
};

export default FrequentSupplier;
