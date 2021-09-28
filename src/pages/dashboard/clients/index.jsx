import React from 'react';
import { Col, Row} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import {Suspense, useState} from "react";
import { fakeChartData, getNumberOfNewClients, getMostSpentClientsData, getRepeatedCustomerRate } from "./service";
import moment from "moment";
import NewClients from "./components/NewClients";
import MostSpentClients from "./components/MostSpentClients";
import RepeatedCustomerRate from './components/RepeatedCustomerRate'
const Monitor = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [newClients, setNewClients] = useState({});
  const [mostSpentClientsData, setMostSpentClientsData] = useState([]);
  const [repeatedCustomerData, setRepeatedCustomerData] = useState([]);

  React.useEffect(() => {
    const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
    const store = initialState.store;

    getNumberOfNewClients(startTime, endTime, store).then((res) => {
      setNewClients(res)
    })
    getMostSpentClientsData(startTime, endTime, store).then((res) => {
      setMostSpentClientsData(res)
    })
    getRepeatedCustomerRate(startTime, endTime, store).then((res) => {
      setRepeatedCustomerData(res);
    })
  }, [initialState])
  return (
    <GridContent>
      <>
        <Row gutter={24} style={{marginBottom: 24}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <NewClients
                loading={loading}
                value={newClients}
              />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={24} style={{marginBottom: 24}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <RepeatedCustomerRate
                loading={loading}
                repeatedCustomerData={repeatedCustomerData}
              />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <MostSpentClients
                loading={loading}
                mostSpentClientsData={mostSpentClientsData}
              />
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
