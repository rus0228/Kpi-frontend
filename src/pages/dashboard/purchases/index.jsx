import React from 'react';
import { Col, Row } from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import {Suspense, useState} from "react";
import {fakeChartData, getMostFrequentSuppliers, getMostPurchasedSuppliers, getPurchaseData} from "./service";
import FrequentSupplier from "./components/FrequentSupplier";
import PurchasedSupplier from "./components/PurchasedSupplier";
import PurchasedCard from "./components/PurchasedCard";
import {getChangedGlobalStates} from "@/pages/dashboard/CustomUtils";

const Purchases = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [frequentSupplierData, setFrequentSupplierData] = useState([]);
  const [purchasedSupplierData, setPurchasedSupplierData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([])

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  React.useEffect(() => {
    getPurchaseData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setPurchaseData(res)
    })
    getMostFrequentSuppliers(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setFrequentSupplierData(res)
    })
    getMostPurchasedSuppliers(startTime, endTime, _startTime, _endTime, store).then((res) => {
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
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <FrequentSupplier
                loading={loading}
                frequentSupplierData={frequentSupplierData}
                time={`${_startTime} ~ ${_endTime}`}
              />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={24} style={{marginTop: 24}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <PurchasedSupplier
                loading={loading}
                purchasedSupplierData={purchasedSupplierData}
                time={`${_startTime} ~ ${_endTime}`}
              />
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Purchases;
