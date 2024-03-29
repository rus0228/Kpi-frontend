import {Card, Radio, Typography, DatePicker, Row, Col, Divider} from 'antd';
import numeral from 'numeral';
import {Pie, Donut} from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
import {getDiffAndPercentage} from "@/pages/dashboard/CustomUtils";


const BestSelling = ({loading, bestSellingData, time}) => {
  const {topQuantityData, topRevenueData, topProfitData} = React.useMemo(() => {
    let topQuantityData = [];
    let topRevenueData = [];
    let topProfitData = [];
    if (bestSellingData.length > 0) {
      bestSellingData[0].map((item) => {
        const diffAndPercentage = getDiffAndPercentage(parseFloat(item['cur_pQty']), parseFloat(item['prev_pQty']), 0)
        topQuantityData.push({
          x: item['cur_pName'],
          y: parseFloat(item['cur_pQty']),
          a: diffAndPercentage.diff,
          b: diffAndPercentage.percentage
        })
      })
      bestSellingData[1].map((item) => {
        const diffAndPercentage = getDiffAndPercentage(parseFloat(item['cur_pRevenue']), parseFloat(item['prev_pRevenue']), 1)
        topRevenueData.push({
          x: item['cur_pName'],
          y: parseFloat(item['cur_pRevenue']),
          a: diffAndPercentage.diff,
          b: diffAndPercentage.percentage
        })
      })
      bestSellingData[2].map((item) => {
        const diffAndPercentage = getDiffAndPercentage(parseFloat(item['cur_pProfit']), parseFloat(item['prev_pProfit']), 1)
        topProfitData.push({
          x: item['cur_pName'],
          y: parseFloat(item['cur_pProfit']),
          a: diffAndPercentage.diff,
          b: diffAndPercentage.percentage
        })
      })
    }
    return {topQuantityData, topRevenueData, topProfitData};
  }, [bestSellingData]);


  return (
    <>
      <Row gutter={[24,24]}>
        <Col span={24}>
          <Card
            loading={loading}
            className={styles.salesCard}
            bordered={false}
            title="Best Selling Products(Quantity)"
            type='flex'
            style={{alignItems: 'center'}}
          >
            <Pie
              radius={0.8}
              angleField="y"
              colorField="x"
              data={topQuantityData}
              label={{
                type: 'outer',
                style: {
                  fontSize: 15
                },
                formatter: (text, item) => {
                  return `${numeral(item._origin.y).format('0,0')}`;
                },
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
          </Card>
        </Col>
        <Col span={24}>
          <Card
            loading={loading}
            className={styles.salesCard}
            bordered={false}
            title="Best Selling Products(Value)"
          >
            <Pie
              radius={0.8}
              angleField="y"
              colorField="x"
              data={topRevenueData}
              label={{
                type: 'outer',
                style: {
                  fontSize: 15
                },
                formatter: (text, item) => {
                  return `${numeral(item._origin.y).format('0,0.00')}€`;
                },
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
          </Card>
        </Col>
        <Col span={24}>
          <Card
            loading={loading}
            className={styles.salesCard}
            bordered={false}
            title="Most Profitable Products(Value)"
          >
            <Pie
              radius={0.8}
              angleField="y"
              colorField="x"
              data={topProfitData}
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
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default BestSelling;
