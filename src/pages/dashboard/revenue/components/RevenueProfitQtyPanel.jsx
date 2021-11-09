import React from 'react'
import {DualAxes} from '@ant-design/charts';
import {Row, Col} from 'antd';

const RevenueProfitQtyPanel = ({revenueProfitQtyData}) => {
  const {revenueData, profitData, quantityData} = React.useMemo(() => {
    let revenueData = []
    let profitData = []
    let quantityData = [];
    revenueProfitQtyData.map((item) => {
      revenueData.push({
        time: item['time'],
        value: parseFloat(item['revenue']),
        type: 'revenue'
      })
      profitData.push({
        time: item['time'],
        value: parseFloat(item['profit']),
        type: 'profit'
      })
      quantityData.push({
        time: item['time'],
        quantity: parseFloat(item['quantity'])
      })
    })
    return {revenueData, profitData, quantityData}
  }, [revenueProfitQtyData])
  const revenueProfitData = [...revenueData, ...profitData]
  const config = {
    data: [revenueProfitData, quantityData],
    xField: 'time',
    yField: ['value', 'quantity'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
      },
      {
        geometry: 'line',
        lineStyle: { lineWidth: 2 },
        smooth: true
      },
    ],
    height: 260
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <DualAxes {...config}/>
        </Col>
      </Row>
    </>
  )
}

export default RevenueProfitQtyPanel
