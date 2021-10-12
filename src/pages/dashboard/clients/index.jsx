import React from 'react';
import {Col, Row, Tooltip} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import {Suspense, useState} from "react";
import { fakeChartData, getNumberOfNewClients, getMostSpentClientsData, getRepeatedCustomerRate } from "./service";
import moment from "moment";
import MostSpentClients from "./components/MostSpentClients";
import RepeatedCustomerRate from './components/RepeatedCustomerRate'
import {ChartCard} from "@/pages/dashboard/analysis/components/Charts";
import {CardFooter, ComparisonInt} from "@/pages/dashboard/CustomComponent";
import {InfoCircleOutlined} from "@ant-design/icons";
const Monitor = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [newClients, setNewClients] = useState([]);
  const [mostSpentClientsData, setMostSpentClientsData] = useState([]);
  const [repeatedCustomerData, setRepeatedCustomerData] = useState({});
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
  const store = initialState.store;
  const duration = moment(endTime).diff(startTime, 'days');
  const _startTime = moment(startTime).subtract(duration + 2, 'days').format('YYYY-MM-DD');
  const _endTime = moment(_startTime).add(duration + 1, 'days').format('YYYY-MM-DD');
  React.useEffect(() => {
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
              {
                Object.keys(newClients).length > 0 ? (
                  <ChartCard
                    bordered={false}
                    title="Number of New Clients"
                    action={
                      <Tooltip
                        title={
                          <ComparisonInt current={newClients['current']['count']} prev={newClients['prev']['count']} _startTime={_startTime} _endTime={_endTime}/>
                        }
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    }
                    loading={loading}
                    total={() => <div>{newClients['current']['count']}</div>}
                    footer={<CardFooter current={newClients['current']['count']} prev={newClients['prev']['count']}/>}
                    contentHeight={46}
                  />
                ) : (
                  <div/>
                )
              }
            </Suspense>
          </Col>
        </Row>
        <Row gutter={24} style={{marginBottom: 24}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <RepeatedCustomerRate
                loading={loading}
                data={repeatedCustomerData}
                time={`${_startTime} ~ ${_endTime}`}
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
                time={`${_startTime} ~ ${_endTime}`}
              />
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
