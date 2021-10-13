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
      size='small'
    >
      <Row gutter={16}>
        <Col span={24}>
          <Pie
            forceFit
            height={340}
            radius={0.8}
            angleField="y"
            colorField="x"
            data={repeatedRateData}
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
                  `${data[0]['data']['b']}%`+
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
