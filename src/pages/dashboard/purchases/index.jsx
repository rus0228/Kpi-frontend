import React from 'react';
import { Col, Row } from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import {Suspense, useState} from "react";
import {fakeChartData, getMostFrequentSuppliers, getMostPurchasedSuppliers, getPurchaseData} from "./service";
import FrequentSupplier from "./components/FrequentSupplier";
import PurchasedSupplier from "./components/PurchasedSupplier";
import PurchasedCard from "./components/PurchasedCard";
import moment from "moment";

const Purchases = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [frequentSupplierData, setFrequentSupplierData] = useState([]);
  const [purchasedSupplierData, setPurchasedSupplierData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([])

  React.useEffect(() => {
    const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
    const store = initialState.store;
    getPurchaseData(startTime, endTime, store).then((res) => {
      setPurchaseData(res)
    })
    getMostFrequentSuppliers(startTime, endTime).then((res) => {
      setFrequentSupplierData(res)
    })
    getMostPurchasedSuppliers(startTime, endTime).then((res) => {
      setPurchasedSupplierData(res)
    })
  }, [initialState])

  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <PurchasedCard
                purchaseData={purchaseData}
                loading={loading}
              />
            </Suspense>
          </Col>
        </Row>

        <Row gutter={24} style={{marginTop: 24}}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <FrequentSupplier
                loading={loading}
                frequentSupplierData={frequentSupplierData}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <PurchasedSupplier
                loading={loading}
                purchasedSupplierData={purchasedSupplierData}
              />
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Purchases;
