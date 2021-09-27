import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import {Column, ColumnLine, Donut} from '@ant-design/charts';
import numeral from 'numeral';
import styles from '../style.less';
import React from "react";
const { RangePicker } = DatePicker;

const PurchasedCard = ({purchaseData, loading}) => {
  const config = React.useMemo(() => {
    const uvData = []
    const transformData = []
    if (purchaseData.length > 0){
      purchaseData.forEach((item) => {
        uvData.push({
          month: item['month'],
          value: parseFloat(item['value'])
        });
        transformData.push({
          month: item['month'],
          quantity: parseInt(item['quantity'])
        })
      })
    }
    return {
      data : [ uvData, transformData ],
      xField : 'month',
      yField : [ 'value', 'quantity' ],
      columnConfig : { color : '#586bce' },
      lineConfig : {
        color : '#29cae4',
        point : { visible : true },
        label : { visible : true },
      }
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
      <ColumnLine { ...config }/>
    </Card>
  )
}

export default PurchasedCard;
