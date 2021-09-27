import { Card, Radio, Typography, DatePicker, Row, Col, Divider} from 'antd';
import numeral from 'numeral';
import { Donut } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
const {RangePicker} = DatePicker;

const MostSpentClients = ({loading, mostSpentClientsData}) => {
  const {data} = React.useMemo(() => {
    let data = [];
    if (mostSpentClientsData.length > 0){
      mostSpentClientsData.map((item) => {
        data.push({
          x: item['name'],
          y: parseFloat(item['total_spent'])
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
              totalLabel: 'Clients',
              content: {
                name: 'Top 5',
                value: 'Clients'
              }
            }}
          />
        </Col>
      </Row>
    </Card>
  )
};

export default MostSpentClients;
