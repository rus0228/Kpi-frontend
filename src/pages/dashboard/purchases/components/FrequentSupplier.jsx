import {Card, Empty} from 'antd';
import numeral from 'numeral';
import { Pie } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
import {getDiffAndPercentage} from "@/pages/dashboard/CustomUtils";


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
            radius={0.8}
            angleField="y"
            colorField="x"
            data={data}
            label={{
              type: 'outer',
              style: {
                fontSize: 15
              },
              formatter: (text, item) => {
                return `${numeral(item._origin.y).format('0,0')}`;
              }
            }}
            interactions={[{ type: 'element-single-selected' }, { type: 'element-active' }]}
            tooltip={{
              customContent: (title, data) => {
                return data.length > 0 ?
                  `<div style="padding: 10px; font-size: 15px">` +
                  `${data[0]['data']['x']}`+
                  `</div>` +
                  `<div style="padding: 10px; font-size: 15px">` +
                  `${data[0]['data']['y']}`+
                  `</div>` +
                  `<div style="padding: 10px; font-size: 15px">` +
                  `Compared: ${time}`+
                  `</div>` +
                  `<div style="padding: 10px; font-size: 15px">` +
                  `${data[0]['data']['a']}`+
                  `</div>` +
                  `<div style="padding: 10px; font-size: 15px">` +
                  `${data[0]['data']['b']}`+
                  `</div>`
                  : ``;
              }
            }}
          />
        )
      }
    </Card>
  )
};

export default FrequentSupplier;
