import React from 'react'
import { GroupedColumnLine, ColumnLine } from '@ant-design/charts';
import {Row, Col, Radio, DatePicker, Checkbox, Divider} from 'antd';

const PurchaseOrdersPanel = ({purchasedOrdersData}) => {
  const config = React.useMemo(() => {
    const uvData = []
    const transformData = []
    if (purchasedOrdersData.length > 0){
      purchasedOrdersData.forEach((item) => {
        uvData.push({
          time: item['time'],
          revenue: parseFloat(item['revenue'])
        });
        transformData.push({
          time: item['time'],
          quantity: parseInt(item['quantity'])
        })
      })
    }
    return {
      data : [ uvData, transformData ],
      xField : 'time',
      yField : [ 'revenue', 'quantity' ],
      columnConfig : { color : '#6396f9' },
      lineConfig : {
        color : '#f5bc32',
        point : { visible : true },
        label : { visible : true },
      }
    }
  }, [purchasedOrdersData]);

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          < ColumnLine { ... config } />
        </Col>
      </Row>
    </>
  )
}

export default PurchaseOrdersPanel
