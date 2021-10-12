import {Card, Col, DatePicker, Empty, Row, Tabs} from 'antd';
import {DualAxes} from '@ant-design/charts';
import numeral from 'numeral';
import styles from '../style.less';
import React from "react";
const { RangePicker } = DatePicker;

const PurchasedCard = ({purchaseData, loading}) => {
  const config = React.useMemo(() => {
    const data = []
    if (purchaseData.length > 0){
      purchaseData.forEach((item) => {
        data.push({
          month: item['month'],
          value: parseFloat(item['value']),
          quantity: parseInt(item['quantity'])
        });
      })
    }
    return {
      data : [ data, data ],
      xField : 'month',
      yField : [ 'value', 'quantity' ],
      geometryOptions: [
        { geometry: 'column' },
        {
          geometry: 'line',
          lineStyle: { lineWidth: 2 },
        },
      ],
    }
  }, [purchaseData]);

  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Quantity and value purchased"
      style={{
        height: '100%',
      }}
    >
      {
        config.data[0].length > 0 ? (
          <DualAxes { ...config }/>
        ) : (
          <Empty/>
        )
      }

    </Card>
  )
}

export default PurchasedCard;
