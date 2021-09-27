import React from 'react';
import { Col, Row} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import {Suspense, useState} from "react";
import {fakeChartData, getNumberOfNewProducts, getBestSellingProductsData} from "./service";
import NewProducts from "./components/NewProducts";
import BestSelling from './components/BestSelling';
import moment from "moment";

const Monitor = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [newProducts, setNewProducts] = useState({});
  const [bestSellingData, setBestSellingData] = useState([]);

  const store = initialState.store;
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
  React.useEffect(() => {
    getBestSellingProductsData(startTime, endTime, store).then((res) => {
      setBestSellingData(res)
    })
  }, [initialState.store, initialState.range]);

  React.useEffect(() => {
    getNumberOfNewProducts(startTime, endTime, store).then((res) => {
      console.log('...', res)
      setNewProducts(res)
    })
  }, [initialState.store, initialState.range]);

  return (
    <GridContent>
      <>
        <Row gutter={24} style={{marginBottom: 24}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <NewProducts
                loading={loading}
                value={newProducts['count']}
              />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <BestSelling
                loading={loading}
                bestSellingData={bestSellingData}
              />
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
