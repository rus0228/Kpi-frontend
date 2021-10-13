import {Card, Radio, Typography, DatePicker, Row, Col, Divider} from 'antd';
import numeral from 'numeral';
import {Pie} from '@ant-design/charts';
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
            style={{
              height: '100%',
            }}
            size='small'
          >
            <Pie
              forceFit
              height={340}
              radius={0.8}
              angleField="y"
              colorField="x"
              data={topQuantityData}
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
          </Card>
        </Col>
        <Col span={24}>
          <Card
            loading={loading}
            className={styles.salesCard}
            bordered={false}
            title="Best Selling Products(Value)"
            style={{
              height: '100%',
            }}
            size='small'
          >
            <Pie
              forceFit
              height={340}
              radius={0.8}
              angleField="y"
              colorField="x"
              data={topRevenueData}
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
          </Card>
        </Col>
        <Col span={24}>
          <Card
            loading={loading}
            className={styles.salesCard}
            bordered={false}
            title="Most Profitable Products(Value)"
            style={{
              height: '100%',
            }}
            size='small'
          >
            <Pie
              forceFit
              height={340}
              radius={0.8}
              angleField="y"
              colorField="x"
              data={topProfitData}
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
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default BestSelling;
