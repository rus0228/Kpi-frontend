import { Card, Radio, Typography, DatePicker, Row, Col} from 'antd';
import numeral from 'numeral';
import { Pie } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
import {getDiffAndPercentage} from "@/pages/dashboard/CustomUtils";

const MostSpentClients = ({loading, mostSpentClientsData, time}) => {
  const {data} = React.useMemo(() => {
    let data = [];
    if (mostSpentClientsData.length > 0){
      mostSpentClientsData.map((item) => {
        const diffAndPercentage = getDiffAndPercentage(parseFloat(item['spent']), parseFloat(item['_spent']), 1)
        data.push({
          x: item['name'],
          y: parseFloat(item['spent']),
          a: diffAndPercentage.diff,
          b: diffAndPercentage.percentage
        })
      })
    }
    return {data};
  }, [mostSpentClientsData]);
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Most Money Spent Clients"
      style={{
        height: '100%',
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
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
                return `${numeral(item._origin.y).format('0,0.00')}€`;
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
                  `${data[0]['data']['y']}€`+
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
        </Col>
      </Row>
    </Card>
  )
};

export default MostSpentClients;
