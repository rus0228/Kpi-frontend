import { Card, Radio, Typography, DatePicker, Row, Col, Divider} from 'antd';
import numeral from 'numeral';
import { Donut } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
const {RangePicker} = DatePicker;

const RepeatedCustomerRate = ({loading, repeatedCustomerData}) => {
  const {data} = React.useMemo(() => {
    let data = [];
    const buffer = ['repeated', 'nonRepeated']
    if (repeatedCustomerData.length > 0){
      repeatedCustomerData.map((item, index) => {
        data.push({
          x: buffer[index],
          y: item[0]['value']
        })
      })
    }
    return {data};
  }, [repeatedCustomerData]);


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
              style: {
                fontSize: 15
              }
            }}
            statistic={{
              visible: false
            }}
          />
        </Col>
      </Row>
    </Card>
  )
};

export default RepeatedCustomerRate;
