import { Card, Radio, Typography, DatePicker, Row, Col, Divider} from 'antd';
import numeral from 'numeral';
import { Pie } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
import {getDiffAndPercentage} from "@/pages/dashboard/CustomUtils";

const RepeatedCustomerRate = ({loading, data, time}) => {
  const repeatedRateData = React.useMemo(() => {

    if (Object.keys(data).length > 0){
      const diffAndPercentage = getDiffAndPercentage(parseFloat(data['current']['notRepeated']), parseFloat(data['prev']['notRepeated']), 0);
      const _diffAndPercentage = getDiffAndPercentage(parseFloat(data['current']['repeated']), parseFloat(data['prev']['repeated']), 0);
      return [
        {
          x: 'Not Repeated',
          y: data['current']['notRepeated'],
          a: diffAndPercentage.diff,
          b: diffAndPercentage.percentage
        },
        {
          x: 'Repeated',
          y: data['current']['repeated'],
          a: _diffAndPercentage.diff,
          b: _diffAndPercentage.percentage
        }
      ]
    }else {
      return [];
    }
  }, [data]);


  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Repeated Customer Rate"
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
            data={repeatedRateData}
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
        </Col>
      </Row>
    </Card>
  )
};

export default RepeatedCustomerRate;
