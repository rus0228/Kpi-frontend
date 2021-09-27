import { Card, Radio, Typography, DatePicker, Row, Col, Divider} from 'antd';
import numeral from 'numeral';
import { Donut } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';

const BestSelling = ({loading, bestSellingData}) => {
  const {topQuantityData, topRevenueData, topProfitData} = React.useMemo(() => {
    let topQuantityData = [];
    let topRevenueData = [];
    let topProfitData = [];
    if (bestSellingData.length > 0){
      bestSellingData[0].map((item) => {
        topQuantityData.push({
          x: item['pName'],
          y: parseFloat(item['pQty'])
        })
      })
      bestSellingData[1].map((item) => {
        topRevenueData.push({
          x: item['pName'],
          y: parseFloat(item['pRevenue'])
        })
      })
      bestSellingData[2].map((item) => {
        topProfitData.push({
          x: item['pName'],
          y: parseFloat(item['pProfit'])
        })
      })
    }
    return {topQuantityData, topRevenueData, topProfitData};
  }, [bestSellingData]);


  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Best Selling Products"
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
            data={topQuantityData}
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
              totalLabel: 'Quantity',
              content: {
                name: 'Top 5',
                value: 'Quantity'
              }
            }}
          />
        </Col>
        <Divider dashed />
        <Col span={24}>
          <Donut
            forceFit
            height={340}
            radius={0.8}
            angleField="y"
            colorField="x"
            data={topRevenueData}
            legend={{
              visible: false,
            }}
            label={{
              visible: true,
              type: 'spider',
              formatter: (text, item) => {
                // eslint-disable-next-line no-underscore-dangle
                return `${item._origin.x}: ${numeral(item._origin.y).format('0,0.00')}`;
              },
              style: {
                fontSize: 15
              }
            }}
            statistic={{
              totalLabel: 'Revenue',
              content: {
                name: 'Top 5',
                value: 'Revenue'
              }
            }}
          />
        </Col>
        <Divider dashed />
        <Col span={24}>
          <Donut
            forceFit
            height={340}
            radius={0.8}
            angleField="y"
            colorField="x"
            data={topProfitData}
            legend={{
              visible: false,
            }}
            label={{
              visible: true,
              type: 'spider',
              formatter: (text, item) => {
                // eslint-disable-next-line no-underscore-dangle
                return `${item._origin.x}: ${numeral(item._origin.y).format('0,0.00')}`;
              },
              style: {
                fontSize: 15
              }
            }}
            statistic={{
              totalLabel: 'Profit',
              visible: true,
              content: {
                name: 'Top 5',
                value: 'Profit'
              }
            }}
          />
        </Col>
      </Row>
    </Card>
  )
};

export default BestSelling;
