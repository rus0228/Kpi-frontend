import React, {useRef} from 'react';
import { Suspense, useState } from 'react';
import {Row, Col, Button, Statistic, Card} from 'antd'
import { GridContent } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import {fakeChartData, getRevenueProfitQty, getTotalValue,getTotalCostIva, getPurchasedOrdersData} from './service';
import PageLoading from './components/PageLoading';
import RevenueProfitQtyPanel from "./components/RevenueProfitQtyPanel";
import PurchaseOrdersPanel from "./components/PurchaseOrdersPanel";
import RevenueCard from "./components/RevenueCard";
import IntroduceRow from './components/IntroduceRow'
import { useModel } from 'umi';
import moment from "moment";

const Analysis = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [types, setTypes] = React.useState(['sale']);

  const [totalValue, setTotalValue] = useState({});
  const [revenueProfitQtyData, setRevenueProfitQtyData] = useState([])
  const [purchasedOrdersData, setPurchasedOrdersData] = useState([])
  const [totalCostIva, setTotalCostIva] = useState({})

  const onChangeTypes = list => {
    setTypes(list);
  };

  const store = initialState.store;
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
  React.useEffect(() => {
    const productTypes = JSON.stringify(types)
    getRevenueProfitQty(startTime, endTime, store, productTypes).then((res) => {
      setRevenueProfitQtyData(res)
    })
  },[initialState.store, initialState.range, types]);

  React.useEffect(() => {
    console.log('_+_+_+_+_+', initialState.range)
    getPurchasedOrdersData(startTime, endTime, store).then((res) => {
      setPurchasedOrdersData(res)
    })
    getTotalCostIva(startTime, endTime, store).then((res) => {
      setTotalCostIva(res)
    })
    getTotalValue(startTime, endTime, store).then((res) => {
      setTotalValue(res)
    })
  },[initialState])

  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <Card
            loading={loading}
            title={'Revenue / Profit / Quantity'}
            bordered={false}
            bodyStyle={{
              padding: 24,
              marginBottom: 24
            }}
          >
            <RevenueProfitQtyPanel
              revenueProfitQtyData={revenueProfitQtyData}
              checkedList={types}
              onChangeList={onChangeTypes}
            />
          </Card>
        </Suspense>

        <Suspense fallback={<PageLoading />}>
          <Card
            loading={loading}
            title={'Revenue and Quantity of Purchase Orders'}
            bordered={false}
            bodyStyle={{
              padding: 24,
              marginBottom: 24
            }}
          >
            <PurchaseOrdersPanel
              purchasedOrdersData={purchasedOrdersData}
            />
          </Card>
        </Suspense>

        <Suspense fallback={<PageLoading />}>
          <IntroduceRow
            loading={loading}
            visitData={totalCostIva}
          />
        </Suspense>

        <Suspense fallback={<PageLoading />}>
          <Card
            loading={loading}
            bordered={false}
            bodyStyle={{
              padding: 24,
              marginBottom: 24
            }}
          >
            <RevenueCard
              totalValue={totalValue}
            />
          </Card>
        </Suspense>
      </>
    </GridContent>
  );
};

export default Analysis;
