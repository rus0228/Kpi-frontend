import React from 'react';
import {Col, Row, Tooltip} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import {Suspense, useState} from "react";
import { fakeChartData, getNumberOfNewClients, getMostSpentClientsData, getRepeatedCustomerRate } from "./service";
import MostSpentClients from "./components/MostSpentClients";
import RepeatedCustomerRate from './components/RepeatedCustomerRate'
import {ChartCard} from "@/pages/dashboard/analysis/components/Charts";
import {CardFooter, ComparisonInt} from "@/pages/dashboard/CustomComponent";
import {InfoCircleOutlined} from "@ant-design/icons";
import {getChangedGlobalStates} from "@/pages/dashboard/CustomUtils";
import {isMobile} from 'react-device-detect';
import moment from "moment";
const mobileStyle = isMobile ? {marginTop: 164} : {};
const Monitor = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [newClients, setNewClients] = useState([]);
  const [mostSpentClientsData, setMostSpentClientsData] = useState([]);
  const [repeatedCustomerData, setRepeatedCustomerData] = useState({});

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  React.useEffect(() => {
    getNumberOfNewClients(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setNewClients(res)
    })
    getMostSpentClientsData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setMostSpentClientsData(res)
    })
    getRepeatedCustomerRate(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setRepeatedCustomerData(res);
    })
  }, [initialState])

  return (
    <GridContent style={mobileStyle}>
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
                time={`${moment(_startTime).format('YYYY/MM/DD')} ~ ${moment(_endTime).format('YYYY/MM/DD')}`}
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
                time={`${moment(_startTime).format('YYYY/MM/DD')} ~ ${moment(_endTime).format('YYYY/MM/DD')}`}
              />
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
