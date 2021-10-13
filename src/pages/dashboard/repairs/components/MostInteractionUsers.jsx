import { Card, Radio, Typography, DatePicker } from 'antd';
import numeral from 'numeral';
import { Pie } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
import {getDiffAndPercentage} from "@/pages/dashboard/CustomUtils";


const MostInteractionUsers = ({loading, mostInteractionData, time}) => {
  const data = []
  mostInteractionData.map((item) => {
    const diffAndPercentage = getDiffAndPercentage(item['current'], item['prev'], 0)
    data.push({
      x: `UserID-${item['uid']}`,
      y: item['current'],
      a: diffAndPercentage.diff,
      b: diffAndPercentage.percentage
    })
  })
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Users with most interaction"
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
                `${data[0]['data']['b']}`+
                `</div>`
                : ``;
            }
          }}
          statistic={{
            visible: false,
          }}
        />
      </div>
    </Card>
  )
};

export default MostInteractionUsers;
