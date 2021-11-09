import {Col, Row, Card, Statistic, Tooltip} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, {Suspense} from "react";
import {fakeChartData, getSosData} from "./service";
import {ChartCard} from "@/pages/dashboard/revenue/components/Charts";
import {InfoCircleOutlined} from "@ant-design/icons";
import Yuan from "@/pages/dashboard/revenue/utils/Yuan";
import {CardFooter, Comparison, ComparisonInt, CardFooterTime, ComparisonTime, Time} from "@/pages/dashboard/CustomComponent";
import {getChangedGlobalStates} from "@/pages/dashboard/CustomUtils";
import {isMobile} from 'react-device-detect';
const mobileStyle = isMobile ? {marginTop: 164} : {};
const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 12
};
const Sos = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);

  const [sosData, setSosData] = React.useState({
    receivedOrders: 0,
    shippedOrders: 0,
    averageTime: 0,
    totalRevenue: 0,
    _receivedOrders: 0,
    _shippedOrders: 0,
    _averageTime: 0,
    _totalRevenue: 0,
  });
  const {receivedOrders, shippedOrders, averageTime, totalRevenue, _receivedOrders, _shippedOrders, _averageTime, _totalRevenue} = sosData

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  React.useEffect(() => {
    getSosData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setSosData({
        ...sosData,
        receivedOrders: res['current']['receivedOrders'],
        shippedOrders: res['current']['shippedOrders'],
        averageTime: res['current']['averageTime'],
        totalRevenue: res['current']['totalRevenue'],
        _receivedOrders: res['prev']['receivedOrders'],
        _shippedOrders: res['prev']['shippedOrders'],
        _averageTime: res['prev']['averageTime'],
        _totalRevenue: res['prev']['totalRevenue']
      })
    })
  }, [initialState])

  return (
    <GridContent style={mobileStyle}>
      <Suspense fallback={null}>
        <Row gutter={[24, 24]}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Number of Orders Received"
              action={
                <Tooltip
                  title={
                    <ComparisonInt current={receivedOrders} prev={_receivedOrders} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <div>{receivedOrders}</div>}
              footer={<CardFooter current={receivedOrders} prev={_receivedOrders}/>}
              contentHeight={46}
            />
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Number of Orders Shipped"
              action={
                <Tooltip
                  title={
                    <ComparisonInt current={shippedOrders} prev={_shippedOrders} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <div>{shippedOrders}</div>}
              footer={<CardFooter current={shippedOrders} prev={_shippedOrders}/>}
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row gutter={[24,24]} style={{marginTop: 24}}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Total Revenue"
              action={
                <Tooltip
                  title={
                    <Comparison current={totalRevenue} prev={_totalRevenue} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <Yuan>{totalRevenue}</Yuan>}
              footer={<CardFooter current={totalRevenue} prev={_totalRevenue}/>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Average Time between Received and Shipped"
              action={
                <Tooltip
                  title={
                    <ComparisonTime current={averageTime} prev={_averageTime} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <Time seconds={averageTime}/>}
              footer={<CardFooterTime prev={_averageTime} current={averageTime}/>}
              contentHeight={46}
            />
          </Col>
        </Row>
      </Suspense>
    </GridContent>
  );
};

export default Sos;
