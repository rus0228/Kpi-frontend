import React from 'react'
import {DualAxes} from '@ant-design/charts';
import {Row, Col} from 'antd';

const RevenueQtyPanel = ({revenueQtyData}) => {
  const { data } = React.useMemo(() => {
    let data = []
    revenueQtyData.map((item) => {
      data.push({
        time: item['time'],
        revenue: parseFloat(item['revenue']),
        quantity: parseFloat(item['quantity'])
      })
    })
    return {data}
  }, [revenueQtyData])
  const config = {
    data: [data, data],
    xField: 'time',
    yField: ['revenue', 'quantity'],
    geometryOptions: [
      { geometry: 'column' },
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

export default RevenueQtyPanel
