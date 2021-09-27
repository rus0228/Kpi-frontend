import React from 'react'
import { GroupedColumnLine } from '@ant-design/charts';
import {Row, Col, Radio, DatePicker, Checkbox, Divider} from 'antd';
const CheckboxGroup = Checkbox.Group;
const plainTypes = ['sale', 'repair', 'return']
const RevenueProfitQtyPanel = ({revenueProfitQtyData, checkedList, onChangeList}) => {
  const {revenueData, profitData, quantityData} = React.useMemo(() => {
    let revenueData = []
    let profitData = []
    let quantityData = [];
    Object.keys(revenueProfitQtyData).map((key, index) => {
      let revenue = 0, profit = 0, quantity = 0;
      revenueProfitQtyData[key].map((item) => {
        if (item['product'] === 'sales' || item['product'] === 'repairs'){
          revenue += parseFloat(item['revenue'])
          profit += parseFloat(item['profit'])
          quantity += parseFloat(item['quantity'])
        }
        if (item['product'] === 'returns'){
          revenue -= parseFloat(item['revenue'])
          profit -= parseFloat(item['profit'])
          quantity -= parseFloat(item['quantity'])
        }
      })
      revenueData.push({
        time: key,
        value: revenue,
        type: 'revenue'
      })
      profitData.push({
        time: key,
        value: profit,
        type: 'profit'
      })
      quantityData.push({
        time: key,
        quantity: quantity
      })
    })

    return {revenueData, profitData, quantityData}
  }, [revenueProfitQtyData])
  const revenueProfitData = [...revenueData, ...profitData]
  const config = {
    data : [ revenueProfitData , quantityData ] ,
    xField : 'time' ,
    yField : [ 'value' , 'quantity' ] ,
    columnGroupField : 'type' ,
  } ;
  return (
    <>
      <Row gutter={16} style={{marginBottom: 24}}>
        <Col span={24}>
          <CheckboxGroup options={plainTypes} value={checkedList} onChange={onChangeList} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <GroupedColumnLine { ... config }/>
        </Col>
      </Row>
    </>
  )
}

export default RevenueProfitQtyPanel
